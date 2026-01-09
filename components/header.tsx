"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Players", href: "/players" },
  { name: "Teams", href: "/teams" },
  { name: "Standings", href: "/standings" },
  { name: "All Stars", href: "/all-star" },
  { name: "HOF", href: "/hof" },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/players?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-[80px] lg:h-[116px] items-center gap-4">
        <Link href="/" className="flex-shrink-0 border-0 flex items-center gap-3">
          <Image
            src="/mln-logo.svg"
            alt="Major League Numbers Logo"
            width={120}
            height={100}
            className="h-auto w-[120px] object-contain border-0 mt-5"
          />
        </Link>
        <span className="hidden md:block text-[48px] font-league whitespace-nowrap" style={{ color: "#d42821" }}>
          Major League Numbers
        </span>
        <div className="flex-1 flex justify-center"></div>

        <div className="flex items-center gap-2 lg:gap-4 shrink-0 ml-auto">
          {/* Commented out ChatMLB link until feature is working properly */}
          {/* <Link
            href="/ask"
            className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              pathname === "/ask"
                ? "bg-secondary/50 text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
            )}
          >
            <Image src="/chat-mlb.svg" alt="" width={30} height={30} className="h-[30px] w-auto" />
            <span className="hidden sm:inline">ChatMLB</span>
          </Link> */}

          <nav className="hidden md:flex items-center gap-1">
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
          {/* <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle search">
            <Search className="h-5 w-5" />
          </Button> */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-11 w-11"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background animate-in slide-in-from-top duration-200">
          <div className="container py-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit" size="sm">
                Search
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-in slide-in-from-top duration-200">
          <div className="container py-4 space-y-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-3 text-xs font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
