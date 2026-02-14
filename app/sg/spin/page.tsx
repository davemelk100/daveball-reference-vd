import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the Skin Graft catalog.",
};

export default function SgSpinPage() {
  return <SpinContent />;
}
