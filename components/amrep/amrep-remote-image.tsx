"use client";

import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type AmrepRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit"> & {
  fallbackSrc?: string;
  fit?: "cover" | "contain";
};

export function AmrepRemoteImage({
  fallbackSrc = "/noise-bird.svg",
  fit = "contain",
  className,
  ...props
}: AmrepRemoteImageProps) {
  return (
    <RemoteImage
      {...props}
      fallbackSrc={fallbackSrc}
      fit={fit}
      className={cn("rounded-lg", className)}
      invalidCacheValues={["/chat-gbv-box.svg", "/noise-bird.svg"]}
    />
  );
}
