"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
            className="W-auto object-contain border-0"
          />
        </Link>
        {/* <Link
          href="/"
          className="text-4xl sm:text-4xl min-[1300px]:text-[48px] font-league whitespace-nowrap"
          style={{ color: "#d42821" }}
        >
          Major League Numbers
        </Link> */}
        <div className="flex-1 hidden sm:block" />
        {/* ChatMLB button - desktop (same row) */}
        {pathname !== "/ask" && (
          <Link
            href="/ask"
            className="hidden sm:flex shadow-lg items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md w-1/2"
          >
            <Image
              src="/chat-mlb-2.svg"
              alt=""
              width={100}
              height={100}
              className="h-[40px] w-auto"
            />
            <span className="text-xl">ChatMLB</span>
          </Link>
        )}
      </div>
      {/* ChatMLB button - mobile (own row) */}
      {pathname !== "/ask" && (
        <div className="sm:hidden container mt-3">
          <Link
            href="/ask"
            className="shadow-lg flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-md "
          >
            <Image
              src="/chat-mlb-2.svg"
              alt=""
              width={100}
              height={100}
              className="h-[40px] w-auto"
            />
            <span className="text-xl">ChatMLB</span>
          </Link>
        </div>
      )}
    </header>
  );
}
