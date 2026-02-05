import { VisualizationsContent } from "@/components/visualizations-content";
import { getDefaultSeason } from "@/lib/mlb-api";

export const metadata = {
  title: "Data Visualizations | Major League Numbers",
  description: "Interactive baseball statistics visualizations and charts",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default function VisualizationsPage() {
  const defaultSeason = getDefaultSeason();

  return <VisualizationsContent initialSeason={defaultSeason} />;
}
