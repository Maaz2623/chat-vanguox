"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "./user-button";

export const Navbar = () => {
  const { data } = authClient.useSession();

  return (
    <div className="w-full flex justify-between items-center h-[12vh] px-10">
      <div className="flex gap-x-2">
        <Image src={`/logo.svg`} width={35} height={35} alt="logo" />
        <span className="text-2xl font-bold">VAG</span>
      </div>
      {data?.session ? (
        <UserButton />
      ) : (
        <div className="gap-x-2 flex">
          <Button variant={`outline`} size={`sm`} asChild>
            <Link href={`/auth`}>Sign up</Link>
          </Button>
          <Button size={`sm`}>Sign in</Button>
        </div>
      )}
    </div>
  );
};
