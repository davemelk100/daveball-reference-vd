import type { Metadata } from "next";
import { SgAlbumsContent } from "@/components/sg/sg-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Skin Graft Records catalog.",
};

export default function SgAlbumsPage() {
  return <SgAlbumsContent />;
}
