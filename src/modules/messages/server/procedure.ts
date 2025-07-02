import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import {  createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
    getMany: protectedProcedure.input(z.object({
        chatId: z.string()
    })).query(async ({ctx, input}) => {

        const chat = await prisma.chat.findUnique({
            where: {
                id: input.chatId,
                userId: ctx.auth.user.id
            }
        })

        if(!chat) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Chat does not exist"
            })
        }

        const messages = await prisma.message.findMany({
            where: {
                chatId: chat.id,
            }
        }) 

        return messages

    }),
    create: protectedProcedure.input(z.object({
        chatId: z.string(),
        value: z.string()
    })).mutation(async ({input}) => {

        const existingChat = await prisma.chat.findUnique({
            where: {
                id: input.chatId
            }
        })

        if(!existingChat) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Chat Id not found"
            })
        }


        const message = await prisma.message.create({
            data: {
                chatId: existingChat.id!,
                content: input.value,
                role: "USER",
                type: "RESULT"
            }
        })

        await inngest.send({
            name: "vag/run",
            data: {
                content: message.content,
                chatId: message.chatId
            }
        })


        return message

    })
})