import type { Metadata } from "next";
import { SgAlbumDetailContent } from "@/components/sg/sg-album-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Release ${id}`,
    description: "Skin Graft Records release details.",
  };
}

export default async function SgAlbumDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SgAlbumDetailContent albumId={id} />;
}
