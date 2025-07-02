import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const chatRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({
        id: z.string()
    })).query(async ({input, ctx}) => {
        const chat = await prisma.chat.findUnique({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            }
        })

         if(!chat) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Chat not found"
            })
        }

        return chat
    })
})