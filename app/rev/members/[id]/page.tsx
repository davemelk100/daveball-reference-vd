import type { Metadata } from "next";
import { RevMemberDetailContent } from "@/components/rev/rev-member-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Band ${id}`,
    description: "Revelation Records band details.",
  };
}

export default async function RevMemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RevMemberDetailContent memberId={id} />;
}
