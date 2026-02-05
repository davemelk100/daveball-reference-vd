import type { Metadata } from "next";
import { RevMembersContent } from "@/components/rev/rev-members-content";

export const metadata: Metadata = {
  title: "Bands",
  description: "Explore the Revelation Records band roster.",
};

export default function RevMembersPage() {
  return <RevMembersContent />;
}
