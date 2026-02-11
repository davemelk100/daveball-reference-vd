 "use client";

 import { useEffect, useState } from "react";
 import { usePathname } from "next/navigation";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { amrepReleases } from "@/lib/amrep-releases-data";
 import { gbvAlbums } from "@/lib/gbv-discography-data";

 export interface SiteAlbum {
   id: number;
   title: string;
  year?: number | null;
   thumb: string;
   mainRelease?: number;
   format?: string | string[];
   releaseType?: string;
 }

 export function useSiteAlbumsData() {
   const pathname = usePathname();
   const site = getMusicSiteFromPathname(pathname);
   const isAmrep = site.id === "amrep";
   const [albums, setAlbums] = useState<SiteAlbum[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const dedupeReleases = (items: SiteAlbum[]) => {
     const seen = new Set<string>();
     return items.filter((item) => {
       const titleKey = `${item.title || ""}::${item.year || ""}`.toLowerCase();
       const key = item.mainRelease ? `main:${item.mainRelease}` : `title:${titleKey}`;
       if (seen.has(key)) return false;
       seen.add(key);
       return true;
     });
   };

   useEffect(() => {
     let isActive = true;

     const fetchData = async () => {
       if (isAmrep) {
         // Use local discography data
         if (isActive) {
           const mapped = amrepReleases.map((release) => ({
             id: release.id,
             title: release.artist ? `${release.artist} — ${release.title}` : release.title,
             year: release.year ?? 0,
             thumb: "",
             format: release.format,
           }));
           setAlbums(dedupeReleases(mapped));
           setIsLoading(false);
         }
         return;
       }

       // Use static data immediately so the page is never empty
       const staticAlbums: SiteAlbum[] = gbvAlbums.map((a) => ({
         id: a.id,
         title: a.title,
         year: a.year,
         thumb: "",
         releaseType: a.releaseType,
       }));

       const cacheKey = "gbv-albums-cache";
       let hasCachedOrStatic = false;
       try {
         const cached = localStorage.getItem(cacheKey);
         if (cached) {
           const parsed = JSON.parse(cached) as {
             timestamp: number;
             albums: SiteAlbum[];
           };
           if (parsed?.albums?.length && isActive) {
             setAlbums(parsed.albums);
             setIsLoading(false);
             hasCachedOrStatic = true;
           }
         }
       } catch {
         // ignore cache errors
       }

       if (!hasCachedOrStatic && isActive) {
         setAlbums(staticAlbums);
         setIsLoading(false);
         hasCachedOrStatic = true;
       }

       try {
         const res = await fetch("/api/gbv/discogs?type=albums");
         if (!res.ok) throw new Error("Failed to fetch");
         const data = await res.json();
         const nextAlbums = data.albums || [];
         if (nextAlbums.length > 0 && isActive) {
           setAlbums(nextAlbums);
           try {
             localStorage.setItem(
               cacheKey,
               JSON.stringify({ timestamp: Date.now(), albums: nextAlbums }),
             );
           } catch {
             // ignore cache errors
           }
         }
       } catch (err) {
         console.error(err);
       } finally {
         if (isActive) {
           setIsLoading(false);
         }
       }
     };

     fetchData();
     return () => {
       isActive = false;
     };
   }, [isAmrep]);

   return { site, isAmrep, albums, isLoading };
 }
