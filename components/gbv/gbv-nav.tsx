"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Disc3,
  Users,
  Music,
  Calendar,
  Award,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
}

const navigation: NavItem[] = [
  { name: "Chat GBV", href: "/gbv/ask", image: "/gbv-rune.svg" },
  { name: "Home", href: "/gbv", icon: Home },
  { name: "Albums", href: "/gbv/albums", icon: Disc3 },
  { name: "Members", href: "/gbv/members", icon: Users },
  { name: "Songs", href: "/gbv/songs", icon: Music },
  { name: "Timeline", href: "/gbv/timeline", icon: Calendar },
  { name: "Awards", href: "/gbv/awards", icon: Award },
];

export function GbvLeftNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 bottom-0 z-40 w-20 bg-background border-r border-border pt-4 hidden sm:flex flex-col">
      <div className="flex flex-col items-center gap-2 px-2 py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md transition-colors w-full",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              ) : (
                Icon && <Icon className="h-5 w-5" />
              )}
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

export function GbvFooterNav() {
  const pathname = usePathname();

  // Only show essential nav items on mobile footer
  const mobileNavigation = navigation
    .filter((item) => !["Timeline", "Awards"].includes(item.name))
    .slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-bottom sm:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-md transition-colors min-w-[48px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              ) : (
                Icon && <Icon className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
