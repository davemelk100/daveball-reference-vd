"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExpandableSearch } from "./expandable-search";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
      <div className="container flex items-center gap-4">
        <Link
          href="/"
          className="sm:flex flex-shrink-0 border-0 items-center gap-3"
        >
          <Image
            src="/mln-logo-wide.svg"
            alt="Major League Numbers Logo"
            width={400}
            height={80}
            style={{ width: "180px", height: "auto" }}
            className="object-contain border-0"
          />
        </Link>
        <h1
          className="hidden sm:block flex-1 text-center font-league text-2xl lg:text-4xl font-bold uppercase tracking-wide"
          style={{ color: "#f4232b" }}
        >
          Major League Numbers
        </h1>
        <div className="flex-1 sm:hidden" />
        {/* ChatMLB button and Search - large desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {pathname !== "/ask" && (
            <Link
              href="/ask"
              className="flex shadow-lg items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md"
            >
              <Image
                src="/chat-mlb-2.svg"
                alt=""
                width={100}
                height={100}
                style={{ height: "40px", width: "auto" }}
              />
              <span className="text-md">ChatMLB</span>
            </Link>
          )}
          <ExpandableSearch />
        </div>
        {/* Search icon - tablet and mobile (in header row) */}
        <div className="lg:hidden">
          <ExpandableSearch />
        </div>
      </div>
      {/* ChatMLB button - tablet and below (own row) */}
      {pathname !== "/ask" && (
        <div className="lg:hidden container mt-3">
          <Link
            href="/ask"
            className="shadow-lg flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-md"
          >
            <Image
              src="/chat-mlb-2.svg"
              alt=""
              width={100}
              height={100}
              style={{ height: "40px", width: "auto" }}
            />
            <span className="text-md">ChatMLB</span>
          </Link>
        </div>
      )}
    </header>
  );
}
