"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GbvSearch } from "@/components/gbv/gbv-search";

export function GbvHeader() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link href="/gbv" className="flex-shrink-0 border-0 items-center gap-3">
          <Image
            src="/gbv-rune.svg"
            alt="GBV"
            width={40}
            height={40}
            className="h-10 w-10"
          />
        </Link>
        <Link href="/gbv">
          <h1 className="uppercase tracking-wide flex-shrink-0 text-foreground">
            Guided By Numbers
          </h1>
        </Link>

        {/* ChatGBV button */}
        {pathname !== "/gbv/ask" && (
          <>
            {/* Large screens: wide button that fills available space */}
            <Link
              href="/gbv/ask"
              className="hidden lg:flex flex-1 items-center justify-center gap-2 px-4 h-10 text-sm font-medium rounded-lg transition-all mx-4 active:translate-y-[1px]"
              style={{
                background: "linear-gradient(180deg, #f1f1f1 0%, #d9d9d9 100%)",
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
                className="h-8 w-8"
              />
              <span className="text-md">ChatGBV</span>
            </Link>

            {/* Small/medium screens: compact button */}
            <Link
              href="/gbv/ask"
              className="lg:hidden flex items-center justify-center gap-2 px-3 h-10 text-sm font-medium rounded-lg transition-all ml-auto active:translate-y-[1px]"
              style={{
                background: "linear-gradient(180deg, #f1f1f1 0%, #d9d9d9 100%)",
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
                className="h-6 w-6"
              />
              <span className="text-sm hidden sm:inline">ChatGBV</span>
            </Link>
          </>
        )}

        {/* Search - large desktop only, far right */}
        <div className="hidden lg:block flex-shrink-0 ml-auto">
          <div className="w-72">
            <GbvSearch />
          </div>
        </div>
      </div>

      {/* Search - tablet and mobile, below header */}
      <div className="container mt-3 lg:hidden">
        <GbvSearch />
      </div>
    </header>
  );
}
