import { messagesRouter } from '@/modules/messages/server/procedure';
import { createTRPCRouter } from '../init';
import { chatRouter } from '@/modules/chat/server/procedure';
export const appRouter = createTRPCRouter({
  chat: chatRouter,
  messages: messagesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;