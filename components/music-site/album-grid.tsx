 "use client";

 import Link from "next/link";
 import Image from "next/image";
 import type { ComponentType } from "react";
 import { ShoppingCart } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import type { MusicSiteConfig } from "@/lib/music-site";

export type AlbumGridItem = {
   id: number;
   title: string;
   year: number;
   format?: string | string[];
   releaseType?: string;
 };

 type RemoteImageProps = {
   src: string;
   alt: string;
   width: number;
   height: number;
   className?: string;
   loading?: "lazy" | "eager";
   cacheKey?: string;
   preferProxy?: boolean;
 };

 type AlbumGridProps<T extends AlbumGridItem> = {
   albums: T[];
   site: MusicSiteConfig;
   getAlbumImage: (album: T) => string | null;
   getReleaseTypeLabel: (album: T) => string;
   RemoteImage: ComponentType<RemoteImageProps>;
   linkBasePath: string;
   cacheKeyPrefix: string;
   eagerCount?: number;
   imageFit?: "cover" | "contain";
   preferProxy?: boolean;
   getPurchaseUrl?: (album: T) => string | null;
 };

export function AlbumGrid<T extends AlbumGridItem>({
   albums,
   site,
   getAlbumImage,
   getReleaseTypeLabel,
   RemoteImage,
   linkBasePath,
   cacheKeyPrefix,
   eagerCount = 6,
   imageFit = "cover",
   preferProxy = true,
   getPurchaseUrl,
}: AlbumGridProps<T>) {
   const imageClassName = `w-full aspect-square rounded-lg object-${imageFit} mb-2`;

   return (
     <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
       {albums.map((album, index) => (
         <Link
           key={`${album.id ?? "release"}-${album.year ?? "unknown"}-${index}`}
           href={`${linkBasePath}/${album.id}`}
         >
           <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
             <CardContent className="p-3">
               {getAlbumImage(album) ? (
                 <RemoteImage
                   src={getAlbumImage(album) as string}
                   alt={album.title}
                   width={200}
                   height={200}
                   className={imageClassName}
                   loading={index < eagerCount ? "eager" : "lazy"}
                   cacheKey={`${cacheKeyPrefix}:${album.id}`}
                   preferProxy={preferProxy}
                 />
               ) : (
                 <div className="w-full aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                   <Image
                     src={site.placeholderIconSrc}
                     alt={`${site.shortName} logo`}
                     width={24}
                     height={24}
                     className="w-1/2 h-1/2 gbv-nav-icon object-contain"
                   />
                 </div>
               )}
               <h3 className="font-semibold text-base truncate">{album.title}</h3>
               <div className="flex items-center justify-between text-xs text-muted-foreground">
                 <span>{album.year}</span>
                 <span className="border border-border rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                   {getReleaseTypeLabel(album)}
                 </span>
               </div>
               {getPurchaseUrl?.(album) && (
                 <a
                   href={getPurchaseUrl(album)!}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-1.5 w-full text-xs text-primary hover:underline mt-1 border border-primary/30 rounded px-2 py-1.5"
                   onClick={(e) => e.stopPropagation()}
                 >
                   <ShoppingCart className="h-3.5 w-3.5" />
                   Buy on Rockathon
                 </a>
               )}
             </CardContent>
           </Card>
         </Link>
       ))}
     </div>
   );
 }
