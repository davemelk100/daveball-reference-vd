import type { Metadata } from "next";
import { PGAPlayersContent } from "@/components/pga/pga-players-content";
import { getPGALeaders, getPGAAllPlayers } from "@/lib/pga-api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Players",
  description: "Browse PGA Tour stat leaders and players.",
};

export default async function PGAPlayersPage() {
  const [leaderCategories, allPlayers] = await Promise.all([
    getPGALeaders().catch(() => []),
    getPGAAllPlayers().catch(() => []),
  ]);
  return <PGAPlayersContent leaderCategories={leaderCategories} allPlayers={allPlayers} />;
}
