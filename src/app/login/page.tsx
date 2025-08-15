import FooterSimple from "@/components/ui/footer";
import LoginPreview from "@/components/loginForm";
export default function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col p-1.5 px-4">
        <div className="grow flex items-center">
          <LoginPreview></LoginPreview>
        </div>
        <FooterSimple></FooterSimple>
      </div>{" "}
    </>
  );
}
