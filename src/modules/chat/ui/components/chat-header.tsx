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
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface Props {
  scrolled: boolean;
  chatId: string;
}

export const ChatHeader = ({ scrolled, chatId }: Props) => {
  const [model, setModel] = useState("");

  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.chat.getOne.queryOptions({
      id: chatId,
    })
  );

  return (
    <div
      className={cn(
        "flex justify-between items-center px-4 h-14 border-gray-300 transition-all duration-200 sticky top-0 bg-background z-50",
        scrolled && "border-b"
      )}
    >
      <div className="w-[200px]">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex px-2 py-1 text-lg rounded-full font-semibold justify-center items-center focus:outline-none">
            {model} <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>AI Models</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setModel("Gpt-4o")}>
              GPT 4o
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setModel("Gemini 1.5 Pro")}>
              Gemini 1.5
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setModel("Gemini 2.5 Pro")}>
              Gemini 2.5 Pro
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setModel("Meta lLama 2.0")}>
              Meta lLaMA 2.0
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-[200px]">
        {!data ? (
          <Skeleton className="h-8 w-40 bg-gray-300 rounded-xs!" />
        ) : (
          <span>{data.title}</span>
        )}
      </div>
      <div className="flex justify-center items-center w-[50px]">
        <UserButton showName={false} />
      </div>
    </div>
  );
};
