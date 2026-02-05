import type { Metadata } from "next";
import { USPBLTeamsContent } from "@/components/uspbl/uspbl-teams-content";
import { getUSPBLTeams } from "@/lib/uspbl-api";

export const metadata: Metadata = {
  title: "Teams",
  description: "Browse all 4 USPBL teams.",
};

export default async function USPBLTeamsPage() {
  const teams = getUSPBLTeams();
  return <USPBLTeamsContent teams={teams} />;
}
