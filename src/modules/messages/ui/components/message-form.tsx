"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";

export const MessageForm = () => {
  const router = useRouter();

  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const [value, setValue] = useState("");

  const createMessageMutation = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: (data) => {
        router.push(`/chats/${data.chatId}`);
        queryClient.invalidateQueries(
          trpc.chat.getOne.queryOptions({
            id: data.chatId,
          })
        );
      },
      onError: (error) => {
        console.error(error.message);
      },
    })
  );

  const handleSubmit = () => {
    createMessageMutation.mutate({
      value: value,
    });
  };
  return (
    <div className="border flex flex-col rounded-md px-3 pb-3 bg-sidebar">
      <TextAreaAutosize
        onChange={(e) => setValue(e.target.value)}
        minRows={2}
        maxRows={3}
        className="pt-4 resize-none border-none w-full outline-none bg-transparent"
        placeholder="What would you like to build?"
      />
      <div className="flex justify-between items-center text-base">
        <div className="flex text-muted-foreground text-xs gap-x-2">
          <kbd className="text-xs py-0.5 bg-white/60 rounded-xs px-1">
            ctrl+Enter
          </kbd>
          <p className="pt-0.5">to submit</p>
        </div>
        <Button size={`sm`} onClick={handleSubmit}>
          <ArrowUpIcon className="size-3" />
        </Button>
      </div>
    </div>
  );
};
