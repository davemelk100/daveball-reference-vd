import { getAllSgReleases, getSgReleaseImageUrl, type SgRelease } from "./sg-discography-data";

export interface SgRecordOfDay {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

const SG_FACTS: Record<string, string> = {
  "coffin fit": "Dazzling Killmen's debut 7-inch and Skin Graft's very first release (GR001).",
  "gravity on": "Mount Shasta's debut single, establishing their place on the nascent label.",
  "constructive destruction": "The Flying Luttenbachers' explosive debut, blending free jazz and punk with abandon.",
  "face of collapse": "Dazzling Killmen's masterwork — one of the most intense noise rock records of the 1990s.",
  "long hair in three stages": "U.S. Maple's radical debut, deconstructing rock to its skeletal remains.",
  "sang phat editor": "U.S. Maple's second album, further warping and twisting rock conventions.",
  "talker": "U.S. Maple at their most abstract and uncompromising.",
  "gods of chaos": "The Flying Luttenbachers channeling pure sonic chaos through no wave and free jazz.",
  "economy of motion": "Colossamite's debut, continuing the Dazzling Killmen legacy with even more angular noise.",
  "not a food": "Cheer-Accident's avant-prog statement on Skin Graft.",
  "bobby conn": "Bobby Conn's self-titled debut, introducing his art-rock theatricality to the label.",
  "the golden age": "Bobby Conn's ambitious follow-up, blending glam, disco, and art rock.",
  "storm & stress": "Storm & Stress's debut featuring future Battles guitarist Ian Williams.",
  "ear-bleeding country": "The definitive Skin Graft compilation, surveying the label's noisy landscape.",
  "watch out": "Mount Shasta's second album, showcasing their evolution in noise rock.",
  "put the creep on": "Mount Shasta fully exploring their weird and wonderful noise rock vision.",
  "these hands of mine": "Quintron's garage-electronic experiments meeting Skin Graft's noise aesthetic.",
  "10000 light years": "Japanese noise legends Zeni Geva bringing crushing intensity to the label.",
  "retrospektiull": "A career-spanning overview of The Flying Luttenbachers' chaotic output.",
  "burning stone": "Japanese duo Ruins delivering their signature Zeuhl-influenced progressive madness.",
  "teeny shiny": "Melt-Banana's blinding speed and noise on Skin Graft.",
  "purple on time": "U.S. Maple's final album, a fitting conclusion to their deconstructionist project.",
  "carnage": "Lair of the Minotaur's mythological sludge metal debut.",
  "gamelan into the mink supernatural": "The Psychic Paramount's krautrock-meets-noise-rock epic.",
  "ii": "The Psychic Paramount's powerful second album of hypnotic noise rock.",
};

function getSgFact(title: string): string | undefined {
  return SG_FACTS[title.toLowerCase()];
}

// Convert a release to a record of the day
function toRecordOfDay(release: SgRelease): SgRecordOfDay {
  return {
    catalogNumber: release.catalogNumber,
    artist: release.artist,
    title: release.title,
    year: release.year,
    highlight: getSgFact(release.title) || `GR ${String(release.catalogNumber).padStart(3, "0")}, released in ${release.year}.`,
    coverUrl: getSgReleaseImageUrl(release.catalogNumber),
  };
}

export function getDailySgRecord(date?: Date): SgRecordOfDay {
  const releases = getAllSgReleases();
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % releases.length;
  return toRecordOfDay(releases[index]);
}
