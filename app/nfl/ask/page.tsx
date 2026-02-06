import type { Metadata } from "next";
import { NFLAskContent } from "@/components/nfl/nfl-ask-content";

export const metadata: Metadata = {
  title: "ChatNFL",
  description: "Ask questions about NFL football.",
};

export default function NFLAskPage() {
  return <NFLAskContent />;
}
