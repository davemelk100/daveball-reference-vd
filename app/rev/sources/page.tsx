import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Revelation Records site.",
};

export default function RevSourcesPage() {
  return <SiteSourcesContent />;
}
