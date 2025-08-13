import Image from "next/image";
import LinkForm from "@/components/ui/generateLink";
export default function Home() {
  return (
    <div>
      <h1 className="text-center">Tachylink Shortener</h1>
      <LinkForm></LinkForm>
      <h2>Generated link:</h2>
    </div>
  );
}
