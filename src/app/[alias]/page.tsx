import { findLink } from "../../../prisma/queries";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  const url = await findLink(alias);
  if (!url) {
    return <h1>Shortened Link not found</h1>;
  } else {
    redirect(url);
  }
}
