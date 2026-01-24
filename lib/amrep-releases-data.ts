import discography from "@/data/amrep-discography.json";

export interface AmrepRelease {
  id: number;
  catalogNo?: string;
  title: string;
  artist: string;
  year?: number | null;
  format?: string | null;
  section?: "US" | "Singles";
  highlight?: string;
}

export const amrepReleases = discography as AmrepRelease[];

export function getAmrepReleaseById(id: number): AmrepRelease | undefined {
  return amrepReleases.find((release) => release.id === id);
}
