// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginFormSchema } from "./validation-schemas";
import { v4 as uuid } from "uuid";
const adapter = PrismaAdapter(db);
import { encode } from "next-auth/jwt";
export const { auth, handlers, signIn } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        // Fields to provide
        username: {},
        password: {},
      },
      // Authorize checks validity and returns user object if valid
      // For some reason, replacing email with username throws a type error.
      // Only the fields that credentials support (email, password, name, image), will return
      authorize: async (credentials) => {
        const validatedCredentials = await loginFormSchema.parse(credentials);

        const user = await db.user.findFirst({
          where: {
            username: validatedCredentials.username,
            password: validatedCredentials.password,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],

  // Below is needed for credentials if using prisma
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();
        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }
        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 3Z
        });
        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
});
