import type { Metadata } from "next";
import { SgSongsContent } from "@/components/sg/sg-songs-content";

export const metadata: Metadata = {
  title: "Songs",
  description: "Tracks and song data from the Skin Graft catalog.",
};

export default function SgSongsPage() {
  return <SgSongsContent />;
}
