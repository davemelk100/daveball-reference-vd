import type { Metadata } from "next";
import { GbvDashboardContent } from "@/components/gbv/gbv-dashboard-content";

export const metadata: Metadata = {
  title: "Guided By Data",
  description:
    "Explore Guided By Voices discography, albums, songs, and band history. Daily trivia, member profiles, and complete album catalog.",
  openGraph: {
    title: "Guided By Data",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history. Daily trivia, member profiles, and complete album catalog.",
    url: "https://majorleaguenumbers.com/gbv",
    siteName: "Major League Numbers",
    images: [
      {
        url: "https://majorleaguenumbers.com/gbv-mlb.png",
        width: 1200,
        height: 630,
        alt: "Guided By Data - GBV Statistics Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guided By Data",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history. Daily trivia, member profiles, and complete album catalog.",
    images: ["/gbv-mlb.png"],
  },
};

export const revalidate = 60;

export default function GbvPage() {
  return <GbvDashboardContent />;
}
