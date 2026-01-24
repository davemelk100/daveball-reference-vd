 "use client";

 import { useEffect, useState } from "react";
 import { usePathname } from "next/navigation";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { getAmrepReleaseById } from "@/lib/amrep-releases-data";

 export interface GbvAlbumDetail {
   id: number;
   title: string;
   year: number;
   images?: Array<{ uri: string; type: string }>;
   tracklist?: Array<{ position: string; title: string; duration: string }>;
   genres?: string[];
   styles?: string[];
   labels?: Array<{ name: string }>;
   formats?: Array<{ name: string; descriptions?: string[] }>;
   uri?: string;
 }

 export interface AmrepAlbumDetail {
   id: number;
   title: string;
   year: number;
   thumb?: string | null;
   mainRelease?: number;
   format?: string | string[];
   labels?: Array<{ name: string }>;
   artists?: Array<{ name: string }>;
   styles?: string[];
   genres?: string[];
   tracklist?: Array<{ position: string; title: string; duration: string }>;
   releaseType?: string;
 }

 export function useSiteAlbumDetail(albumId: string) {
   const pathname = usePathname();
   const site = getMusicSiteFromPathname(pathname);
   const isAmrep = site.id === "amrep";
   const [album, setAlbum] = useState<GbvAlbumDetail | AmrepAlbumDetail | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     let isActive = true;

     async function fetchAlbum() {
       setIsLoading(true);
       setError(null);

       if (isAmrep) {
         try {
           const res = await fetch(`/api/amrep/discogs?type=release&id=${albumId}`);
           if (res.ok) {
             const data = await res.json();
             if (isActive) {
               setAlbum(data.release);
               setIsLoading(false);
             }
             return;
           }
         } catch {
           // fall back to local data
         }

         const release = getAmrepReleaseById(Number(albumId));
         if (isActive) {
           if (release) {
             setAlbum({
               id: release.id,
               title: `${release.artist} — ${release.title}`,
               year: release.year,
               thumb: "",
               format: release.format,
               artists: release.artist ? [{ name: release.artist }] : undefined,
             });
           } else {
             setError("Release not found");
             setAlbum(null);
           }
           setIsLoading(false);
         }
         return;
       }

       try {
         const res = await fetch(`/api/gbv/discogs?type=master&id=${albumId}`);
         if (!res.ok) throw new Error("Failed to fetch album");
         const data = await res.json();
         if (isActive) {
           setAlbum(data);
         }
       } catch (err) {
         if (isActive) {
           setError("Failed to load album details");
         }
         console.error(err);
       } finally {
         if (isActive) {
           setIsLoading(false);
         }
       }
     }

     fetchAlbum();
     return () => {
       isActive = false;
     };
   }, [albumId, isAmrep]);

   return { site, isAmrep, album, isLoading, error };
 }
