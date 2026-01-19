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
        <Link href="/">
          <h1
            className="uppercase tracking-wide flex-shrink-0"
            style={{ color: "#f4232b" }}
          >
            Major League Numbers
          </h1>
        </Link>

        {/* ChatMLB button - fills space between title and search on lg+ */}
        {pathname !== "/ask" && (
          <>
            {/* Large screens: wide button that fills available space */}
            <Link
              href="/ask"
              className="hidden lg:flex flex-1 items-center justify-center gap-2 px-4 h-10 text-sm font-medium rounded-lg transition-all mx-4 active:translate-y-[1px]"
              style={{
                background: "linear-gradient(180deg, #d8e0e8 0%, #b8c4d0 100%)",
                borderTop: "1px solid #e8eef4",
                borderLeft: "1px solid #dce4ec",
                borderRight: "1px solid #a8b4c0",
                borderBottom: "2px solid #98a4b0",
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
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
              className="lg:hidden flex items-center justify-center gap-2 px-3 h-10 text-sm font-medium rounded-lg transition-all ml-auto active:translate-y-[1px]"
              style={{
                background: "linear-gradient(180deg, #d8e0e8 0%, #b8c4d0 100%)",
                borderTop: "1px solid #e8eef4",
                borderLeft: "1px solid #dce4ec",
                borderRight: "1px solid #a8b4c0",
                borderBottom: "2px solid #98a4b0",
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <Image
                src="/chat-mlb-2.svg"
                alt=""
                width={100}
                height={100}
                className="block"
                style={{ height: "24px", width: "auto" }}
              />
              <span className="text-sm hidden sm:inline">ChatMLB</span>
            </Link>
          </>
        )}

        {/* Search - large desktop only, far right */}
        <div className="hidden lg:block flex-shrink-0 ml-auto">
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
