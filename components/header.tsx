"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
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
          className="uppercase tracking-wide"
          style={{ color: "#f4232b" }}
        >
          Major League Numbers
        </h1>
          {/* <Image
            src="/mln-logo-wide.svg"
            alt="Major League Numbers Logo"
            width={400}
            height={80}
            style={{ width: "180px", height: "auto" }}
            className="object-contain border-0"
          /> */}
      </div>
      {/* ChatMLB button and Search button - below header */}
      {pathname !== "/ask" && pathname !== "/search" && (
        <div className="container mt-3 flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <Link
            href="/ask"
            className="flex items-center justify-center gap-2 px-4 h-14 text-sm font-medium rounded-md w-full md:w-1/2 border border-primary/20 hover:border-primary/40 transition-all shadow-sm"
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
          <Link
            href="/search"
            className="flex items-center justify-center gap-2 px-4 h-14 text-sm font-medium rounded-md w-full md:w-1/2 border border-primary/20 hover:border-primary/40 transition-all shadow-sm"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="text-md">Search</span>
          </Link>
        </div>
      )}
    </header>
  );
}
