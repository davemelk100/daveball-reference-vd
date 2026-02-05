import type { Metadata } from "next";
import { USPBLStandingsContent } from "@/components/uspbl/uspbl-standings-content";
import { getUSPBLStandings } from "@/lib/uspbl-api";

export const metadata: Metadata = {
  title: "Standings",
  description: "Current USPBL league standings.",
};

export default async function USPBLStandingsPage() {
  const standings = await getUSPBLStandings();
  return <USPBLStandingsContent standings={standings} />;
}
