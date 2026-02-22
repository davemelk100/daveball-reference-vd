"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { RemoteImage, type RemoteImageProps } from "@/components/music-site/remote-image";

type SgRemoteImageProps = Omit<RemoteImageProps, "fallbackSrc" | "fit" | "onAllFailed"> & {
  fallbackSrc?: string;
  localFallbackSrc?: string | null;
  fit?: "cover" | "contain";
};

export function SgRemoteImage({
  fallbackSrc = "",
  localFallbackSrc,
  fit = "contain",
  className,
  alt,
  ...props
}: SgRemoteImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("rounded-lg bg-muted flex items-center justify-center p-2", className)}>
        <span className="text-xs text-muted-foreground text-center font-medium leading-tight">{alt}</span>
      </div>
    );
  }

  return (
    <RemoteImage
      {...props}
      alt={alt}
      fallbackSrc={fallbackSrc}
      localFallbackSrc={localFallbackSrc}
      fit={fit}
      className={cn("rounded-lg", className)}
      fallbackClassName="object-contain rounded-lg opacity-20 max-w-full max-h-full"
      invalidCacheValues={["/chat-gbv-box.svg", "/sg-logo.png"]}
      onAllFailed={() => setFailed(true)}
    />
  );
}
