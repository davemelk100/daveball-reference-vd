import type { Metadata } from "next";
import { SiteVideosContent } from "@/components/music-site/site-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the Skin Graft catalog.",
};

export default function SgVideosPage() {
  return <SiteVideosContent />;
}
