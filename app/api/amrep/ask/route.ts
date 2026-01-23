import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { searchAmrepSources, type AmrepSourceDoc } from "@/lib/amrep-knowledge";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert on Amphetamine Reptile Records (AmRep), the American independent label founded by Tom Hazelmyer. You have deep knowledge of:

1. **Label History**: founded in 1986, origins in Washington state, later based in Minneapolis
2. **Roster**: noise rock and underground artists across the AmRep catalog
3. **Notable Releases**: Helmet’s debut "Strap It On" and key catalog highlights
4. **Label Identity**: linocut artwork, limited edition vinyl, collector culture
5. **Scenes & Tours**: AmRep’s role in 1990s noise rock and the CMJ/AmRep tour

When answering questions:
- Be concise and grounded in known facts
- Use the provided sources when possible
- If unsure, say so rather than guessing
- Avoid using emojis in your replies`;

function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return "";
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

function formatSourceContext(sources: AmrepSourceDoc[]): string {
  if (sources.length === 0) return "No sources available.";

  return sources
    .map((source) => {
      const label = source.sourceLabel || "Source";
      const url = source.sourceUrl ? ` (${source.sourceUrl})` : "";
      return `- ${label}${url}\n${source.text}`;
    })
    .join("\n\n");
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const coreMessages: Array<{ role: "user" | "assistant"; content: string }> =
      messages.map(
        (msg: {
          role: string;
          content?: string;
          parts?: Array<{ type: string; text?: string }>;
        }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content || getTextFromParts(msg.parts || []),
        })
      );

    const lastUserMessage = [...coreMessages]
      .reverse()
      .find((message) => message.role === "user")?.content ?? "";

    const sources = searchAmrepSources(lastUserMessage, 6);
    const sourceContext = formatSourceContext(sources);

    const model = process.env.OPENAI_API_KEY
      ? openai("gpt-4o-mini")
      : gateway("openai/gpt-4o-mini");

    const result = streamText({
      model,
      system: `${SYSTEM_PROMPT}\n\nSource context:\n${sourceContext}`,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[AMREP] API ask error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
