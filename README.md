<a><p style="text-align: center;" href="https://tachlink.vercel.app/">View Demo</p></a>
![Site Preview](https://i.imgur.com/EAuzXYu.png)

# About

This is a custom link "shortener" I made to learn more about NextJS's server related features and potential workflow ideas for building sites quicker.

All it does is wrap a link in a cute alias, it's not particularly deep.

I also ended up relearning authenthication with auth.js along the way. The setup wasn't that bad actually, with only two related configuration files. Everything else was learning to use server actions, in addition to setting up forms with useHook and zod as validation.

## Setup

1. Install npm packages

```
npm install
```

2. Set `DIRECT_DATABASE_URL` and `DATABASE_URL` environment variables. `DATABASE_URL` uses a postgres connection URI, and `DIRECT_DATABASE_URL` uses a prisma accelerate API Key for hosting on vercel/cloudflare. Then set `AUTH_TRUST_HOST=true` and `AUTH_SECRET` with `npm exec auth secret`

3. Initialize database schema

```
npx prisma generate
npx prisma migrate deploy
```

4. Run locally

```
npm run dev
```
