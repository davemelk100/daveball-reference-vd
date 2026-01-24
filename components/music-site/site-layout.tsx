import type React from "react";
import { Suspense } from "react";
import { PageLoader } from "@/components/page-loader";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/music-site/site-header";
import { SiteFooter } from "@/components/music-site/site-footer";
import { SiteLeftNav, SiteFooterNav } from "@/components/music-site/site-nav";
import { getMusicSiteById, getSiteJsonLd, type MusicSiteId } from "@/lib/music-site";

type SiteLayoutProps = {
  siteId: MusicSiteId;
  children: React.ReactNode;
};

export function SiteLayout({
  siteId,
  children,
}: SiteLayoutProps) {
  const site = getMusicSiteById(siteId);

  return (
    <div className={`${site.shellClass} min-h-screen`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to content
      </a>
      <JsonLd data={getSiteJsonLd(site)} />
      <SiteLeftNav />
      <div className="sm:ml-20 flex flex-col flex-1">
        <SiteHeader />
        <Suspense fallback={<PageLoader />}>
          <main id="main-content" className="pb-16 sm:pb-0 flex-1" tabIndex={-1}>
            {children}
          </main>
        </Suspense>
        <SiteFooter />
      </div>
      <SiteFooterNav />
    </div>
  );
}
