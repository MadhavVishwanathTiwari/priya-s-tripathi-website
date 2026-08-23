-- Optional second line of defence for the free-tier pause.
--
-- The primary heartbeat is the Vercel Cron job that calls /api/heartbeat once a
-- day (see vercel.json). This one runs inside the database itself, so it keeps
-- working if the site is ever undeployed, paused or moved. Running both is
-- harmless: they write the same single row.
--
-- Enable pg_cron first, in Database > Extensions in the Supabase dashboard, or
-- this file will fail on the first statement.

create extension if not exists pg_cron;

-- Unschedule first so the file can be re-run without stacking duplicate jobs.
select cron.unschedule('shivoham-heartbeat')
where exists (
  select 1 from cron.job where jobname = 'shivoham-heartbeat'
);

select cron.schedule(
  'shivoham-heartbeat',
  '17 5 * * *', -- daily, a little before the Vercel job so the two do not collide
  $$
    insert into public.heartbeat (id, last_ping)
    values (true, now())
    on conflict (id) do update set last_ping = now();
  $$
);
