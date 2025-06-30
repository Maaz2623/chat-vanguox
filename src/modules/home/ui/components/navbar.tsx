import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center h-[12vh] border px-10">
      <div className="flex gap-x-2">
        <Image src={`/logo.svg`} width={45} height={45} alt="logo" />
        <span className="text-3xl font-bold">VAG</span>
      </div>
      <div className="gap-x-2 flex">
        <Button variant={`outline`}>Sign up</Button>
        <Button>Sign in</Button>
      </div>
    </div>
  );
};
