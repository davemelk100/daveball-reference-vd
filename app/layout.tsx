import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Gothic } from "next/font/google";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { WebsiteJsonLd } from "@/components/json-ld";
import { Toaster } from "@/components/ui/sonner";
// import { Analytics } from "@vercel/analytics/react"
import "@/styles/globals.css";

const _geist = Geist({ subsets: ["latin"], display: "swap" });
const _geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" });
const leagueGothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-league-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Major League Numbers",
    template: "%s | Major League Numbers",
  },
  description:
    "Explore MLB player stats, team rosters, and league standings in real-time.",
  generator: "v0.app",
  metadataBase: new URL("https://majorleaguenumbers.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/chat-mlb-2.svg",
    apple: "/chat-mlb-2.svg",
  },
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
  authors: [{ name: "Major League Numbers" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Major League Numbers",
    description:
      "Explore MLB player stats, team rosters, and league standings in real-time.",
    url: "https://majorleaguenumbers.com",
    siteName: "Major League Numbers",
    images: [
      {
        url: "https://majorleaguenumbers.com/og-img.png",
        width: 1200,
        height: 630,
        alt: "Major League Numbers - MLB Statistics Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Major League Numbers",
    description:
      "Explore MLB player stats, team rosters, and league standings in real-time.",
    images: ["/og-img.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <WebsiteJsonLd />
      </head>
      <body
        className={`font-sans antialiased min-h-screen flex flex-col ${leagueGothic.variable}`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
