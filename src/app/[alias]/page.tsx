import { findLink } from "../../lib/queries";
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
    return (
      <div className="flex flex-col items-center p-4 gap-1">
        <h1 className="text-6xl font-bold text-center">404</h1>
        <p className="text-center">Shortened Link not found</p>
        <img src="/404.gif" alt="" />
      </div>
    );
  } else {
    redirect(url);
  }
}
