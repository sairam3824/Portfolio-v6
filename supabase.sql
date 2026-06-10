-- ============================================================
-- Portfolio Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ─── CONTACT MESSAGES (from MessageDialog on Contact page) ───
create table if not exists portfolio_messages (
    id          bigserial primary key,
    content     text        not null,
    timestamp   timestamptz not null default now(),
    user_agent  text,
    created_at  timestamptz not null default now()
);

-- ─── ADMIN NOTES (private sticky notes in Admin dashboard) ───
create table if not exists portfolio_notes (
    id         bigserial primary key,
    content    text        not null,
    created_at timestamptz not null default now()
);

-- ─── ADMIN DEADLINES (task deadlines in Admin dashboard) ───
create table if not exists portfolio_deadlines (
    id             bigserial primary key,
    description    text        not null,
    deadline_date  date        not null,
    deadline_time  time,
    created_at     timestamptz not null default now()
);

-- ─── NEWSLETTER SUBSCRIBERS (blog subscribe section) ───
create table if not exists newsletter_subscribers (
    id           bigserial primary key,
    email        text        not null unique,
    subscribed_at timestamptz not null default now(),
    is_active    boolean     not null default true
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
alter table portfolio_messages      enable row level security;
alter table portfolio_notes         enable row level security;
alter table portfolio_deadlines     enable row level security;
alter table newsletter_subscribers  enable row level security;

-- ─── portfolio_messages ───
-- Anyone can insert (send a message from contact form)
create policy "Allow public insert on messages"
    on portfolio_messages for insert
    to anon
    with check (true);

-- Only authenticated admin can read / delete messages
create policy "Allow authenticated read on messages"
    on portfolio_messages for select
    to authenticated
    using (true);

create policy "Allow authenticated delete on messages"
    on portfolio_messages for delete
    to authenticated
    using (true);

-- ─── portfolio_notes ───
-- Only authenticated admin can do full CRUD
create policy "Allow authenticated all on notes"
    on portfolio_notes for all
    to authenticated
    using (true)
    with check (true);

-- ─── portfolio_deadlines ───
-- Only authenticated admin can do full CRUD
create policy "Allow authenticated all on deadlines"
    on portfolio_deadlines for all
    to authenticated
    using (true)
    with check (true);

-- ─── newsletter_subscribers ───
-- Anyone can subscribe (insert their email)
create policy "Allow public insert on subscribers"
    on newsletter_subscribers for insert
    to anon
    with check (true);

-- Only authenticated admin can read / manage subscribers
create policy "Allow authenticated all on subscribers"
    on newsletter_subscribers for all
    to authenticated
    using (true)
    with check (true);

-- ============================================================
-- MIGRATIONS & GUARDRAILS (idempotent — safe to re-run)
-- ============================================================

-- Columns the contact form sends (older schemas lack these)
alter table portfolio_messages add column if not exists sender_name  text;
alter table portfolio_messages add column if not exists sender_email text;
alter table portfolio_messages add column if not exists source       text;

-- Cap payload sizes so anonymous inserts can't store megabytes of spam
alter table portfolio_messages drop constraint if exists portfolio_messages_content_length;
alter table portfolio_messages add constraint portfolio_messages_content_length
    check (char_length(content) between 1 and 4000);

alter table portfolio_messages drop constraint if exists portfolio_messages_sender_limits;
alter table portfolio_messages add constraint portfolio_messages_sender_limits
    check (
        coalesce(char_length(sender_name), 0)  <= 120
        and coalesce(char_length(sender_email), 0) <= 254
        and coalesce(char_length(user_agent), 0)   <= 512
    );

-- Reject garbage emails at the database boundary
alter table newsletter_subscribers drop constraint if exists newsletter_subscribers_email_format;
alter table newsletter_subscribers add constraint newsletter_subscribers_email_format
    check (
        char_length(email) <= 254
        and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    );
