import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";
import { UpdatesBanner } from "@/components/updates-banner";

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
  openGraph: {
    title: "NHL Numbers",
    description: "Explore NHL player stats, team rosters, and league standings.",
    url: "/nhl",
    siteName: "Major League Numbers",
    images: [
      {
        url: "/og-nhl.png",
        width: 1200,
        height: 630,
        alt: "NHL Numbers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NHL Numbers",
    description: "Explore NHL player stats, team rosters, and league standings.",
    images: ["/og-nhl.png"],
  },
};

export default function NHLLayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
