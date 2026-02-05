import type { Metadata } from "next";
import { NHLAskContent } from "@/components/nhl/nhl-ask-content";

export const metadata: Metadata = {
  title: "ChatNHL",
  description: "Ask questions about NHL hockey.",
};

export default function NHLAskPage() {
  return <NHLAskContent />;
}
