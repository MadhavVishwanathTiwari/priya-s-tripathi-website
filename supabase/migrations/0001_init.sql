-- Shivoham Universal Sol: blog posts and testimonials CMS.
--
-- Run in the Supabase SQL editor (or `supabase db push`) before the app is
-- pointed at the project. Everything here is idempotent enough to re-run on a
-- fresh project, but it is not a down migration: dropping is manual.

-- ---------------------------------------------------------------------------
-- Who is allowed to write
-- ---------------------------------------------------------------------------

create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

comment on table public.admins is
  'Allowlist of accounts that may edit content. Rows are added by hand.';

-- Security definer so the policies below can read the allowlist without every
-- caller needing select rights on it.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a where a.user_id = auth.uid()
  );
$$;

-- Shared updated_at trigger.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Categories: the fixed list of services a post or testimonial belongs to.
-- Seeded in 0002. Gives the admin a dropdown and keeps the glyph mapping the
-- cards already rely on.
-- ---------------------------------------------------------------------------

create table if not exists public.categories (
  slug       text primary key,
  label      text not null,
  icon_path  text not null,
  sort_order int  not null default 0
);

-- ---------------------------------------------------------------------------
-- Posts
-- ---------------------------------------------------------------------------

create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique
                    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title           text not null check (char_length(title) between 1 and 160),
  excerpt         text not null check (char_length(excerpt) between 1 and 220),
  lead            text not null check (char_length(lead) between 1 and 600),
  -- Tiptap document. The public renderer only understands the node types the
  -- editor is configured to produce.
  body            jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  category_slug   text not null references public.categories (slug),
  -- Storage object path inside the `media` bucket, not a URL. Null falls back
  -- to the category glyph, which is how every post looks today.
  cover_path      text,
  cover_alt       text,
  reading_minutes int not null default 1 check (reading_minutes > 0),
  status          text not null default 'draft'
                    check (status in ('draft', 'published')),
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint posts_published_needs_date
    check (status <> 'published' or published_at is not null),
  constraint posts_cover_needs_alt
    check (cover_path is null or cover_alt is not null)
);

create index if not exists posts_public_idx
  on public.posts (status, published_at desc);

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Testimonials
-- ---------------------------------------------------------------------------

create table if not exists public.testimonials (
  id              uuid primary key default gen_random_uuid(),
  quote           text not null check (char_length(quote) between 1 and 600),
  name            text not null,
  location        text not null,
  category_slug   text not null references public.categories (slug),
  photo_path      text,
  photo_alt       text,
  -- The placeholder data file already warned that written permission is
  -- needed before publishing a client's words. This makes that a rule.
  consent_on_file boolean not null default false,
  sort_index      int not null default 0,
  status          text not null default 'draft'
                    check (status in ('draft', 'published')),
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint testimonials_published_needs_date
    check (status <> 'published' or published_at is not null),
  constraint testimonials_published_needs_consent
    check (status <> 'published' or consent_on_file),
  constraint testimonials_photo_needs_alt
    check (photo_path is null or photo_alt is not null)
);

create index if not exists testimonials_public_idx
  on public.testimonials (status, sort_index, created_at);

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Heartbeat: one row, written daily by the cron route so the free project is
-- never idle for a week. A write is unambiguously activity.
-- ---------------------------------------------------------------------------

create table if not exists public.heartbeat (
  id        boolean primary key default true check (id),
  last_ping timestamptz not null default now()
);

insert into public.heartbeat (id) values (true) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.admins       enable row level security;
alter table public.categories   enable row level security;
alter table public.posts        enable row level security;
alter table public.testimonials enable row level security;
alter table public.heartbeat    enable row level security;

-- admins: a signed-in user may see only their own row. Writes are manual.
drop policy if exists "admins read self" on public.admins;
create policy "admins read self"
  on public.admins for select to authenticated
  using (user_id = auth.uid());

-- categories: world readable, admin writable.
drop policy if exists "categories are public" on public.categories;
create policy "categories are public"
  on public.categories for select to anon, authenticated
  using (true);

drop policy if exists "admins write categories" on public.categories;
create policy "admins write categories"
  on public.categories for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- posts: drafts are invisible to the public by database rule, not by a where
-- clause the app might forget.
drop policy if exists "public reads published posts" on public.posts;
create policy "public reads published posts"
  on public.posts for select to anon, authenticated
  using (status = 'published');

drop policy if exists "admins write posts" on public.posts;
create policy "admins write posts"
  on public.posts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- testimonials: same shape.
drop policy if exists "public reads published testimonials" on public.testimonials;
create policy "public reads published testimonials"
  on public.testimonials for select to anon, authenticated
  using (status = 'published');

drop policy if exists "admins write testimonials" on public.testimonials;
create policy "admins write testimonials"
  on public.testimonials for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- heartbeat: no policy at all. Only the service role key, which bypasses RLS,
-- touches this table.

-- ---------------------------------------------------------------------------
-- Storage: one public bucket for post covers and testimonial photos
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880, -- 5 MB, well above what the admin uploads after downscaling
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public reads media" on storage.objects;
create policy "public reads media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "admins upload media" on storage.objects;
create policy "admins upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admins update media" on storage.objects;
create policy "admins update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admins delete media" on storage.objects;
create policy "admins delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());
