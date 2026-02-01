"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUp } from "lucide-react";

export function SiteFooter() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const allSources = [
    { category: "Data", items: site.sources },
    { category: "Images", items: site.imageSources },
  ];

  return (
    <footer className="bg-transparent py-2 mt-auto pb-20 sm:pb-2">
      <div className="container">
        <div className="flex flex-col gap-1 text-[10px] text-white md:text-[11px]">
          <div className="flex items-center justify-between">
          {/* Left: Disclaimer */}
          {site.footerDisclaimer && (
            <span className={site.id === "amrep" ? "text-black" : "text-white/70"}>
              {site.footerDisclaimer}
            </span>
          )}

          {/* Right: Sources */}
          {mounted && (
            <Popover>
              <PopoverTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/10 transition-colors">
                Sources <ChevronUp className="h-3 w-3" />
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 max-h-80 overflow-y-auto" side="top" align="end">
                {allSources.map((group) => (
                  <div key={group.category} className="mb-3 last:mb-0">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      {group.category}
                    </p>
                    <div className="flex flex-col gap-1">
                      {group.items.map((source) => (
                        <a
                          key={source.label}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                        >
                          {source.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          )}
          </div>
          <span className={site.id === "amrep" ? "text-black/50" : "text-white/40"}>
            No generative AI is allowed to produce, stream, alter, or replicate any audio, video, or graphics.
          </span>
        </div>
      </div>
    </footer>
  );
}
