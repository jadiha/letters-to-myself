# Letters to Myself

A quiet little web app for writing daily gratitude letters to yourself.

Each day, you write one letter. It gets sealed, saved, and added to your collection. You can open any letter to read it again.

**Live site** → [letters-to-myself.vercel.app](https://letters-to-myself.vercel.app)

---

## What it does

- Write one letter per day (today's letter can be edited)
- Letters are saved to your account and persist across devices
- Sign in with a magic link — no password needed
- Each user's letters are private to them

## Stack

- Plain HTML, CSS, and JavaScript — no build step
- [Supabase](https://supabase.com) for auth and database
- Deployed on [Vercel](https://vercel.com)

## Running locally

Just open `letters-phase1.html` in a browser. No server needed.

Note: magic link sign-in redirects to the live Vercel URL, so auth won't complete locally. To test auth locally, update the `emailRedirectTo` in the script to `http://localhost` or use the Supabase dashboard to generate a magic link manually.

## Database setup

Run this in the Supabase SQL editor:

```sql
create table letters (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users not null,
  date       text not null,
  text       text not null,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table letters enable row level security;

create policy "users own their letters"
  on letters for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```
