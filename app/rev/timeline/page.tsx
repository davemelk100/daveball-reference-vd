import type { Metadata } from "next";
import { SiteTimelineContent } from "@/components/music-site/site-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in Revelation Records history.",
};

export default function RevTimelinePage() {
  return <SiteTimelineContent />;
}
