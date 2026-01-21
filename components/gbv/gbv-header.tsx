"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GbvSearch } from "@/components/gbv/gbv-search";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

export function GbvHeader() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-transparent py-1">
      {/* Mobile/Tablet: Title row with search */}
      <div className="container lg:hidden flex items-center justify-between gap-3">
        <Link href="/gbv" className="flex-1">
          <h1 className="uppercase tracking-wide text-white font-semibold text-[32px] sm:text-[55px]">
            Guided By Data
          </h1>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 w-12 p-0 gbv-search-button"
              aria-label="Search GBV"
            >
              <Search className="gbv-search-icon" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[min(20rem,calc(100vw-2rem))] p-2"
            align="end"
            sideOffset={8}
            collisionPadding={16}
          >
            <GbvSearch
              placeholder="Search GBV..."
              inputClassName="text-black placeholder:text-gray-400 bg-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link
          href="/gbv"
          className="flex w-full justify-center lg:w-auto lg:flex-shrink-0 border-0 items-center gap-3"
        >
          <Image
            src="/gbv-mlb.svg"
            alt="GBV"
            width={140}
            height={140}
            className="w-full h-auto p-0 lg:w-[173px] lg:h-[173px] lg:p-0"
            priority
            fetchPriority="high"
          />
        </Link>
        {/* Desktop: Title inline */}
        <Link href="/gbv" className="hidden lg:block">
          <h1
            className={cn(
              "uppercase tracking-wide flex-shrink-0 text-white text-[32px] sm:text-[55px]"
            )}
          >
            Guided By Data
          </h1>
        </Link>


        {/* Desktop actions - chat to the left of search */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {pathname !== "/gbv/ask" && (
            <Link
              href="/gbv/ask"
              className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] text-black"
              style={{
                background: "#ffffff",
                borderTop: "1px solid #f6f6f6",
                borderLeft: "1px solid #eeeeee",
                borderRight: "1px solid #c6c6c6",
                borderBottom: "2px solid #b5b5b5",
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <Image
                src="/gbv-rune.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 gbv-nav-icon"
              />
              <span className="text-md text-black">ChatGBV</span>
            </Link>
          )}
          <div className="w-72">
            <GbvSearch />
          </div>
        </div>
      </div>

      {/* Mobile ChatGBV row */}
      {pathname !== "/gbv/ask" && (
        <div className="container mt-2 lg:hidden">
          <Link
            href="/gbv/ask"
            className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px] text-black"
            style={{
              background: "#ffffff",
              borderTop: "1px solid #f6f6f6",
              borderLeft: "1px solid #eeeeee",
              borderRight: "1px solid #c6c6c6",
              borderBottom: "2px solid #b5b5b5",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            <Image
              src="/gbv-rune.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 gbv-nav-icon"
            />
            <span className="text-sm text-black">ChatGBV</span>
          </Link>
        </div>
      )}

    </header>
  );
}
