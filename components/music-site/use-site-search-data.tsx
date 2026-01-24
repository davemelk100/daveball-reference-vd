 "use client";

 import { useEffect, useState } from "react";
 import { usePathname } from "next/navigation";
 import { getMusicSiteFromPathname } from "@/lib/music-site";
 import { amrepArtists } from "@/lib/amrep-artists-data";
 import { amrepReleases } from "@/lib/amrep-releases-data";

 export interface SiteSearchAlbum {
   id: number;
   title: string;
   year: number;
   thumb: string;
   coverUrl?: string | null;
   format?: string | string[];
   releaseType?: string;
 }

 export interface SiteSearchMember {
   id: number;
   name: string;
   active: boolean;
   imageUrl?: string | null;
 }

 export function useSiteSearchData(query: string) {
   const pathname = usePathname();
   const site = getMusicSiteFromPathname(pathname);
   const isAmrep = site.id === "amrep";
   const [albums, setAlbums] = useState<SiteSearchAlbum[]>([]);
   const [members, setMembers] = useState<SiteSearchMember[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     let isActive = true;
     const fetchData = async () => {
       if (!query) {
         if (isActive) {
           setAlbums([]);
           setMembers([]);
           setIsLoading(false);
         }
         return;
       }

       if (isAmrep) {
         try {
           const res = await fetch("/api/amrep/discogs?type=releases&per_page=100");
           if (res.ok) {
             const data = await res.json();
             const releases = Array.isArray(data?.releases) ? data.releases : [];
             if (isActive) {
               setAlbums(
                 releases.map((release: any) => ({
                   id: release.id,
                   title: `${release.artist} — ${release.title}`,
                   year: release.year,
                   thumb: release.thumb || "",
                   format: release.format,
                 }))
               );
             }
           } else if (isActive) {
             setAlbums(
               amrepReleases.map((release) => ({
                 id: release.id,
                 title: `${release.artist} — ${release.title}`,
                 year: release.year,
                 thumb: "",
                 format: release.format,
               }))
             );
           }
         } catch (err) {
           if (isActive) {
             setAlbums(
               amrepReleases.map((release) => ({
                 id: release.id,
                 title: `${release.artist} — ${release.title}`,
                 year: release.year,
                 thumb: "",
                 format: release.format,
               }))
             );
           }
         }

         if (isActive) {
           setMembers(
             amrepArtists.map((artist) => ({
               id: artist.id,
               name: artist.name,
               active: artist.active,
               imageUrl: null,
             }))
           );
           setIsLoading(false);
         }
         return;
       }

       setIsLoading(true);
       try {
         const [albumsRes, membersRes] = await Promise.all([
           fetch("/api/gbv/discogs?type=albums"),
           fetch("/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=60"),
         ]);

         if (albumsRes.ok && isActive) {
           const data = await albumsRes.json();
           setAlbums(data.albums || []);
         }

         if (membersRes.ok && isActive) {
           const data = await membersRes.json();
           let nextMembers = data.members || [];
           if (nextMembers.length <= 1) {
             const fallbackRes = await fetch("/api/gbv/discogs?type=artist");
             if (fallbackRes.ok) {
               const fallbackData = await fallbackRes.json();
               if (Array.isArray(fallbackData?.members)) {
                 nextMembers = fallbackData.members;
               }
             }
           }
           setMembers(nextMembers);
         }
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
   }, [isAmrep, query]);

   return {
     site,
     isAmrep,
     albums,
     members,
     isLoading,
   };
 }
