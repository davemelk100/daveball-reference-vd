import type { Metadata } from "next";
import { SiteAwardsContent } from "@/components/music-site/site-awards-content";

export const metadata: Metadata = {
  title: "Milestones",
  description: "Milestones and recognition for Revelation Records.",
};

export default function RevAwardsPage() {
  return <SiteAwardsContent />;
}
