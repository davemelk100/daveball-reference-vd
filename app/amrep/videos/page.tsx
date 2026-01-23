import type { Metadata } from "next";
import { GbvVideosContent } from "@/components/amrep/amrep-videos-content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video highlights from the AmRep catalog.",
};

export default function AmrepVideosPage() {
  return <GbvVideosContent />;
}
