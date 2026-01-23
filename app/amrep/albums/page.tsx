import type { Metadata } from "next";
import { GbvAlbumsContent } from "@/components/amrep/amrep-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Amphetamine Reptile Records catalog.",
};

export default function AmrepAlbumsPage() {
  return <GbvAlbumsContent />;
}
