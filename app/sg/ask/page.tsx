import type { Metadata } from "next";
import { SgChatContent } from "@/components/sg/sg-chat-content";

export const metadata: Metadata = {
  title: "Chat SG",
  description: "Ask questions about Skin Graft Records and its artists.",
};

export default function SgAskPage() {
  return <SgChatContent />;
}
