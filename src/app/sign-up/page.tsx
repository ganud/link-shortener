import FooterSimple from "@/components/ui/footer";
import RegisterPreview from "@/components/signupForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <>
      <div className="min-h-screen flex flex-col p-1.5 px-4">
        <div className="grow flex items-center">
          <RegisterPreview></RegisterPreview>
        </div>
        <FooterSimple></FooterSimple>
      </div>{" "}
    </>
  );
}
