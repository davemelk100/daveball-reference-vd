import type { Metadata } from "next";
import { AmrepSpinContent } from "@/components/amrep/amrep-spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the AmRep catalog.",
};

export default function AmrepSpinPage() {
  return <AmrepSpinContent />;
}
