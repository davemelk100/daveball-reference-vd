import type { Metadata } from "next";
import { NHLTeamsContent } from "@/components/nhl/nhl-teams-content";
import { getStandings } from "@/lib/nhl-api";

export const metadata: Metadata = {
  title: "Teams",
  description: "Browse all 32 NHL teams by division and conference.",
};

export default async function NHLTeamsPage() {
  const standings = await getStandings();
  return <NHLTeamsContent standings={standings} />;
}
