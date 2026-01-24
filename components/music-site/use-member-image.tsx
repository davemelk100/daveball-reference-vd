 "use client";

 import { useEffect, useState } from "react";

 type UseMemberImageOptions = {
   siteId: string;
   memberName?: string | null;
   memberId?: string | number;
   localImageUrl?: string | null;
   discogsImageUrl?: string | null;
   fallbackImageUrl?: string | null;
   skipRemoteLookup?: boolean;
 };

 export function useMemberImage({
   siteId,
   memberName,
   memberId,
   localImageUrl,
   discogsImageUrl,
   fallbackImageUrl,
   skipRemoteLookup,
 }: UseMemberImageOptions) {
   const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
   const [lookupAttempted, setLookupAttempted] = useState(false);
   const normalizedName = memberName?.toLowerCase().trim() || "";

   useEffect(() => {
     setResolvedImageUrl(null);
     setLookupAttempted(false);
   }, [memberId, normalizedName]);

   useEffect(() => {
     if (!memberName) return;

     if (localImageUrl) {
       setResolvedImageUrl(localImageUrl);
       return;
     }

     if (discogsImageUrl) {
       setResolvedImageUrl(discogsImageUrl);
       return;
     }

     if (fallbackImageUrl && !lookupAttempted) {
       setResolvedImageUrl(fallbackImageUrl);
       setLookupAttempted(true);
       return;
     }

     if (skipRemoteLookup || lookupAttempted) return;

     const cacheKey = `${siteId}-member-image:${normalizedName}`;
     try {
       const cached = localStorage.getItem(cacheKey);
       if (cached) {
         setResolvedImageUrl(cached);
         setLookupAttempted(true);
         return;
       }
     } catch {
       // ignore cache errors
     }

     let isActive = true;
     const fetchCommonsImage = async () => {
       try {
         const res = await fetch(
           `/api/gbv/commons-image?name=${encodeURIComponent(memberName)}`,
         );
         if (!res.ok) return;
         const data = await res.json();
         if (isActive && typeof data?.imageUrl === "string") {
           setResolvedImageUrl(data.imageUrl);
           try {
             localStorage.setItem(cacheKey, data.imageUrl);
           } catch {
             // ignore cache errors
           }
         }
       } catch {
         // ignore lookup errors
       } finally {
         if (isActive) {
           setLookupAttempted(true);
         }
       }
     };

     fetchCommonsImage();
     return () => {
       isActive = false;
     };
   }, [
     discogsImageUrl,
     fallbackImageUrl,
     localImageUrl,
     lookupAttempted,
     memberName,
     normalizedName,
     siteId,
     skipRemoteLookup,
   ]);

   return { resolvedImageUrl };
 }
