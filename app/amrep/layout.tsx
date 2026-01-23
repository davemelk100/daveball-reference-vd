import type React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { GbvHeader } from "@/components/amrep/amrep-header";
import { GbvFooter } from "@/components/amrep/amrep-footer";
import { GbvLeftNav, GbvFooterNav } from "@/components/amrep/amrep-nav";
import { PageLoader } from "@/components/page-loader";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: {
    default: "Amphetamine Reptile Records",
    template: "%s | Amphetamine Reptile Records",
  },
  description:
    "Explore Amphetamine Reptile Records: artist roster, releases, label history, and milestones.",
  metadataBase: new URL("https://majorleaguenumbers.com"),
  alternates: {
    canonical: "/amrep",
  },
  keywords: [
    "Amphetamine Reptile Records",
    "AmRep",
    "noise rock",
    "independent label",
    "artists",
    "releases",
    "label history",
  ],
  authors: [{ name: "Amphetamine Reptile Records" }],
  openGraph: {
    title: "Amphetamine Reptile Records",
    description:
      "Explore Amphetamine Reptile Records: artist roster, releases, label history, and milestones.",
    url: "https://majorleaguenumbers.com/amrep",
    siteName: "Major League Numbers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://majorleaguenumbers.com/amrep-logo.svg",
        width: 1200,
        height: 630,
        alt: "Amphetamine Reptile Records",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amphetamine Reptile Records",
    description:
      "Explore Amphetamine Reptile Records: artist roster, releases, label history, and milestones.",
    images: ["/amrep-logo.svg"],
  },
};

export default function AmrepLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="amrep-shell min-h-screen">
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
          name: "Amphetamine Reptile Records",
          url: "https://majorleaguenumbers.com/amrep",
          description:
            "Explore Amphetamine Reptile Records: artist roster, releases, label history, and milestones.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://majorleaguenumbers.com/amrep/search?q={search_term_string}",
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
