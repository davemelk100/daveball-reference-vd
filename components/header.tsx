"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Players", href: "/players" },
  { name: "Teams", href: "/teams" },
  { name: "Standings", href: "/standings" },
  { name: "All Stars", href: "/all-star" },
  { name: "HOF", href: "/hof" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
      <div className="container flex items-center gap-4">
        <Link href="/" className="hidden sm:flex flex-shrink-0 border-0 items-center gap-3">
          <Image
            src="/mln-logo.svg"
            alt="Major League Numbers Logo"
            width={200}
            height={100}
            className="h-auto object-contain border-0"
          />
        </Link>
        <span className="text-2xl sm:text-3xl min-[1300px]:text-[48px] font-league whitespace-nowrap" style={{ color: "#d42821" }}>
          Major League Numbers
        </span>
        <div className="flex-1 flex justify-center"></div>

        {/* Nav links - 1300px+ only */}
        <nav className="hidden min-[1300px]:flex items-center gap-1 shrink-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                pathname === item.href
                  ? "bg-secondary/50 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* ChatMLB button row - all viewports */}
      <div className="container mt-3">
        <Link
          href="/ask"
          className={cn(
            "flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-md transition-colors",
            pathname === "/ask"
              ? "bg-secondary/50 text-foreground"
              : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-secondary/50",
          )}
        >
          <Image src="/chat-mlb.svg" alt="" width={40} height={40} className="h-[40px] w-auto" />
          <span>ChatMLB</span>
        </Link>
      </div>
    </header>
  )
}
