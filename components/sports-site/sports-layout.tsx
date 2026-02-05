import type React from "react";
import { Suspense } from "react";
import { PageLoader } from "@/components/page-loader";
import { SportsLeftNav, SportsFooterNav } from "@/components/sports-site/sports-nav";
import { SportsHeader } from "@/components/sports-site/sports-header";
import { SportsFooter } from "@/components/sports-site/sports-footer";

type SportsSiteLayoutProps = {
  children: React.ReactNode;
  banner?: React.ReactNode;
};

export function SportsSiteLayout({ children, banner }: SportsSiteLayoutProps) {
  return (
    <>
      <SportsLeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <SportsHeader />
        {banner}
        <Suspense fallback={<PageLoader />}>
          <div className="pb-16 sm:pb-0 flex-1">{children}</div>
        </Suspense>
        <SportsFooter />
      </div>
      <SportsFooterNav />
    </>
  );
}
