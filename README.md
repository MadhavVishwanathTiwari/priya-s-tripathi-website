# Shivoham Universal Sol

Marketing site for Shivoham Universal Sol — a Vastu, Astrology, Numerology,
Healing/Reiki and Tarot consultancy.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase for the blog,
the testimonials and the images that go with them.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase details
npm run dev
```

The pages that read content will not render until `.env.local` has a project in
it. See "Content and the CMS" below for setting one up from scratch.

## Structure

```
src/
├── app/          public routes, /admin, /api/heartbeat, root layout, tokens
├── components/   layout · hero · sections · ui · icons · admin
├── data/         services, fees, features, trust, about, site copy (code, not CMS)
├── lib/          content reads, Supabase clients, small helpers
└── proxy.ts      refreshes the admin session (Next 16 renamed middleware)
supabase/
└── migrations/   schema, row level security, storage bucket, seed categories
scripts/
├── extract-assets.py   regenerates public/ artwork from reference/
├── seed-content.ts     fills a fresh project with the original copy
└── seed-data/          that original copy, kept only as seed fixtures
```

Services, fees, trust items, Priya's story and the home page wording stay in
`src/data/` as code: they change once a year and are woven into the layout. Blog
posts and testimonials come from the database.

## Where the copy came from

Her story, the vision and mission, the credentials, the contact details and the
three real testimonials were lifted from the sibling build at
`D:\Portfolio\shivohamuniversalsol`, which had recovered them from the 2021 PHP
site. The story is first person and stays that way. The testimonials are stored
verbatim, slips included, and all three were already published on the 2021 site,
which is where their consent comes from.

`/about` carries the full account; the band on the home page carries a two
paragraph version and links to it.

## Content and the CMS

Blog posts and testimonials are edited at `/admin` by whoever is listed in the
`admins` table. Everything else about the site is a code change.

Setting up a project from scratch:

1. Create a Supabase project, then run `supabase/migrations/0001_init.sql` and
   `0002_seed_categories.sql` in the SQL editor. `0003_heartbeat_cron.sql` is
   optional; see "Keeping the database awake".
2. Copy the project URL and keys from Project Settings into `.env.local`.
3. Invite the editor: Authentication > Users > Add user, then
   `insert into public.admins (user_id, email) values ('<uuid>', '<email>');`
   Nobody can sign in who is not in that table.
4. Optional, for a fresh project: `npx tsx scripts/seed-content.ts` loads the
   articles and testimonials the site shipped with.

How it hangs together:

- **Drafts are hidden by the database, not by the app.** Row level security lets
  the anonymous key read published rows only, so a draft cannot leak through a
  forgotten `where` clause.
- **Bodies are Tiptap documents** stored as JSONB. `src/lib/content/richtext.tsx`
  renders them on the server into the article page's own typography, so visitors
  never download an editor.
- **Images** go straight from the browser into the `media` bucket, downscaled and
  converted to WebP first. Rows hold the object path; the URL is composed at
  render time. Replacing or deleting a record deletes the file it referenced.
- **Publishing needs no deploy.** The reads in `src/lib/content` are `use cache`
  scopes tagged `posts`, `post:<slug>` and `testimonials`; saving in the admin
  calls `updateTag`, and the page rebuilds on the next request.
- **A testimonial cannot be published** without the written-permission box
  ticked. That is a database constraint, not a UI nicety.

## Keeping the database awake

Supabase pauses a free project after about a week of low activity, and only the
dashboard can resume one. Site traffic will not prevent it: the public pages are
served from cache and never touch Supabase.

So `vercel.json` schedules a daily call to `/api/heartbeat`, which writes one row
using `CRON_SECRET` as a bearer token. `0003_heartbeat_cron.sql` schedules the
same write from inside the database with pg_cron, which keeps working if the
site is ever undeployed. The admin dashboard shows when the last check ran.

## Design system

Tokens live in the `@theme` block of `src/app/globals.css`. Colours were sampled
from `reference/desktop-reference.png` and reconciled with the brand gold
(`#CFA06A`) named on the icon reference sheet.

Type: Cormorant Garamond (display), Inter (UI and body), Allura (signature), all
self-hosted via `next/font`.

## Artwork

Brand icons and decorative elements are cropped from the supplied reference
sheets; generic UI and social icons are hand-authored SVG in
`src/components/icons`. To regenerate the cropped assets:

```bash
python scripts/extract-assets.py
```

The script reads `reference/` and writes `public/icons`, `public/trust`,
`public/decorative`, the hero images and the header mark. Crop boxes are listed
at the top of the file; each is auto-trimmed to its alpha bounds.

> The header lotus is currently taken from the icon sheet as the closest match to
> the logo. Replace `public/logo-mark.png` when the original logo file is
> available.

## Responsive behaviour

Mobile is composed deliberately rather than scaled down:

| Width | Layout |
| --- | --- |
| ≥1280 | Full composition — trust bar and quote share one band, services sit beside the fee table |
| 1024–1279 | Two-column hero; quote drops below the trust stats; services and fees stack |
| 768–1023 | Hero copy over a full-bleed photo band; services two across |
| <768 | Hamburger nav; single-column horizontal service cards; trust becomes a stacked list |
| <480 | Reduced gutters; hero features become 2×2 |

## Scope

The homepage, /about, the blog and the CMS behind them. "Consultations" and
"Learn More" still point at placeholder anchors, and the seeded articles are
placeholder writing to be replaced or approved before launch. The testimonials
are real.
