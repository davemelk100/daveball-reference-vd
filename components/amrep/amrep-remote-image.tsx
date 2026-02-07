"use client";

import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type AmrepRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit"> & {
  fallbackSrc?: string;
  localFallbackSrc?: string | null;
  fit?: "cover" | "contain";
};

export function AmrepRemoteImage({
  fallbackSrc = "/noise-bird.svg",
  localFallbackSrc,
  fit = "contain",
  className,
  ...props
}: AmrepRemoteImageProps) {
  return (
    <RemoteImage
      {...props}
      fallbackSrc={fallbackSrc}
      localFallbackSrc={localFallbackSrc}
      fit={fit}
      className={cn("rounded-lg", className)}
      invalidCacheValues={["/chat-gbv-box.svg", "/noise-bird.svg"]}
    />
  );
}
