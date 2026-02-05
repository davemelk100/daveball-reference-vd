import type { Metadata } from "next";
import { NHLPlayersContent } from "@/components/nhl/nhl-players-content";
import { getSkaterLeaders, getGoalieLeaders } from "@/lib/nhl-api";

export const metadata: Metadata = {
  title: "Players",
  description: "Browse NHL players and statistics.",
};

export default async function NHLPlayersPage() {
  const [pointsData, goalsData, assistsData, winsData] = await Promise.all([
    getSkaterLeaders("points", 20),
    getSkaterLeaders("goals", 20),
    getSkaterLeaders("assists", 20),
    getGoalieLeaders("wins", 10),
  ]);

  return (
    <NHLPlayersContent
      pointsLeaders={pointsData?.points || []}
      goalsLeaders={goalsData?.goals || []}
      assistsLeaders={assistsData?.assists || []}
      winsLeaders={winsData?.wins || []}
    />
  );
}
