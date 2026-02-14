import type { Metadata } from "next";
import { SgDashboardContent } from "@/components/sg/sg-dashboard-content";

export const metadata: Metadata = {
  title: "Skin Graft Records",
  description:
    "Explore Skin Graft Records: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function SgPage() {
  return <SgDashboardContent />;
}
