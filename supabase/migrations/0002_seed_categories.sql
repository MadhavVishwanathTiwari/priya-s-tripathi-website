-- The six services, mirroring src/data/services.ts. A post or testimonial
-- points at one of these, and borrows its glyph wherever no cover image is set.
--
-- Keep the slugs in step with src/data/services.ts if that list ever changes.

insert into public.categories (slug, label, icon_path, sort_order) values
  ('vastu',      'Vastu Consultation',      '/icons/services/vastu.png',      1),
  ('astrology',  'Astrology Consultation',  '/icons/services/astrology.png',  2),
  ('numerology', 'Numerology Consultation', '/icons/services/numerology.png', 3),
  ('combined',   'Combined Analysis',       '/icons/services/combined.png',   4),
  ('healing',    'Healing & Reiki',         '/icons/services/healing.png',    5),
  ('tarot',      'Tarot Reading',           '/icons/services/tarot.png',      6)
on conflict (slug) do update
  set label      = excluded.label,
      icon_path  = excluded.icon_path,
      sort_order = excluded.sort_order;
