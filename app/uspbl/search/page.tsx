import type { Metadata } from "next";
import { USPBLSearchContent } from "@/components/uspbl/uspbl-search-content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search USPBL players and teams.",
};

export default function USPBLSearchPage() {
  return <USPBLSearchContent />;
}
