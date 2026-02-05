import type { Metadata } from "next";
import { RevAlbumsContent } from "@/components/rev/rev-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Revelation Records catalog.",
};

export default function RevAlbumsPage() {
  return <RevAlbumsContent />;
}
