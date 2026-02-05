"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FooterNav, LeftNav } from "@/components/footer-nav";
import { UpdatesBanner } from "@/components/updates-banner";
import { Suspense } from "react";
import { PageLoader } from "@/components/page-loader";
import { isMusicSiteRoute } from "@/lib/music-site";
import { isNHLRoute } from "@/lib/nhl-api";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTopicRoute = isMusicSiteRoute(pathname);
  const isNHL = isNHLRoute(pathname);

  // For GBV/AmRep/Rev routes, render children directly (they have their own layout)
  if (isTopicRoute) {
    return <>{children}</>;
  }

  // For NHL routes, render children directly (they have their own layout)
  if (isNHL) {
    return <>{children}</>;
  }

  // For MLB routes, wrap with MLB chrome
  return (
    <>
      <LeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <Header />
        <UpdatesBanner />
        <Suspense fallback={<PageLoader />}>
          <div className="pb-16 sm:pb-0 flex-1">{children}</div>
        </Suspense>
        <Footer />
      </div>
      <FooterNav />
    </>
  );
}
