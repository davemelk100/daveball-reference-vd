import type { Metadata } from "next";
import { GbvMemberDetailContent } from "@/components/amrep/amrep-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Artist ${id}`,
    description: "Amphetamine Reptile Records artist details.",
  };
}

export default async function AmrepMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <GbvMemberDetailContent memberId={id} />;
}
