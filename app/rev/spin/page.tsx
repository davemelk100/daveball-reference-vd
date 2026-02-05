import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the Revelation Records catalog.",
};

export default function RevSpinPage() {
  return <SpinContent />;
}
