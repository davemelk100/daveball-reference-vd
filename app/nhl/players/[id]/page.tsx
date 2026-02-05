import type { Metadata } from "next";
import { NHLPlayerContent } from "@/components/nhl/nhl-player-content";
import { getPlayer } from "@/lib/nhl-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const player = await getPlayer(id);
    const name = `${player.firstName.default} ${player.lastName.default}`;
    return {
      title: name,
      description: `${name} stats and details.`,
    };
  } catch {
    return {
      title: `Player ${id}`,
      description: "NHL player stats and details.",
    };
  }
}

export default async function NHLPlayerPage({ params }: PageProps) {
  const { id } = await params;
  const player = await getPlayer(id);
  return <NHLPlayerContent player={player} />;
}
