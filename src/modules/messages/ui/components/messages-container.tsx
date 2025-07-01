import { useEffect, useRef, useState } from "react";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { ChatHeader } from "@/modules/chat/ui/components/chat-header";

export const MessagesContainer = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 0);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col h-screen relative border">
      <ChatHeader scrolled={scrolled} />
      {/* Scrollable messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-4 space-y-4 scrollbar-thin"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <MessageCard key={i} roleType="USER" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <MessageCard key={i} roleType="ASSISTANT" />
        ))}
      </div>

      {/* Sticky gradient + input area */}
      <div className="sticky bottom-0 left-0 w-full bg-background px-6 py-4">
        {/* Optional gradient blur at the top */}
        <div className="absolute -top-4 left-0 w-full h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <MessageForm />
      </div>
    </div>
  );
};
