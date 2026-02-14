import { isYearQuestion } from "./trivia-utils";

export interface SgTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "noise" | "facts";
}

export const sgTriviaQuestions: SgTriviaQuestion[] = [
  // ===== HISTORY =====
  {
    id: 1,
    question: "In what year was Skin Graft Records founded?",
    options: ["1988", "1991", "1993", "1995"],
    correctAnswer: 1,
    explanation: "Skin Graft Records was founded in 1991 by Mark Fischer in Chicago, Illinois.",
    category: "history",
  },
  {
    id: 2,
    question: "Who founded Skin Graft Records?",
    options: ["Steve Albini", "Mark Fischer", "Weasel Walter", "Jim O'Rourke"],
    correctAnswer: 1,
    explanation: "Mark Fischer founded Skin Graft Records in Chicago in 1991.",
    category: "history",
  },
  {
    id: 3,
    question: "In which city was Skin Graft Records founded?",
    options: ["New York", "Chicago", "Minneapolis", "San Francisco"],
    correctAnswer: 1,
    explanation: "Skin Graft Records was founded in Chicago, Illinois, a hub for experimental and noise rock.",
    category: "history",
  },
  {
    id: 4,
    question: "What was the first release on Skin Graft Records?",
    options: ["Mount Shasta – Gravity On", "Dazzling Killmen – Coffin Fit 7\"", "U.S. Maple – Long Hair in Three Stages", "Scissor Girls – We're Not Gonna Take It"],
    correctAnswer: 1,
    explanation: "Dazzling Killmen's 'Coffin Fit' 7-inch was Skin Graft's first release (GR001) in 1991.",
    category: "history",
  },
  {
    id: 5,
    question: "What catalog prefix does Skin Graft Records use?",
    options: ["SG", "GR", "SKG", "SF"],
    correctAnswer: 1,
    explanation: "Skin Graft Records uses the 'GR' prefix for catalog numbers.",
    category: "history",
  },
  {
    id: 6,
    question: "Skin Graft Records is known for which compilation?",
    options: ["No Wave Now", "Ear-Bleeding Country", "Chicago Noise", "Avant-Garde Express"],
    correctAnswer: 1,
    explanation: "'Ear-Bleeding Country' was a notable Skin Graft compilation showcasing the label's diverse roster.",
    category: "history",
  },
  {
    id: 7,
    question: "Which music scene is Skin Graft Records most associated with?",
    options: ["Hardcore punk", "Noise rock and experimental", "Shoegaze", "Post-punk revival"],
    correctAnswer: 1,
    explanation: "Skin Graft Records is most closely associated with the noise rock and experimental music scenes.",
    category: "history",
  },
  {
    id: 8,
    question: "Which region's music scene heavily influenced Skin Graft's roster?",
    options: ["Pacific Northwest", "Midwest / Chicago", "Southern California", "New England"],
    correctAnswer: 1,
    explanation: "The Midwest and specifically Chicago's experimental music scene was central to Skin Graft's identity.",
    category: "history",
  },
  // ===== ARTISTS =====
  {
    id: 9,
    question: "Which band features Weasel Walter and was a flagship Skin Graft act?",
    options: ["U.S. Maple", "Colossamite", "The Flying Luttenbachers", "Mount Shasta"],
    correctAnswer: 2,
    explanation: "The Flying Luttenbachers, led by Weasel Walter, were one of Skin Graft's most prominent and prolific artists.",
    category: "artists",
  },
  {
    id: 10,
    question: "U.S. Maple was known for their deliberately ______ approach to rock music.",
    options: ["Melodic", "Deconstructed", "Pop-oriented", "Blues-based"],
    correctAnswer: 1,
    explanation: "U.S. Maple were known for their radically deconstructed approach to rock music, challenging every convention.",
    category: "artists",
  },
  {
    id: 11,
    question: "Which Skin Graft band hailed from St. Louis?",
    options: ["Mount Shasta", "Dazzling Killmen", "Bobby Conn", "Cheer-Accident"],
    correctAnswer: 1,
    explanation: "Dazzling Killmen were from St. Louis, Missouri, and were one of Skin Graft's earliest and most intense acts.",
    category: "artists",
  },
  {
    id: 12,
    question: "Which Japanese noise rock band released records on Skin Graft?",
    options: ["Boris", "Melt-Banana", "Boredoms", "High Rise"],
    correctAnswer: 1,
    explanation: "Melt-Banana, the Japanese noise rock/grindcore duo, released 'Teeny Shiny' on Skin Graft.",
    category: "artists",
  },
  {
    id: 13,
    question: "Ruins is a Japanese band known for playing which unusual style?",
    options: ["Visual kei", "Zeuhl / progressive", "J-pop", "Enka"],
    correctAnswer: 1,
    explanation: "Ruins, led by Tatsuya Yoshida, are known for their Zeuhl-influenced progressive/experimental music.",
    category: "artists",
  },
  {
    id: 14,
    question: "Which Skin Graft artist is also known for performing with Miss Pussycat?",
    options: ["Bobby Conn", "Quintron", "Storm & Stress", "Weasel Walter"],
    correctAnswer: 1,
    explanation: "Quintron frequently performs with Miss Pussycat as the duo Quintron and Miss Pussycat.",
    category: "artists",
  },
  {
    id: 15,
    question: "Cheer-Accident has been active since which decade?",
    options: ["1970s", "1980s", "1990s", "2000s"],
    correctAnswer: 1,
    explanation: "Cheer-Accident formed in 1981, making them one of the longest-running bands on Skin Graft.",
    category: "artists",
  },
  {
    id: 16,
    question: "Which Skin Graft band played sludge metal with mythological themes?",
    options: ["Colossamite", "Upsilon Acrux", "Lair of the Minotaur", "Zeni Geva"],
    correctAnswer: 2,
    explanation: "Lair of the Minotaur combined sludge metal and thrash with themes drawn from Greek mythology.",
    category: "artists",
  },
  {
    id: 17,
    question: "Bobby Conn's music could best be described as:",
    options: ["Straight-ahead punk", "Art rock and glam", "Ambient electronic", "Country and western"],
    correctAnswer: 1,
    explanation: "Bobby Conn is known for his theatrical art rock and glam-influenced performances and recordings.",
    category: "artists",
  },
  {
    id: 18,
    question: "Which all-female Skin Graft band featured members of the no wave scene?",
    options: ["Melt-Banana", "Scissor Girls", "Lake of Dracula", "Cheer-Accident"],
    correctAnswer: 1,
    explanation: "Scissor Girls were an all-female no wave / noise band on Skin Graft Records.",
    category: "artists",
  },
  // ===== RELEASES =====
  {
    id: 19,
    question: "What was Dazzling Killmen's full-length album on Skin Graft?",
    options: ["Coffin Fit", "Face of Collapse", "Economy of Motion", "Constructive Destruction"],
    correctAnswer: 1,
    explanation: "'Face of Collapse' was Dazzling Killmen's intense full-length album released on Skin Graft in 1994.",
    category: "releases",
  },
  {
    id: 20,
    question: "U.S. Maple's first album on Skin Graft was called:",
    options: ["Talker", "Sang Phat Editor", "Long Hair in Three Stages", "Purple on Time"],
    correctAnswer: 2,
    explanation: "'Long Hair in Three Stages' was U.S. Maple's debut album, released on Skin Graft in 1995.",
    category: "releases",
  },
  {
    id: 21,
    question: "Which Flying Luttenbachers release served as a career retrospective?",
    options: ["Gods of Chaos", "Constructive Destruction", "Retrospektiull", "Infection and Decline"],
    correctAnswer: 2,
    explanation: "'Retrospektiull' was a retrospective compilation of The Flying Luttenbachers' work, released in 2000.",
    category: "releases",
  },
  {
    id: 22,
    question: "The Psychic Paramount's second album on Skin Graft was simply titled:",
    options: ["Gamelan Into the Mink Supernatural", "II", "Paramount", "Return"],
    correctAnswer: 1,
    explanation: "The Psychic Paramount's second album was simply titled 'II', released in 2011.",
    category: "releases",
  },
  {
    id: 23,
    question: "Which Zeni Geva album was released on Skin Graft?",
    options: ["Desire for Agony", "10000 Light Years", "Total Castration", "Freedom of Noise"],
    correctAnswer: 1,
    explanation: "Zeni Geva released '10000 Light Years' on Skin Graft Records in 1999.",
    category: "releases",
  },
  {
    id: 24,
    question: "What format was the first Skin Graft release?",
    options: ["CD", "7-inch vinyl", "12-inch LP", "Cassette"],
    correctAnswer: 1,
    explanation: "Dazzling Killmen's 'Coffin Fit' was released as a 7-inch vinyl, Skin Graft's first release.",
    category: "releases",
  },
  // ===== NOISE =====
  {
    id: 25,
    question: "Which musical genre combines elements of punk and free jazz, common among Skin Graft bands?",
    options: ["Post-rock", "No wave", "Shoegaze", "Dream pop"],
    correctAnswer: 1,
    explanation: "No wave, combining punk aggression with free jazz dissonance, was a key influence on many Skin Graft artists.",
    category: "noise",
  },
  {
    id: 26,
    question: "Skin Graft Records released music by bands from which country besides the US?",
    options: ["UK", "Germany", "Japan", "Australia"],
    correctAnswer: 2,
    explanation: "Skin Graft released records by Japanese acts including Melt-Banana, Ruins, and Zeni Geva.",
    category: "noise",
  },
  {
    id: 27,
    question: "What recording approach is common among Skin Graft artists?",
    options: ["Overproduced studio polish", "Lo-fi and DIY aesthetics", "Orchestral arrangements", "Auto-tuned vocals"],
    correctAnswer: 1,
    explanation: "Many Skin Graft artists embraced lo-fi and DIY recording aesthetics, valuing raw energy over polish.",
    category: "noise",
  },
  {
    id: 28,
    question: "Which Chicago venue was important for Skin Graft bands?",
    options: ["Metro", "Lounge Ax", "CBGB", "The Roxy"],
    correctAnswer: 1,
    explanation: "Lounge Ax was a beloved Chicago venue where many Skin Graft bands performed regularly.",
    category: "noise",
  },
  {
    id: 29,
    question: "Math rock, common on Skin Graft, is characterized by:",
    options: ["Simple chord progressions", "Complex time signatures", "Acoustic instrumentation", "Auto-tuned vocals"],
    correctAnswer: 1,
    explanation: "Math rock features complex, irregular time signatures and angular guitar work, common among Skin Graft artists.",
    category: "noise",
  },
  {
    id: 30,
    question: "Which producer/engineer worked with many Chicago noise rock bands?",
    options: ["Rick Rubin", "Steve Albini", "Butch Vig", "Bob Rock"],
    correctAnswer: 1,
    explanation: "Steve Albini, based in Chicago, recorded many artists associated with the noise rock scene including Skin Graft bands.",
    category: "noise",
  },
  // ===== FACTS =====
  {
    id: 31,
    question: "Skin Graft Records is known for its distinctive:",
    options: ["Minimalist packaging", "Elaborate and artistic packaging", "Digital-only releases", "Standard jewel cases"],
    correctAnswer: 1,
    explanation: "Skin Graft Records became known for elaborate, artistic packaging and striking visual design.",
    category: "facts",
  },
  {
    id: 32,
    question: "How many decades has Skin Graft Records been active?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswer: 2,
    explanation: "Founded in 1991, Skin Graft Records has been active for over three decades.",
    category: "facts",
  },
  {
    id: 33,
    question: "Weasel Walter of The Flying Luttenbachers is also known as a:",
    options: ["Visual artist", "Free jazz drummer and multi-instrumentalist", "Film director", "Radio DJ"],
    correctAnswer: 1,
    explanation: "Weasel Walter is renowned as a free jazz drummer and multi-instrumentalist beyond his Skin Graft work.",
    category: "facts",
  },
  {
    id: 34,
    question: "Which Skin Graft band's name references a California volcano?",
    options: ["Lake of Dracula", "Mount Shasta", "Storm & Stress", "Lair of the Minotaur"],
    correctAnswer: 1,
    explanation: "Mount Shasta is named after the prominent volcano in Northern California.",
    category: "facts",
  },
  {
    id: 35,
    question: "The Psychic Paramount's sound draws heavily from which movement?",
    options: ["Britpop", "Krautrock", "Ska", "New Romantic"],
    correctAnswer: 1,
    explanation: "The Psychic Paramount's hypnotic, driving sound draws heavily from German krautrock traditions.",
    category: "facts",
  },
  {
    id: 36,
    question: "Storm & Stress featured which notable guitarist?",
    options: ["Thurston Moore", "Ian Williams", "Lee Ranaldo", "J Mascis"],
    correctAnswer: 1,
    explanation: "Ian Williams of Storm & Stress later co-founded the math rock band Battles.",
    category: "facts",
  },
  {
    id: 37,
    question: "Colossamite formed from members of which other Skin Graft band?",
    options: ["U.S. Maple", "Dazzling Killmen", "Mount Shasta", "Scissor Girls"],
    correctAnswer: 1,
    explanation: "Colossamite featured former members of Dazzling Killmen after that band broke up in 1996.",
    category: "facts",
  },
  {
    id: 38,
    question: "Skin Graft's visual identity and packaging was influenced by:",
    options: ["Corporate minimalism", "Underground comics and punk art", "Renaissance art", "Photography only"],
    correctAnswer: 1,
    explanation: "Skin Graft's visual identity drew from underground comics, punk art, and DIY design traditions.",
    category: "facts",
  },
  {
    id: 39,
    question: "Which Skin Graft artist released 'These Hands of Mine'?",
    options: ["Bobby Conn", "Quintron", "Cheer-Accident", "The Flying Luttenbachers"],
    correctAnswer: 1,
    explanation: "Quintron released 'These Hands of Mine' on Skin Graft Records in 1999.",
    category: "facts",
  },
  {
    id: 40,
    question: "Ahleuchatistas are from which US state?",
    options: ["Illinois", "Missouri", "North Carolina", "New York"],
    correctAnswer: 2,
    explanation: "Ahleuchatistas are from Asheville, North Carolina.",
    category: "facts",
  },
];

export function getDailySgTriviaQuestions(date?: Date): SgTriviaQuestion[] {
  const now = date || new Date();
  const pool = sgTriviaQuestions.filter((q) => !isYearQuestion(q));
  const totalQuestions = pool.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...pool];
    let currentSeed = seed;
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      currentSeed = (currentSeed * 16807) % 2147483647;
      const j = currentSeed % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const cycleLength = Math.floor(totalQuestions / questionsPerDay);
  const epochDay = getEpochDay(now);
  const dayIndex = epochDay % cycleLength;
  const shuffled = shuffleQuestions(42);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getSgTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `sg-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getSgNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
