import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

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

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const prompt = convertToModelMessages(messages)

    const result = streamText({
      model: "openai/gpt-4o-mini",
      system: SYSTEM_PROMPT,
      messages: prompt,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse({
      consumeSseStream: consumeStream,
    })
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
