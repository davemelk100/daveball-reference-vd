import type { Metadata } from "next";
import { GbvAwardsContent } from "@/components/amrep/amrep-awards-content";

export const metadata: Metadata = {
  title: "Milestones",
  description: "Milestones and recognition for Amphetamine Reptile Records.",
};

export default function AmrepAwardsPage() {
  return <GbvAwardsContent />;
}
