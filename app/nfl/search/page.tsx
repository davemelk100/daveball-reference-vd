import type { Metadata } from "next";
import { NFLSearchContent } from "@/components/nfl/nfl-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search NFL players and teams.",
};

export default function NFLSearchPage() {
  return <NFLSearchContent />;
}
