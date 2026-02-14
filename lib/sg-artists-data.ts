// Skin Graft Records Artists

export interface SgArtist {
  id: string;
  name: string;
  genre?: string;
  yearsActive?: string;
  wikipediaUrl?: string;
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

// Get image URL for an artist
export function getSgArtistImageUrl(id: string): string | undefined {
  return sgArtistImages[id];
}

export const sgArtists: SgArtist[] = [
  { id: "flying-luttenbachers", name: "The Flying Luttenbachers", genre: "No Wave / Free Jazz", yearsActive: "1991–2007", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Flying_Luttenbachers" },
  { id: "us-maple", name: "U.S. Maple", genre: "Noise Rock / Experimental", yearsActive: "1995–2003", wikipediaUrl: "https://en.wikipedia.org/wiki/U.S._Maple" },
  { id: "dazzling-killmen", name: "Dazzling Killmen", genre: "Noise Rock / Math Rock", yearsActive: "1988–1996", wikipediaUrl: "https://en.wikipedia.org/wiki/Dazzling_Killmen" },
  { id: "mount-shasta", name: "Mount Shasta", genre: "Noise Rock / Experimental", yearsActive: "1993–2004", wikipediaUrl: "https://en.wikipedia.org/wiki/Mount_Shasta_(band)" },
  { id: "cheer-accident", name: "Cheer-Accident", genre: "Avant-Prog / Experimental", yearsActive: "1981–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Cheer-Accident" },
  { id: "lake-of-dracula", name: "Lake of Dracula", genre: "Noise Rock", yearsActive: "1993–2002" },
  { id: "colossamite", name: "Colossamite", genre: "Noise Rock / Math Rock", yearsActive: "1994–2001" },
  { id: "yona-kit", name: "Yona-Kit", genre: "Post-Hardcore / Math Rock", yearsActive: "1993–1998" },
  { id: "shorty", name: "Shorty", genre: "Noise Rock", yearsActive: "1992–1999" },
  { id: "bobby-conn", name: "Bobby Conn", genre: "Art Rock / Glam", yearsActive: "1997–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Bobby_Conn" },
  { id: "scissor-girls", name: "Scissor Girls", genre: "No Wave / Noise", yearsActive: "1991–1996", wikipediaUrl: "https://en.wikipedia.org/wiki/Scissor_Girls" },
  { id: "zeni-geva", name: "Zeni Geva", genre: "Noise Rock / Industrial", yearsActive: "1987–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Zeni_Geva" },
  { id: "melt-banana", name: "Melt-Banana", genre: "Noise Rock / Grindcore", yearsActive: "1992–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Melt-Banana" },
  { id: "ruins", name: "Ruins", genre: "Zeuhl / Experimental", yearsActive: "1985–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Ruins_(band)" },
  { id: "upsilon-acrux", name: "Upsilon Acrux", genre: "Math Rock / Experimental", yearsActive: "1998–2013" },
  { id: "lair-of-the-minotaur", name: "Lair of the Minotaur", genre: "Sludge Metal / Thrash", yearsActive: "2003–2013", wikipediaUrl: "https://en.wikipedia.org/wiki/Lair_of_the_Minotaur" },
  { id: "ahleuchatistas", name: "Ahleuchatistas", genre: "Math Rock / Experimental", yearsActive: "2000–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Ahleuchatistas" },
  { id: "psychic-paramount", name: "The Psychic Paramount", genre: "Noise Rock / Krautrock", yearsActive: "1996–present", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Psychic_Paramount" },
  { id: "quintron", name: "Quintron", genre: "Garage Rock / Electronic", yearsActive: "1990s–present", wikipediaUrl: "https://en.wikipedia.org/wiki/Quintron" },
  { id: "storm-and-stress", name: "Storm & Stress", genre: "Post-Rock / Experimental", yearsActive: "1994–2000", wikipediaUrl: "https://en.wikipedia.org/wiki/Storm_%26_Stress" },
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
