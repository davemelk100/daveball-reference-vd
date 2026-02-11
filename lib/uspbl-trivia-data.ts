import { isYearQuestion } from "./trivia-utils";

export interface USPBLTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "players" | "teams" | "records" | "league";
}

export const uspblTriviaQuestions: USPBLTriviaQuestion[] = [
  {
    id: 1,
    question: "In what year was the USPBL founded?",
    options: ["2014", "2015", "2016", "2017"],
    correctAnswer: 2,
    explanation: "The United Shore Professional Baseball League was founded in 2016 by Andy Appleby.",
    category: "history",
  },
  {
    id: 2,
    question: "How many teams play in the USPBL?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "The USPBL has four teams: the Beavers, Diamond Hoppers, Unicorns, and Woolly Mammoths.",
    category: "league",
  },
  {
    id: 3,
    question: "Where do all USPBL teams play their home games?",
    options: ["Comerica Park", "Jimmy John's Field", "UWM Field", "USPBL Stadium"],
    correctAnswer: 2,
    explanation: "All USPBL games are played at UWM Field (formerly Jimmy John's Field) in Utica, Michigan.",
    category: "league",
  },
  {
    id: 4,
    question: "In what city is the USPBL's stadium located?",
    options: ["Detroit", "Birmingham", "Utica", "Westside"],
    correctAnswer: 2,
    explanation: "UWM Field is located in Utica, Michigan, in Macomb County.",
    category: "league",
  },
  {
    id: 5,
    question: "Which of these is NOT a USPBL team?",
    options: ["Utica Unicorns", "Birmingham Bloomfield Beavers", "Motor City Mud Hens", "Eastside Diamond Hoppers"],
    correctAnswer: 2,
    explanation: "The Motor City Mud Hens do not exist. The Toledo Mud Hens are a minor league team. The USPBL has the Beavers, Diamond Hoppers, Unicorns, and Woolly Mammoths.",
    category: "teams",
  },
  {
    id: 6,
    question: "What is the primary goal of the USPBL?",
    options: ["Replace the minor leagues", "Showcase players for MLB organizations", "Compete with college baseball", "Provide retirement league for veterans"],
    correctAnswer: 1,
    explanation: "The USPBL serves as a showcase league, helping players get signed by MLB organizations and affiliated minor league teams.",
    category: "league",
  },
  {
    id: 7,
    question: "Who founded the USPBL?",
    options: ["Andy Appleby", "Dan Loria", "Bob Uecker", "Mike Veeck"],
    correctAnswer: 0,
    explanation: "Andy Appleby, owner of General Sports and Entertainment, founded the USPBL in 2016.",
    category: "history",
  },
  {
    id: 8,
    question: "Which USPBL team is named after a prehistoric creature?",
    options: ["Utica Unicorns", "Birmingham Bloomfield Beavers", "Westside Woolly Mammoths", "Eastside Diamond Hoppers"],
    correctAnswer: 2,
    explanation: "The Westside Woolly Mammoths are named after the woolly mammoth, an extinct prehistoric creature.",
    category: "teams",
  },
  {
    id: 9,
    question: "What state is the USPBL based in?",
    options: ["Ohio", "Michigan", "Indiana", "Illinois"],
    correctAnswer: 1,
    explanation: "The USPBL is based in Michigan, with its stadium in Utica, MI.",
    category: "league",
  },
  {
    id: 10,
    question: "How many USPBL players have been signed by MLB organizations?",
    options: ["About 10", "About 30", "About 70", "Over 100"],
    correctAnswer: 3,
    explanation: "Since its founding, the USPBL has had over 100 players signed by MLB organizations.",
    category: "players",
  },
  {
    id: 11,
    question: "What capacity does UWM Field hold?",
    options: ["About 1,000", "About 2,500", "About 4,500", "About 10,000"],
    correctAnswer: 2,
    explanation: "UWM Field has a capacity of approximately 4,500 fans.",
    category: "league",
  },
  {
    id: 12,
    question: "Which team won the first USPBL championship in 2016?",
    options: ["Birmingham Bloomfield Beavers", "Eastside Diamond Hoppers", "Utica Unicorns", "Westside Woolly Mammoths"],
    correctAnswer: 2,
    explanation: "The Utica Unicorns won the inaugural USPBL championship in 2016.",
    category: "history",
  },
  {
    id: 13,
    question: "The USPBL season typically runs during which months?",
    options: ["March-June", "April-July", "May-September", "June-August"],
    correctAnswer: 2,
    explanation: "The USPBL season typically runs from May through September.",
    category: "league",
  },
  {
    id: 14,
    question: "What color are the Utica Unicorns primarily associated with?",
    options: ["Red", "Blue", "Purple", "Green"],
    correctAnswer: 2,
    explanation: "The Utica Unicorns are primarily associated with the color purple.",
    category: "teams",
  },
  {
    id: 15,
    question: "What was the stadium originally called before becoming UWM Field?",
    options: ["Comerica Field", "Jimmy John's Field", "Utica Stadium", "Metro Park Field"],
    correctAnswer: 1,
    explanation: "The stadium was originally called Jimmy John's Field when it opened in 2016.",
    category: "history",
  },
  {
    id: 16,
    question: "Which two communities are represented by the Birmingham Bloomfield Beavers?",
    options: ["Birmingham and Bloomfield", "Bloomfield and Beverly Hills", "Birmingham and Berkley", "Bloomfield and West Bloomfield"],
    correctAnswer: 0,
    explanation: "The Birmingham Bloomfield Beavers represent the Birmingham and Bloomfield communities in Oakland County, Michigan.",
    category: "teams",
  },
  {
    id: 17,
    question: "What kind of animal is the Diamond Hoppers' mascot based on?",
    options: ["Rabbit", "Frog", "Grasshopper", "Kangaroo"],
    correctAnswer: 1,
    explanation: "The Eastside Diamond Hoppers' mascot is based on a frog (a diamond hopper).",
    category: "teams",
  },
  {
    id: 18,
    question: "The USPBL is classified as what type of baseball league?",
    options: ["Major League", "Minor League affiliated", "Independent professional", "Collegiate summer"],
    correctAnswer: 2,
    explanation: "The USPBL is an independent professional baseball league, not affiliated with MLB's minor league system.",
    category: "league",
  },
  {
    id: 19,
    question: "In which county is UWM Field located?",
    options: ["Wayne County", "Oakland County", "Macomb County", "Washtenaw County"],
    correctAnswer: 2,
    explanation: "UWM Field is located in Utica, which is in Macomb County, Michigan.",
    category: "league",
  },
  {
    id: 20,
    question: "What distinguishes the USPBL from most other independent leagues?",
    options: ["Players are unpaid", "All games at one stadium", "No umpires", "30+ team roster"],
    correctAnswer: 1,
    explanation: "Uniquely, all USPBL games are played at a single venue (UWM Field), unlike most leagues where teams have their own home stadiums.",
    category: "league",
  },
];

export function getDailyUSPBLTriviaQuestions(date?: Date): USPBLTriviaQuestion[] {
  const now = date || new Date();
  const pool = uspblTriviaQuestions.filter((q) => !isYearQuestion(q));
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

  const epochDay = getEpochDay(now);
  const shuffled = shuffleQuestions(101);
  const startIndex = (epochDay * questionsPerDay) % totalQuestions;

  const questions: USPBLTriviaQuestion[] = [];
  for (let i = 0; i < questionsPerDay; i++) {
    questions.push(shuffled[(startIndex + i) % totalQuestions]);
  }
  return questions;
}

export function getUSPBLTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `uspbl-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
