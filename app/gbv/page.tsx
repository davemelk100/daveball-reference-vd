import type { Metadata } from "next";
import { GbvDashboardContent } from "@/components/gbv/gbv-dashboard-content";

export const metadata: Metadata = {
  title: "Guided By Data",
  description:
    "Explore Guided By Voices discography, albums, songs, and band history. Daily trivia, member profiles, and complete album catalog.",
};

export const revalidate = 60;

export default function GbvPage() {
  return <GbvDashboardContent />;
}
