import type { Metadata } from "next";
import { GbvSideProjectsContent } from "@/components/amrep/amrep-side-projects-content";

export const metadata: Metadata = {
  title: "Imprints",
  description: "AmRep imprints, collections, and shop highlights.",
};

export default function AmrepSideProjectsPage() {
  return <GbvSideProjectsContent />;
}
