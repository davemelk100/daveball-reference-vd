import type { Metadata } from "next";
import { RevAlbumDetailContent } from "@/components/rev/rev-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Revelation Records release details.",
  };
}

export default async function RevAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RevAlbumDetailContent albumId={id} />;
}
