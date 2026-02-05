import type { Metadata } from "next";
import { NHLSearchContent } from "@/components/nhl/nhl-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search NHL players and teams.",
};

export default function NHLSearchPage() {
  return <NHLSearchContent />;
}
