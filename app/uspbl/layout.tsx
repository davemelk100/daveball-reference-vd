import type { Metadata } from "next";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";
import { UpdatesBanner } from "@/components/updates-banner";

export const metadata: Metadata = {
  title: {
    default: "USPBL Numbers",
    template: "%s | USPBL Numbers",
  },
  description:
    "Explore USPBL player rosters, team info, and league standings.",
  keywords: [
    "USPBL",
    "baseball",
    "statistics",
    "United Shore Professional Baseball League",
    "independent baseball",
    "Utica",
    "Michigan",
  ],
  openGraph: {
    title: "USPBL Numbers",
    description: "Explore USPBL player rosters, team info, and league standings.",
    url: "/uspbl",
    siteName: "Major League Numbers",
    images: [
      {
        url: "/og-uspbl.png",
        width: 1200,
        height: 630,
        alt: "USPBL Numbers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "USPBL Numbers",
    description: "Explore USPBL player rosters, team info, and league standings.",
    images: ["/og-uspbl.png"],
  },
};

export default function USPBLLayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
