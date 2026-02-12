 "use client";

 import Link from "next/link";
 import Image from "next/image";
 import { usePathname } from "next/navigation";
 import { useEffect, useState } from "react";
 import {
   Home,
   Disc3,
   Users,
   Calendar,
   Award,
   Star,
   Video,
   Loader2,
   type LucideIcon,
 } from "lucide-react";
 import { cn } from "@/lib/utils";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { SiteSwitcher } from "@/components/site-switcher";

 interface NavItem {
   name: string;
   href: string;
   icon?: LucideIcon;
   image?: string;
   mobileHidden?: boolean;
 }

 export function SiteLeftNav() {
   const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
   const site = getMusicSiteFromPathname(pathname);
   const isAmrep = site.id === "amrep";
   const isRev = site.id === "rev";
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);
   const navigation: NavItem[] = [
     { name: site.chatLabel, href: `${site.basePath}/ask`, image: site.chatIconSrc },
     { name: "Home", href: site.basePath, icon: Home },
     { name: site.navLabels.discography, href: `${site.basePath}/albums`, icon: Disc3 },
     { name: site.navLabels.members, href: `${site.basePath}/members`, icon: Users },
     { name: "Videos", href: `${site.basePath}/videos`, icon: Video },
     { name: site.navLabels.sideProjects, href: `${site.basePath}/side-projects`, icon: Star, mobileHidden: true },
     { name: "Timeline", href: `${site.basePath}/timeline`, icon: Calendar, mobileHidden: true },
     { name: "Awards", href: `${site.basePath}/awards`, icon: Award, mobileHidden: true },
   ];

   return (
     <nav className="fixed top-0 left-0 bottom-0 z-40 w-20 pt-4 hidden sm:flex flex-col">
       <div className="flex flex-col items-center gap-2 px-2 py-2">
         <SiteSwitcher variant="music" />
         {navigation.map((item) => {
           const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPending = pendingHref === item.href && pendingHref !== pathname;
          const showActive = isActive || isPending;
           const isChat = item.href === `${site.basePath}/ask`;
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
                 "group flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md transition-all duration-200 w-full text-white",
                showActive
                   ? "bg-white/10 -translate-y-0.5 shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
                   : "hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
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
                     isPending && "animate-spin [animation-duration:2s]",
                     !isAmrep && !isRev ? "brightness-0 invert" : ""
                   )}
                   priority={isChat}
                   loading={isChat ? "eager" : "lazy"}
                 />
               ) : (
                 Icon && (
                   <Icon
                     className={cn(
                       "h-5 w-5 text-white transition-transform duration-200 group-hover:scale-110",
                       isPending && "animate-spin [animation-duration:2s]"
                     )}
                   />
                 )
               )}
              <span className="flex items-center justify-center text-xs font-medium text-center leading-tight text-white">
                {item.name}
              </span>
             </Link>
           );
         })}
       </div>
     </nav>
   );
 }

 export function SiteFooterNav() {
   const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
   const site = getMusicSiteFromPathname(pathname);
   const isAmrep = site.id === "amrep";
   const isRev = site.id === "rev";
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);
   const navigation: NavItem[] = [
     { name: site.chatLabel, href: `${site.basePath}/ask`, image: site.chatIconSrc },
     { name: "Home", href: site.basePath, icon: Home },
     { name: site.navLabels.discography, href: `${site.basePath}/albums`, icon: Disc3 },
     { name: site.navLabels.members, href: `${site.basePath}/members`, icon: Users },
     { name: "Videos", href: `${site.basePath}/videos`, icon: Video },
     { name: site.navLabels.sideProjects, href: `${site.basePath}/side-projects`, icon: Star, mobileHidden: true },
     { name: "Timeline", href: `${site.basePath}/timeline`, icon: Calendar, mobileHidden: true },
     { name: "Awards", href: `${site.basePath}/awards`, icon: Award, mobileHidden: true },
   ];

   const mobileNavigation = navigation
     .filter((item) => !item.mobileHidden)
     .slice(0, 5);

   return (
     <nav className="fixed bottom-0 left-0 right-0 z-[60] bg-white/90 border-t border-black/10 safe-area-bottom sm:hidden backdrop-blur">
       <div className="flex items-center justify-around px-2 py-1.5">
         {mobileNavigation.map((item) => {
           const Icon = item.icon;
          const isActive = pathname === item.href;
          const isPending = pendingHref === item.href && pendingHref !== pathname;
          const showActive = isActive || isPending;
           const isChat = item.href === `${site.basePath}/ask`;
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
                 "flex flex-col items-center justify-center gap-0.5 px-1.5 py-1 rounded-md transition-colors min-w-[44px] text-black",
                showActive
                   ? "bg-black/10 ring-1 ring-black/30 shadow-[0_0_0_1px_rgba(0,0,0,0.15),_inset_0_0_0_1px_rgba(0,0,0,0.08)]"
                   : "hover:bg-black/5"
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
                     isChat ? "gbv-nav-icon" : "",
                     isPending && "animate-spin [animation-duration:2s]",
                     !isAmrep && !isRev ? "brightness-0 invert" : ""
                   )}
                 />
               ) : (
                 Icon && (
                   <Icon
                     className={cn(
                       "h-5 w-5 text-black",
                       isPending && "animate-spin [animation-duration:2s]"
                     )}
                   />
                 )
               )}
              <span className="flex items-center justify-center text-xs font-medium text-black">
                {item.name}
              </span>
             </Link>
           );
         })}
       </div>
     </nav>
   );
 }
