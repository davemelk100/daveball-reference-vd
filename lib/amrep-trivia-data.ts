import { isYearQuestion } from "./trivia-utils";

export interface AmrepTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const amrepTriviaQuestions: AmrepTriviaQuestion[] = [
  // ── HISTORY (1–38) ──────────────────────────────────────────────────
  {
    id: 1,
    question: "In what year was Amphetamine Reptile Records founded?",
    options: ["1979", "1983", "1986", "1991"],
    correctAnswer: 2,
    explanation:
      "Amphetamine Reptile Records was founded in 1986 by Tom Hazelmyer.",
    category: "history",
  },
  {
    id: 2,
    question: "Who founded Amphetamine Reptile Records?",
    options: ["Steve Albini", "Tom Hazelmyer", "J Mascis", "Ian MacKaye"],
    correctAnswer: 1,
    explanation:
      "The label was founded by Tom Hazelmyer, also known as Haze XXL.",
    category: "history",
  },
  {
    id: 3,
    question: "In which city did Amphetamine Reptile Records originate?",
    options: ["Minneapolis", "Seattle", "Chicago", "Portland"],
    correctAnswer: 1,
    explanation:
      "AmRep was originally started in Seattle, Washington while Hazelmyer was in the Marines.",
    category: "history",
  },
  {
    id: 4,
    question:
      "What was Tom Hazelmyer doing professionally when he started AmRep?",
    options: [
      "Teaching at a university",
      "Working as a graphic designer",
      "Serving in the Marines",
      "Managing a record store",
    ],
    correctAnswer: 2,
    explanation:
      "Hazelmyer founded the label while serving in the United States Marines in Seattle.",
    category: "history",
  },
  {
    id: 5,
    question: "To which city did Amphetamine Reptile Records eventually move?",
    options: ["Chicago", "Minneapolis", "New York", "Austin"],
    correctAnswer: 1,
    explanation:
      "After starting in Seattle, the label relocated to Minneapolis, Minnesota.",
    category: "history",
  },
  {
    id: 6,
    question: "What is Tom Hazelmyer's well-known alias?",
    options: ["Haze XXL", "Reptile Tom", "Big Haze", "T-Hazard"],
    correctAnswer: 0,
    explanation:
      "Tom Hazelmyer is also known as Haze XXL, under which name he also created artwork for the label.",
    category: "history",
  },
  {
    id: 7,
    question:
      "What was the name of the compilation series that AmRep became famous for?",
    options: [
      "Noise Across America",
      "Dope-Guns-'N-Fucking in the Streets",
      "Underground Assault",
      "Reptile Bites",
    ],
    correctAnswer: 1,
    explanation:
      "The 'Dope-Guns-'N-Fucking in the Streets' series was a landmark compilation series on AmRep.",
    category: "history",
  },
  {
    id: 8,
    question: "Approximately when did Amphetamine Reptile go on hiatus?",
    options: [
      "Early 1990s",
      "Late 1990s/early 2000s",
      "Mid-2000s",
      "It never went on hiatus",
    ],
    correctAnswer: 1,
    explanation:
      "The label went on hiatus in the late 1990s/early 2000s, though Hazelmyer has revived it periodically.",
    category: "history",
  },
  {
    id: 9,
    question: "What has Hazelmyer done with the label since its hiatus?",
    options: [
      "Sold it to a major label",
      "Revived it periodically for reissues",
      "Converted it to a digital-only label",
      "Merged it with Sub Pop",
    ],
    correctAnswer: 1,
    explanation:
      "Hazelmyer has revived AmRep periodically, primarily for reissues of classic catalog titles.",
    category: "history",
  },
  {
    id: 10,
    question:
      "What prefix did Amphetamine Reptile often use for its catalog numbers?",
    options: [
      "Amp and Rep",
      "Scale and Reptile",
      "Noise and Fury",
      "Dope and Guns",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep catalog numbers often started with 'Scale' or 'Reptile.'",
    category: "history",
  },
  {
    id: 11,
    question:
      "Which US state was AmRep originally based in before moving to Minnesota?",
    options: ["Oregon", "California", "Washington", "New York"],
    correctAnswer: 2,
    explanation:
      "The label began in Seattle, Washington before relocating to Minneapolis, Minnesota.",
    category: "history",
  },
  {
    id: 12,
    question:
      "Which phrase best describes the musical focus of Amphetamine Reptile Records?",
    options: [
      "Noise rock, punk, and heavy underground music",
      "Electronic dance music and techno",
      "Progressive rock and jazz fusion",
      "Folk and Americana",
    ],
    correctAnswer: 0,
    explanation:
      "AmRep was known for releasing noise rock, punk, and heavy underground music.",
    category: "history",
  },
  {
    id: 13,
    question:
      "The 'Dope-Guns-'N-Fucking in the Streets' series was released in what format?",
    options: [
      "Full-length studio albums",
      "Compilation releases featuring various AmRep artists",
      "Live concert DVDs",
      "Spoken word recordings",
    ],
    correctAnswer: 1,
    explanation:
      "The series consisted of compilations featuring tracks from various Amphetamine Reptile artists.",
    category: "history",
  },
  {
    id: 14,
    question:
      "Which decade saw the peak output of Amphetamine Reptile Records?",
    options: ["1970s", "1980s", "1990s", "2000s"],
    correctAnswer: 2,
    explanation:
      "The 1990s were the peak years for AmRep, with a prolific roster and many landmark releases.",
    category: "history",
  },
  {
    id: 15,
    question: "What kind of label is Amphetamine Reptile Records classified as?",
    options: [
      "A major label subsidiary",
      "An independent record label",
      "A government-funded arts label",
      "A college radio station label",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep is an independent record label, one of the most influential indie labels of the late 1980s and 1990s.",
    category: "history",
  },
  {
    id: 16,
    question:
      "In what state is Minneapolis, where AmRep eventually settled?",
    options: ["Wisconsin", "Iowa", "Minnesota", "Michigan"],
    correctAnswer: 2,
    explanation:
      "Minneapolis is in Minnesota. AmRep moved there from Seattle and made it the label's home base.",
    category: "history",
  },
  {
    id: 17,
    question:
      "What kind of packaging was Amphetamine Reptile Records known for?",
    options: [
      "Standard jewel cases only",
      "Limited edition colored vinyl and unique packaging",
      "Plain white sleeves with no artwork",
      "Cardboard digipaks exclusively",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep was known for limited edition colored vinyl and unique, distinctive packaging.",
    category: "history",
  },
  {
    id: 18,
    question:
      "Which of these labels was a contemporary peer of AmRep in the noise rock scene?",
    options: ["Motown", "Touch and Go Records", "Def Jam", "Blue Note"],
    correctAnswer: 1,
    explanation:
      "Touch and Go Records was a fellow independent label that operated in a similar noise rock and punk space during the same era.",
    category: "history",
  },
  {
    id: 19,
    question:
      "What was the general attitude/aesthetic of Amphetamine Reptile Records?",
    options: [
      "Polished and corporate",
      "Aggressive, raw, and DIY",
      "Psychedelic and mellow",
      "Intellectual and academic",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep cultivated an aggressive, raw, and DIY aesthetic across its music, artwork, and packaging.",
    category: "history",
  },
  {
    id: 20,
    question:
      "How many volumes were released in the 'Dope-Guns-'N-Fucking in the Streets' series?",
    options: [
      "3",
      "7",
      "Over 10",
      "Only 1",
    ],
    correctAnswer: 2,
    explanation:
      "The series ran for over 10 volumes throughout the label's active years, becoming one of AmRep's signature releases.",
    category: "history",
  },
  {
    id: 21,
    question: "What role did Tom Hazelmyer play beyond running the label?",
    options: [
      "He was only a business manager",
      "He was a musician and visual artist as well as label owner",
      "He was exclusively a talent scout",
      "He was a music journalist",
    ],
    correctAnswer: 1,
    explanation:
      "Hazelmyer was a musician (Halo of Flies), a visual artist who created label artwork, and the label owner.",
    category: "history",
  },
  {
    id: 22,
    question:
      "Which branch of the US military was Tom Hazelmyer serving in when he started AmRep?",
    options: ["Army", "Navy", "Marines", "Air Force"],
    correctAnswer: 2,
    explanation:
      "Tom Hazelmyer was serving in the United States Marines when he founded the label in Seattle.",
    category: "history",
  },
  {
    id: 23,
    question:
      "What was the primary format for AmRep's early releases?",
    options: [
      "CD only",
      "Vinyl records (7-inch and LP)",
      "Cassette tapes only",
      "Digital downloads",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's early output focused heavily on vinyl, including 7-inch singles and LPs, often in limited editions.",
    category: "history",
  },
  {
    id: 24,
    question:
      "Which region of the United States contributed the most bands to the AmRep roster?",
    options: [
      "The South",
      "The West Coast",
      "The Midwest",
      "New England",
    ],
    correctAnswer: 2,
    explanation:
      "Many key AmRep bands came from the Midwest, including Minneapolis, Fargo, Chicago, Ann Arbor, Madison, and Kalamazoo.",
    category: "history",
  },
  {
    id: 25,
    question:
      "What did 'AmRep' become a common abbreviation for?",
    options: [
      "American Repertoire",
      "Amphetamine Reptile",
      "Amplified Republic",
      "Amplitude Reprise",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep is the widely used abbreviation for Amphetamine Reptile Records.",
    category: "history",
  },
  {
    id: 26,
    question:
      "The founding of AmRep in 1986 placed it in the same era as which other important indie label founding?",
    options: [
      "Sub Pop (1986/1988)",
      "Motown (1959)",
      "Def Jam (1984)",
      "XL Recordings (1989)",
    ],
    correctAnswer: 0,
    explanation:
      "Sub Pop was also founded in the mid-to-late 1980s in the Pacific Northwest, making it a contemporary of AmRep.",
    category: "history",
  },
  {
    id: 27,
    question:
      "What was the relationship between AmRep and the Minneapolis music scene?",
    options: [
      "AmRep had no connection to Minneapolis",
      "AmRep became a pillar of the Minneapolis underground music scene",
      "AmRep only signed bands from outside Minneapolis",
      "AmRep was a subsidiary of Prince's Paisley Park label",
    ],
    correctAnswer: 1,
    explanation:
      "After relocating to Minneapolis, AmRep became deeply embedded in and contributed significantly to the local underground music scene.",
    category: "history",
  },
  {
    id: 28,
    question:
      "What best describes the trajectory of Amphetamine Reptile Records?",
    options: [
      "Founded in the 1970s, peaked in the 1980s",
      "Founded in 1986, peaked in the early-to-mid 1990s, went on hiatus in the late 1990s/early 2000s",
      "Founded in 1996, still fully active today",
      "Founded in 1986, sold to a major label in 1992",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep was founded in 1986, had its peak years in the early-to-mid 1990s, then went on hiatus around the late 1990s/early 2000s.",
    category: "history",
  },
  {
    id: 29,
    question:
      "Tom Hazelmyer started AmRep while stationed in which Pacific Northwest city?",
    options: ["Portland", "Tacoma", "Seattle", "Olympia"],
    correctAnswer: 2,
    explanation:
      "Hazelmyer started the label while stationed in Seattle, Washington with the Marines.",
    category: "history",
  },
  {
    id: 30,
    question:
      "What role did limited edition releases play in AmRep's identity?",
    options: [
      "They were unimportant to the label",
      "They were central to the label's collector appeal and identity",
      "They were only done for major label partnerships",
      "They were exclusively digital releases",
    ],
    correctAnswer: 1,
    explanation:
      "Limited edition colored vinyl and unique packaging were a hallmark of AmRep and central to its collector appeal.",
    category: "history",
  },
  {
    id: 31,
    question:
      "Which of the following best describes AmRep's distribution model in its early years?",
    options: [
      "Major label distribution deals",
      "Independent and DIY distribution",
      "Exclusively mail-order",
      "Digital streaming only",
    ],
    correctAnswer: 1,
    explanation:
      "Like many indie labels of the era, AmRep relied on independent and DIY distribution channels.",
    category: "history",
  },
  {
    id: 32,
    question:
      "What cultural movement was AmRep most closely associated with?",
    options: [
      "Grunge",
      "The underground noise rock and punk scenes",
      "Britpop",
      "New Wave",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep was a key part of the underground noise rock and punk scenes of the late 1980s and 1990s.",
    category: "history",
  },
  {
    id: 33,
    question:
      "When Hazelmyer revived AmRep after its hiatus, what was the primary focus?",
    options: [
      "Signing new bands",
      "Reissues of classic catalog titles",
      "Launching a streaming platform",
      "Opening a chain of record stores",
    ],
    correctAnswer: 1,
    explanation:
      "Hazelmyer's periodic revivals of AmRep have primarily focused on reissues of the label's classic back catalog.",
    category: "history",
  },
  {
    id: 34,
    question:
      "What was significant about AmRep's position in the Seattle music scene of the mid-1980s?",
    options: [
      "It was the first label to sign Nirvana",
      "It predated the grunge explosion and was part of the broader underground rock activity in the Pacific Northwest",
      "It was a jazz label that switched to rock",
      "It was funded by the city of Seattle",
    ],
    correctAnswer: 1,
    explanation:
      "Founded in 1986, AmRep was part of the broader underground rock activity in the Pacific Northwest before the grunge explosion.",
    category: "history",
  },
  {
    id: 35,
    question:
      "Which of the following is NOT true about Amphetamine Reptile Records?",
    options: [
      "It was founded in 1986",
      "It was originally based in Seattle",
      "It was founded by Steve Albini",
      "It later moved to Minneapolis",
    ],
    correctAnswer: 2,
    explanation:
      "AmRep was founded by Tom Hazelmyer, not Steve Albini. Albini is associated with other aspects of the underground music scene.",
    category: "history",
  },
  {
    id: 36,
    question:
      "How did AmRep's move to Minneapolis affect the label?",
    options: [
      "It caused the label to shut down",
      "It connected the label to a thriving Midwest underground scene and many local bands joined the roster",
      "It had no impact",
      "It shifted the label's focus to country music",
    ],
    correctAnswer: 1,
    explanation:
      "Moving to Minneapolis connected AmRep to a thriving Midwest underground scene, with bands like Cows, Hammerhead, and Janitor Joe joining the roster.",
    category: "history",
  },
  {
    id: 37,
    question:
      "What decade saw the founding of Amphetamine Reptile Records?",
    options: ["1960s", "1970s", "1980s", "1990s"],
    correctAnswer: 2,
    explanation: "AmRep was founded in 1986, in the 1980s.",
    category: "history",
  },
  {
    id: 38,
    question:
      "What was the approximate active period of AmRep before its hiatus?",
    options: [
      "1986 to the late 1990s",
      "1975 to 1985",
      "1990 to 2010",
      "2000 to 2015",
    ],
    correctAnswer: 0,
    explanation:
      "AmRep was active from its founding in 1986 until it went on hiatus in the late 1990s/early 2000s.",
    category: "history",
  },

  // ── ARTISTS (39–76) ─────────────────────────────────────────────────
  {
    id: 39,
    question: "Which band was Tom Hazelmyer's own project on the AmRep roster?",
    options: ["Cows", "Halo of Flies", "Hammerhead", "Helmet"],
    correctAnswer: 1,
    explanation:
      "Halo of Flies was Tom Hazelmyer's own band and a core part of the AmRep catalog.",
    category: "artists",
  },
  {
    id: 40,
    question:
      "Which AmRep band later signed with Interscope Records for major label releases?",
    options: ["Cows", "Melvins", "Helmet", "Unsane"],
    correctAnswer: 2,
    explanation:
      "Helmet released 'Strap It On' on AmRep before moving to Interscope Records.",
    category: "artists",
  },
  {
    id: 41,
    question: "Which AmRep band was from Fargo, North Dakota?",
    options: ["Cows", "Hammerhead", "Tar", "God Bullies"],
    correctAnswer: 1,
    explanation: "Hammerhead hailed from Fargo, North Dakota.",
    category: "artists",
  },
  {
    id: 42,
    question: "Shannon Selberg was a member of which AmRep band?",
    options: ["Helmet", "Cows", "Unsane", "Hammerhead"],
    correctAnswer: 1,
    explanation:
      "Shannon Selberg was a key member of Cows, one of AmRep's flagship Minneapolis bands.",
    category: "artists",
  },
  {
    id: 43,
    question: "Kevin Rutmanis was a member of which AmRep band?",
    options: ["Surgery", "Tar", "Cows", "Boss Hog"],
    correctAnswer: 2,
    explanation:
      "Kevin Rutmanis played in Cows. He later went on to play with the Melvins and other bands.",
    category: "artists",
  },
  {
    id: 44,
    question: "Which AmRep band featured Jon Spencer and Cristina Martinez?",
    options: ["Unsane", "Boss Hog", "Chokebore", "Surgery"],
    correctAnswer: 1,
    explanation:
      "Boss Hog featured the husband-and-wife duo of Jon Spencer and Cristina Martinez.",
    category: "artists",
  },
  {
    id: 45,
    question: "Where was the AmRep band Unsane from?",
    options: ["Chicago", "Minneapolis", "New York City", "Boston"],
    correctAnswer: 2,
    explanation: "Unsane was a noise rock band from New York City.",
    category: "artists",
  },
  {
    id: 46,
    question: "Where was the AmRep band Surgery from?",
    options: ["Syracuse, New York", "Buffalo, New York", "Albany, New York", "Rochester, New York"],
    correctAnswer: 0,
    explanation: "Surgery was from Syracuse, New York.",
    category: "artists",
  },
  {
    id: 47,
    question: "Who led the band Today Is the Day?",
    options: ["Tom Hazelmyer", "Steve Austin", "Page Hamilton", "Jon Spencer"],
    correctAnswer: 1,
    explanation:
      "Today Is the Day was led by Steve Austin.",
    category: "artists",
  },
  {
    id: 48,
    question: "Where was the AmRep band Tar from?",
    options: ["Minneapolis", "Detroit", "Chicago", "Milwaukee"],
    correctAnswer: 2,
    explanation: "Tar was a band from Chicago, Illinois.",
    category: "artists",
  },
  {
    id: 49,
    question: "Which AmRep band featured Kristen Pfaff, who later joined Hole?",
    options: ["Janitor Joe", "Cows", "Boss Hog", "Chokebore"],
    correctAnswer: 0,
    explanation:
      "Janitor Joe, a Minneapolis band, featured Kristen Pfaff who later joined Hole as their bassist.",
    category: "artists",
  },
  {
    id: 50,
    question: "Where was Janitor Joe based?",
    options: ["Chicago", "Seattle", "Minneapolis", "New York"],
    correctAnswer: 2,
    explanation:
      "Janitor Joe was from Minneapolis, Minnesota.",
    category: "artists",
  },
  {
    id: 51,
    question: "Where were the God Bullies from?",
    options: ["Ann Arbor, Michigan", "Kalamazoo, Michigan", "Detroit, Michigan", "Grand Rapids, Michigan"],
    correctAnswer: 1,
    explanation: "God Bullies were from Kalamazoo, Michigan.",
    category: "artists",
  },
  {
    id: 52,
    question:
      "Which AmRep band was originally from Syracuse, New York?",
    options: ["Unsane", "Surgery", "Boss Hog", "Chokebore"],
    correctAnswer: 1,
    explanation: "Surgery was from Syracuse, New York.",
    category: "artists",
  },
  {
    id: 53,
    question: "Which Minneapolis band was known for Shannon Selberg's theatrical stage presence?",
    options: ["Hammerhead", "Cows", "Halo of Flies", "Janitor Joe"],
    correctAnswer: 1,
    explanation:
      "Cows, featuring Shannon Selberg, were known for wild theatrical performances.",
    category: "artists",
  },
  {
    id: 54,
    question: "Where was King Snake Roost from?",
    options: ["New Zealand", "England", "Australia", "Canada"],
    correctAnswer: 2,
    explanation:
      "King Snake Roost were from Australia, one of the few non-American bands on the AmRep roster.",
    category: "artists",
  },
  {
    id: 55,
    question: "Where were Killdozer from?",
    options: ["Madison, Wisconsin", "Fargo, North Dakota", "Duluth, Minnesota", "Des Moines, Iowa"],
    correctAnswer: 0,
    explanation: "Killdozer were from Madison, Wisconsin.",
    category: "artists",
  },
  {
    id: 56,
    question: "Paul Sanders and Jeff Mooridian Jr. were members of which AmRep band?",
    options: ["Cows", "Tar", "Hammerhead", "God Bullies"],
    correctAnswer: 2,
    explanation:
      "Paul Sanders and Jeff Mooridian Jr. were members of Hammerhead from Fargo, North Dakota.",
    category: "artists",
  },
  {
    id: 57,
    question: "Which AmRep band was a key act from Minneapolis known for their chaotic live shows?",
    options: ["Helmet", "King Snake Roost", "Cows", "Killdozer"],
    correctAnswer: 2,
    explanation:
      "Cows were a key AmRep band from Minneapolis, known for their wild and chaotic live performances.",
    category: "artists",
  },
  {
    id: 58,
    question:
      "Which of these bands was NOT on Amphetamine Reptile Records?",
    options: ["Cows", "Helmet", "Sonic Youth", "Melvins"],
    correctAnswer: 2,
    explanation:
      "Sonic Youth was primarily associated with SST Records and DGC, not Amphetamine Reptile.",
    category: "artists",
  },
  {
    id: 59,
    question: "Helmet's frontman Page Hamilton went on to a career in which city?",
    options: ["Minneapolis", "New York City", "Seattle", "Los Angeles"],
    correctAnswer: 1,
    explanation:
      "Page Hamilton and Helmet were based in New York City. Their debut 'Strap It On' was released on AmRep.",
    category: "artists",
  },
  {
    id: 60,
    question: "Which country was King Snake Roost's home country?",
    options: ["United States", "United Kingdom", "Australia", "Germany"],
    correctAnswer: 2,
    explanation:
      "King Snake Roost hailed from Australia.",
    category: "artists",
  },
  {
    id: 61,
    question: "Jon Spencer of Boss Hog was also known for leading which other band?",
    options: [
      "Jon Spencer Blues Explosion",
      "The White Stripes",
      "Mudhoney",
      "Shellac",
    ],
    correctAnswer: 0,
    explanation:
      "Jon Spencer was also the frontman of the Jon Spencer Blues Explosion.",
    category: "artists",
  },
  {
    id: 62,
    question: "Which of these Midwest cities contributed multiple bands to the AmRep roster?",
    options: ["Los Angeles", "Minneapolis", "Miami", "Denver"],
    correctAnswer: 1,
    explanation:
      "Minneapolis contributed several bands to AmRep including Cows, Janitor Joe, and Halo of Flies.",
    category: "artists",
  },
  {
    id: 63,
    question: "Kristen Pfaff of Janitor Joe later became the bassist for which famous band?",
    options: ["Nirvana", "Hole", "L7", "Babes in Toyland"],
    correctAnswer: 1,
    explanation:
      "Kristen Pfaff joined Hole after her time in Janitor Joe. She tragically passed away in 1994.",
    category: "artists",
  },
  {
    id: 64,
    question: "Which AmRep artist was known for extremely heavy and experimental music led by Steve Austin?",
    options: ["Hammerhead", "Today Is the Day", "Tar", "Killdozer"],
    correctAnswer: 1,
    explanation:
      "Today Is the Day, led by Steve Austin, was known for pushing the boundaries of heavy and experimental music.",
    category: "artists",
  },
  {
    id: 65,
    question: "Supernova was a band on the AmRep roster. What genre were they associated with?",
    options: [
      "Heavy metal",
      "Pop punk / garage rock",
      "Jazz",
      "Electronic",
    ],
    correctAnswer: 1,
    explanation:
      "Supernova brought a punkier, more garage-oriented sound to the AmRep roster.",
    category: "artists",
  },
  {
    id: 66,
    question: "Vertigo was a band on which record label?",
    options: [
      "Sub Pop",
      "Touch and Go",
      "Amphetamine Reptile",
      "Dischord",
    ],
    correctAnswer: 2,
    explanation:
      "Vertigo was part of the Amphetamine Reptile Records roster.",
    category: "artists",
  },
  {
    id: 67,
    question: "Which state were God Bullies from?",
    options: ["Minnesota", "Wisconsin", "Michigan", "Illinois"],
    correctAnswer: 2,
    explanation:
      "God Bullies were from Kalamazoo, Michigan.",
    category: "artists",
  },
  {
    id: 68,
    question: "Which AmRep band was known as one of the most important noise rock acts from New York?",
    options: ["Surgery", "Unsane", "Boss Hog", "Helmet"],
    correctAnswer: 1,
    explanation:
      "Unsane from New York City became one of the most significant noise rock bands in the genre's history.",
    category: "artists",
  },
  {
    id: 69,
    question: "Chokebore was a band on AmRep known for what style?",
    options: [
      "Thrash metal",
      "Introspective, melodic noise rock",
      "Hip-hop",
      "Country rock",
    ],
    correctAnswer: 1,
    explanation:
      "Chokebore brought a more introspective and melodic approach to the AmRep noise rock catalog.",
    category: "artists",
  },
  {
    id: 70,
    question: "Which of these was a husband-and-wife duo on the AmRep roster?",
    options: [
      "Cows",
      "Boss Hog",
      "Hammerhead",
      "Killdozer",
    ],
    correctAnswer: 1,
    explanation:
      "Boss Hog featured married couple Jon Spencer and Cristina Martinez.",
    category: "artists",
  },
  {
    id: 71,
    question: "Which AmRep band was from the same city as the University of Wisconsin?",
    options: ["Tar", "Killdozer", "God Bullies", "Laughing Hyenas"],
    correctAnswer: 1,
    explanation:
      "Killdozer were from Madison, Wisconsin, home of the University of Wisconsin.",
    category: "artists",
  },
  {
    id: 72,
    question: "Which Michigan city was God Bullies from?",
    options: ["Ann Arbor", "Detroit", "Kalamazoo", "Grand Rapids"],
    correctAnswer: 2,
    explanation:
      "God Bullies were from Kalamazoo, Michigan.",
    category: "artists",
  },
  {
    id: 73,
    question: "The Melvins were an AmRep band originally from which state?",
    options: ["Minnesota", "Oregon", "Washington", "California"],
    correctAnswer: 2,
    explanation:
      "The Melvins originally hailed from Washington state (Montesano/Aberdeen area).",
    category: "artists",
  },
  {
    id: 74,
    question: "Which AmRep band's name is shared with a type of heavy construction equipment?",
    options: ["Hammerhead", "Killdozer", "Tar", "Helmet"],
    correctAnswer: 1,
    explanation:
      "Killdozer took their name from a bulldozer, a piece of heavy construction equipment (and a 1944 Theodore Sturgeon novella).",
    category: "artists",
  },
  {
    id: 75,
    question:
      "Which AmRep band came from the furthest distance outside the United States?",
    options: ["Surgery", "Chokebore", "King Snake Roost", "Vertigo"],
    correctAnswer: 2,
    explanation:
      "King Snake Roost came from Australia, making them the most geographically distant AmRep band.",
    category: "artists",
  },
  {
    id: 76,
    question: "Halo of Flies was primarily associated with which city?",
    options: ["Seattle", "Minneapolis", "New York", "Chicago"],
    correctAnswer: 1,
    explanation:
      "Halo of Flies, Tom Hazelmyer's band, was associated with Minneapolis after the label relocated there.",
    category: "artists",
  },

  // ── RELEASES (77–114) ───────────────────────────────────────────────
  {
    id: 77,
    question: "Which Melvins album was released on Amphetamine Reptile?",
    options: ["Houdini", "Prick", "Stoner Witch", "Bullhead"],
    correctAnswer: 1,
    explanation:
      "Prick was released on Amphetamine Reptile in 1994. Houdini and Stoner Witch were on Atlantic, and Bullhead was on Boner Records.",
    category: "releases",
  },
  {
    id: 78,
    question: "What was Helmet's debut album released on AmRep?",
    options: ["Meantime", "Betty", "Strap It On", "Aftertaste"],
    correctAnswer: 2,
    explanation:
      "Helmet's debut album 'Strap It On' was released on AmRep before the band moved to Interscope.",
    category: "releases",
  },
  {
    id: 79,
    question: "Tar released which album on Amphetamine Reptile?",
    options: ["Jackson", "Nevermind", "Superunknown", "In Utero"],
    correctAnswer: 0,
    explanation:
      "Tar released 'Jackson' on Amphetamine Reptile Records.",
    category: "releases",
  },
  {
    id: 80,
    question:
      "What was the name of AmRep's famous compilation series?",
    options: [
      "Noise Unlimited",
      "Dope-Guns-'N-Fucking in the Streets",
      "Reptile Roundup",
      "Scale Sampler",
    ],
    correctAnswer: 1,
    explanation:
      "The 'Dope-Guns-'N-Fucking in the Streets' compilation series was one of AmRep's signature releases.",
    category: "releases",
  },
  {
    id: 81,
    question:
      "After releasing 'Strap It On' on AmRep, Helmet's next album 'Meantime' was on which label?",
    options: ["Sub Pop", "Interscope", "Matador", "Touch and Go"],
    correctAnswer: 1,
    explanation:
      "Helmet moved from AmRep to Interscope Records, where they released 'Meantime.'",
    category: "releases",
  },
  {
    id: 82,
    question:
      "What type of release format was AmRep particularly known for producing in limited quantities?",
    options: [
      "8-track tapes",
      "Colored vinyl",
      "Reel-to-reel tapes",
      "MiniDiscs",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep was famous for limited edition colored vinyl releases.",
    category: "releases",
  },
  {
    id: 83,
    question:
      "The 'Dope-Guns-'N-Fucking in the Streets' compilations typically featured what?",
    options: [
      "A single artist's greatest hits",
      "Tracks from various AmRep artists",
      "Live concert recordings only",
      "Spoken word poetry",
    ],
    correctAnswer: 1,
    explanation:
      "The compilation series featured tracks from various artists on the AmRep roster.",
    category: "releases",
  },
  {
    id: 84,
    question: "Which of these is an album by Tar released on AmRep?",
    options: ["Ozma", "Strap It On", "Jackson", "Meantime"],
    correctAnswer: 2,
    explanation:
      "Jackson was an album by the Chicago band Tar, released on AmRep.",
    category: "releases",
  },
  {
    id: 85,
    question: "What was notable about AmRep's 7-inch single releases?",
    options: [
      "They were all digital only",
      "They were often limited edition with unique artwork and colored vinyl",
      "They were only available in Europe",
      "They contained only cover songs",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's 7-inch singles were often limited edition runs with distinctive artwork and colored vinyl.",
    category: "releases",
  },
  {
    id: 86,
    question:
      "Which label originally released the Melvins' 'Ozma' before it was reissued?",
    options: [
      "Sub Pop",
      "Atlantic",
      "Touch and Go",
      "Boner Records",
    ],
    correctAnswer: 3,
    explanation: "The Melvins' 'Ozma' was originally released on Boner Records in 1989.",
    category: "releases",
  },
  {
    id: 87,
    question: "Helmet's 'Strap It On' is considered significant because it was what?",
    options: [
      "The last AmRep release",
      "The debut album by a band that would go on to major label success",
      "A live album",
      "A covers album",
    ],
    correctAnswer: 1,
    explanation:
      "'Strap It On' was Helmet's debut, and the band subsequently achieved major label success on Interscope.",
    category: "releases",
  },
  {
    id: 88,
    question:
      "What catalog number prefix system did AmRep use for many of its releases?",
    options: [
      "AM and REP",
      "Scale and Reptile",
      "DOPE and GUN",
      "NOISE and ROCK",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep catalog numbers often started with 'Scale' or 'Reptile.'",
    category: "releases",
  },
  {
    id: 89,
    question: "Which band's AmRep releases are now considered highly collectible?",
    options: [
      "All AmRep releases are highly collectible",
      "Only Helmet releases",
      "Only Melvins releases",
      "None of them",
    ],
    correctAnswer: 0,
    explanation:
      "Due to limited pressings and unique packaging, most AmRep releases are now considered highly collectible.",
    category: "releases",
  },
  {
    id: 90,
    question:
      "The 'Dope-Guns-'N-Fucking in the Streets' series was released primarily on what format?",
    options: ["CD only", "Vinyl", "Cassette only", "Digital download"],
    correctAnswer: 1,
    explanation:
      "The compilation series was primarily released on vinyl, in keeping with AmRep's focus on the format.",
    category: "releases",
  },
  {
    id: 91,
    question: "Which Chicago band released the album 'Jackson' on AmRep?",
    options: ["Shellac", "Tar", "Big Black", "Urge Overkill"],
    correctAnswer: 1,
    explanation: "Tar, from Chicago, released 'Jackson' on Amphetamine Reptile.",
    category: "releases",
  },
  {
    id: 92,
    question:
      "What happened to many AmRep releases after the label went on hiatus?",
    options: [
      "They were all destroyed",
      "They became out-of-print collector's items",
      "They were reissued by a major label",
      "They were made freely available online",
    ],
    correctAnswer: 1,
    explanation:
      "Many AmRep releases went out of print during the hiatus, becoming sought-after collector's items.",
    category: "releases",
  },
  {
    id: 93,
    question:
      "When Hazelmyer revived AmRep, what type of releases did the label focus on?",
    options: ["New artist signings", "Reissues", "Live albums", "Soundtracks"],
    correctAnswer: 1,
    explanation:
      "The label's revival focused primarily on reissues of classic AmRep titles.",
    category: "releases",
  },
  {
    id: 94,
    question: "Which AmRep release is considered a landmark debut for a future major-label band?",
    options: [
      "Melvins - Prick",
      "Helmet - Strap It On",
      "Tar - Jackson",
      "Cows - Taint Pluribus Taint Unum",
    ],
    correctAnswer: 1,
    explanation:
      "Helmet's 'Strap It On' on AmRep preceded the band's breakthrough on Interscope, making it a landmark indie debut.",
    category: "releases",
  },
  {
    id: 95,
    question:
      "What was distinctive about the physical packaging of AmRep releases?",
    options: [
      "They used standard generic packaging",
      "They featured unique, often provocative artwork and creative packaging",
      "They came in plain brown paper bags",
      "They used exclusively digital formats",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep releases were known for distinctive, often provocative artwork and creative packaging.",
    category: "releases",
  },
  {
    id: 96,
    question: "Cows released multiple albums on AmRep. What city were they from?",
    options: ["Chicago", "New York", "Minneapolis", "Austin"],
    correctAnswer: 2,
    explanation:
      "Cows were from Minneapolis, Minnesota and released several albums on AmRep.",
    category: "releases",
  },
  {
    id: 97,
    question:
      "What makes early AmRep vinyl pressings valuable to collectors?",
    options: [
      "They were mass-produced",
      "They were limited editions, often on colored vinyl with unique artwork",
      "They contained hidden digital codes",
      "They were made of gold",
    ],
    correctAnswer: 1,
    explanation:
      "Limited edition pressings, colored vinyl, and unique artwork make early AmRep releases valuable to collectors.",
    category: "releases",
  },
  {
    id: 98,
    question:
      "Which band released records on AmRep before achieving mainstream success on a major label?",
    options: ["Nirvana", "Pearl Jam", "Helmet", "Soundgarden"],
    correctAnswer: 2,
    explanation:
      "Helmet released 'Strap It On' on AmRep before signing with Interscope for 'Meantime.'",
    category: "releases",
  },
  {
    id: 99,
    question:
      "The 'Dope-Guns-'N-Fucking in the Streets' series served what purpose for AmRep?",
    options: [
      "It was a fundraiser for charity",
      "It showcased the label's roster and introduced listeners to multiple bands",
      "It was a spoken-word series",
      "It was a mail-order exclusive",
    ],
    correctAnswer: 1,
    explanation:
      "The series served as a showcase of the AmRep roster, introducing listeners to a variety of the label's bands.",
    category: "releases",
  },
  {
    id: 100,
    question:
      "Unsane released records on AmRep. What genre best describes their sound?",
    options: ["Pop", "Noise rock", "Reggae", "Classical"],
    correctAnswer: 1,
    explanation:
      "Unsane's sound was firmly in the noise rock genre, fitting perfectly with the AmRep aesthetic.",
    category: "releases",
  },
  {
    id: 101,
    question:
      "Which of these is a Cows album?",
    options: [
      "Taint Pluribus Taint Unum",
      "Strap It On",
      "Ozma",
      "Jackson",
    ],
    correctAnswer: 0,
    explanation:
      "Taint Pluribus Taint Unum is a Cows album released on Amphetamine Reptile.",
    category: "releases",
  },
  {
    id: 102,
    question: "What was the typical pressing run size for limited AmRep vinyl releases?",
    options: [
      "Millions of copies",
      "Hundreds to low thousands",
      "Exactly 10 copies",
      "Only digital, no physical",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep limited editions were typically pressed in runs of hundreds to low thousands of copies.",
    category: "releases",
  },
  {
    id: 103,
    question:
      "Boss Hog released material on AmRep. What style did they play?",
    options: [
      "Ambient electronic",
      "Blues-influenced noise rock and punk",
      "Classical chamber music",
      "Smooth jazz",
    ],
    correctAnswer: 1,
    explanation:
      "Boss Hog played blues-influenced noise rock and punk, fitting well within the AmRep catalog.",
    category: "releases",
  },
  {
    id: 104,
    question:
      "Surgery released records on AmRep. Where was the band from?",
    options: [
      "Syracuse, New York",
      "San Francisco, California",
      "Portland, Oregon",
      "Nashville, Tennessee",
    ],
    correctAnswer: 0,
    explanation: "Surgery was from Syracuse, New York.",
    category: "releases",
  },
  {
    id: 105,
    question:
      "Halo of Flies releases are notable for what reason?",
    options: [
      "They were the most commercially successful AmRep releases",
      "They were the label founder's own band's recordings",
      "They were all live recordings",
      "They were all cover albums",
    ],
    correctAnswer: 1,
    explanation:
      "Halo of Flies was Tom Hazelmyer's own band, making their releases a personal cornerstone of the AmRep catalog.",
    category: "releases",
  },
  {
    id: 106,
    question:
      "Today Is the Day's AmRep releases were known for being what?",
    options: [
      "Light and poppy",
      "Extremely heavy and experimental",
      "Acoustic folk songs",
      "Instrumental jazz",
    ],
    correctAnswer: 1,
    explanation:
      "Today Is the Day, led by Steve Austin, was known for extremely heavy and experimental music.",
    category: "releases",
  },
  {
    id: 107,
    question:
      "God Bullies released records on AmRep. Their sound was part of which broader movement?",
    options: [
      "Grunge",
      "Noise rock and underground punk",
      "New Wave",
      "Shoegaze",
    ],
    correctAnswer: 1,
    explanation:
      "God Bullies from Kalamazoo, Michigan fit into the noise rock and underground punk movement that defined AmRep.",
    category: "releases",
  },
  {
    id: 108,
    question:
      "God Bullies' records on AmRep were characterized by what?",
    options: [
      "Smooth production and pop hooks",
      "Raw, intense, and aggressive noise rock",
      "Electronic beats",
      "Orchestral arrangements",
    ],
    correctAnswer: 1,
    explanation:
      "God Bullies from Kalamazoo played raw, intense, and aggressive noise rock.",
    category: "releases",
  },
  {
    id: 109,
    question: "Killdozer's releases on AmRep reflected what musical style?",
    options: [
      "Noise rock with dark humor",
      "Pop punk",
      "Progressive rock",
      "Dance music",
    ],
    correctAnswer: 0,
    explanation:
      "Killdozer from Madison, Wisconsin were known for their noise rock approach infused with dark humor.",
    category: "releases",
  },
  {
    id: 110,
    question:
      "Which AmRep band's catalog includes releases that bridge noise rock and blues?",
    options: ["Tar", "Boss Hog", "Hammerhead", "Surgery"],
    correctAnswer: 1,
    explanation:
      "Boss Hog, featuring Jon Spencer, bridged noise rock and blues influences in their AmRep releases.",
    category: "releases",
  },
  {
    id: 111,
    question:
      "King Snake Roost's AmRep releases were notable for coming from where?",
    options: ["Japan", "Australia", "Brazil", "South Africa"],
    correctAnswer: 1,
    explanation:
      "King Snake Roost were from Australia, making their AmRep releases notable for their international origin.",
    category: "releases",
  },
  {
    id: 112,
    question:
      "Hammerhead's AmRep releases were known for what sonic quality?",
    options: [
      "Gentle acoustic songs",
      "Heavy, aggressive noise rock",
      "Electronic ambient music",
      "A cappella harmonies",
    ],
    correctAnswer: 1,
    explanation:
      "Hammerhead from Fargo, North Dakota delivered heavy, aggressive noise rock on their AmRep releases.",
    category: "releases",
  },
  {
    id: 113,
    question: "Chokebore's AmRep releases stood out for what quality?",
    options: [
      "Being purely instrumental",
      "A more melodic and introspective approach compared to other AmRep bands",
      "Being entirely live recordings",
      "Using only electronic instruments",
    ],
    correctAnswer: 1,
    explanation:
      "Chokebore brought a more melodic, introspective quality to the AmRep roster.",
    category: "releases",
  },
  {
    id: 114,
    question: "Which of these statements about AmRep reissues is true?",
    options: [
      "AmRep has never reissued any titles",
      "Hazelmyer has periodically revived the label for reissues",
      "All AmRep titles were reissued by Warner Bros.",
      "Reissues are only available in Japan",
    ],
    correctAnswer: 1,
    explanation:
      "Hazelmyer has periodically revived the label to reissue classic AmRep catalog titles.",
    category: "releases",
  },

  // ── FACTS (115–152) ─────────────────────────────────────────────────
  {
    id: 115,
    question:
      "Which artist was well known for creating artwork for AmRep releases?",
    options: ["Frank Kozik", "Raymond Pettibon", "Banksy", "Shepard Fairey"],
    correctAnswer: 0,
    explanation:
      "Frank Kozik was one of the most prominent artists associated with AmRep's distinctive visual identity.",
    category: "facts",
  },
  {
    id: 116,
    question:
      "Besides Frank Kozik, who else frequently created artwork for AmRep?",
    options: [
      "Andy Warhol",
      "Haze XXL (Tom Hazelmyer)",
      "Keith Haring",
      "Pushead",
    ],
    correctAnswer: 1,
    explanation:
      "Haze XXL, Tom Hazelmyer's artist alias, was responsible for much of the label's iconic artwork.",
    category: "facts",
  },
  {
    id: 117,
    question:
      "Amphetamine Reptile Records is best known for which genre focus?",
    options: ["Noise rock", "Synthpop", "Country", "Reggae"],
    correctAnswer: 0,
    explanation:
      "AmRep is primarily known for noise rock, along with punk and heavy underground music.",
    category: "facts",
  },
  {
    id: 118,
    question:
      "What made AmRep's artwork distinctive in the underground music world?",
    options: [
      "It was always minimalist and text-only",
      "It featured provocative, bold, and aggressive imagery by artists like Frank Kozik and Haze XXL",
      "It only used photographs",
      "It was designed by major advertising agencies",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep was famous for bold, provocative artwork by artists like Frank Kozik and Haze XXL.",
    category: "facts",
  },
  {
    id: 119,
    question:
      "What is the connection between Tom Hazelmyer and the visual art on AmRep releases?",
    options: [
      "He had no involvement with the art",
      "He personally created much of the artwork under the name Haze XXL",
      "He only hired outside artists",
      "He used stock photography exclusively",
    ],
    correctAnswer: 1,
    explanation:
      "Hazelmyer personally created artwork for many AmRep releases under his artist name Haze XXL.",
    category: "facts",
  },
  {
    id: 120,
    question:
      "Which of these genres is NOT typically associated with AmRep?",
    options: ["Noise rock", "Punk", "Smooth jazz", "Heavy underground music"],
    correctAnswer: 2,
    explanation:
      "Smooth jazz is not associated with AmRep. The label focused on noise rock, punk, and heavy underground music.",
    category: "facts",
  },
  {
    id: 121,
    question:
      "Frank Kozik's poster and album art for AmRep is part of which broader art movement?",
    options: [
      "Renaissance art",
      "Lowbrow / underground rock poster art",
      "Art Deco",
      "Impressionism",
    ],
    correctAnswer: 1,
    explanation:
      "Frank Kozik's work for AmRep is associated with the lowbrow and underground rock poster art movement.",
    category: "facts",
  },
  {
    id: 122,
    question:
      "What aspect of AmRep's releases contributed most to their collectibility?",
    options: [
      "Celebrity endorsements",
      "Limited edition colored vinyl and unique packaging",
      "Free concert tickets included",
      "Scratch-and-sniff stickers",
    ],
    correctAnswer: 1,
    explanation:
      "Limited edition colored vinyl and unique packaging are the primary factors in AmRep releases' collectibility.",
    category: "facts",
  },
  {
    id: 123,
    question:
      "AmRep is often mentioned alongside which other indie labels as part of the noise rock movement?",
    options: [
      "Motown and Stax",
      "Touch and Go and Sub Pop",
      "Columbia and RCA",
      "Def Jam and Bad Boy",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep is often mentioned alongside Touch and Go and Sub Pop as pillars of the indie/noise rock scene.",
    category: "facts",
  },
  {
    id: 124,
    question:
      "What role did AmRep play in the broader underground music ecosystem of the late 1980s and 1990s?",
    options: [
      "It was irrelevant",
      "It was one of the most important tastemaker labels for noise rock and underground punk",
      "It focused exclusively on hip-hop",
      "It was a classical music imprint",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep was one of the most important tastemaker labels for noise rock and underground punk in its era.",
    category: "facts",
  },
  {
    id: 125,
    question:
      "What geographic pattern is evident among AmRep's roster of bands?",
    options: [
      "All bands were from California",
      "A strong concentration of Midwest bands alongside acts from NYC and internationally",
      "All bands were from Europe",
      "All bands were from the Southern US",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's roster featured a strong Midwest concentration (Minneapolis, Fargo, Chicago, Ann Arbor, etc.) plus NYC bands and international acts like King Snake Roost.",
    category: "facts",
  },
  {
    id: 126,
    question:
      "What does the reptile in 'Amphetamine Reptile' suggest about the label's aesthetic?",
    options: [
      "The label focused on nature documentaries",
      "It evokes something fast, predatory, and dangerous - matching the music's intensity",
      "It was named after a pet store",
      "It was a reference to a children's TV show",
    ],
    correctAnswer: 1,
    explanation:
      "The name 'Amphetamine Reptile' suggests speed, danger, and primal aggression - fitting for the label's intense music.",
    category: "facts",
  },
  {
    id: 127,
    question:
      "Which of these statements about AmRep's cultural impact is accurate?",
    options: [
      "It had no cultural impact",
      "It helped define the noise rock genre and aesthetic in the late 1980s and 1990s",
      "It was primarily influential in the country music scene",
      "Its impact was limited to the Seattle grunge scene",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep played a significant role in defining the noise rock genre and aesthetic during its active years.",
    category: "facts",
  },
  {
    id: 128,
    question:
      "What was the typical sonic character of an AmRep release?",
    options: [
      "Polished and radio-friendly",
      "Loud, abrasive, and uncompromising",
      "Quiet and acoustic",
      "Heavily auto-tuned",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep releases were typically loud, abrasive, and uncompromising in their sonic approach.",
    category: "facts",
  },
  {
    id: 129,
    question:
      "Kristen Pfaff's journey from Janitor Joe to Hole illustrates what about AmRep?",
    options: [
      "AmRep was a pop label",
      "AmRep was a proving ground for musicians who went on to wider fame",
      "AmRep only signed established artists",
      "AmRep had no connection to other scenes",
    ],
    correctAnswer: 1,
    explanation:
      "Pfaff's path from Janitor Joe (AmRep) to Hole shows AmRep served as a proving ground for talented musicians.",
    category: "facts",
  },
  {
    id: 130,
    question:
      "What made Tom Hazelmyer unique among indie label founders?",
    options: [
      "He had no involvement with music",
      "He was a musician, visual artist, and label owner all in one",
      "He was a professional athlete",
      "He was a tech entrepreneur",
    ],
    correctAnswer: 1,
    explanation:
      "Hazelmyer was a multi-talented figure: musician (Halo of Flies), visual artist (Haze XXL), and label founder/owner.",
    category: "facts",
  },
  {
    id: 131,
    question:
      "The AmRep aesthetic has been compared to which other cultural movements?",
    options: [
      "The hippie movement",
      "The hardcore punk and noise underground",
      "The disco era",
      "The New Romantic movement",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's aesthetic aligns closely with the hardcore punk and noise underground movements.",
    category: "facts",
  },
  {
    id: 132,
    question:
      "Why is AmRep considered important in the history of independent music?",
    options: [
      "It invented the CD format",
      "It championed noise rock and underground music that major labels wouldn't touch",
      "It was the first label to use streaming",
      "It signed the Beatles",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep is important because it championed noise rock and underground music that mainstream labels wouldn't release.",
    category: "facts",
  },
  {
    id: 133,
    question:
      "What is significant about the variety of cities represented on the AmRep roster?",
    options: [
      "All bands were from one city",
      "It shows AmRep drew from a nationwide (and international) underground network",
      "It shows AmRep only signed local bands",
      "It was purely coincidental",
    ],
    correctAnswer: 1,
    explanation:
      "The range of cities (Seattle, Minneapolis, Fargo, Chicago, NYC, Syracuse, Ann Arbor, Kalamazoo, Madison, and even Australia) shows AmRep had a nationwide and international reach.",
    category: "facts",
  },
  {
    id: 134,
    question:
      "What visual art style is most associated with AmRep's album covers and posters?",
    options: [
      "Photorealism",
      "Bold, graphic, often provocative underground rock art",
      "Watercolor landscapes",
      "Corporate minimalism",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's visual identity featured bold, graphic, and often provocative underground rock art.",
    category: "facts",
  },
  {
    id: 135,
    question:
      "How did AmRep's approach to music differ from major labels of the same era?",
    options: [
      "AmRep focused on commercial viability above all else",
      "AmRep prioritized artistic vision and intensity over commercial appeal",
      "AmRep and major labels had the same approach",
      "AmRep only released instrumental music",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep prioritized artistic vision, raw intensity, and authenticity over commercial appeal.",
    category: "facts",
  },
  {
    id: 136,
    question:
      "Which of these facts about AmRep is true?",
    options: [
      "It was founded in the 2000s",
      "It focused on electronic dance music",
      "Its catalog numbers often began with 'Scale' or 'Reptile'",
      "It was based in London",
    ],
    correctAnswer: 2,
    explanation:
      "AmRep's catalog numbers often started with 'Scale' or 'Reptile.'",
    category: "facts",
  },
  {
    id: 137,
    question:
      "Helmet's move from AmRep to Interscope illustrates what phenomenon?",
    options: [
      "Major labels raiding indie rosters for alternative rock talent in the 1990s",
      "Bands preferring smaller labels",
      "The decline of major labels",
      "A shift toward country music",
    ],
    correctAnswer: 0,
    explanation:
      "Helmet's jump from AmRep to Interscope exemplifies how major labels signed alternative acts from indie labels in the 1990s.",
    category: "facts",
  },
  {
    id: 138,
    question:
      "What type of concerts were AmRep bands typically known for?",
    options: [
      "Quiet, seated performances",
      "Loud, intense, and physically aggressive live shows",
      "Choreographed dance performances",
      "Orchestra pit concerts",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep bands were typically known for loud, intense, and physically aggressive live shows.",
    category: "facts",
  },
  {
    id: 139,
    question:
      "What does the diversity of AmRep's roster say about the noise rock scene?",
    options: [
      "It was limited to one city",
      "It was a geographically widespread underground movement across the US and beyond",
      "It only existed in college towns",
      "It was a mainstream pop movement",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's geographically diverse roster shows that noise rock was a widespread underground movement.",
    category: "facts",
  },
  {
    id: 140,
    question:
      "Frank Kozik designed artwork for AmRep and was also known for what?",
    options: [
      "Rock concert posters and vinyl toy design",
      "Renaissance sculpture",
      "Fashion design",
      "Architecture",
    ],
    correctAnswer: 0,
    explanation:
      "Frank Kozik was renowned for his rock concert posters and later his vinyl toy designs.",
    category: "facts",
  },
  {
    id: 141,
    question:
      "What legacy has AmRep left in the music industry?",
    options: [
      "No lasting impact",
      "It is regarded as one of the most important indie labels for noise rock and underground music",
      "It became a major label",
      "It shifted to a tech company",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep is widely regarded as one of the most important independent labels in the history of noise rock and underground music.",
    category: "facts",
  },
  {
    id: 142,
    question:
      "Which of these best describes the audience for AmRep releases?",
    options: [
      "Mainstream pop fans",
      "Dedicated underground music enthusiasts and collectors",
      "Classical music aficionados",
      "Top 40 radio listeners",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's audience consisted primarily of dedicated underground music enthusiasts and vinyl collectors.",
    category: "facts",
  },
  {
    id: 143,
    question:
      "What connection does AmRep have to the poster art world?",
    options: [
      "None whatsoever",
      "Artists like Frank Kozik created iconic poster art for AmRep bands and releases",
      "AmRep only used photography for promotional materials",
      "AmRep banned the use of posters",
    ],
    correctAnswer: 1,
    explanation:
      "Artists like Frank Kozik created iconic poster art for AmRep, connecting the label to the underground poster art world.",
    category: "facts",
  },
  {
    id: 144,
    question:
      "What is one reason AmRep's colored vinyl releases are especially sought after by collectors?",
    options: [
      "They were mass-produced",
      "They were limited pressings that are now rare and out of print",
      "They were made of recycled plastic",
      "They were given away for free",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's colored vinyl releases were limited pressings, and many are now rare and out of print, driving collector demand.",
    category: "facts",
  },
  {
    id: 145,
    question:
      "How did AmRep's geographic move from Seattle to Minneapolis affect its sound?",
    options: [
      "It shifted to grunge",
      "It deepened the label's connection to Midwest noise rock and underground bands",
      "It led to a focus on electronic music",
      "It had no effect",
    ],
    correctAnswer: 1,
    explanation:
      "Moving to Minneapolis deepened AmRep's connection to the vibrant Midwest underground, adding bands like Cows and Janitor Joe.",
    category: "facts",
  },
  {
    id: 146,
    question:
      "What distinguishes AmRep from a typical indie label of the 1990s?",
    options: [
      "Its extreme focus on noise rock, distinctive visual identity, and limited edition releases",
      "Its focus on mainstream pop",
      "Its lack of any visual branding",
      "Its location in Los Angeles",
    ],
    correctAnswer: 0,
    explanation:
      "AmRep stood out for its laser focus on noise rock, a strong visual identity, and collectible limited edition releases.",
    category: "facts",
  },
  {
    id: 147,
    question:
      "What was unique about AmRep having an Australian band on its roster?",
    options: [
      "It was common for all US indie labels to sign Australian bands",
      "It showed AmRep's reach extended beyond the US underground scene",
      "Australia had no rock music scene",
      "The band was actually from New Zealand",
    ],
    correctAnswer: 1,
    explanation:
      "Having King Snake Roost from Australia demonstrated that AmRep's reach and reputation extended internationally.",
    category: "facts",
  },
  {
    id: 148,
    question:
      "What can AmRep's roster tell us about the state of underground rock in the late 1980s?",
    options: [
      "Underground rock was dead",
      "There was a thriving network of noisy, aggressive bands across the US and beyond",
      "All rock was mainstream",
      "Underground rock only existed in London",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's diverse roster demonstrates that there was a thriving network of noisy, aggressive bands across the US and internationally.",
    category: "facts",
  },
  {
    id: 149,
    question:
      "Why might a music historian study Amphetamine Reptile Records?",
    options: [
      "To learn about classical music",
      "To understand the noise rock and underground punk movements of the late 1980s and 1990s",
      "To study pop music trends",
      "To analyze hip-hop production techniques",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep is essential to understanding the noise rock and underground punk movements of the late 1980s and 1990s.",
    category: "facts",
  },
  {
    id: 150,
    question:
      "What was the relationship between AmRep's music and its visual art?",
    options: [
      "They were completely unrelated",
      "The bold, aggressive visual art matched and reinforced the intensity of the music",
      "The art was always gentle and calming",
      "There was no visual art associated with the label",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep's bold, aggressive visual art by Kozik and Haze XXL perfectly matched and reinforced the intensity of the music.",
    category: "facts",
  },
  {
    id: 151,
    question:
      "What fact about Tom Hazelmyer's military service is relevant to AmRep's founding?",
    options: [
      "His service in the Marines brought him to Seattle where he started the label",
      "He founded the label after retiring from the Army",
      "His military service had no connection to the label",
      "He started the label while stationed in Germany",
    ],
    correctAnswer: 0,
    explanation:
      "Hazelmyer's Marine service stationed him in Seattle, which is where he founded AmRep in 1986.",
    category: "facts",
  },
  {
    id: 152,
    question:
      "Which pair of facts are both true about Amphetamine Reptile Records?",
    options: [
      "Founded in 1996; based in London",
      "Founded in 1986; known for noise rock",
      "Founded in 1976; known for disco",
      "Founded in 2006; known for EDM",
    ],
    correctAnswer: 1,
    explanation:
      "AmRep was founded in 1986 and is best known for noise rock, punk, and heavy underground music.",
    category: "facts",
  },

];

export function getDailyAmrepTriviaQuestions(
  date?: Date,
): AmrepTriviaQuestion[] {
  const now = date || new Date();
  const pool = amrepTriviaQuestions.filter((q) => !isYearQuestion(q));
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
  const dayIndex = getEpochDay(now) % cycleLength;
  const startIndex = dayIndex * questionsPerDay;
  const shuffledQuestions = shuffleQuestions(386147);
  return shuffledQuestions.slice(startIndex, startIndex + questionsPerDay);
}

export function getAmrepTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `amrep-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getAmrepNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
