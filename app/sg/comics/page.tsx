import type { Metadata } from "next";
import { SgComicsContent } from "@/components/sg/sg-comics-content";

export const metadata: Metadata = {
  title: "Comics",
  description: "Browse the SKiN GRAFT Comix archive — punk comics and zines from Mark Fischer and Rob Syers since 1986.",
};

export default function SgComicsPage() {
  return <SgComicsContent />;
}
