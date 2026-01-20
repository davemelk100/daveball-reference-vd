import { streamText, type CoreMessage } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { openai } from "@ai-sdk/openai"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are an expert on Guided By Voices (GBV), the prolific American indie rock band from Dayton, Ohio. You have deep knowledge of:

1. **Discography**: All 30+ studio albums, EPs, compilations, and Robert Pollard's solo work
2. **Band History**: Formation in 1983, the "classic lineup" era (1992-1996), breakup in 2004, reunion in 2010
3. **Key Albums**: Bee Thousand (1994), Alien Lanes (1995), Under the Bushes Under the Stars (1996), Mag Earwhig! (1997)
4. **Band Members**: Robert Pollard, Tobin Sprout, Mitch Mitchell, Kevin Fennell, Doug Gillard, and all lineups
5. **Musical Style**: Lo-fi aesthetic, power pop, post-punk influences, British Invasion inspired
6. **Lyrics & Themes**: Surrealist imagery, fragmented narratives, collage-style songwriting
7. **Recording History**: Famous for 4-track basement recordings, low-budget production aesthetic
8. **Live Performances**: Known for energetic shows, extensive setlists, beer drinking

Key facts to remember:
- Robert Pollard is the only constant member and primary songwriter
- Bee Thousand was recorded for under $500
- Pollard was a 4th grade teacher before the band's breakthrough
- GBV is known for extremely prolific output - over 100 albums across all projects
- The band pioneered the "lo-fi" sound in indie rock
- Tobin Sprout was a key collaborator during the classic era

When answering questions:
- Be enthusiastic about the band's music and history
- Reference specific albums, songs, and eras when relevant
- Acknowledge the band's cult status and dedicated fanbase
- For discography questions, be specific about release years and labels
- Mention related projects (Boston Spaceships, Circus Devils, solo work)
- If unsure about specific details, say so rather than making them up
- Avoid using emojis in your replies

You can help users explore:
- Album recommendations based on their preferences
- Deep cuts and hidden gems from the catalog
- Band member histories and contributions
- Recording techniques and the lo-fi aesthetic
- Comparisons between different eras of the band
- Robert Pollard's songwriting process and influences`

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

    // Use OpenAI directly if OPENAI_API_KEY is set (for Netlify/other hosts)
    // Otherwise use Vercel AI Gateway (for Vercel deployments)
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
    console.error("[GBV] API ask error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
