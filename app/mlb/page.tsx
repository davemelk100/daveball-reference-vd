import { DashboardContent } from "@/components/dashboard-content";
import { getDefaultSeason } from "@/lib/mlb-api";

export const revalidate = 300;

export default function DashboardPage() {
  const defaultSeason = getDefaultSeason();

  return <DashboardContent initialSeason={defaultSeason} />;
}
