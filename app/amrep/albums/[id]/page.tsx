import type { Metadata } from "next";
import { GbvAlbumDetailContent } from "@/components/amrep/amrep-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Amphetamine Reptile Records release details.",
  };
}

export default async function AmrepAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <GbvAlbumDetailContent albumId={id} />;
}
