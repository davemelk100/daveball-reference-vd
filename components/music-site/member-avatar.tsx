 "use client";

 import { useEffect, useState } from "react";
 import Image from "next/image";
 import { getLocalMemberImage } from "@/lib/gbv-member-images";

 type MemberAvatarProps = {
   name: string;
   imageUrl?: string | null;
   memberId?: number;
   fallbackIconSrc: string;
   cacheKeyPrefix: string;
   skipRemoteLookup?: boolean;
   fallbackImages?: Record<string, string>;
   skipImages?: Record<string, true>;
   fit?: "cover" | "contain";
 };

 export function MemberAvatar({
   name,
   imageUrl,
   memberId,
   fallbackIconSrc,
   cacheKeyPrefix,
   skipRemoteLookup,
   fallbackImages,
   skipImages,
   fit = "cover",
 }: MemberAvatarProps) {
   const [hasError, setHasError] = useState(false);
   const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
   const [lookupAttempted, setLookupAttempted] = useState(false);
   const normalizedImageUrl = imageUrl?.replace(/^http:/, "https:") || null;
   const localImageUrl = getLocalMemberImage(memberId);
   const nameKey = name.toLowerCase();
   const fallbackImageUrl = fallbackImages?.[nameKey] || null;
   const shouldSkipLookup = skipRemoteLookup || Boolean(skipImages?.[nameKey]);

   useEffect(() => {
     if (localImageUrl && !hasError) {
       setResolvedImageUrl(localImageUrl);
       return;
     }

     if (normalizedImageUrl && !hasError) {
       setResolvedImageUrl(normalizedImageUrl);
       return;
     }

     if (fallbackImageUrl && !lookupAttempted) {
       setResolvedImageUrl(fallbackImageUrl);
       setLookupAttempted(true);
       return;
     }

     if (shouldSkipLookup || lookupAttempted) return;

     const cacheKey = `${cacheKeyPrefix}-member-image:${nameKey}`;
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
     async function fetchCommons() {
       try {
         const res = await fetch(
           `/api/gbv/commons-image?name=${encodeURIComponent(name)}`,
         );
         if (!res.ok) return;
         const data = await res.json();
         if (typeof data?.imageUrl === "string" && data.imageUrl.length > 0) {
           if (isActive) {
             setResolvedImageUrl(data.imageUrl);
           }
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
     }

     fetchCommons();
     return () => {
       isActive = false;
     };
   }, [
     cacheKeyPrefix,
     fallbackImageUrl,
     hasError,
     localImageUrl,
     lookupAttempted,
     name,
     nameKey,
     normalizedImageUrl,
     shouldSkipLookup,
   ]);

   if (!resolvedImageUrl || hasError) {
     return (
       <div className="w-full aspect-square rounded-lg mb-2 mx-auto flex items-center justify-center">
         <Image
           src={fallbackIconSrc}
           alt="Artist placeholder"
           width={24}
           height={24}
           className="w-1/2 h-1/2 gbv-nav-icon object-contain"
         />
       </div>
     );
   }

   return (
     <div className="w-full aspect-square mb-2 mx-auto relative">
       <Image
         src={resolvedImageUrl}
         alt={`${name} photo`}
         fill
         sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
         className={fit === "contain" ? "rounded-lg object-contain" : "rounded-lg object-cover"}
         onError={() => setHasError(true)}
         unoptimized
       />
     </div>
   );
 }
