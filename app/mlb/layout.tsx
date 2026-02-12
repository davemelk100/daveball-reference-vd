import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";


export const metadata: Metadata = {
  title: {
    default: "MLB Numbers",
    template: "%s | MLB Numbers",
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
  openGraph: {
    title: "MLB Numbers",
    description: "Explore MLB player stats, team rosters, and league standings in real-time.",
    url: "/mlb",
    siteName: "Major League Numbers",
    images: [
      {
        url: "/og-mlb.png",
        width: 1200,
        height: 630,
        alt: "Major League Numbers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Major League Numbers",
    description: "Explore MLB player stats, team rosters, and league standings in real-time.",
    images: ["/og-mlb.png"],
  },
};

export default function MLBLayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout>
      {children}
    </SportsSiteLayout>
  );
}
