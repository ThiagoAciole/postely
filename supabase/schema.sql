create extension if not exists pgcrypto;

create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  caption text not null,
  client_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.posters (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  title text not null,
  drive_file_id text not null,
  image_url text not null,
  download_url text not null,
  file_name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.galleries enable row level security;
alter table public.posters enable row level security;

drop policy if exists "Public read galleries" on public.galleries;
create policy "Public read galleries" on public.galleries
for select using (true);

drop policy if exists "Authenticated write galleries" on public.galleries;
create policy "Authenticated write galleries" on public.galleries
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read posters" on public.posters;
create policy "Public read posters" on public.posters
for select using (true);

drop policy if exists "Authenticated write posters" on public.posters;
create policy "Authenticated write posters" on public.posters
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
