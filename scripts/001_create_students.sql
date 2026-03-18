create table if not exists public.students (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  stripe_customer_id text,
  stripe_session_id text,
  created_at timestamptz default now()
);
