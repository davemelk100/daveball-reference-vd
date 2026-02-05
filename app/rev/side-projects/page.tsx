import type { Metadata } from "next";
import { SiteSideProjectsContent } from "@/components/music-site/site-side-projects-content";

export const metadata: Metadata = {
  title: "Sub-Labels",
  description: "Revelation Records sub-labels and related imprints.",
};

export default function RevSideProjectsPage() {
  return <SiteSideProjectsContent />;
}
