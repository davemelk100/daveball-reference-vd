"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { getSportsSiteFromPathname } from "@/lib/sports-site";
import { PlayerSearch } from "@/components/player-search";
import { NHLPlayerSearch } from "@/components/nhl/nhl-player-search";

export function SportsHeader() {
  const pathname = usePathname();
  const site = getSportsSiteFromPathname(pathname);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const SearchComponent = site.id === "nhl" ? NHLPlayerSearch : PlayerSearch;
  const isOnChatPage = pathname === site.chatPath;

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 mb-4">
      <div className="container flex items-center gap-3">
        <Link href={site.basePath || "/"} className="flex items-center gap-3 flex-shrink-0">
          <Image
            src={site.logoSrc}
            alt={site.logoAlt}
            width={100}
            height={100}
            className="h-12 w-auto sm:h-16 lg:h-20"
            priority
          />
          <h1 className={`uppercase flex-shrink-0 hidden sm:block ${site.titleColorClass}`}>
            {site.title}
          </h1>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          {isMounted ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-12 w-12 p-0 lg:hidden"
                  aria-label={site.searchLabel}
                >
                  <Search className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[min(20rem,calc(100vw-2rem))] p-2"
                align="end"
                sideOffset={8}
                collisionPadding={16}
              >
                <SearchComponent />
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              variant="ghost"
              className="h-12 w-12 p-0 lg:hidden"
              aria-label={site.searchLabel}
            >
              <Search className="h-6 w-6" />
            </Button>
          )}
          <div className="hidden lg:flex items-center gap-4">
            {!isOnChatPage && (
              <Link
                href={site.chatPath}
                className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] bg-[linear-gradient(180deg,_#d8e0e8_0%,_#b8c4d0_100%)] border-t border-t-[#e8eef4] border-l border-l-[#dce4ec] border-r border-r-[#a8b4c0] border-b-2 border-b-[#98a4b0] shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                {site.chatIconSrc && (
                  <Image
                    src={site.chatIconSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                )}
                <span className="text-md">{site.chatLabel}</span>
              </Link>
            )}
            <div className="w-72">
              <SearchComponent />
            </div>
          </div>
        </div>
      </div>

      {!isOnChatPage && (
        <div className="container mt-6 lg:hidden">
          <Link
            href={site.chatPath}
            className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] bg-[linear-gradient(180deg,_#d8e0e8_0%,_#b8c4d0_100%)] border-t border-t-[#e8eef4] border-l border-l-[#dce4ec] border-r border-r-[#a8b4c0] border-b-2 border-b-[#98a4b0] shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.4)]"
          >
            {site.chatIconSrc && (
              <Image
                src={site.chatIconSrc}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            )}
            <span className="text-sm">{site.chatLabel}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
