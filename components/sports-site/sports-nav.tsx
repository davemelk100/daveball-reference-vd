"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getSportsSiteFromPathname } from "@/lib/sports-site";

export function SportsLeftNav() {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const site = getSportsSiteFromPathname(pathname);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 bottom-0 z-40 w-20 bg-background border-r border-border pt-4 hidden sm:flex flex-col">
      <div className="flex flex-col items-center gap-2 px-2 py-2">
        {site.navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPending = pendingHref === item.href && pendingHref !== pathname;
          const showActive = isActive || isPending;
          const isChat = item.href === site.chatPath;
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
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={isChat ? 40 : 20}
                  height={isChat ? 40 : 20}
                  className={cn(
                    isChat ? "h-10 w-10" : "h-5 w-5",
                    "object-contain transition-transform duration-200 group-hover:scale-110",
                    isPending && "animate-spin [animation-duration:2s]"
                  )}
                  priority={isChat}
                  loading={isChat ? "eager" : "lazy"}
                />
              ) : Icon ? (
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                    isPending && "animate-spin [animation-duration:2s]"
                  )}
                />
              ) : null}
              <span className="text-xs font-medium text-center leading-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function SportsFooterNav() {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const site = getSportsSiteFromPathname(pathname);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const mobileNavigation = site.navItems.filter(
    (item) => !site.mobileHiddenNames.includes(item.name)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-bottom sm:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPending = pendingHref === item.href && pendingHref !== pathname;
          const showActive = isActive || isPending;
          const isChat = item.href === site.chatPath;
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
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={isChat ? 24 : 20}
                  height={isChat ? 24 : 20}
                  className={cn(
                    isChat ? "h-6 w-6" : "h-5 w-5",
                    "object-contain",
                    isPending && "animate-spin [animation-duration:2s]"
                  )}
                />
              ) : Icon ? (
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isPending && "animate-spin [animation-duration:2s]"
                  )}
                />
              ) : null}
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
