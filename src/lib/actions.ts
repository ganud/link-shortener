"use server";
import prisma from "./prisma";
import { generateLink } from "./queries";
import { executeAction } from "./executeAction";

import { registerFormSchema } from "./validation-schemas";
// Server action to create new link from alias.
// This reads the formData.
export async function createLink(values: { url: string; alias: string }) {
  await generateLink(values.alias, values.url);
}

// Server action to create a new user
export const signUp = async (values: {
  username: string;
  password: string;
}) => {
  return executeAction({
    actionFn: async () => {
      const username = values.username;
      const password = values.password;
      await prisma.user.create({
        data: {
          username: username,
          password: password,
        },
      });
    },
  });
};
