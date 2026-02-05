import type { Metadata } from "next";
import { USPBLTeamContent } from "@/components/uspbl/uspbl-team-content";
import { getUSPBLTeam, getUSPBLTeamRoster, getUSPBLStandings, getTeamChampionshipCount, getTeamMLBAlumni, USPBL_CHAMPIONSHIPS } from "@/lib/uspbl-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const team = getUSPBLTeam(id);
  const name = team?.name || `Team ${id}`;
  return {
    title: name,
    description: `${name} roster and information.`,
  };
}

export default async function USPBLTeamPage({ params }: PageProps) {
  const { id } = await params;
  const [team, roster, standings] = await Promise.all([
    Promise.resolve(getUSPBLTeam(id)),
    getUSPBLTeamRoster(id),
    getUSPBLStandings(),
  ]);
  const teamStanding = standings.find((s) => s.teamSlug === id) || null;
  const championshipCount = getTeamChampionshipCount(id);
  const championshipYears = USPBL_CHAMPIONSHIPS.filter((c) => c.championSlug === id).map((c) => c.year);
  const mlbAlumni = getTeamMLBAlumni(id);

  return (
    <USPBLTeamContent
      team={team || null}
      roster={roster}
      standing={teamStanding}
      championshipCount={championshipCount}
      championshipYears={championshipYears}
      mlbAlumni={mlbAlumni}
    />
  );
}
