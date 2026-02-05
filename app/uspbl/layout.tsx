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
    images: [{ url: "/uspbl-logo.png", width: 200, height: 200, alt: "USPBL" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "USPBL Numbers",
    description: "Explore USPBL player rosters, team info, and league standings.",
    images: ["/uspbl-logo.png"],
  },
};

export default function USPBLLayout({ children }: { children: React.ReactNode }) {
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
