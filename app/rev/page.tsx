import type { Metadata } from "next";
import { RevDashboardContent } from "@/components/rev/rev-dashboard-content";

export const metadata: Metadata = {
  title: "Revelation Records",
  description:
    "Explore Revelation Records: bands, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function RevPage() {
  return <RevDashboardContent />;
}
