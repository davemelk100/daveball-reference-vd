import type { Metadata } from "next";
import { SgMemberDetailContent } from "@/components/sg/sg-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Artist ${id}`,
    description: "Skin Graft Records artist details.",
  };
}

export default async function SgMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SgMemberDetailContent memberId={id} />;
}
