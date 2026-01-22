import type React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { GbvHeader } from "@/components/gbv/gbv-header";
import { GbvFooter } from "@/components/gbv/gbv-footer";
import { GbvLeftNav, GbvFooterNav } from "@/components/gbv/gbv-nav";
import { PageLoader } from "@/components/page-loader";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: {
    default: "Guided By Data",
    template: "%s | Guided By Data",
  },
  description:
    "Explore Guided By Voices discography, albums, songs, and band history.",
  metadataBase: new URL("https://majorleaguenumbers.com"),
  alternates: {
    canonical: "/gbv",
  },
  keywords: [
    "Guided By Voices",
    "GBV",
    "Robert Pollard",
    "indie rock",
    "lo-fi",
    "discography",
    "albums",
    "songs",
  ],
  authors: [{ name: "Guided By Data" }],
  openGraph: {
    title: "Guided By Data",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history.",
    url: "https://majorleaguenumbers.com/gbv",
    siteName: "Guided By Data",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://majorleaguenumbers.com/gbv-rune.png",
        width: 1200,
        height: 630,
        alt: "Guided By Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guided By Data",
    description:
      "Explore Guided By Voices discography, albums, songs, and band history.",
    images: ["https://majorleaguenumbers.com/gbv-rune.png"],
  },
};

export default function GbvLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="gbv-shell min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to content
        </a>
        <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Guided By Data",
          url: "https://majorleaguenumbers.com/gbv",
          description:
            "Explore Guided By Voices discography, albums, songs, and band history.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://majorleaguenumbers.com/gbv/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <GbvLeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <GbvHeader />
        <Suspense fallback={<PageLoader />}>
          <main id="main-content" className="pb-16 sm:pb-0 flex-1" tabIndex={-1}>
            {children}
          </main>
        </Suspense>
        <GbvFooter />
      </div>
      <GbvFooterNav />
    </div>
  );
}
