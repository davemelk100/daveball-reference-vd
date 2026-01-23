"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FooterNav, LeftNav } from "@/components/footer-nav";
import { UpdatesBanner } from "@/components/updates-banner";
import { Suspense } from "react";
import { PageLoader } from "@/components/page-loader";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGbvRoute = pathname?.startsWith("/gbv");
  const isAmrepRoute = pathname?.startsWith("/amrep");

  // For GBV/AmRep routes, render children directly (they have their own layout)
  if (isGbvRoute || isAmrepRoute) {
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
