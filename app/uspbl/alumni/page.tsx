import type { Metadata } from "next";
import { USPBLAlumniContent } from "@/components/uspbl/uspbl-alumni-content";
import { getUSPBLMLBAlumni } from "@/lib/uspbl-api";

export const metadata: Metadata = {
  title: "MLB Alumni",
  description: "USPBL players signed by MLB organizations.",
};

export default async function USPBLAlumniPage() {
  const alumni = getUSPBLMLBAlumni();
  return <USPBLAlumniContent alumni={alumni} />;
}
