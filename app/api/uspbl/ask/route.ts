import { streamText } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { openai } from "@ai-sdk/openai"
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are an expert on the United Shore Professional Baseball League (USPBL) for USPBL Numbers, a statistics and information application. You have deep knowledge of:

1. **League History**: The USPBL was founded in 2016 by Andy Appleby. It plays all games at UWM Field (formerly Jimmy John's Field) in Utica, Michigan. The stadium holds approximately 4,500 fans.
2. **Teams**: There are 4 teams — Birmingham Bloomfield Beavers, Eastside Diamond Hoppers, Utica Unicorns, and Westside Woolly Mammoths. All teams share the same stadium.
3. **League Purpose**: The USPBL is an independent professional baseball league that serves as a showcase for players seeking to get signed by MLB organizations. Over 100 players have been signed by MLB organizations since the league's founding.
4. **Season Structure**: The season typically runs from May through September.
5. **Notable Alumni**: Randy Dobnak (signed by Minnesota Twins, made MLB debut 2019), Cooper Johnson (Detroit Tigers organization), and many others.
6. **Championships**: The Eastside Diamond Hoppers won the inaugural 2016 championship.

When answering questions:
- Be concise but informative
- Share specific facts about the USPBL when available
- If you don't know something specific about the USPBL, say so honestly
- Help users understand what makes the USPBL unique (single venue, showcase league, pathway to MLB)
- For current season questions, note that the league is seasonal (May-September)

Safety requirements:
- Never generate, create, or produce any media content — no audio, video, images, or music
- If asked for any generative media output, refuse briefly and offer to answer USPBL questions instead`

// Helper to extract text from UI message parts
function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return ""
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("")
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const coreMessages: Array<{ role: "user" | "assistant"; content: string }> = messages.map(
      (msg: { role: string; content?: string; parts?: Array<{ type: string; text?: string }> }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content || getTextFromParts(msg.parts || []),
      })
    )

    const lastUserMessage = [...coreMessages]
      .reverse()
      .find((message) => message.role === "user")?.content ?? ""

    if (isDisallowedMediaRequest(lastUserMessage)) {
      return new Response(
        JSON.stringify({ error: MEDIA_GENERATION_BLOCK_RESPONSE }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      )
    }

    const model = process.env.OPENAI_API_KEY
      ? openai("gpt-4o-mini")
      : gateway("openai/gpt-4o-mini")

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: coreMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[USPBL] API ask error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
