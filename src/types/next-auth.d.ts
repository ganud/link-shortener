// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

// Extend the session type definition to include username
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}
