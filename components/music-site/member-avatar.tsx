 "use client";

 import { useEffect, useState } from "react";
import Image from "next/image";
import { RemoteImage } from "@/components/music-site/remote-image";
import { getLocalMemberImage } from "@/lib/gbv-member-images";
import { getProxiedImageUrl, normalizeImageUrl } from "@/lib/image-utils";

const SITE_LOOKUP_CONTEXT: Record<string, string> = {
  gbv: "Guided By Voices",
  amrep: "Amphetamine Reptile Records",
  e6: "Elephant 6 Recording Company",
  sg: "Skin Graft Records",
};

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
   placeholderSize?: number;
   placeholderClassName?: string;
   fallbackClassName?: string;
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
   placeholderSize = 24,
   placeholderClassName = "w-1/2 h-1/2 gbv-nav-icon object-contain",
   fallbackClassName,
 }: MemberAvatarProps) {
   const [hasError, setHasError] = useState(false);
   const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
   const [lookupAttempted, setLookupAttempted] = useState(false);
  const normalizedImageUrl = normalizeImageUrl(imageUrl);
   const localImageUrl = getLocalMemberImage(memberId);
   const nameKey = name.toLowerCase();
  const fallbackImageUrl = getProxiedImageUrl(fallbackImages?.[nameKey] || null);
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

     if (fallbackImageUrl) {
       setResolvedImageUrl(fallbackImageUrl);
       setLookupAttempted(true);
       return;
     }

     if (shouldSkipLookup || lookupAttempted) return;

     const cacheKey = `${cacheKeyPrefix}-member-image:${nameKey}`;
     try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const cachedUrl = getProxiedImageUrl(cached) ?? cached;
          setResolvedImageUrl(cachedUrl);
         setLookupAttempted(true);
         return;
       }
     } catch {
       // ignore cache errors
     }

     let isActive = true;
    const lookupContext = SITE_LOOKUP_CONTEXT[cacheKeyPrefix];
    const useDiscogsLookup = cacheKeyPrefix === "e6" || cacheKeyPrefix === "rev";

    async function fetchImage() {
       try {
        let imageUrl: string | null = null;

        if (useDiscogsLookup) {
          const q = new URLSearchParams({ type: "artist", name });
          const res = await fetch(`/api/${cacheKeyPrefix}/discogs?${q.toString()}`);
          if (!res.ok) return;
          const data = await res.json();
          imageUrl = data?.artist?.imageUrl || null;
        } else {
          const query = new URLSearchParams({ name });
          if (lookupContext) {
            query.set("context", lookupContext);
          }
          const res = await fetch(`/api/gbv/commons-image?${query.toString()}`);
          if (!res.ok) return;
          const data = await res.json();
          imageUrl = typeof data?.imageUrl === "string" && data.imageUrl.length > 0
            ? data.imageUrl
            : null;
        }

        if (imageUrl) {
          const proxiedUrl = getProxiedImageUrl(imageUrl);
          if (!proxiedUrl) return;
           if (isActive) {
            setResolvedImageUrl(proxiedUrl);
           }
           try {
            localStorage.setItem(cacheKey, proxiedUrl);
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

     fetchImage();
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
           width={placeholderSize}
           height={placeholderSize}
           className={placeholderClassName}
         />
       </div>
     );
   }

   return (
    <div className="w-full aspect-square mb-2 mx-auto relative rounded-lg overflow-hidden">
      <RemoteImage
         src={resolvedImageUrl}
         alt={`${name} photo`}
        width={400}
        height={400}
        fallbackSrc={fallbackIconSrc}
        fallbackClassName={fallbackClassName}
        preferProxy={false}
        className={
          fit === "contain"
            ? "rounded-lg object-contain w-full h-full"
            : "rounded-lg object-cover w-full h-full"
        }
       />
     </div>
   );
 }
