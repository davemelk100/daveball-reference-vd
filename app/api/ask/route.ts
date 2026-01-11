import { streamText, type CoreMessage } from "ai"
import { gateway } from "@ai-sdk/gateway"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are an expert baseball statistician and historian for Major League Numbers, a comprehensive MLB statistics application. You have deep knowledge of:

1. **Historical Statistics**: All-time records, season records, career statistics for players throughout MLB history
2. **Current MLB Data**: Recent seasons, current standings, active player statistics
3. **Baseball Rules & Terminology**: Triple crown, WAR, OPS, ERA, WHIP, and all baseball metrics
4. **Team History**: Franchise history, World Series winners, memorable seasons
5. **Player Comparisons**: Ability to compare players across eras using advanced metrics
6. **Awards**: MVP, Cy Young, Rookie of the Year, Gold Glove, All-Star selections

When answering questions:
- Be concise but informative
- Use specific statistics and numbers when available
- For comparisons, present data in an easy-to-read format
- Acknowledge when data might be from different eras and context matters
- If you're unsure about specific numbers, say so rather than making them up
- For current season questions, note that your knowledge has a cutoff date

You can help users explore:
- Player career statistics and achievements
- Team standings and history
- League leaders and records
- Award winners
- Historical matchups and memorable moments
- Statistical comparisons between players`

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

    // Convert UI messages to CoreMessage format (handle both parts and content formats)
    const coreMessages: CoreMessage[] = messages.map(
      (msg: { role: string; content?: string; parts?: Array<{ type: string; text?: string }> }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content || getTextFromParts(msg.parts || []),
      })
    )

    const result = await streamText({
      model: gateway("openai/gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: coreMessages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[v0] API ask error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
