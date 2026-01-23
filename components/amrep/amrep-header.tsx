"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AmrepSearch } from "@/components/amrep/amrep-search";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { getMusicSiteFromPathname } from "@/lib/music-site";

export function AmrepHeader() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const askPath = `${site.basePath}/ask`;

  return (
    <header className="z-50 w-full bg-transparent py-1">
      {/* Mobile/Tablet: Title row with search */}
      <div className="container lg:hidden flex items-center justify-between gap-3">
        <Link href={site.basePath} className="flex-1">
          <h1 className={cn("uppercase tracking-wide", site.headerTextClass)}>
            {site.headerTitle}
          </h1>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 w-12 p-0 gbv-search-button"
              aria-label={`Search ${site.shortName}`}
            >
              <Search className={cn("gbv-search-icon", site.id === "amrep" && "text-black")} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[min(20rem,calc(100vw-2rem))] p-2"
            align="end"
            sideOffset={8}
            collisionPadding={16}
          >
            <AmrepSearch
              placeholder={site.searchPlaceholder}
              inputClassName="text-black placeholder:text-gray-400 bg-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link
          href={site.basePath}
          className="flex w-full justify-center lg:w-auto lg:flex-shrink-0 border-0 items-center gap-3"
        >
          <Image
            src={site.logoSrc}
            alt={site.shortName}
            width={140}
            height={140}
            className={cn(
              "w-full h-auto p-0 lg:w-[173px] lg:h-[173px] lg:p-0",
              pathname === askPath && "hidden sm:block",
            )}
            priority
            fetchPriority="high"
          />
        </Link>
        {/* Desktop: Title inline */}
        <Link href={site.basePath} className="hidden lg:block">
          <h1 className={cn("font-league", site.headerTextClass)}>
            {site.headerTitle}
          </h1>
        </Link>

        {/* Desktop actions - chat to the left of search */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {pathname !== askPath && (
            <Link
              href={askPath}
              className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] text-black bg-white border-t border-t-[#f6f6f6] border-l border-l-[#eeeeee] border-r border-r-[#c6c6c6] border-b-2 border-b-[#b5b5b5] shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.4)]"
            >
              <Image
                src={site.chatIconSrc}
                alt={`${site.shortName} chat`}
                width={32}
                height={32}
                className="h-8 w-8 gbv-nav-icon object-contain"
              />
              <span className="text-md text-black">{site.chatLabel}</span>
            </Link>
          )}
          <div className="w-72">
            <AmrepSearch />
          </div>
        </div>
      </div>

      {/* Mobile ChatGBV row */}
      {pathname !== askPath && (
        <div className="container mt-2 lg:hidden">
          <Link
            href={askPath}
            className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] text-black bg-white border-t border-t-[#f6f6f6] border-l border-l-[#eeeeee] border-r border-r-[#c6c6c6] border-b-2 border-b-[#b5b5b5] shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_0_rgba(255,255,255,0.4)]"
          >
            <Image
              src={site.chatIconSrc}
              alt={`${site.shortName} chat`}
              width={24}
              height={24}
              className="h-6 w-6 gbv-nav-icon object-contain"
            />
            <span className="text-sm text-black">{site.chatLabel}</span>
          </Link>
        </div>
      )}
    </header>
  );
}

export { AmrepHeader as GbvHeader };
