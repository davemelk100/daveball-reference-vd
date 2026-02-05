import type { Metadata } from "next";
import { NHLStandingsContent } from "@/components/nhl/nhl-standings-content";
import { getStandings } from "@/lib/nhl-api";

export const metadata: Metadata = {
  title: "Standings",
  description: "Current NHL standings by division and conference.",
};

export default async function NHLStandingsPage() {
  const standings = await getStandings();
  return <NHLStandingsContent initialStandings={standings} />;
}
