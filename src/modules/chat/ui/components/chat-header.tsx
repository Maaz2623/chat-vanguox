"use client";

import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserButton } from "@/modules/home/ui/components/user-button";
import { cn } from "@/lib/utils";

interface Props {
  scrolled: boolean;
}

export const ChatHeader = ({ scrolled }: Props) => {
  return (
    <div
      className={cn(
        "flex py-2 justify-between items-center px-8 border-gray-300 transition-all duration-200 sticky top-0 bg-background z-50",
        scrolled && "border-b"
      )}
    >
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex px-2 py-1 text-lg rounded-full font-semibold justify-center items-center focus:outline-none">
            VAG 1.0 <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>AI Models</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GPT 4o</DropdownMenuItem>
            <DropdownMenuItem>Gemini 1.5</DropdownMenuItem>
            <DropdownMenuItem>Gemini 2.5 Pro</DropdownMenuItem>
            <DropdownMenuItem>Meta LLaMA 2.0</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-center items-center">
        <UserButton showName={false} />
      </div>
    </div>
  );
};
