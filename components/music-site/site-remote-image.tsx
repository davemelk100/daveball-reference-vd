"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type SiteRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc"> & {
  fallbackSrc?: string;
};

export function SiteRemoteImage({
  fallbackSrc,
  fit,
  className,
  ...props
}: SiteRemoteImageProps) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";

  const defaultFallbackSrc = fallbackSrc || site.placeholderIconSrc;
  const defaultFit = fit || (isAmrep ? "contain" : "cover");

  return (
    <RemoteImage
      {...props}
      fallbackSrc={defaultFallbackSrc}
      fit={defaultFit}
      className={cn("rounded-lg", className)}
      invalidCacheValues={isAmrep ? ["/chat-gbv-box.svg"] : undefined}
    />
  );
}
