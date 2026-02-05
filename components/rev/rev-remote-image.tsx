"use client";

import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type RevRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit"> & {
  fallbackSrc?: string;
  fit?: "cover" | "contain";
};

export function RevRemoteImage({
  fallbackSrc = "/revelation-logo.png",
  fit = "contain",
  className,
  ...props
}: RevRemoteImageProps) {
  return (
    <RemoteImage
      {...props}
      fallbackSrc={fallbackSrc}
      fit={fit}
      className={cn("rounded-lg", className)}
      invalidCacheValues={["/chat-gbv-box.svg", "/noise-bird.svg", "/revelation-logo.png"]}
    />
  );
}
