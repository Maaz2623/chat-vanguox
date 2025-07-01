"use client";
import { MessagesContainer } from "@/modules/messages/ui/components/messages-container";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const ChatView = () => {
  return (
    <div>
      <ResizablePanelGroup className="min-h-screen" direction="horizontal">
        <ResizablePanel defaultSize={20}>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex flex-col">
          <MessagesContainer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
