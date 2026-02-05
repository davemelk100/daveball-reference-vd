import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";

export const metadata: Metadata = {
  title: {
    default: "NHL Numbers",
    template: "%s | NHL Numbers",
  },
  description:
    "Explore NHL player stats, team rosters, and league standings.",
  keywords: [
    "NHL",
    "hockey",
    "statistics",
    "player stats",
    "team rosters",
    "standings",
    "National Hockey League",
    "hockey reference",
  ],
};

export default function NHLLayout({ children }: { children: React.ReactNode }) {
  return <SportsSiteLayout>{children}</SportsSiteLayout>;
}
