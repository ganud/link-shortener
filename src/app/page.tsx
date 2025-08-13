import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div>
      <form action="" className="">
        <h1 className="text-7xl">Generate Link</h1>
        <Label htmlFor="url">Url</Label>
        <Input id="url" placeholder="url" />
        <Label htmlFor="alias">Alias</Label>
        <Input id="alias" placeholder="alias" />
        <Button type="submit" variant="outline">
          Generate
        </Button>
        <button></button>
      </form>
      <h2>Generated link:</h2>
    </div>
  );
}
