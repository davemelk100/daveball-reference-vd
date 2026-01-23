import type { Metadata } from "next";
import { GbvMembersContent } from "@/components/amrep/amrep-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Amphetamine Reptile Records artist roster.",
};

export default function AmrepMembersPage() {
  return <GbvMembersContent />;
}
