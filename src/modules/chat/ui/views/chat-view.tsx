"use client";
import { MessagesContainer } from "@/modules/messages/ui/components/messages-container";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChatSidebar } from "../components/chat-sidebar";

interface Props {
  chatId: string;
}

export const ChatView = ({ chatId }: Props) => {
  return (
    <div>
      <ResizablePanelGroup className="min-h-screen" direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <ChatSidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80} className="flex flex-col">
          <MessagesContainer chatId={chatId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
