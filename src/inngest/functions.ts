import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import { CHAT_TITLE_PROMPT, RESPONDER_PROMPT } from "@/prompts";
import { prisma } from "@/lib/db";


export const aiFunction = inngest.createFunction(
  {
    id: "vag"
  },
  {
    event: "vag/run"
  },
  async ({event, step}) => {

    const responder = createAgent({
      name: "ai-response",
      description: "Responds to the queries provided by the user",
      system: RESPONDER_PROMPT,
       model: gemini({
        model: "gemini-2.0-flash",
        apiKey: process.env.GEMINI_API_KEY!,
       })
    })

    const {output: aiResponse} = await responder.run(event.data.content as string)

    const chatTitleGenerator = createAgent({
      name: "chat-title-generator",
      description: "A chat title generator",
      system: CHAT_TITLE_PROMPT,
       model: gemini({
        model: "gemini-2.0-flash",
        apiKey: process.env.GEMINI_API_KEY!,
       })
    })

    const {output: rawChatTitle} = await chatTitleGenerator.run(event.data.content as string)

    const chatTitle = () => {
      if(rawChatTitle[0].type !== "text") {
        return "Fragment"
      }
      if(Array.isArray(rawChatTitle[0].content)) {
        return rawChatTitle[0].content.map((text) => text).join("")
      } else {
        return rawChatTitle[0].content
      }
    }

        const generateResponse = () => {
      if(aiResponse[0].type !== "text") {
        return "Here you go"
      }
      if(Array.isArray(aiResponse[0].content)) {
        return aiResponse[0].content.map((text) => text).join("")
      } else {
        return aiResponse[0].content
      }
    }


    await step.run("save-results", async () => {
    const response = generateResponse()
    const title = chatTitle()
    const [message] = await prisma.$transaction([
      prisma.message.create({
        data: {
          chatId: event.data.chatId,
          role: "ASSISTANT",
          type: "RESULT",
          content: response
        }
      }),
      prisma.chat.update({
        where: { id: event.data.chatId },
        data: {
          title: title
        }
      })
    ]);

    return message
     
    })

    return {
      title: chatTitle(),
      response: generateResponse()
    }

  }
)