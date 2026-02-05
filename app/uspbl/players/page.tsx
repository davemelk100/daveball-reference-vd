import type { Metadata } from "next";
import { USPBLPlayersContent } from "@/components/uspbl/uspbl-players-content";
import { getUSPBLPlayers } from "@/lib/uspbl-api";

export const metadata: Metadata = {
  title: "Players",
  description: "Browse USPBL players across all four teams.",
};

export default async function USPBLPlayersPage() {
  const players = await getUSPBLPlayers();
  return <USPBLPlayersContent players={players} />;
}
