import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";

export const ChatSidebar = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col px-4 py-4 gap-y-8">
        <Button>
          <PlusCircleIcon /> New Chat
        </Button>
        <div className="flex flex-col gap-y-2">
          <span className="text-sm items-center gap-x-2 flex pointer-events-none">
            <p className="shrink-0">Chat History</p>
            <Separator className="" />
          </span>
          <Button variant={`sidebar`} className="">
            Chat 1
          </Button>
          <Button variant={`sidebar`}>Einstein theories</Button>
          <Button variant={`sidebar`}>About monopoly</Button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="h-14 flex justify-center items-center">
      <div className="flex gap-x-2 items-center">
        <Image src="/logo.svg" width={35} height={35} alt="logo" />
        <span className="text-2xl font-bold tracking-widest">VANGUOX</span>
      </div>
    </div>
  );
};
