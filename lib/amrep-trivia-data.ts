export interface AmrepTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "artists" | "releases" | "facts";
}

export const amrepTriviaQuestions: AmrepTriviaQuestion[] = [
  {
    id: 1,
    question: "In what year was Amphetamine Reptile Records founded?",
    options: ["1979", "1983", "1986", "1991"],
    correctAnswer: 2,
    explanation: "Amphetamine Reptile Records was founded in 1986.",
    category: "history",
  },
  {
    id: 2,
    question: "Who founded Amphetamine Reptile Records?",
    options: ["Steve Albini", "Tom Hazelmyer", "J Mascis", "Ian MacKaye"],
    correctAnswer: 1,
    explanation: "The label was founded by Tom Hazelmyer.",
    category: "history",
  },
  {
    id: 3,
    question: "Which US state did the label originate from?",
    options: ["California", "Washington", "Minnesota", "Illinois"],
    correctAnswer: 1,
    explanation: "The label began in Washington state.",
    category: "facts",
  },
  {
    id: 4,
    question: "Which band’s debut album 'Strap It On' was released by AmRep?",
    options: ["Helmet", "Melvins", "Unsane", "Tad"],
    correctAnswer: 0,
    explanation: "Helmet’s debut album 'Strap It On' was released by AmRep.",
    category: "releases",
  },
  {
    id: 5,
    question: "Amphetamine Reptile Records is best known for which genre focus?",
    options: ["Noise rock", "Synthpop", "Country", "Reggae"],
    correctAnswer: 0,
    explanation: "AmRep specializes in noise rock.",
    category: "facts",
  },
];

export function getDailyAmrepTriviaQuestions(date?: Date): AmrepTriviaQuestion[] {
  const now = date || new Date();
  const dateSeed =
    now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  const seededRandom = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const totalQuestions = amrepTriviaQuestions.length;
  const selectedIndices: number[] = [];
  let seed = dateSeed;

  while (selectedIndices.length < 5 && selectedIndices.length < totalQuestions) {
    seed = (seed * 16807) % 2147483647;
    const randomValue = seededRandom(seed);
    const index = Math.floor(randomValue * totalQuestions);

    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
    }
  }

  return selectedIndices.map((i) => amrepTriviaQuestions[i]);
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
