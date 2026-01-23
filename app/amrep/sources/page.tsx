import type { Metadata } from "next";
import { GbvSourcesContent } from "@/components/amrep/amrep-sources-content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Data sources for the Amphetamine Reptile Records site.",
};

export default function AmrepSourcesPage() {
  return <GbvSourcesContent />;
}
