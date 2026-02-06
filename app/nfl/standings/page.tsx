import type { Metadata } from "next";
import { NFLStandingsContent } from "@/components/nfl/nfl-standings-content";
import { getNFLStandings } from "@/lib/nfl-api";

export const metadata: Metadata = {
  title: "Standings",
  description: "Current NFL standings by conference and division.",
};

export default async function NFLStandingsPage() {
  const standings = await getNFLStandings();
  return <NFLStandingsContent standings={standings} />;
}
