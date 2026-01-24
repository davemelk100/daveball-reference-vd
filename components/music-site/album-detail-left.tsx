import type React from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type AlbumDetailBadge = {
  label: string;
  variant?: "secondary" | "outline";
};

type AlbumDetailMeta = {
  label: string;
  value: string;
};

type AlbumDetailLeftProps = {
  image: React.ReactNode;
  title: string;
  subtitle?: string | null;
  badges?: AlbumDetailBadge[];
  meta?: AlbumDetailMeta[];
  linkHref?: string | null;
  linkLabel?: string | null;
  linkClassName?: string;
  children?: React.ReactNode;
};

export function AlbumDetailLeft({
  image,
  title,
  subtitle,
  badges,
  meta,
  linkHref,
  linkLabel,
  linkClassName,
  children,
}: AlbumDetailLeftProps) {
  return (
    <>
      <div className="mb-4">{image}</div>
      <h1 className="font-league mb-2">{title}</h1>
      {subtitle && <p className="text-lg text-muted-foreground mb-4">{subtitle}</p>}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, index) => (
            <Badge key={`${badge.label}-${index}`} variant={badge.variant ?? "secondary"}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
      {meta && meta.length > 0 && (
        <div className="space-y-2 mb-2">
          {meta.map((item) => (
            <p key={`${item.label}-${item.value}`} className="text-sm text-muted-foreground">
              <span className="font-medium">{item.label}:</span> {item.value}
            </p>
          ))}
        </div>
      )}
      {children}
      {linkHref && linkLabel && (
        <a
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className={
            linkClassName ?? "inline-flex items-center text-sm text-primary hover:underline"
          }
        >
          {linkLabel} <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      )}
    </>
  );
}
