"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";

export const MessageForm = () => {
  return (
    <div className="border flex flex-col rounded-md px-3 pb-3 bg-sidebar">
      <TextAreaAutosize
        minRows={3}
        maxRows={5}
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
        <Button size={`sm`}>
          <ArrowUpIcon className="size-3" />
        </Button>
      </div>
    </div>
  );
};
