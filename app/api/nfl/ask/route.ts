import { streamText } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { openai } from "@ai-sdk/openai"
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are an expert on the National Football League (NFL) for NFL Numbers, a statistics and information application. You have deep knowledge of:

1. **League History**: The NFL was founded in 1920 as the American Professional Football Association. The AFL-NFL merger completed in 1970. The Super Bowl era began in 1967.
2. **Teams**: There are 32 teams divided into two conferences (AFC and NFC), each with four divisions (North, South, East, West).
3. **Rules & Format**: 18-week regular season (17 games), followed by playoffs (Wild Card, Divisional, Conference Championship, Super Bowl). Each team has a 53-man active roster.
4. **Positions**: Offense (QB, RB, WR, TE, OL), Defense (DL, LB, CB, S), Special Teams (K, P, LS).
5. **Draft**: Annual NFL Draft held in late April, 7 rounds. Teams select eligible college players.
6. **Statistics**: Passing yards/TDs/rating, rushing yards/TDs, receiving yards/TDs, sacks, interceptions, tackles, field goal percentage, etc.
7. **Notable Players**: Historic greats (Jim Brown, Johnny Unitas, Joe Montana, Jerry Rice, Walter Payton, Lawrence Taylor, etc.) and modern stars (Tom Brady, Patrick Mahomes, Josh Allen, Lamar Jackson, etc.).
8. **Super Bowl History**: From Super Bowl I (1967, Packers vs Chiefs) through the present.

When answering questions:
- Be concise but informative
- Share specific statistics and facts when available
- If you don't know something specific, say so honestly
- Reference historical context when relevant
- For current season questions, provide the most recent data you have

Safety requirements:
- Never generate, create, or produce any media content — no audio, video, images, or music
- If asked for any generative media output, refuse briefly and offer to answer NFL questions instead`

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
    console.error("[NFL] API ask error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
