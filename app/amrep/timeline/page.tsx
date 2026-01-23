import type { Metadata } from "next";
import { GbvTimelineContent } from "@/components/amrep/amrep-timeline-content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Key milestones in Amphetamine Reptile Records history.",
};

export default function AmrepTimelinePage() {
  return <GbvTimelineContent />;
}
