import type { Metadata } from "next";
import { GbvDashboardContent } from "@/components/amrep/amrep-dashboard-content";

export const metadata: Metadata = {
  title: "Amphetamine Reptile Records",
  description:
    "Explore Amphetamine Reptile Records: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function AmrepPage() {
  return <GbvDashboardContent />;
}
