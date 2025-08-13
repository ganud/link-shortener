import { findLink } from "../../../prisma/queries";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  // Read the url param and return the link
  const { alias } = await params;
  const url = await findLink(alias);

  // Do the redirect!
  if (!url) {
    return <h1>Shortened Link not found</h1>;
  } else {
    redirect(url);
  }
}
