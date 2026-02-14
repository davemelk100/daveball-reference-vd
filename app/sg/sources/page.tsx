import type { Metadata } from "next";
import { SiteSourcesContent } from "@/components/music-site/site-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Skin Graft Records site.",
};

export default function SgSourcesPage() {
  return <SiteSourcesContent />;
}
