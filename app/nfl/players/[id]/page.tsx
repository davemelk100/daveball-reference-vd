import type { Metadata } from "next";
import { NFLPlayerContent } from "@/components/nfl/nfl-player-content";
import { getNFLPlayer } from "@/lib/nfl-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getNFLPlayer(id);
    const name = data.athlete?.displayName || `Player ${id}`;
    return {
      title: name,
      description: `${name} stats and details.`,
    };
  } catch {
    return {
      title: `Player ${id}`,
      description: "NFL player stats and details.",
    };
  }
}

export default async function NFLPlayerPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getNFLPlayer(id);
  return <NFLPlayerContent playerData={data} playerId={id} />;
}
