import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

export async function generateLink(alias: string, url: string) {
  return await prisma.link.create({
    data: {
      alias: alias,
      url: url,
    },
  });
}

// Find link using alias.
export async function findLink(alias: string) {
  const link = await prisma.link.findUnique({
    where: {
      alias: alias,
    },
  });
  return link?.url;
}
