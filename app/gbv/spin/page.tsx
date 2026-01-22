import type { Metadata } from "next";
import { GbvSpinContent } from "@/components/gbv/gbv-spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Zoetrope animation on a spinning vinyl record.",
};

export default function GbvSpinPage() {
  return <GbvSpinContent />;
}
