"use client";

import { usePathname } from "next/navigation";
import { UpdatesBanner } from "@/components/updates-banner";
import { isMusicSiteRoute } from "@/lib/music-site";
import { isNHLRoute } from "@/lib/nhl-api";
import { SportsSiteLayout } from "@/components/sports-site/sports-layout";

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

  // For MLB routes, wrap with shared sports layout
  return (
    <SportsSiteLayout banner={<UpdatesBanner />}>
      {children}
    </SportsSiteLayout>
  );
}
