"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GbvSearch } from "@/components/gbv/gbv-search";
import { cn } from "@/lib/utils";

export function GbvHeader() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-transparent py-1">
      {/* Mobile: Title on its own row */}
      <div className="container sm:hidden">
        <Link href="/gbv">
          <h1
            className="uppercase tracking-wide text-white text-center"
            style={{ fontSize: "36px" }}
          >
            Guided By Data
          </h1>
        </Link>
      </div>

      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link href="/gbv" className="flex-shrink-0 border-0 items-center gap-3">
          <Image
            src="/gbv-mlb.svg"
            alt="GBV"
            width={173}
            height={173}
            className="h-[100px] w-[100px] sm:h-[173px] sm:w-[173px]"
            priority
            fetchPriority="high"
          />
        </Link>
        {/* Desktop/tablet: Title inline */}
        <Link href="/gbv" className="hidden sm:block">
          <h1
            className={cn("uppercase tracking-wide flex-shrink-0 text-white")}
            style={{ fontSize: "55px" }}
          >
            Guided By Data
          </h1>
        </Link>

        {/* ChatGBV button */}
        {pathname !== "/gbv/ask" && (
          <>
            {/* Small/medium screens: compact button */}
            <Link
              href="/gbv/ask"
              className="lg:hidden flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all ml-auto active:translate-y-[1px] text-black"
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
          </>
        )}

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

      {/* Search - tablet and mobile, below header */}
      <div className="container mt-1 lg:hidden">
        <GbvSearch />
      </div>
    </header>
  );
}
