import type { Metadata } from "next";
import { NHLDashboardContent } from "@/components/nhl/nhl-dashboard-content";
import { getSkaterLeaders, getGoalieLeaders, getStandings } from "@/lib/nhl-api";

export const metadata: Metadata = {
  title: "NHL Numbers",
  description: "NHL player stats, team rosters, and league standings.",
};

export default async function NHLPage() {
  const [pointsData, goalsData, assistsData, winsData, standings] =
    await Promise.all([
      getSkaterLeaders("points", 1),
      getSkaterLeaders("goals", 1),
      getSkaterLeaders("assists", 1),
      getGoalieLeaders("wins", 1),
      getStandings(),
    ]);

  const leaders = [
    {
      label: "Points",
      player: pointsData?.points?.[0] || null,
    },
    {
      label: "Goals",
      player: goalsData?.goals?.[0] || null,
    },
    {
      label: "Assists",
      player: assistsData?.assists?.[0] || null,
    },
    {
      label: "Wins",
      player: winsData?.wins?.[0] || null,
    },
  ];

  // Top 2 teams per division for the standings preview
  const divisions = ["Atlantic", "Metropolitan", "Central", "Pacific"];
  const standingsPreview = divisions.flatMap((div) =>
    standings
      .filter((t) => t.divisionName === div)
      .sort((a, b) => b.points - a.points)
      .slice(0, 2)
      .map((t) => ({
        team: t.teamName.default,
        abbrev: t.teamAbbrev.default,
        logo: t.teamLogo,
        w: t.wins,
        l: t.losses,
        otl: t.otLosses,
        pts: t.points,
        division: t.divisionName,
      }))
  );

  return <NHLDashboardContent leaders={leaders} standings={standingsPreview} />;
}
