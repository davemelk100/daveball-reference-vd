import { isYearQuestion } from "./trivia-utils";

export interface NBATriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "players" | "championships" | "records" | "teams";
}

export const nbaTriviaQuestions: NBATriviaQuestion[] = [
  // ===== HISTORY =====
  {
    id: 1,
    question: "In what year was the NBA founded?",
    options: ["1936", "1946", "1950", "1956"],
    correctAnswer: 1,
    explanation: "The NBA was founded on June 6, 1946, as the Basketball Association of America (BAA) before becoming the NBA in 1949.",
    category: "history",
  },
  {
    id: 2,
    question: "Which city hosted the first NBA All-Star Game in 1951?",
    options: ["New York", "Boston", "Philadelphia", "Chicago"],
    correctAnswer: 1,
    explanation: "The first NBA All-Star Game was played at Boston Garden on March 2, 1951.",
    category: "history",
  },
  {
    id: 3,
    question: "What year was the three-point line introduced in the NBA?",
    options: ["1977", "1979", "1981", "1984"],
    correctAnswer: 1,
    explanation: "The NBA adopted the three-point line for the 1979-80 season, borrowing the idea from the ABA.",
    category: "history",
  },
  {
    id: 4,
    question: "Which team won the first NBA championship in 1947?",
    options: ["Boston Celtics", "New York Knicks", "Philadelphia Warriors", "Minneapolis Lakers"],
    correctAnswer: 2,
    explanation: "The Philadelphia Warriors won the first BAA championship in 1947, defeating the Chicago Stags.",
    category: "history",
  },
  {
    id: 5,
    question: "What year did the NBA and ABA merge?",
    options: ["1972", "1974", "1976", "1978"],
    correctAnswer: 2,
    explanation: "The ABA-NBA merger took place in 1976, bringing in the Nets, Nuggets, Pacers, and Spurs.",
    category: "history",
  },
  {
    id: 6,
    question: "How many teams are currently in the NBA?",
    options: ["28", "30", "32", "34"],
    correctAnswer: 1,
    explanation: "There are 30 teams in the NBA, divided into the Eastern and Western Conferences.",
    category: "history",
  },
  // ===== PLAYERS =====
  {
    id: 7,
    question: "Who is the NBA's all-time leading scorer?",
    options: ["Kareem Abdul-Jabbar", "Karl Malone", "LeBron James", "Kobe Bryant"],
    correctAnswer: 2,
    explanation: "LeBron James passed Kareem Abdul-Jabbar on February 7, 2023, to become the NBA's all-time leading scorer.",
    category: "players",
  },
  {
    id: 8,
    question: "Who holds the record for most points in a single NBA game?",
    options: ["Michael Jordan", "Kobe Bryant", "Wilt Chamberlain", "David Robinson"],
    correctAnswer: 2,
    explanation: "Wilt Chamberlain scored 100 points on March 2, 1962, playing for the Philadelphia Warriors against the New York Knicks.",
    category: "records",
  },
  {
    id: 9,
    question: "Which player won the most NBA MVP awards?",
    options: ["Michael Jordan", "LeBron James", "Kareem Abdul-Jabbar", "Bill Russell"],
    correctAnswer: 2,
    explanation: "Kareem Abdul-Jabbar won six NBA MVP awards (1971, 1972, 1974, 1976, 1977, 1980).",
    category: "players",
  },
  {
    id: 10,
    question: "Who is known as 'The Dream' in NBA history?",
    options: ["Hakeem Olajuwon", "Patrick Ewing", "David Robinson", "Shaquille O'Neal"],
    correctAnswer: 0,
    explanation: "Hakeem Olajuwon earned the nickname 'The Dream' for his graceful footwork and post moves.",
    category: "players",
  },
  {
    id: 11,
    question: "Which player has the most career assists in NBA history?",
    options: ["Magic Johnson", "John Stockton", "Jason Kidd", "Steve Nash"],
    correctAnswer: 1,
    explanation: "John Stockton holds the all-time assists record with 15,806 career assists.",
    category: "records",
  },
  {
    id: 12,
    question: "Who was the first player to be drafted straight out of high school in the modern era?",
    options: ["LeBron James", "Kobe Bryant", "Kevin Garnett", "Moses Malone"],
    correctAnswer: 2,
    explanation: "Kevin Garnett was drafted 5th overall by the Minnesota Timberwolves in 1995 directly from high school.",
    category: "players",
  },
  // ===== CHAMPIONSHIPS =====
  {
    id: 13,
    question: "Which team has won the most NBA championships?",
    options: ["Los Angeles Lakers", "Chicago Bulls", "Boston Celtics", "Golden State Warriors"],
    correctAnswer: 2,
    explanation: "The Boston Celtics have won 18 NBA championships, the most in league history.",
    category: "championships",
  },
  {
    id: 14,
    question: "How many championships did Michael Jordan win with the Bulls?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "Michael Jordan won six NBA championships with the Chicago Bulls (1991-93, 1996-98), winning Finals MVP each time.",
    category: "championships",
  },
  {
    id: 15,
    question: "Which team completed the first 'three-peat' in the shot clock era?",
    options: ["Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "Golden State Warriors"],
    correctAnswer: 2,
    explanation: "The Chicago Bulls won three consecutive championships from 1991-1993, the first three-peat since the shot clock era began.",
    category: "championships",
  },
  {
    id: 16,
    question: "Which player holds the record for most NBA Finals MVP awards?",
    options: ["Michael Jordan", "LeBron James", "Magic Johnson", "Tim Duncan"],
    correctAnswer: 0,
    explanation: "Michael Jordan won six Finals MVP awards, one for each of his six championships.",
    category: "championships",
  },
  {
    id: 17,
    question: "What year did the Golden State Warriors set the regular season record with 73 wins?",
    options: ["2014-15", "2015-16", "2016-17", "2017-18"],
    correctAnswer: 1,
    explanation: "The Warriors went 73-9 in the 2015-16 regular season, breaking the 1995-96 Bulls' record of 72-10.",
    category: "records",
  },
  // ===== RECORDS =====
  {
    id: 18,
    question: "Who holds the NBA record for most rebounds in a single game?",
    options: ["Bill Russell", "Wilt Chamberlain", "Dennis Rodman", "Moses Malone"],
    correctAnswer: 1,
    explanation: "Wilt Chamberlain grabbed 55 rebounds in a single game on November 24, 1960.",
    category: "records",
  },
  {
    id: 19,
    question: "What is the longest winning streak in NBA history?",
    options: ["27 games", "30 games", "33 games", "36 games"],
    correctAnswer: 2,
    explanation: "The 1971-72 Los Angeles Lakers won 33 consecutive games, the longest streak in NBA history.",
    category: "records",
  },
  {
    id: 20,
    question: "Who holds the record for most career steals?",
    options: ["Michael Jordan", "Gary Payton", "John Stockton", "Scottie Pippen"],
    correctAnswer: 2,
    explanation: "John Stockton holds the career steals record with 3,265, well ahead of second place.",
    category: "records",
  },
  // ===== TEAMS =====
  {
    id: 21,
    question: "Which franchise has relocated the most times?",
    options: ["Sacramento Kings", "Atlanta Hawks", "Los Angeles Clippers", "Oklahoma City Thunder"],
    correctAnswer: 1,
    explanation: "The Hawks have played in Buffalo, the Tri-Cities, Milwaukee, St. Louis, and Atlanta.",
    category: "teams",
  },
  {
    id: 22,
    question: "Which NBA team plays its home games at Madison Square Garden?",
    options: ["Brooklyn Nets", "New York Knicks", "Boston Celtics", "Philadelphia 76ers"],
    correctAnswer: 1,
    explanation: "The New York Knicks have played at Madison Square Garden since 1968.",
    category: "teams",
  },
  {
    id: 23,
    question: "Which player wore number 23 for both the Bulls and Wizards?",
    options: ["Scottie Pippen", "Michael Jordan", "LeBron James", "Derrick Rose"],
    correctAnswer: 1,
    explanation: "Michael Jordan wore #23 for the Bulls and again when he came out of retirement to play for the Washington Wizards (2001-03).",
    category: "players",
  },
  {
    id: 24,
    question: "Who scored 81 points in a single game in 2006?",
    options: ["LeBron James", "Allen Iverson", "Kobe Bryant", "Tracy McGrady"],
    correctAnswer: 2,
    explanation: "Kobe Bryant scored 81 points against the Toronto Raptors on January 22, 2006, the second-highest single-game total in NBA history.",
    category: "records",
  },
  {
    id: 25,
    question: "Which team drafted Tim Duncan with the #1 overall pick in 1997?",
    options: ["San Antonio Spurs", "Boston Celtics", "Philadelphia 76ers", "Vancouver Grizzlies"],
    correctAnswer: 0,
    explanation: "The San Antonio Spurs drafted Tim Duncan first overall in 1997, and he spent his entire 19-year career with the franchise.",
    category: "teams",
  },
  {
    id: 26,
    question: "Who was nicknamed 'The Big Fundamental'?",
    options: ["Shaquille O'Neal", "Tim Duncan", "Hakeem Olajuwon", "David Robinson"],
    correctAnswer: 1,
    explanation: "Tim Duncan was nicknamed 'The Big Fundamental' for his mastery of basic basketball skills, especially the bank shot.",
    category: "players",
  },
  {
    id: 27,
    question: "Which player holds the record for most career blocks?",
    options: ["Dikembe Mutombo", "Hakeem Olajuwon", "Kareem Abdul-Jabbar", "Mark Eaton"],
    correctAnswer: 1,
    explanation: "Hakeem Olajuwon holds the career blocks record with 3,830 blocked shots.",
    category: "records",
  },
  {
    id: 28,
    question: "In which year did 'The Decision' air, where LeBron announced joining the Heat?",
    options: ["2008", "2009", "2010", "2011"],
    correctAnswer: 2,
    explanation: "LeBron James announced his move to the Miami Heat on a live ESPN special on July 8, 2010.",
    category: "history",
  },
  {
    id: 29,
    question: "Which team won the 2016 NBA Finals after being down 3-1?",
    options: ["Golden State Warriors", "San Antonio Spurs", "Cleveland Cavaliers", "Oklahoma City Thunder"],
    correctAnswer: 2,
    explanation: "The Cleveland Cavaliers, led by LeBron James, became the first team to rally from a 3-1 Finals deficit, beating the 73-win Warriors.",
    category: "championships",
  },
  {
    id: 30,
    question: "Who is the shortest player in NBA history?",
    options: ["Spud Webb", "Nate Robinson", "Muggsy Bogues", "Earl Boykins"],
    correctAnswer: 2,
    explanation: "Muggsy Bogues stood 5'3\" and played 14 NBA seasons, primarily with the Charlotte Hornets.",
    category: "players",
  },
];

export function getDailyNBATriviaQuestions(date?: Date): NBATriviaQuestion[] {
  const now = date || new Date();
  const pool = nbaTriviaQuestions.filter((q) => !isYearQuestion(q));
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
  const shuffled = shuffleQuestions(77);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getNBATodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `nba-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
