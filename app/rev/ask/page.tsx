import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "ChatREV",
  description: "Ask questions about Revelation Records and its bands.",
};

export default function RevAskPage() {
  return <GbvChatContent />;
}
