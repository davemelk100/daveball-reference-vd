import type { Metadata } from "next";
import { NHLTeamContent } from "@/components/nhl/nhl-team-content";
import { getTeamRoster, getStandings } from "@/lib/nhl-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const standings = await getStandings();
  const team = standings.find((t) => t.teamAbbrev.default === id);
  const name = team?.teamName.default || `Team ${id}`;
  return {
    title: name,
    description: `${name} roster and statistics.`,
  };
}

export default async function NHLTeamPage({ params }: PageProps) {
  const { id } = await params;
  const [roster, standings] = await Promise.all([
    getTeamRoster(id),
    getStandings(),
  ]);
  const team = standings.find((t) => t.teamAbbrev.default === id) || null;
  return <NHLTeamContent teamAbbrev={id} roster={roster} team={team} />;
}
