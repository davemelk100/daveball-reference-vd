"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PlayerSearch } from "@/components/player-search";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link
          href="/"
          className="hidden md:flex flex-shrink-0 border-0 items-center gap-3"
        >
          <Image
            src="/chat-mlb-2.svg"
            alt=""
            width={100}
            height={100}
            className="h-20 w-auto"
          />
        </Link>
        <h1
          className="uppercase tracking-wide flex-shrink-0"
          style={{ color: "#f4232b" }}
        >
          Major League Numbers
        </h1>

        {/* ChatMLB button - fills space between title and search on lg+ */}
        {pathname !== "/ask" && (
          <>
            {/* Large screens: wide button that fills available space */}
            <Link
              href="/ask"
              className="hidden lg:flex flex-1 items-center justify-center gap-2 px-4 h-12 text-sm font-medium rounded-md border border-primary/20 hover:border-primary/40 transition-all shadow-sm mx-4"
            >
              <Image
                src="/chat-mlb-2.svg"
                alt=""
                width={100}
                height={100}
                style={{ height: "32px", width: "auto" }}
              />
              <span className="text-md">ChatMLB</span>
            </Link>

            {/* Small/medium screens: compact button */}
            <Link
              href="/ask"
              className="lg:hidden flex items-center justify-center gap-2 px-3 h-10 text-sm font-medium rounded-md border border-primary/20 hover:border-primary/40 transition-all shadow-sm ml-auto"
            >
              <Image
                src="/chat-mlb-2.svg"
                alt=""
                width={100}
                height={100}
                style={{ height: "24px", width: "auto" }}
              />
              <span className="text-sm">ChatMLB</span>
            </Link>
          </>
        )}

        {/* Search - large desktop only, far right */}
        <div className="hidden lg:block flex-shrink-0">
          <div className="w-72">
            <PlayerSearch />
          </div>
        </div>
      </div>

      {/* Search - tablet and mobile, below header */}
      <div className="container mt-3 lg:hidden">
        <PlayerSearch />
      </div>
    </header>
  );
}
