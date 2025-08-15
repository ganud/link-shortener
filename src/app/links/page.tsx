import FooterSimple from "@/components/ui/footer";
import { auth } from "@/lib/auth";
import { Links } from "@/components/linkDisplay";
import { fetchUserLinks } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function FetchLinks() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const links = await fetchUserLinks(session.user.id);
  return (
    <>
      <div className="min-h-screen flex flex-col p-1.5 px-4">
        <div className="grow">
          <Links links={links}></Links>
        </div>
        <FooterSimple></FooterSimple>
      </div>{" "}
    </>
  );
}
