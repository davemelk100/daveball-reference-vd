import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";
import { UpdatesBanner } from "@/components/updates-banner";

export const metadata: Metadata = {
  title: {
    default: "NFL Numbers",
    template: "%s | NFL Numbers",
  },
  description:
    "Explore NFL player stats, team rosters, and league standings.",
  keywords: [
    "NFL",
    "football",
    "statistics",
    "player stats",
    "team rosters",
    "standings",
    "National Football League",
    "pro football reference",
  ],
  openGraph: {
    title: "NFL Numbers",
    description: "Explore NFL player stats, team rosters, and league standings.",
    url: "/nfl",
    siteName: "Major League Numbers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NFL Numbers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NFL Numbers",
    description: "Explore NFL player stats, team rosters, and league standings.",
    images: ["/og-image.png"],
  },
};

export default function NFLLayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
