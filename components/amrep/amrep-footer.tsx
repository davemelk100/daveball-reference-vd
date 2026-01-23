"use client";

import Link from "next/link";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { usePathname } from "next/navigation";

export function GbvFooter() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";

  return (
    <footer className="bg-transparent py-2 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center">
          <nav className="flex items-center gap-2 text-[10px] text-white md:hidden justify-center">
            <Link
              href={`${site.basePath}/albums`}
              className="transition-colors hover:underline hover:decoration-current"
            >
              {site.navLabels.discography}
            </Link>
            <Link
              href={`${site.basePath}/ask`}
              className="transition-colors hover:underline hover:decoration-current"
            >
              {site.chatLabel}
            </Link>
            <Link
              href={`${site.basePath}/members`}
              className="transition-colors hover:underline hover:decoration-current"
            >
              {site.navLabels.members}
            </Link>
          </nav>
        </div>
        <div className="mt-2 text-[10px] text-white text-center md:text-[12px]">
          <div className="flex flex-wrap items-center gap-1.5 justify-center md:gap-2">
            <span>Sources:</span>
            {site.sources.map((source) => (
              <a
                key={source.label}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:underline hover:decoration-current"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>
        {isAmrep && (
          <div className="mt-2 text-[10px] text-white text-center md:text-[12px]">
            All Content, Rights, Copyrights, etc. are the property of Tom
            Hazelmyer and AmRep records. This is simply a fan site.
          </div>
        )}
      </div>
    </footer>
  );
}
