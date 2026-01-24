import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MusicSiteConfig } from "@/lib/music-site";
import { ArrowLeft } from "lucide-react";

type AlbumDetailLayoutProps = {
  site: MusicSiteConfig;
  backHref: string;
  backLabel: string;
  leftContent: React.ReactNode;
  rightTitle: string;
  rightContent: React.ReactNode;
};

export function AlbumDetailLayout({
  site,
  backHref,
  backLabel,
  leftContent,
  rightTitle,
  rightContent,
}: AlbumDetailLayoutProps) {
  return (
    <div className="container py-6">
      <Link href={backHref}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to {backLabel}
        </Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">{leftContent}</CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{rightTitle}</CardTitle>
            </CardHeader>
            <CardContent>{rightContent}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
