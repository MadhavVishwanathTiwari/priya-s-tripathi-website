-- Marks a row as filler rather than the client's own words.
--
-- The site shipped with placeholder articles, and the service pages needed
-- three testimonials apiece before they stopped looking half-built. Both sets
-- are invented. A comment in scripts/seed-data/ says so to whoever reads the
-- repository; it says nothing to whoever opens the CMS, which is the person who
-- has to replace them. So the mark lives on the row.
--
-- Before launch:
--   delete from public.testimonials where placeholder;
--   delete from public.posts        where placeholder;
--
-- Nothing public reads this column. It is an editor's note, not site content.

alter table public.posts
  add column if not exists placeholder boolean not null default false;

alter table public.testimonials
  add column if not exists placeholder boolean not null default false;

comment on column public.posts.placeholder is
  'Seeded filler, not the client''s writing. Replace or approve before launch.';

comment on column public.testimonials.placeholder is
  'Invented to fill the service grids. Not a real client. Remove before launch.';
