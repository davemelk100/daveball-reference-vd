import type { Metadata } from "next";
import { USPBLAskContent } from "@/components/uspbl/uspbl-ask-content";

export const metadata: Metadata = {
  title: "ChatUSPBL",
  description: "Ask questions about the USPBL.",
};

export default function USPBLAskPage() {
  return <USPBLAskContent />;
}
