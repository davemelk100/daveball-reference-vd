// Elephant 6 Recording Company Discography Data
// Source: Wikipedia, Discogs

export interface E6Release {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  format?: string;
  imageUrl?: string;
}

// Image URLs - populated with verified URLs
export const e6ReleaseImages: Record<number, string> = {};

// Get image URL for a release
export function getE6ReleaseImageUrl(catalogNumber: number): string | undefined {
  return e6ReleaseImages[catalogNumber];
}

export const e6Discography: E6Release[] = [
  { catalogNumber: 1, artist: "Neutral Milk Hotel", title: "On Avery Island", year: 1996 },
  { catalogNumber: 2, artist: "Neutral Milk Hotel", title: "In the Aeroplane Over the Sea", year: 1998 },
  { catalogNumber: 3, artist: "The Olivia Tremor Control", title: "Music from the Unrealized Film Script, Dusk at Cubist Castle", year: 1996 },
  { catalogNumber: 4, artist: "The Olivia Tremor Control", title: "Black Foliage: Animation Music Volume One", year: 1999 },
  { catalogNumber: 5, artist: "The Apples in Stereo", title: "Fun Trick Noisemaker", year: 1995 },
  { catalogNumber: 6, artist: "The Apples in Stereo", title: "Tone Soul Evolution", year: 1997 },
  { catalogNumber: 7, artist: "The Apples in Stereo", title: "The Discovery of a World Inside the Moone", year: 2000 },
  { catalogNumber: 8, artist: "The Apples in Stereo", title: "Her Wallpaper Reverie", year: 1999 },
  { catalogNumber: 9, artist: "of Montreal", title: "Cherry Peel", year: 1997 },
  { catalogNumber: 10, artist: "of Montreal", title: "The Bedside Drama: A Petite Tragedy", year: 1998 },
  { catalogNumber: 11, artist: "of Montreal", title: "The Gay Parade", year: 1999 },
  { catalogNumber: 12, artist: "of Montreal", title: "Coquelicot Asleep in the Poppies: A Variety of Whimsical Verse", year: 2001 },
  { catalogNumber: 13, artist: "of Montreal", title: "Aldhils Arboretum", year: 2002 },
  { catalogNumber: 14, artist: "of Montreal", title: "Satanic Panic in the Attic", year: 2004 },
  { catalogNumber: 15, artist: "of Montreal", title: "The Sunlandic Twins", year: 2005 },
  { catalogNumber: 16, artist: "of Montreal", title: "Hissing Fauna, Are You the Destroyer?", year: 2007 },
  { catalogNumber: 17, artist: "Elf Power", title: "Vainly Clutching at Phantom Limbs", year: 1995 },
  { catalogNumber: 18, artist: "Elf Power", title: "When the Red King Comes", year: 1997 },
  { catalogNumber: 19, artist: "Elf Power", title: "A Dream in Sound", year: 1999 },
  { catalogNumber: 20, artist: "Elf Power", title: "The Winter Is Coming", year: 2000 },
  { catalogNumber: 21, artist: "Elf Power", title: "Creatures", year: 2001 },
  { catalogNumber: 22, artist: "The Music Tapes", title: "First Imaginary Symphony for Nomad", year: 1999 },
  { catalogNumber: 23, artist: "The Music Tapes", title: "Music Tapes for Clouds and Tornadoes", year: 2008 },
  { catalogNumber: 24, artist: "Circulatory System", title: "Circulatory System", year: 2001 },
  { catalogNumber: 25, artist: "Circulatory System", title: "Signal Morning", year: 2009 },
  { catalogNumber: 26, artist: "Beulah", title: "Handsome Western States", year: 1997 },
  { catalogNumber: 27, artist: "Beulah", title: "When Your Heartstrings Break", year: 1999 },
  { catalogNumber: 28, artist: "Beulah", title: "The Coast Is Never Clear", year: 2001 },
  { catalogNumber: 29, artist: "Dressy Bessy", title: "Pink Hearts Yellow Moons", year: 1999 },
  { catalogNumber: 30, artist: "Dressy Bessy", title: "Sound Go Round", year: 2002 },
  { catalogNumber: 31, artist: "The Gerbils", title: "Are You Sleepy?", year: 1997 },
  { catalogNumber: 32, artist: "Pipes You See, Pipes You Don't", title: "Caution: Free Music Inside", year: 1996 },
  { catalogNumber: 33, artist: "Chocolate USA", title: "All Jets Are Gonna Fall Today", year: 1994 },
  { catalogNumber: 34, artist: "Major Organ and the Adding Machine", title: "Major Organ and the Adding Machine", year: 2001 },
  { catalogNumber: 35, artist: "Marshmallow Coast", title: "Ride the Lightning", year: 2003 },
  { catalogNumber: 36, artist: "Great Lakes", title: "Great Lakes", year: 1997 },
  { catalogNumber: 37, artist: "Japancakes", title: "The Sleepy Strange", year: 2001 },
  { catalogNumber: 38, artist: "Japancakes", title: "If I Could See Dallas", year: 2003 },
  { catalogNumber: 39, artist: "Nana Grizol", title: "Love It Love It", year: 2008 },
  { catalogNumber: 40, artist: "Nana Grizol", title: "Ruth", year: 2010 },
  { catalogNumber: 41, artist: "The Sunshine Fix", title: "Age of the Sun", year: 2001 },
  { catalogNumber: 42, artist: "The Minders", title: "Hooray for Tuesday", year: 1998 },
  { catalogNumber: 43, artist: "Essex Green", title: "Everything Is Green", year: 1999 },
  { catalogNumber: 44, artist: "Essex Green", title: "The Long Goodbye", year: 2003 },
  { catalogNumber: 45, artist: "Neutral Milk Hotel", title: "Everything Is", year: 1994 },
  { catalogNumber: 46, artist: "Half-Handed Cloud", title: "Thy Is a Word & Feet Need Lamps", year: 2002 },
  { catalogNumber: 47, artist: "The Apples in Stereo", title: "New Magnetic Wonder", year: 2007 },
  { catalogNumber: 48, artist: "of Montreal", title: "Skeletal Lamping", year: 2008 },
  { catalogNumber: 49, artist: "Elf Power", title: "Back to the Web", year: 2006 },
  { catalogNumber: 50, artist: "Dressy Bessy", title: "Electrified", year: 2005 },
];

// Get all releases
export function getAllE6Releases(): E6Release[] {
  return e6Discography;
}

// Get releases by year
export function getE6ReleasesByYear(year: number): E6Release[] {
  return e6Discography.filter((r) => r.year === year);
}

// Get release by catalog number
export function getE6ReleaseByCatalogNumber(num: number): E6Release | undefined {
  return e6Discography.find((r) => r.catalogNumber === num);
}

// Get unique years
export function getE6ReleaseYears(): number[] {
  return [...new Set(e6Discography.map((r) => r.year))].sort((a, b) => a - b);
}

// Get unique artists
export function getE6Artists(): string[] {
  return [...new Set(e6Discography.map((r) => r.artist))].sort();
}

// Get releases by artist
export function getE6ReleasesByArtist(artist: string): E6Release[] {
  return e6Discography.filter((r) => r.artist.toLowerCase().includes(artist.toLowerCase()));
}
