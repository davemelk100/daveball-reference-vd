"use client";

import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type SgRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit"> & {
  fallbackSrc?: string;
  localFallbackSrc?: string | null;
  fit?: "cover" | "contain";
};

export function SgRemoteImage({
  fallbackSrc = "/sg-logo.png",
  localFallbackSrc,
  fit = "contain",
  className,
  ...props
}: SgRemoteImageProps) {
  return (
    <RemoteImage
      {...props}
      fallbackSrc={fallbackSrc}
      localFallbackSrc={localFallbackSrc}
      fit={fit}
      className={cn("rounded-lg", className)}
      fallbackClassName="object-contain rounded-lg opacity-20 max-w-full max-h-full"
      invalidCacheValues={["/chat-gbv-box.svg", "/sg-logo.png"]}
    />
  );
}
