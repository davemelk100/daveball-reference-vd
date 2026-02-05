import type { Metadata } from "next";
import { USPBLDashboardContent } from "@/components/uspbl/uspbl-dashboard-content";
import { getUSPBLStandings, getUSPBLTeams } from "@/lib/uspbl-api";

export const metadata: Metadata = {
  title: "USPBL Numbers",
  description: "USPBL teams, rosters, and league standings.",
};

export default async function USPBLPage() {
  const [standings, teams] = await Promise.all([
    getUSPBLStandings(),
    Promise.resolve(getUSPBLTeams()),
  ]);

  return <USPBLDashboardContent standings={standings} teams={teams} />;
}
