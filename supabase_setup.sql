-- ============================================================
-- Dream Weave — Supabase Database Setup
-- Run these SQL commands in your Supabase project:
-- https://app.supabase.com → Your Project → SQL Editor
-- ============================================================

-- 1. Portfolio items table
create table if not exists portfolio (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  category         text check (category in ('bridal', 'casual', 'traditional')),
  cloudinary_url   text not null,         -- Full Cloudinary URL or public_id
  cloudinary_public_id text,              -- For buildUrl() helper
  description      text,
  tags             text[],
  featured         boolean default false,
  sort_order       int default 0,
  created_at       timestamptz default now()
);

-- 2. Site configuration (dynamic text)
create table if not exists site_config (
  key   text primary key,
  value text not null
);

-- Insert default hero tagline (editable from Supabase dashboard)
insert into site_config (key, value)
values ('hero_tagline', 'Where Every Stitch Tells a Story')
on conflict (key) do nothing;

-- 3. Testimonials
create table if not exists testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  location   text,
  rating     int default 5 check (rating between 1 and 5),
  text       text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- 4. Enable Row Level Security (read-only public access)
alter table portfolio    enable row level security;
alter table site_config  enable row level security;
alter table testimonials enable row level security;

create policy "Public read portfolio"    on portfolio    for select using (true);
create policy "Public read site_config"  on site_config  for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);

-- ============================================================
-- Sample portfolio insert (replace Cloudinary URLs with yours)
-- ============================================================
-- insert into portfolio (title, category, cloudinary_url, sort_order)
-- values
--   ('Bridal Veil Embroidery', 'bridal', 'dreamweave/portfolio/bridal-001', 1),
--   ('Peacock Kurta',          'casual', 'dreamweave/portfolio/casual-001', 2);
