import { DashboardContent } from "@/components/dashboard-content";
import { getDefaultSeason } from "@/lib/mlb-api";

export const revalidate = 60; // Revalidate every 60 seconds

export default function DashboardPage() {
  const defaultSeason = getDefaultSeason();

  return <DashboardContent initialSeason={defaultSeason} />;
}
