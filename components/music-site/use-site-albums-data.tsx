 "use client";

 import { useEffect, useState } from "react";
 import { usePathname } from "next/navigation";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { amrepReleases } from "@/lib/amrep-releases-data";

 export interface SiteAlbum {
   id: number;
   title: string;
   year: number;
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
         try {
           const res = await fetch("/api/amrep/discogs?type=releases&per_page=100");
           if (!res.ok) throw new Error("Failed to fetch releases");
           const data = await res.json();
           const releases = Array.isArray(data?.releases) ? data.releases : [];
           if (releases.length > 0 && isActive) {
             const mapped = releases.map((release: any) => ({
               id: release.id,
               title: `${release.artist} — ${release.title}`,
               year: release.year,
               thumb: release.thumb || "",
               mainRelease: release.mainRelease ?? release.main_release,
               format: release.format,
             }));
             setAlbums(dedupeReleases(mapped));
             setIsLoading(false);
             return;
           }
         } catch (err) {
           console.error(err);
         }

         if (isActive) {
           const mapped = amrepReleases.map((release) => ({
             id: release.id,
             title: `${release.artist} — ${release.title}`,
             year: release.year,
             thumb: "",
             format: release.format,
           }));
           setAlbums(dedupeReleases(mapped));
           setIsLoading(false);
         }
         return;
       }

       const cacheKey = "gbv-albums-cache";
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
           }
         }
       } catch {
         // ignore cache errors
       }

       try {
         const res = await fetch("/api/gbv/discogs?type=albums");
         if (!res.ok) throw new Error("Failed to fetch");
         const data = await res.json();
         const nextAlbums = data.albums || [];
         if (isActive) {
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
