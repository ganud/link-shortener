"use server";
import { generateLink } from "../../prisma/queries";

// Server action to create new link from alias
export async function createLink(values: { url: string; alias: string }) {
  await generateLink(values.alias, values.url);
}
