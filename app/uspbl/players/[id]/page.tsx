import type { Metadata } from "next";
import { USPBLPlayerContent } from "@/components/uspbl/uspbl-player-content";
import { getUSPBLPlayer } from "@/lib/uspbl-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const player = await getUSPBLPlayer(id);
    const name = player?.name || `Player ${id}`;
    return {
      title: name,
      description: `${name} — USPBL player details.`,
    };
  } catch {
    return {
      title: `Player ${id}`,
      description: "USPBL player details.",
    };
  }
}

export default async function USPBLPlayerPage({ params }: PageProps) {
  const { id } = await params;
  const player = await getUSPBLPlayer(id);
  return <USPBLPlayerContent player={player} />;
}
