import type { Metadata } from "next";
import { USPBLDashboardContent } from "@/components/uspbl/uspbl-dashboard-content";
import { getUSPBLStandings, getUSPBLTeams, getUSPBLChampionships, getUSPBLMLBAlumni } from "@/lib/uspbl-api";

export const metadata: Metadata = {
  title: "USPBL Numbers",
  description: "USPBL teams, rosters, and league standings.",
};

export default async function USPBLPage() {
  const [standings, teams, championships, mlbAlumni] = await Promise.all([
    getUSPBLStandings(),
    Promise.resolve(getUSPBLTeams()),
    Promise.resolve(getUSPBLChampionships()),
    Promise.resolve(getUSPBLMLBAlumni()),
  ]);

  return (
    <USPBLDashboardContent
      standings={standings}
      teams={teams}
      championships={championships}
      mlbAlumni={mlbAlumni}
    />
  );
}
