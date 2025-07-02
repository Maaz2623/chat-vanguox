import { ChatView } from "@/modules/chat/ui/views/chat-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatIdPage = async ({ params }: Props) => {
  const { chatId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      chatId: chatId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>loading chats</div>}>
        <ChatView chatId={chatId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default ChatIdPage;
