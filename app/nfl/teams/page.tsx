import type { Metadata } from "next";
import { NFLTeamsContent } from "@/components/nfl/nfl-teams-content";
import { getNFLStandings } from "@/lib/nfl-api";

export const metadata: Metadata = {
  title: "Teams",
  description: "Browse all 32 NFL teams by conference and division.",
};

export default async function NFLTeamsPage() {
  const standings = await getNFLStandings();
  return <NFLTeamsContent standings={standings} />;
}
