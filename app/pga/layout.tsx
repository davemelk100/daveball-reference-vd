import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";
import { UpdatesBanner } from "@/components/updates-banner";

export const metadata: Metadata = {
  title: {
    default: "PGA Numbers",
    template: "%s | PGA Numbers",
  },
  description:
    "Explore PGA Tour player stats, tournament results, and rankings.",
  keywords: [
    "PGA",
    "golf",
    "statistics",
    "player stats",
    "tournaments",
    "rankings",
    "PGA Tour",
    "FedEx Cup",
    "majors",
  ],
  openGraph: {
    title: "PGA Numbers",
    description: "Explore PGA Tour player stats, tournament results, and rankings.",
    url: "/pga",
    siteName: "Major League Numbers",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/en/7/77/PGA_Tour_logo.svg",
        width: 1200,
        height: 630,
        alt: "PGA Numbers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PGA Numbers",
    description: "Explore PGA Tour player stats, tournament results, and rankings.",
    images: ["https://upload.wikimedia.org/wikipedia/en/7/77/PGA_Tour_logo.svg"],
  },
};

export default function PGALayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
