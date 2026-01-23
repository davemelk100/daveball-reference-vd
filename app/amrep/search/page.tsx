import type { Metadata } from "next";
import { GbvSearchContent } from "@/components/amrep/amrep-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Amphetamine Reptile Records artists and releases.",
};

export default function AmrepSearchPage() {
  return <GbvSearchContent />;
}
