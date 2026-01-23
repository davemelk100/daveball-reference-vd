"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SourceState = "direct" | "fallback";

type GbvRemoteImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
  fit?: "cover" | "contain";
  cacheKey?: string;
  preferProxy?: boolean;
};

function normalizeUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("/")) return url;
  return url.replace(/^http:/, "https:");
}

export function GbvRemoteImage({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  fallbackSrc = "/noise-bird.png",
  fit = "contain",
  cacheKey,
  preferProxy: _preferProxy = false,
}: GbvRemoteImageProps) {
  const normalized = normalizeUrl(src);
  const [currentSrc, setCurrentSrc] = useState<string | null>(normalized);
  const [sourceState, setSourceState] = useState<SourceState>("direct");
  const effectiveFit = "contain";

  useEffect(() => {
    let initialSrc = normalized;
    if (cacheKey) {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const isInvalidCached =
            cached === fallbackSrc || cached.endsWith("/chat-gbv-box.svg");
          if (!isInvalidCached) {
            setCurrentSrc(cached);
            setSourceState("direct");
            return;
          }
        }
      } catch {
        // ignore cache errors
      }
    }

    setSourceState("direct");

    setCurrentSrc(initialSrc);
  }, [cacheKey, normalized]);

  const handleError = () => {
    if (!normalized) {
      setCurrentSrc(fallbackSrc);
      setSourceState("fallback");
      return;
    }

    if (sourceState === "direct") {
      setCurrentSrc(fallbackSrc);
      setSourceState("fallback");
    }
  };

  if (!currentSrc) return null;

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      onLoad={() => {
        if (!cacheKey || sourceState === "fallback") return;
        try {
          localStorage.setItem(cacheKey, currentSrc);
        } catch {
          // ignore cache errors
        }
      }}
      className={cn("block", "object-contain", className)}
    />
  );
}
