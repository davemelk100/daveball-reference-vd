import type { Metadata } from "next";
import { RevSongsContent } from "@/components/rev/rev-songs-content";

export const metadata: Metadata = {
  title: "Songs",
  description: "Tracks and song data from the Revelation Records catalog.",
};

export default function RevSongsPage() {
  return <RevSongsContent />;
}
