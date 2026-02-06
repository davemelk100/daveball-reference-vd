import type { Metadata } from "next";
import { NFLDashboardContent } from "@/components/nfl/nfl-dashboard-content";
import { getNFLLeaders, getNFLStandings } from "@/lib/nfl-api";

export const metadata: Metadata = {
  title: "NFL Numbers",
  description: "NFL player stats, team rosters, and league standings.",
};

export default async function NFLPage() {
  const [leaderCategories, standings] = await Promise.all([
    getNFLLeaders(),
    getNFLStandings(),
  ]);

  // Take top 4 leader categories for the dashboard
  const leaders = leaderCategories.slice(0, 4).map((cat) => ({
    label: cat.displayName,
    leader: cat.leaders[0] || null,
  }));

  // Top 2 teams per division for standings preview
  const standingsPreview = standings.flatMap((div) =>
    div.entries.slice(0, 2).map((entry) => ({
      team: entry.team.displayName,
      abbrev: entry.team.abbreviation,
      logo: entry.team.logoUrl,
      w: entry.wins,
      l: entry.losses,
      t: entry.ties,
      division: div.division,
      conference: div.conference,
    }))
  );

  return (
    <NFLDashboardContent
      leaders={leaders}
      standings={standingsPreview}
    />
  );
}
