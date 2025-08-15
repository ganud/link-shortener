<a><p style="text-align: center;" href="https://tachlink.vercel.app/">View Demo</p></a>
![Site Preview](https://i.imgur.com/EAuzXYu.png)

# About

This is a custom link "shortener" I made to learn more about NextJS's server related features and potential workflow ideas for building sites quicker.

All it does is wrap a link in a cute alias, it's not particularly deep.

## Setup

1. Set DIRECT_DATABASE_URL and DATABASE_URL environment variables. DATABASE_URL uses a postgres connection URI, and DIRECT_DATABASE_URL uses a prisma accelerate API Key for hosting on vercel/cloudflare.
2. Install npm packages

```
npm install
```

3. Initialize database schema

```
npx prisma generate
npx prisma migrate deploy
```

4. Run locally

```
npm run dev
```

## Other ideas + Reflection

I wanted to do a simple username-password login system on a session store so individual users can save their own links, but major auth libraries seem to condemn this method. BetterAuth forces an email to be provided, and I couldn't make sense of the Auth.js docs, nor does it have an up to date alternative resource I can look at.

I'll probably try some form of auth as its own isolated nextjs project and try re-implementing it here once I have more experience.
