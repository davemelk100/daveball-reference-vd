 "use client";

 import Link from "next/link";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { usePathname } from "next/navigation";

 export function SiteFooter() {
   const pathname = usePathname();
   const site = getMusicSiteFromPathname(pathname);

   return (
     <footer className="bg-transparent py-2 mt-auto">
       <div className="container">
         <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center">
           <nav className="flex items-center gap-2 text-[10px] text-white md:hidden justify-center">
             <Link
               href={`${site.basePath}/albums`}
               className="px-2 py-1 rounded-md transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
             >
               {site.navLabels.discography}
             </Link>
             <Link
               href={`${site.basePath}/ask`}
               className="px-2 py-1 rounded-md transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
             >
               {site.chatLabel}
             </Link>
             <Link
               href={`${site.basePath}/members`}
               className="px-2 py-1 rounded-md transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
             >
               {site.navLabels.members}
             </Link>
           </nav>
         </div>
         <div className="mt-2 text-[10px] text-white text-center md:text-[12px]">
           <div className="flex flex-wrap items-center gap-1.5 justify-center md:gap-2">
             <span>Sources:</span>
             {site.sources.map((source) => (
               <a
                 key={source.label}
                 href={source.url}
                 target="_blank"
                 rel="noreferrer"
                 className="px-2 py-1 rounded-md transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
               >
                 {source.label}
               </a>
             ))}
           </div>
         </div>
         <div className="mt-2 text-[10px] text-white text-center md:text-[12px]">
           <div className="flex flex-wrap items-center gap-1.5 justify-center md:gap-2">
             <span>Image credits:</span>
             {site.imageSources.map((source) => (
               <a
                 key={source.label}
                 href={source.url}
                 target="_blank"
                 rel="noreferrer"
                 className="px-2 py-1 rounded-md transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
               >
                 {source.label}
               </a>
             ))}
           </div>
         </div>
         {site.footerDisclaimer && (
           <div className="mt-2 text-[10px] text-white text-center md:text-[12px]">
             {site.footerDisclaimer}
           </div>
         )}
       </div>
     </footer>
   );
 }
