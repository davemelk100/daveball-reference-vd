"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Disc3,
  Users,
  Calendar,
  Award,
  Star,
  Video,
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
  { name: "Chat GBV", href: "/gbv/ask", image: "/chat-gbv-box.svg" },
  { name: "Home", href: "/gbv", icon: Home },
  { name: "Discography", href: "/gbv/albums", icon: Disc3 },
  { name: "Members", href: "/gbv/members", icon: Users },
  { name: "Videos", href: "/gbv/videos", icon: Video },
  { name: "Side Projects", href: "/gbv/side-projects", icon: Star },
  { name: "Timeline", href: "/gbv/timeline", icon: Calendar },
  { name: "Awards", href: "/gbv/awards", icon: Award },
];

export function GbvLeftNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 bottom-0 z-40 w-20 pt-4 hidden sm:flex flex-col">
      <div className="flex flex-col items-center gap-2 px-2 py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md transition-colors w-full text-white",
                isActive
                  ? "bg-white/10"
                  : "hover:bg-white/10"
              )}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={item.name === "Chat GBV" ? 40 : 20}
                  height={item.name === "Chat GBV" ? 40 : 20}
                  className={cn(
                    item.name === "Chat GBV" ? "h-10 w-10" : "h-5 w-5",
                    "brightness-0 invert"
                  )}
                  priority={item.name === "Chat GBV"}
                  loading={item.name === "Chat GBV" ? "eager" : "lazy"}
                />
              ) : (
                Icon && <Icon className="h-5 w-5 text-white" />
              )}
              <span className="text-xs font-medium text-center leading-tight text-white">
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
    .filter((item) => !["Home", "Timeline", "Awards", "Side Projects"].includes(item.name))
    .slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] bg-white/90 border-t border-black/10 safe-area-bottom sm:hidden backdrop-blur">
      <div className="flex items-center justify-around px-2 py-1.5">
        {mobileNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-1.5 py-1 rounded-md transition-colors min-w-[44px] text-black",
                isActive ? "bg-black/5" : "hover:bg-black/5"
              )}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={item.name === "Chat GBV" ? 24 : 20}
                  height={item.name === "Chat GBV" ? 24 : 20}
                  className={cn(
                    item.name === "Chat GBV" ? "h-6 w-6" : "h-5 w-5",
                    item.name === "Chat GBV" ? "gbv-nav-icon" : ""
                  )}
                />
              ) : (
                Icon && <Icon className="h-5 w-5 text-black" />
              )}
              <span className="text-xs font-medium text-black">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
