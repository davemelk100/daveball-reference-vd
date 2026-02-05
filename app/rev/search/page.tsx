import type { Metadata } from "next";
import { SiteSearchContent } from "@/components/music-site/site-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Revelation Records bands and releases.",
};

export default function RevSearchPage() {
  return <SiteSearchContent />;
}
