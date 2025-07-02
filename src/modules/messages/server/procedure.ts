import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import {  createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
    create: protectedProcedure.input(z.object({
        value: z.string()
    })).mutation(async ({ctx, input}) => {

        console.log("Fired")

        const chat = await prisma.chat.create({
            data: {
                title: "Untitled",
                userId: ctx.auth.user.id
            }
        })


        const message = await prisma.message.create({
            data: {
                chatId: chat.id,
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