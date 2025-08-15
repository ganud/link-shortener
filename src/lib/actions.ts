"use server";
import { generateLink } from "./queries";

// Server action to create new link from alias.
// This reads the formData.
export async function createLink(values: { url: string; alias: string }) {
  await generateLink(values.alias, values.url);
}
