import Image from "next/image";
import LinkForm from "@/components/generateLink";
import FooterSimple from "@/components/ui/footer";
import { auth } from "@/lib/auth";
import { SignOut } from "./sign-out";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col p-1.5 px-4">
      <h1 className="text-center text-4xl font-bold">Tachylink Shortener</h1>
      <SignOut session={session!}></SignOut>
      <Link href={"/links"}>
        <p className="text-center underline hover:text-blue-500">View links.</p>
      </Link>
      <div className="">
        <LinkForm session={session!}></LinkForm>
      </div>
      <div className="flex justify-center items-center p-4 grow">
        <img src="/tachyspin.gif" alt="agnes spinning" />
      </div>
      <FooterSimple></FooterSimple>
    </div>
  );
}
