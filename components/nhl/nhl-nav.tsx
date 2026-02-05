"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Users,
  Trophy,
  BarChart3,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavItem[] = [
  { name: "ChatNHL", href: "/nhl/ask", icon: Home },
  { name: "Home", href: "/nhl", icon: Home },
  { name: "Players", href: "/nhl/players", icon: Users },
  { name: "Teams", href: "/nhl/teams", icon: Trophy },
  { name: "Standings", href: "/nhl/standings", icon: BarChart3 },
];

export function NHLLeftNav() {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 bottom-0 z-40 w-20 bg-background border-r border-border pt-4 hidden sm:flex flex-col">
      <div className="flex flex-col items-center gap-2 px-2 py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPending = pendingHref === item.href && pendingHref !== pathname;
          const showActive = isActive || isPending;
          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={showActive ? "page" : undefined}
              aria-busy={isPending ? "true" : undefined}
              onClick={() => {
                if (item.href !== pathname) {
                  setPendingHref(item.href);
                }
              }}
              className={cn(
                "group flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md transition-all duration-200 w-full",
                showActive
                  ? "text-primary bg-primary/10 -translate-y-0.5 shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex items-center justify-center gap-1 text-xs font-medium text-center leading-tight">
                {item.name}
                {isPending ? (
                  <Loader2 className="h-3 w-3 animate-spin text-current" />
                ) : null}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function NHLFooterNav() {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const mobileNavigation = navigation.filter(
    (item) => !["Home"].includes(item.name)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-bottom sm:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPending = pendingHref === item.href && pendingHref !== pathname;
          const showActive = isActive || isPending;
          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={showActive ? "page" : undefined}
              aria-busy={isPending ? "true" : undefined}
              onClick={() => {
                if (item.href !== pathname) {
                  setPendingHref(item.href);
                }
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-md transition-colors min-w-[48px]",
                showActive
                  ? "text-primary bg-primary/10 ring-1 ring-primary/30 shadow-[0_0_0_1px_rgba(0,0,0,0.15),_inset_0_0_0_1px_rgba(0,0,0,0.08)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex items-center justify-center gap-1 text-sm font-medium">
                {item.name}
                {isPending ? (
                  <Loader2 className="h-3 w-3 animate-spin text-current" />
                ) : null}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
