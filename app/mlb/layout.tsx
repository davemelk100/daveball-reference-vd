import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";
import { UpdatesBanner } from "@/components/updates-banner";

export const metadata: Metadata = {
  title: {
    default: "Major League Numbers",
    template: "%s | Major League Numbers",
  },
  description:
    "Explore MLB player stats, team rosters, and league standings in real-time.",
  keywords: [
    "MLB",
    "baseball",
    "statistics",
    "player stats",
    "team rosters",
    "standings",
    "Major League Baseball",
    "baseball reference",
  ],
};

export default function MLBLayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
