"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getProxiedImageUrl, normalizeImageUrl } from "@/lib/image-utils";

type SourceState = "direct" | "proxy" | "localFallback" | "fallback";

const EMPTY_ARRAY: string[] = [];

export type RemoteImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
  fallbackClassName?: string;
  localFallbackSrc?: string | null;
  fit?: "cover" | "contain";
  cacheKey?: string;
  preferProxy?: boolean;
  invalidCacheValues?: string[];
  onAllFailed?: () => void;
};

export function RemoteImage({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  fallbackSrc = "/chat-gbv-box.svg",
  fallbackClassName,
  localFallbackSrc,
  fit = "cover",
  cacheKey,
  preferProxy = true,
  invalidCacheValues = EMPTY_ARRAY,
  onAllFailed,
}: RemoteImageProps) {
  const normalized = normalizeImageUrl(src);
  const invalidCacheSet = useMemo(
    () =>
      new Set(
        [fallbackSrc, ...invalidCacheValues].filter(
          (value): value is string => Boolean(value)
        )
      ),
    [fallbackSrc, invalidCacheValues]
  );
  const [currentSrc, setCurrentSrc] = useState<string | null>(normalized);
  const [sourceState, setSourceState] = useState<SourceState>("direct");
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const effectiveFit = sourceState === "fallback" ? "contain" : fit;

  // Handle images that loaded from browser cache before React attached onLoad
  const refCallback = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    let initialSrc = normalized;
    if (cacheKey) {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached && !invalidCacheSet.has(cached)) {
          // If a new src was provided that differs from the cached value,
          // the cache is stale — clear it and use the new src instead
          const cachedUrl = getProxiedImageUrl(cached) ?? cached;
          const normalizedProxy = normalized ? (getProxiedImageUrl(normalized) ?? normalized) : null;
          if (
            !invalidCacheSet.has(cachedUrl) &&
            (!normalized || cachedUrl === normalized || cachedUrl === normalizedProxy)
          ) {
            setCurrentSrc(cachedUrl);
            setSourceState("direct");
            return;
          } else {
            localStorage.removeItem(cacheKey);
          }
        }
      } catch {
        // ignore cache errors
      }
    }

    if (preferProxy && normalized && !normalized.startsWith("/")) {
      initialSrc = getProxiedImageUrl(normalized);
      setSourceState("proxy");
    } else {
      setSourceState("direct");
    }

    setCurrentSrc((prev) => {
      if (prev !== initialSrc) setLoaded(false);
      return initialSrc;
    });
  }, [cacheKey, invalidCacheSet, normalized, preferProxy]);

  const handleError = () => {
    if (!normalized) {
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setSourceState("fallback");
      } else {
        setCurrentSrc(null);
        onAllFailed?.();
      }
      return;
    }

    if (sourceState === "direct") {
      setCurrentSrc(getProxiedImageUrl(normalized));
      setSourceState("proxy");
      return;
    }

    if (sourceState === "proxy" && localFallbackSrc) {
      setCurrentSrc(localFallbackSrc);
      setSourceState("localFallback");
      return;
    }

    if (sourceState === "proxy" || sourceState === "localFallback") {
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setSourceState("fallback");
      } else {
        setCurrentSrc(null);
        onAllFailed?.();
      }
      return;
    }

    if (sourceState === "fallback") {
      onAllFailed?.();
      setLoaded(true);
    }
  };

  if (!currentSrc) return null;

  return (
    <img
      ref={refCallback}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      onLoad={() => {
        setLoaded(true);
        if (!cacheKey || sourceState === "fallback") return;
        try {
          localStorage.setItem(cacheKey, currentSrc);
        } catch {
          // ignore cache errors
        }
      }}
      className={cn(
        "block",
        !loaded && "bg-muted animate-pulse",
        sourceState === "fallback" && fallbackClassName
          ? fallbackClassName
          : cn(
              effectiveFit === "cover" ? "object-cover" : "object-contain",
              className
            )
      )}
    />
  );
}
