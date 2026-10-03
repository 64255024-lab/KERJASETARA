-- KerjaSetara schema — mirrors data/seed.json + lib/types.ts
-- Disabilities column is private: owner-only SELECT (see RLS below).

create table companies (
  id text primary key,
  name text not null,
  city text not null,
  logo text not null default '',
  about text not null default ''
);

create table jobs (
  id text primary key,
  title text not null,
  company_id text not null references companies(id),
  category text not null,
  location text not null,
  remote boolean not null default false,
  deadline date,
  description text not null default '',
  criteria text[] not null default '{}',
  accommodations text[] not null default '{}',
  skills text[] not null default '{}',
  experience_min int not null default 0,
  cover text not null default ''
);

create table profiles (
  id uuid primary key references auth.users(id),
  role text not null check (role in ('talent','company')),
  name text not null,
  email text not null,
  city text not null default '',
  skills text[] not null default '{}',
  experience_years int not null default 0,
  disabilities text[] not null default '{}',
  needs text[] not null default '{}',
  category text not null default ''
);

alter table profiles enable row level security;

create policy owner_read on profiles
  for select using (auth.uid() = id);

create policy owner_write on profiles
  for insert with check (auth.uid() = id);

create policy owner_update on profiles
  for update using (auth.uid() = id);
