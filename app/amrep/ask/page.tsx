import type { Metadata } from "next";
import { GbvChatContent } from "@/components/amrep/amrep-chat-content";

export const metadata: Metadata = {
  title: "Chat AmRep",
  description: "Ask questions about Amphetamine Reptile Records and its artists.",
};

export default function AmrepAskPage() {
  return <GbvChatContent />;
}
