import type { Metadata } from "next";
import { NHLPlayersContent } from "@/components/nhl/nhl-players-content";

export const metadata: Metadata = {
  title: "Players",
  description: "Browse NHL players and statistics.",
};

export default function NHLPlayersPage() {
  return <NHLPlayersContent />;
}
