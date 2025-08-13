"use server";
import { revalidatePath } from "next/cache";
import { generateLink } from "../../prisma/queries";

// Server action to create new link from alias
export async function createLink(formData: FormData) {
  console.log("hi");
  const alias = formData.get("alias");
  const url = formData.get("url");
  await generateLink(alias as string, url as string);
  revalidatePath("/");
}
