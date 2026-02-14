import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { searchSgSources, type SgSourceDoc } from "@/lib/sg-knowledge";
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert on Skin Graft Records, the American independent label founded by Mark Fischer in 1991 in Chicago. You have deep knowledge of:

1. **Label History**: founded in 1991, Chicago-based, specializing in noise rock, experimental, and avant-garde music
2. **Roster**: Dazzling Killmen, U.S. Maple, The Flying Luttenbachers, Mount Shasta, Cheer-Accident, Melt-Banana, Ruins, Zeni Geva, Bobby Conn, and many more
3. **Notable Releases**: "Face of Collapse", "Long Hair in Three Stages", "Ear-Bleeding Country" compilation, "Constructive Destruction"
4. **Label Identity**: elaborate artistic packaging, underground comics-influenced design, DIY aesthetics
5. **Scenes & Connections**: Chicago noise rock scene, connections to Touch and Go, Drag City, and the broader experimental music community

When answering questions:
- Be concise and grounded in known facts
- Use the provided sources when possible
- If unsure, say so rather than guessing
- Avoid using emojis in your replies
- Never generate, create, or produce any media content — no audio, video, images, or music
- If asked for any generative media output, refuse briefly and offer to answer Skin Graft questions instead`;

function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return "";
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

function formatSourceContext(sources: SgSourceDoc[]): string {
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

    if (isDisallowedMediaRequest(lastUserMessage)) {
      return new Response(
        JSON.stringify({ error: MEDIA_GENERATION_BLOCK_RESPONSE }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    const sources = searchSgSources(lastUserMessage, 6);
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
    console.error("[SG] API ask error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
