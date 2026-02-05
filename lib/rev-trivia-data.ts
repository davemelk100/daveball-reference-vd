export interface RevTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "bands" | "releases" | "hardcore" | "facts";
}

export const revTriviaQuestions: RevTriviaQuestion[] = [
  // ===== HISTORY =====
  {
    id: 1,
    question: "In what year was Revelation Records founded?",
    options: ["1985", "1987", "1989", "1991"],
    correctAnswer: 1,
    explanation: "Revelation Records was founded in 1987 by Jordan Cooper and Ray Cappo in New Haven, Connecticut.",
    category: "history",
  },
  {
    id: 2,
    question: "Who co-founded Revelation Records with Jordan Cooper?",
    options: ["Ian MacKaye", "Ray Cappo", "Mike Judge", "Walter Schreifels"],
    correctAnswer: 1,
    explanation: "Ray Cappo of Youth of Today co-founded Revelation Records with Jordan Cooper in 1987.",
    category: "history",
  },
  {
    id: 3,
    question: "What was the first release on Revelation Records?",
    options: ["Youth of Today – Break Down the Walls", "Warzone – Don't Forget the Struggle Don't Forget the Streets", "Bold – Speak Out", "Gorilla Biscuits – S/T 7\""],
    correctAnswer: 1,
    explanation: "Warzone's 'Don't Forget the Struggle Don't Forget the Streets' was Revelation's first release (REV 001).",
    category: "history",
  },
  {
    id: 4,
    question: "In which city was Revelation Records originally based?",
    options: ["Washington, D.C.", "New York City", "New Haven, Connecticut", "Boston"],
    correctAnswer: 2,
    explanation: "Revelation Records was originally based in New Haven, Connecticut before later relocating.",
    category: "history",
  },
  {
    id: 5,
    question: "What prefix do Revelation Records catalog numbers use?",
    options: ["DIS", "SST", "REV", "HC"],
    correctAnswer: 2,
    explanation: "Revelation Records uses the 'REV' prefix for all their catalog numbers.",
    category: "history",
  },
  {
    id: 6,
    question: "Which scene is Revelation Records most closely associated with?",
    options: ["D.C. hardcore", "New York hardcore", "California punk", "Midwest emo"],
    correctAnswer: 1,
    explanation: "Revelation Records is most closely associated with the New York hardcore scene of the late 1980s.",
    category: "history",
  },
  {
    id: 7,
    question: "What is the name of Revelation Records' mail-order and retail store?",
    options: ["Rev HQ", "Hardcore Central", "The Rev Shop", "Schism Records"],
    correctAnswer: 0,
    explanation: "Rev HQ (revhq.com) is Revelation Records' official retail and distribution hub.",
    category: "history",
  },
  {
    id: 8,
    question: "Which Revelation co-founder also fronted Youth of Today?",
    options: ["Jordan Cooper", "Ray Cappo", "Porcell", "Sammy Siegler"],
    correctAnswer: 1,
    explanation: "Ray Cappo was the vocalist of Youth of Today and co-founded Revelation Records.",
    category: "history",
  },
  // ===== BANDS =====
  {
    id: 9,
    question: "Which band released 'Start Today' on Revelation?",
    options: ["Youth of Today", "Gorilla Biscuits", "Judge", "Bold"],
    correctAnswer: 1,
    explanation: "Gorilla Biscuits released their landmark album 'Start Today' on Revelation in 1989.",
    category: "bands",
  },
  {
    id: 10,
    question: "Who was the frontman of Judge?",
    options: ["Ray Cappo", "Walter Schreifels", "Mike Judge", "John Joseph"],
    correctAnswer: 2,
    explanation: "Mike Judge (Mike Ferraro) was the vocalist of Judge.",
    category: "bands",
  },
  {
    id: 11,
    question: "Which Revelation band featured Walter Schreifels on guitar?",
    options: ["Judge", "Youth of Today", "Gorilla Biscuits", "Warzone"],
    correctAnswer: 2,
    explanation: "Walter Schreifels played guitar in Gorilla Biscuits before forming Quicksand.",
    category: "bands",
  },
  {
    id: 12,
    question: "Which band released 'Bringin' It Down' on Revelation?",
    options: ["Bold", "Judge", "Side By Side", "Gorilla Biscuits"],
    correctAnswer: 1,
    explanation: "Judge released their seminal album 'Bringin' It Down' on Revelation Records.",
    category: "bands",
  },
  {
    id: 13,
    question: "Bold's 'Speak Out' was released on which format first?",
    options: ["LP", "CD", "7-inch EP", "Cassette"],
    correctAnswer: 2,
    explanation: "Bold's 'Speak Out' was initially released as a 7-inch EP on Revelation Records.",
    category: "bands",
  },
  {
    id: 14,
    question: "Which Revelation band did Sammy Siegler drum for?",
    options: ["Judge", "Youth of Today", "Bold", "All of the above"],
    correctAnswer: 3,
    explanation: "Sammy Siegler was a prolific drummer who played in Judge, Youth of Today, and Bold, all on Revelation.",
    category: "bands",
  },
  {
    id: 15,
    question: "Which band released 'Can't Close My Eyes' on Revelation?",
    options: ["Youth of Today", "Gorilla Biscuits", "Warzone", "Chain of Strength"],
    correctAnswer: 0,
    explanation: "Youth of Today released 'Can't Close My Eyes' on Revelation Records.",
    category: "bands",
  },
  {
    id: 16,
    question: "Shelter, led by Ray Cappo, incorporated what spiritual influence?",
    options: ["Buddhism", "Hare Krishna", "Quakerism", "Taoism"],
    correctAnswer: 1,
    explanation: "Shelter incorporated Hare Krishna spirituality, reflecting Ray Cappo's personal beliefs.",
    category: "bands",
  },
  {
    id: 17,
    question: "Which Texas band released 'Balance' on Revelation?",
    options: ["At the Drive-In", "Refused", "Texas Is the Reason", "Mineral"],
    correctAnswer: 2,
    explanation: "Texas Is the Reason, an influential emo/post-hardcore band, released 'Balance' EP on Revelation before their LP on the label as well.",
    category: "bands",
  },
  {
    id: 18,
    question: "Which Revelation band is from Orange County, California?",
    options: ["Bold", "Chain of Strength", "Into Another", "Side By Side"],
    correctAnswer: 1,
    explanation: "Chain of Strength was from Orange County, California and released 'The One Thing That Still Holds True' on Revelation.",
    category: "bands",
  },
  // ===== RELEASES =====
  {
    id: 19,
    question: "What is the catalog number of Gorilla Biscuits' 'Start Today'?",
    options: ["REV 001", "REV 010", "REV 014", "REV 020"],
    correctAnswer: 2,
    explanation: "Gorilla Biscuits' 'Start Today' is cataloged as REV 014.",
    category: "releases",
  },
  {
    id: 20,
    question: "Which of these is a Youth of Today album on Revelation?",
    options: ["We're Not in This Alone", "Break Down the Walls", "Out of Step", "Flex Your Head"],
    correctAnswer: 1,
    explanation: "'Break Down the Walls' is Youth of Today's album on Revelation Records.",
    category: "releases",
  },
  {
    id: 21,
    question: "What year was Judge's 'Bringin' It Down' released?",
    options: ["1987", "1988", "1989", "1990"],
    correctAnswer: 2,
    explanation: "Judge's 'Bringin' It Down' was released in 1989 on Revelation Records.",
    category: "releases",
  },
  {
    id: 22,
    question: "Which compilation series did Revelation release?",
    options: ["Flex Your Head", "New York City Hardcore", "This Is Boston Not L.A.", "Burning Fight"],
    correctAnswer: 1,
    explanation: "Revelation released the 'New York City Hardcore' compilation, documenting the NYHC scene.",
    category: "releases",
  },
  {
    id: 23,
    question: "Side By Side released which EP on Revelation?",
    options: ["You're Only Young Once", "Live at CBGB", "No Way Out", "The Real Deal"],
    correctAnswer: 0,
    explanation: "Side By Side released 'You're Only Young Once' on Revelation Records.",
    category: "releases",
  },
  {
    id: 24,
    question: "What format was the original pressing of many early Rev releases?",
    options: ["CD only", "7-inch vinyl", "Digital download", "Cassette only"],
    correctAnswer: 1,
    explanation: "Many of Revelation's earliest releases were 7-inch vinyl EPs, which became collector's items.",
    category: "releases",
  },
  // ===== HARDCORE =====
  {
    id: 25,
    question: "What does 'straight edge' mean in the hardcore scene?",
    options: ["Playing fast music", "Abstaining from drugs and alcohol", "DIY recording", "Touring in a van"],
    correctAnswer: 1,
    explanation: "Straight edge is the lifestyle of abstaining from drugs, alcohol, and other substances, closely tied to many Revelation bands.",
    category: "hardcore",
  },
  {
    id: 26,
    question: "Which venue was central to the NYHC scene in the late '80s?",
    options: ["The Roxy", "CBGB", "The Limelight", "Max's Kansas City"],
    correctAnswer: 1,
    explanation: "CBGB hosted many legendary NYHC shows featuring Revelation Records bands.",
    category: "hardcore",
  },
  {
    id: 27,
    question: "Which movement is closely associated with Revelation Records' early years?",
    options: ["Grunge", "New York straight edge hardcore", "Riot grrrl", "Emo revival"],
    correctAnswer: 1,
    explanation: "Revelation Records was a key label in the New York straight edge hardcore movement of the late 1980s.",
    category: "hardcore",
  },
  {
    id: 28,
    question: "What does 'NYHC' stand for?",
    options: ["New York Heavy Core", "New York Hardcore", "New York Hip-Hop Culture", "New York Hard Core"],
    correctAnswer: 1,
    explanation: "NYHC stands for New York Hardcore, the punk/hardcore scene that Revelation helped define.",
    category: "hardcore",
  },
  {
    id: 29,
    question: "Which Revelation band is considered a 'youth crew' band?",
    options: ["Quicksand", "Youth of Today", "Into Another", "Iceburn"],
    correctAnswer: 1,
    explanation: "Youth of Today was one of the definitive 'youth crew' hardcore bands of the late 1980s.",
    category: "hardcore",
  },
  {
    id: 30,
    question: "The 'X' marked on hands at hardcore shows signifies what?",
    options: ["Band membership", "Straight edge", "VIP access", "Crew affiliation"],
    correctAnswer: 1,
    explanation: "The 'X' on hands originated from clubs marking underage kids who couldn't drink, and became a straight edge symbol.",
    category: "hardcore",
  },
  // ===== FACTS =====
  {
    id: 31,
    question: "Which Revelation band later formed Quicksand?",
    options: ["Bold", "Gorilla Biscuits", "Judge", "Youth of Today"],
    correctAnswer: 1,
    explanation: "Walter Schreifels from Gorilla Biscuits went on to form Quicksand.",
    category: "facts",
  },
  {
    id: 32,
    question: "How many releases does Revelation Records have in their catalog?",
    options: ["Under 50", "50-100", "100-200", "Over 200"],
    correctAnswer: 3,
    explanation: "Revelation Records has released well over 200 titles in their catalog since 1987.",
    category: "facts",
  },
  {
    id: 33,
    question: "Which 1990s genre did Revelation expand into beyond hardcore?",
    options: ["Grunge", "Post-hardcore and emo", "Ska", "Industrial"],
    correctAnswer: 1,
    explanation: "In the 1990s, Revelation expanded into post-hardcore and emo with bands like Texas Is the Reason and Sense Field.",
    category: "facts",
  },
  {
    id: 34,
    question: "Which Revelation band featured members who later joined CIV?",
    options: ["Warzone", "Judge", "Gorilla Biscuits", "Bold"],
    correctAnswer: 2,
    explanation: "Members of Gorilla Biscuits, including Civ Egan, went on to form CIV.",
    category: "facts",
  },
  {
    id: 35,
    question: "What was distinctive about the Revelation Records logo?",
    options: ["A skull and crossbones", "The word REV in a circle", "A flame design", "Block lettering with 'REVELATION RECORDS'"],
    correctAnswer: 3,
    explanation: "The Revelation Records logo features distinctive block lettering that became iconic in hardcore.",
    category: "facts",
  },
  {
    id: 36,
    question: "Which Revelation band released 'Manners and Health'?",
    options: ["Iceburn", "Sense Field", "Into Another", "Farside"],
    correctAnswer: 2,
    explanation: "Into Another released 'Ignaurus' and other records on Revelation, featuring former members of NYHC bands.",
    category: "facts",
  },
  {
    id: 37,
    question: "Which decade saw Revelation Records' founding and initial rise?",
    options: ["1970s", "1980s", "1990s", "2000s"],
    correctAnswer: 1,
    explanation: "Revelation Records was founded in 1987 and rose to prominence in the late 1980s hardcore scene.",
    category: "facts",
  },
  {
    id: 38,
    question: "Revelation Records is primarily known for which vinyl format's collectibility?",
    options: ["12-inch LP", "7-inch EP", "10-inch", "Picture disc"],
    correctAnswer: 1,
    explanation: "Revelation's 7-inch EPs, especially early pressings in limited color variants, are highly sought after by collectors.",
    category: "facts",
  },
  {
    id: 39,
    question: "Which Revelation band had a song called 'New Direction'?",
    options: ["Gorilla Biscuits", "Youth of Today", "Bold", "Chain of Strength"],
    correctAnswer: 1,
    explanation: "Youth of Today's 'New Direction' appeared on 'We're Not in This Alone' and reflected Ray Cappo's spiritual shift.",
    category: "facts",
  },
  {
    id: 40,
    question: "Approximately how many decades has Revelation Records been active?",
    options: ["Two", "Three", "Nearly four", "Over four"],
    correctAnswer: 2,
    explanation: "Founded in 1987, Revelation Records has been active for nearly four decades.",
    category: "facts",
  },
];

export function getDailyRevTriviaQuestions(date?: Date): RevTriviaQuestion[] {
  const now = date || new Date();
  const totalQuestions = revTriviaQuestions.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...revTriviaQuestions];
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

export function getRevTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `rev-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getRevNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
