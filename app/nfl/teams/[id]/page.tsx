import type { Metadata } from "next";
import { NFLTeamContent } from "@/components/nfl/nfl-team-content";
import { getNFLTeam, getNFLTeamRoster, getNFLStandings } from "@/lib/nfl-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const team = await getNFLTeam(id);
    const name = team?.displayName || `Team ${id}`;
    return {
      title: name,
      description: `${name} roster and statistics.`,
    };
  } catch {
    return {
      title: `Team ${id}`,
      description: "NFL team roster and statistics.",
    };
  }
}

export default async function NFLTeamPage({ params }: PageProps) {
  const { id } = await params;
  const [team, roster, standings] = await Promise.all([
    getNFLTeam(id),
    getNFLTeamRoster(id),
    getNFLStandings(),
  ]);

  // Find this team's standing
  let teamStanding = null;
  for (const div of standings) {
    const found = div.entries.find((e) => String(e.team.id) === String(id));
    if (found) {
      teamStanding = found;
      break;
    }
  }

  return <NFLTeamContent team={team} roster={roster} standing={teamStanding} />;
}
