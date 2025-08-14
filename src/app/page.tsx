import Image from "next/image";
import LinkForm from "@/components/ui/generateLink";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Tachylink Shortener</h1>
      <LinkForm></LinkForm>
    </div>
  );
}
