"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Trophy,
  BarChart3,
  Star,
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
  { name: "ChatMLB", href: "/ask", image: "/chat-mlb-2.svg" },
  { name: "Home", href: "/", icon: Home },
  { name: "Players", href: "/players", icon: Users },
  { name: "Teams", href: "/teams", icon: Trophy },
  { name: "Standings", href: "/standings", icon: BarChart3 },
  { name: "All Stars", href: "/all-star", icon: Star },
  { name: "HOF", href: "/hof", icon: Award },
];

export function LeftNav() {
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
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              ) : Icon ? (
                <Icon className="h-5 w-5" />
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

// Keep FooterNav for mobile
export function FooterNav() {
  const pathname = usePathname();

  // Only show essential nav items on mobile footer
  const mobileNavigation = navigation
    .filter((item) => !["All Stars", "HOF"].includes(item.name))
    .map((item) =>
      item.name === "Home"
        ? { ...item, name: "Standings", href: "/standings", icon: BarChart3, image: undefined }
        : item
    )
    .filter(
      (item, index, self) => self.findIndex((i) => i.name === item.name) === index
    );

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
              ) : Icon ? (
                <Icon className="h-5 w-5" />
              ) : null}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
