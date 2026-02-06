import type { Metadata } from "next";
import { NFLPlayersContent } from "@/components/nfl/nfl-players-content";
import { getNFLLeaders } from "@/lib/nfl-api";

export const metadata: Metadata = {
  title: "Players",
  description: "Browse NFL stat leaders and players.",
};

export default async function NFLPlayersPage() {
  const leaderCategories = await getNFLLeaders();
  return <NFLPlayersContent leaderCategories={leaderCategories} />;
}
