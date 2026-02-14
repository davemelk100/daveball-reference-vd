import type { Metadata } from "next";
import { SgMembersContent } from "@/components/sg/sg-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Skin Graft Records artist roster.",
};

export default function SgMembersPage() {
  return <SgMembersContent />;
}
