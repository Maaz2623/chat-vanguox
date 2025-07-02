import { useEffect, useRef, useState } from "react";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { ChatHeader } from "@/modules/chat/ui/components/chat-header";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

interface Props {
  chatId: string;
}

export const MessagesContainer = ({ chatId }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions(
      {
        chatId: chatId,
      },
      {
        refetchInterval: 1000,
      }
    )
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "USER";

  return (
    <div className="flex flex-col h-screen relative border">
      <ChatHeader chatId={chatId} scrolled={scrolled} />
      {/* Scrollable messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-18 py-4 space-y-4 scrollbar-thin"
      >
        {messages.map((message, i) => (
          <MessageCard
            key={i}
            roleType={message.role}
            content={message.content}
            isLatest={i === messages.length - 1}
          />
        ))}
        {isLastMessageUser && <div>loading..</div>}
        <div ref={bottomRef} />
      </div>

      {/* Sticky gradient + input area */}
      <div className="sticky bottom-0 left-0 w-full bg-background px-6 py-4">
        {/* Optional gradient blur at the top */}
        <div className="absolute -top-4 left-0 w-full h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="w-[90%] mx-auto">
          <MessageForm chatId={chatId} />
        </div>
      </div>
    </div>
  );
};
