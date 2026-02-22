// Skin Graft Records Artists

import { getSgLocalArtistImage } from "./sg-local-images";

export interface SgArtist {
  id: string;
  name: string;
  genre?: string;
  yearsActive?: string;
  wikipediaUrl?: string;
  isGuestStar?: boolean;
}

// Artist image URLs from Wikipedia / Discogs
export const sgArtistImages: Record<string, string> = {
  "flying-luttenbachers":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Weasel_Walter_at_Knitting_Factory%2C_2007-01-30.jpg/250px-Weasel_Walter_at_Knitting_Factory%2C_2007-01-30.jpg",
  "us-maple":
    "https://i.discogs.com/gKLw8d1u8eFpWl4E0sMAj1UoiZ-Y3wXnv5bFr9FU_SA/rs:fit/g:sm/q:90/h:450/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTMzMzQ2/Mi0xNTc0NzY5NzU5/LTMzNjUuanBlZw.jpeg",
  "dazzling-killmen":
    "https://i.discogs.com/zVz4_7YGwGGgjbD9ufKlXL-8CkRfDHRVrR_3nQJzJrU/rs:fit/g:sm/q:90/h:367/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTU5ODcx/LTEyMDYwMjk5Njku/anBlZw.jpeg",
  "mount-shasta":
    "https://i.discogs.com/n_hZCz78KKCCuRW5S0EJNhI_Y4ViN-Ny3hVQYGmXnuU/rs:fit/g:sm/q:90/h:399/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTMwNjM3/OC0xNjA3MTI3MjE4/LTUwNTkuanBlZw.jpeg",
  "cheer-accident":
    "https://i.discogs.com/H0bSaXJNmU5m5CvBdrGy75x4qvylDxf3DVZL_NyNE4E/rs:fit/g:sm/q:90/h:400/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTk2OTE1/LTEyNzM3OTk3NDIu/anBlZw.jpeg",
  "lake-of-dracula":
    "https://i.discogs.com/hl8PoYnLXAXvn_VfEoOFdI3gHhVZ4fjE0FMlgwrrlgI/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTYyMjkx/OC0xNDU5MTk0MDk4/LTcxNzQuanBlZw.jpeg",
  "colossamite":
    "https://f4.bcbits.com/img/a2076963588_10.jpg",
  "scissor-girls":
    "https://i.discogs.com/vbL-t3nUUEXcyVCSALy67pTNzJB5jS3P5nwrIWw-TbY/rs:fit/g:sm/q:90/h:603/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTMyODIw/NC0xNjI1MTkxMjkw/LTk4NzUuanBlZw.jpeg",
  "zeni-geva":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Zeni_Geva_2.jpg/250px-Zeni_Geva_2.jpg",
  "melt-banana":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Melt-Banana_2007.jpg/330px-Melt-Banana_2007.jpg",
  "ruins":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ruins_%28band%29.jpg/250px-Ruins_%28band%29.jpg",
  "upsilon-acrux":
    "https://f4.bcbits.com/img/a1427009689_10.jpg",
  "lair-of-the-minotaur":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/LairOfTheMinotaur.jpg/250px-LairOfTheMinotaur.jpg",
  "ahleuchatistas":
    "https://f4.bcbits.com/img/a2843753975_10.jpg",
  "psychic-paramount":
    "https://i.discogs.com/mEGpx1o-SkVyJD9yrxWHhMVZhNaEX3LqMUXgaxnK4mY/rs:fit/g:sm/q:90/h:430/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE3NjEz/MS0xMjA2MDE5OTE4/LmpwZWc.jpeg",
  "quintron":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Quintron_at_One_Eyed_Jacks.jpg/250px-Quintron_at_One_Eyed_Jacks.jpg",
  "storm-and-stress":
    "https://f4.bcbits.com/img/a3297236975_10.jpg",
  "bobby-conn":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bobby_Conn.jpg/250px-Bobby_Conn.jpg",
  "yona-kit":
    "https://f4.bcbits.com/img/a3072157690_10.jpg",
  "shorty":
    "https://i.discogs.com/kF1OtS4DVF7LNMhwcHjmDsAjcg-zP-n-oSQ-QVRqFbY/rs:fit/g:sm/q:90/h:392/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTUwMjcx/OC0xMjc1MjE3MjI2/LmpwZWc.jpeg",
};

// Get image URL for an artist (prefer local, fall back to remote)
export function getSgArtistImageUrl(id: string): string | undefined {
  return getSgLocalArtistImage(id) ?? sgArtistImages[id];
}

