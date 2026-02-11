import { gbvAlbums } from "./gbv-discography-data";

export interface GbvRecordOfDay {
  id?: number;
  title: string;
  year: number;
  highlight: string;
  thumb?: string;
}

// Pick a daily record from a list of albums
export function pickDailyGbvRecord(
  albums: Array<{ id?: number; title?: string; year?: number; thumb?: string }>,
  date = new Date()
): GbvRecordOfDay | null {
  if (!albums || albums.length === 0) return null;

  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % albums.length;
  const album = albums[index];

  return {
    id: album.id,
    title: album.title || "Unknown",
    year: album.year || 0,
    highlight: `${album.year || "Unknown year"}`,
    thumb: album.thumb,
  };
}

// Pick a daily record from static GBV discography data
export function getDailyGbvRecord(date = new Date()): GbvRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % gbvAlbums.length;
  const album = gbvAlbums[index];

  return {
    id: album.id,
    title: album.title,
    year: album.year,
    highlight: `${album.year}`,
  };
}
