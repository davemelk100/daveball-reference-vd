"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PlayerSearch } from "@/components/player-search";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
      {/* Mobile/Tablet: Title row with search */}
      <div className="container lg:hidden flex items-center justify-between gap-3">
        <Link href="/" className="flex-1">
          <h1
            className="uppercase tracking-wide text-[32px] sm:text-[55px]"
            style={{ color: "#f4232b" }}
          >
            Major League Numbers
          </h1>
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 w-12 p-0"
              aria-label="Search MLB"
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
            <PlayerSearch />
          </PopoverContent>
        </Popover>
      </div>

      {/* Main header row */}
      <div className="container flex items-center gap-4">
        <Link
          href="/"
          className="flex w-full justify-center lg:w-auto lg:flex-shrink-0 border-0 items-center gap-3"
        >
          <Image
            src="/chat-mlb-2.svg"
            alt=""
            width={100}
            height={100}
            className="w-full h-auto max-w-[220px] lg:h-20 lg:w-auto"
          />
        </Link>
        <Link href="/" className="hidden lg:block">
          <h1
            className="uppercase tracking-wide flex-shrink-0 text-[32px] sm:text-[55px]"
            style={{ color: "#f4232b" }}
          >
            Major League Numbers
          </h1>
        </Link>

        {/* Desktop actions - chat to the left of search */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {pathname !== "/ask" && (
            <Link
              href="/ask"
              className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px]"
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
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-md">ChatMLB</span>
            </Link>
          )}
          <div className="w-72">
            <PlayerSearch />
          </div>
        </div>
      </div>

      {/* Mobile ChatMLB row */}
      {pathname !== "/ask" && (
        <div className="container mt-2 lg:hidden">
          <Link
            href="/ask"
            className="flex items-center justify-center gap-2 px-5 h-12 text-sm font-medium rounded-lg transition-all active:translate-y-[1px]"
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
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="text-sm">ChatMLB</span>
          </Link>
        </div>
      )}
    </header>
  );
}
