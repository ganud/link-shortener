import Image from "next/image";
import LinkForm from "@/components/ui/generateLink";
import FooterSimple from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-1.5 px-4">
      <h1 className="text-center text-4xl font-bold">Tachylink Shortener</h1>
      <div className="">
        <LinkForm></LinkForm>
      </div>
      <div className="flex justify-center items-center p-4 grow">
        <img src="/tachyspin.gif" alt="agnes spinning" />
      </div>
      <FooterSimple></FooterSimple>
    </div>
  );
}
