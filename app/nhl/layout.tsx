import type { Metadata } from "next";
import { Suspense } from "react";
import { NHLHeader } from "@/components/nhl/nhl-header";
import { NHLFooter } from "@/components/nhl/nhl-footer";
import { NHLLeftNav, NHLFooterNav } from "@/components/nhl/nhl-nav";
import { PageLoader } from "@/components/page-loader";

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
};

export default function NHLLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NHLLeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <NHLHeader />
        <Suspense fallback={<PageLoader />}>
          <div className="pb-16 sm:pb-0 flex-1">{children}</div>
        </Suspense>
        <NHLFooter />
      </div>
      <NHLFooterNav />
    </>
  );
}
