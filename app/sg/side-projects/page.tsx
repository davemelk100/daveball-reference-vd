import type { Metadata } from "next";
import { SiteSideProjectsContent } from "@/components/music-site/site-side-projects-content";

export const metadata: Metadata = {
  title: "Imprints",
  description: "Skin Graft imprints and related labels.",
};

export default function SgSideProjectsPage() {
  return <SiteSideProjectsContent />;
}