export const sgArtists: SgArtist[] = [
  // ─── Main Roster ───
  { id: "aids-wolf", name: "AIDS Wolf", genre: "Noise Rock / No Wave", yearsActive: "2003–2012", wikipediaUrl: "https://en.wikipedia.org/wiki/AIDS_Wolf" },
  { id: "arab-on-radar", name: "Arab on Radar", genre: "Noise Rock / No Wave", yearsActive: "1994–2002", wikipediaUrl: "https://en.wikipedia.org/wiki/Arab_on_Radar" },
  { id: "athletic-automaton", name: "Athletic Automaton", genre: "Noise Rock / Experimental" },
  { id: "awvsaa", name: "AWVSAA", genre: "Experimental" },
  { id: "bign", name: "Big'n", genre: "Noise Rock", yearsActive: "1992–2002" },
  { id: "brise-glace", name: "Brise-Glace", genre: "Experimental / Post-Rock", yearsActive: "1994–1997" },
  { id: "bunuel", name: "Buñuel", genre: "Noise Rock / Experimental", yearsActive: "2018–present" },
  { id: "cellular-chaos", name: "Cellular Chaos", genre: "Noise Rock / No Wave", yearsActive: "2013–present" },
  { id: "cheer-accident", name: "Cheer-Accident", genre: "Avant-Prog / Experimental", yearsActive: "1981–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Cheer-Accident" },
  { id: "child-abuse", name: "Child Abuse", genre: "Noise Rock / Experimental", yearsActive: "2004–present" },
  { id: "chinese-stars", name: "The Chinese Stars", genre: "Noise Rock / Dance-Punk", yearsActive: "2003–2010", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Chinese_Stars" },
  { id: "colossamite", name: "Colossamite", genre: "Noise Rock / Math Rock", yearsActive: "1994–2001" },
  { id: "cuntroaches", name: "Cuntroaches", genre: "Noise / Punk" },
  { id: "dazzling-killmen", name: "Dazzling Killmen", genre: "Noise Rock / Math Rock", yearsActive: "1988–1996", wikipediaUrl: "https://en.wikipedia.org/wiki/Dazzling_Killmen" },
  { id: "denison-kimball-trio", name: "Denison Kimball Trio", genre: "Noise Rock / Experimental", yearsActive: "1994–2001" },
  { id: "doomsday-student", name: "Doomsday Student", genre: "Noise Rock / Post-Punk", yearsActive: "2012–present" },
  { id: "flossie-and-the-unicorns", name: "Flossie and the Unicorns", genre: "Experimental / Art Rock" },
  { id: "flying-luttenbachers", name: "The Flying Luttenbachers", genre: "No Wave / Free Jazz", yearsActive: "1991–2007", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Flying_Luttenbachers" },
  { id: "fruitcake", name: "Fruitcake", genre: "Noise Rock / Punk" },
  { id: "gay-beast", name: "Gay Beast", genre: "Noise Rock / Experimental", yearsActive: "2004–present" },
  { id: "gorge-trio", name: "Gorge Trio", genre: "Noise / Improv" },
  { id: "holy-smokes", name: "Holy Smokes", genre: "Noise Rock" },
  { id: "hyper-gal", name: "Hyper Gal", genre: "Noise Rock / Experimental" },
  { id: "koenjihyakkei", name: "Koenjihyakkei", genre: "Zeuhl / Avant-Prog", yearsActive: "1994–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Koenjihyakkei" },
  { id: "korekyojinn", name: "Korekyojinn", genre: "Free Jazz / Noise", yearsActive: "1993–present" },
  { id: "lake-of-dracula", name: "Lake of Dracula", genre: "Noise Rock", yearsActive: "1993–2002" },
  { id: "lovely-little-girls", name: "Lovely Little Girls", genre: "Noise Rock / Experimental", yearsActive: "2007–present" },
  { id: "made-in-mexico", name: "Made in Mexico", genre: "Noise / Experimental", yearsActive: "2001–present" },
  { id: "mama-tick", name: "Mama Tick", genre: "Noise Rock" },
  { id: "melt-banana", name: "Melt-Banana", genre: "Noise Rock / Grindcore", yearsActive: "1992–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Melt-Banana" },
  { id: "mount-shasta", name: "Mount Shasta", genre: "Noise Rock / Experimental", yearsActive: "1993–2004", wikipediaUrl: "https://en.wikipedia.org/wiki/Mount_Shasta_(band)" },
  { id: "my-name-is-rar-rar", name: "My Name Is Rar-Rar", genre: "Noise / Experimental" },
  { id: "pili-coit", name: "Pili Coït", genre: "Noise Rock / Punk" },
  { id: "point-line-plane", name: "Point Line Plane", genre: "Math Rock / Experimental" },
  { id: "pre", name: "Pre", genre: "Noise Rock / Experimental", yearsActive: "2003–present" },
  { id: "psychic-graveyard", name: "Psychic Graveyard", genre: "Noise Rock / Post-Punk", yearsActive: "2017–present" },
  { id: "quintron", name: "Quintron", genre: "Garage Rock / Electronic", yearsActive: "1990s–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Quintron" },
  { id: "q-electronics", name: "Q Electronics", genre: "Electronic / Experimental" },
  { id: "ruins", name: "Ruins", genre: "Zeuhl / Experimental", yearsActive: "1985–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Ruins_(band)" },
  { id: "ruins-alone", name: "Ruins Alone", genre: "Zeuhl / Experimental", yearsActive: "2008–present" },
  { id: "sax-ruins", name: "Sax Ruins", genre: "Zeuhl / Free Jazz", yearsActive: "2006–present" },
  { id: "satanized", name: "Satanized", genre: "Noise Rock / Metal" },
  { id: "shakuhachi-surprise", name: "Shakuhachi Surprise", genre: "Experimental / Improv" },
  { id: "shorty", name: "Shorty", genre: "Noise Rock", yearsActive: "1992–1999" },
  { id: "skryptor", name: "Skryptor", genre: "Experimental / Electronic" },
  { id: "space-streakings", name: "Space Streakings", genre: "Noise / Industrial", yearsActive: "1991–1997", wikipediaUrl: "https://en.wikipedia.org/wiki/Space_Streakings" },
  { id: "squid-pisser", name: "Squid Pisser", genre: "Noise Rock / Punk" },
  { id: "strangulated-beatoffs", name: "Strangulated Beatoffs", genre: "Noise Rock / Punk" },
  { id: "terms", name: "Terms", genre: "Noise Rock / Experimental" },
  { id: "tijuana-hercules", name: "Tijuana Hercules", genre: "Noise Rock" },
  { id: "upright-forms", name: "Upright Forms", genre: "Experimental / Post-Punk" },
  { id: "ufo-or-die", name: "UFO or Die", genre: "Noise / Experimental", yearsActive: "1990–present", wikipediaUrl: "https://en.wikipedia.org/wiki/UFO_or_Die" },
  { id: "usa-nails", name: "USA Nails", genre: "Noise Rock / Post-Punk", yearsActive: "2012–present" },
  { id: "us-maple", name: "U.S. Maple", genre: "Noise Rock / Experimental", yearsActive: "1995–2003", wikipediaUrl: "https://en.wikipedia.org/wiki/U.S._Maple" },
  { id: "yona-kit", name: "Yona-Kit", genre: "Post-Hardcore / Math Rock", yearsActive: "1993–1998" },
  { id: "you-fantastic", name: "You Fantastic!", genre: "Noise Rock / Experimental" },
  { id: "xaddax", name: "Xaddax", genre: "Noise Rock / Math Rock", yearsActive: "2008–present" },
  { id: "yowie", name: "Yowie", genre: "Math Rock / Noise Rock", yearsActive: "2001–present" },
  { id: "zeek-sheck", name: "Zeek Sheck", genre: "Noise / Experimental" },
  { id: "zeni-geva", name: "Zeni Geva", genre: "Noise Rock / Industrial", yearsActive: "1987–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Zeni_Geva" },

  // ─── Guest Stars ───
  { id: "azita", name: "Azita", genre: "Art Rock / Experimental", yearsActive: "1990s–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Azita_Youssefi", isGuestStar: true },
  { id: "akaten", name: "Akaten", genre: "Noise / Experimental", isGuestStar: true },
  { id: "bobby-conn", name: "Bobby Conn", genre: "Art Rock / Glam", yearsActive: "1997–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Bobby_Conn", isGuestStar: true },
  { id: "the-browns", name: "The Browns", genre: "Noise Rock", isGuestStar: true },
  { id: "chuck-falzone-telepath", name: "Chuck Falzone: Telepath", genre: "Experimental", isGuestStar: true },
  { id: "david-yow", name: "David Yow", genre: "Noise Rock", yearsActive: "1980s–present", wikipediaUrl: "https://en.wikipedia.org/wiki/David_Yow", isGuestStar: true },
  { id: "f-stein", name: "F-Stein", genre: "Experimental", isGuestStar: true },
  { id: "high-on-fire", name: "High on Fire", genre: "Sludge Metal / Stoner Metal", yearsActive: "1998–present", wikipediaUrl: "https://en.wikipedia.org/wiki/High_on_Fire", isGuestStar: true },
  { id: "jim-orourke", name: "Jim O'Rourke", genre: "Experimental / Avant-Garde", yearsActive: "1980s–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Jim_O%27Rourke_(musician)", isGuestStar: true },
  { id: "john-dwyer", name: "John Dwyer", genre: "Garage Rock / Psychedelic", yearsActive: "1990s–present", wikipediaUrl: "https://en.wikipedia.org/wiki/John_Dwyer_(musician)", isGuestStar: true },
  { id: "killdozer", name: "Killdozer", genre: "Noise Rock / Sludge", yearsActive: "1983–1996", wikipediaUrl: "https://en.wikipedia.org/wiki/Killdozer_(band)", isGuestStar: true },
  { id: "liars", name: "Liars", genre: "Experimental Rock / Dance-Punk", yearsActive: "2000–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Liars_(band)", isGuestStar: true },
  { id: "monitor-radio", name: "Monitor Radio", genre: "Experimental", isGuestStar: true },
  { id: "mule", name: "Mule", genre: "Noise Rock / Blues Punk", yearsActive: "1990–1996", wikipediaUrl: "https://en.wikipedia.org/wiki/Mule_(band)", isGuestStar: true },
  { id: "mstrkrft", name: "MSTRKRFT", genre: "Electro / Dance", yearsActive: "2005–present", wikipediaUrl: "https://en.wikipedia.org/wiki/MSTRKRFT", isGuestStar: true },
  { id: "omoide-hatoba", name: "Omoide Hatoba", genre: "Noise / Experimental", yearsActive: "1993–present", isGuestStar: true },
  { id: "palace-brothers", name: "Palace Brothers", genre: "Alt-Country / Indie Folk", yearsActive: "1993–1997", wikipediaUrl: "https://en.wikipedia.org/wiki/Bonnie_%22Prince%22_Billy", isGuestStar: true },
  { id: "scissor-girls", name: "Scissor Girls", genre: "No Wave / Noise", yearsActive: "1991–1996", wikipediaUrl: "https://en.wikipedia.org/wiki/Scissor_Girls", isGuestStar: true },
  { id: "secret-fun-club", name: "Secret Fun Club", genre: "Noise Rock / Experimental", isGuestStar: true },
  { id: "shatter-on-impact", name: "Shatter on Impact", genre: "Noise Rock", isGuestStar: true },
  { id: "shellac", name: "Shellac", genre: "Post-Hardcore / Noise Rock", yearsActive: "1992–2024", wikipediaUrl: "https://en.wikipedia.org/wiki/Shellac_(band)", isGuestStar: true },
  { id: "superunit", name: "Superunit", genre: "Experimental", isGuestStar: true },
  { id: "tortured-machine", name: "Tortured Machine", genre: "Noise / Experimental", isGuestStar: true },
  { id: "zzzzz", name: "ZZZZZ", genre: "Noise / Experimental", isGuestStar: true },

  // ─── Legacy entries (from discography, kept for compatibility) ───
  { id: "storm-and-stress", name: "Storm & Stress", genre: "Post-Rock / Experimental", yearsActive: "1994–2000", wikipediaUrl: "https://en.wikipedia.org/wiki/Storm_%26_Stress" },
  { id: "upsilon-acrux", name: "Upsilon Acrux", genre: "Math Rock / Experimental", yearsActive: "1998–2013" },
  { id: "lair-of-the-minotaur", name: "Lair of the Minotaur", genre: "Sludge Metal / Thrash", yearsActive: "2003–2013", wikipediaUrl: "https://en.wikipedia.org/wiki/Lair_of_the_Minotaur" },
  { id: "ahleuchatistas", name: "Ahleuchatistas", genre: "Math Rock / Experimental", yearsActive: "2000–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Ahleuchatistas" },
  { id: "psychic-paramount", name: "The Psychic Paramount", genre: "Noise Rock / Krautrock", yearsActive: "1996–present", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Psychic_Paramount" },
];

export function getAllSgArtists(): SgArtist[] {
  return sgArtists.sort((a, b) => a.name.localeCompare(b.name));
}

export function getSgArtistById(id: string): SgArtist | undefined {
  return sgArtists.find((a) => a.id === id);
}

export function searchSgArtists(query: string): SgArtist[] {
  const lowerQuery = query.toLowerCase();
  return sgArtists.filter((a) => a.name.toLowerCase().includes(lowerQuery));
}

export function getSgMainRoster(): SgArtist[] {
  return sgArtists.filter((a) => !a.isGuestStar).sort((a, b) => a.name.localeCompare(b.name));
}

export function getSgGuestStars(): SgArtist[] {
  return sgArtists.filter((a) => a.isGuestStar).sort((a, b) => a.name.localeCompare(b.name));
}
