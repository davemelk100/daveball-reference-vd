export interface NFLTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "quarterbacks" | "super_bowl" | "records" | "teams";
}

export const nflTriviaQuestions: NFLTriviaQuestion[] = [
  // ===== HISTORY =====
  {
    id: 1,
    question: "In what year was the first Super Bowl played?",
    options: ["1958", "1963", "1967", "1970"],
    correctAnswer: 2,
    explanation: "Super Bowl I was played on January 15, 1967, between the Green Bay Packers and Kansas City Chiefs.",
    category: "history",
  },
  {
    id: 2,
    question: "What year did the AFL and NFL officially merge?",
    options: ["1966", "1970", "1972", "1975"],
    correctAnswer: 1,
    explanation: "The AFL-NFL merger was completed in 1970, creating the modern NFL with two conferences.",
    category: "history",
  },
  {
    id: 3,
    question: "Which team won the first ever Super Bowl?",
    options: ["Kansas City Chiefs", "New York Jets", "Green Bay Packers", "Baltimore Colts"],
    correctAnswer: 2,
    explanation: "The Green Bay Packers, led by Vince Lombardi, won Super Bowl I 35-10 over the Chiefs.",
    category: "history",
  },
  {
    id: 4,
    question: "How many teams are currently in the NFL?",
    options: ["28", "30", "32", "34"],
    correctAnswer: 2,
    explanation: "There are 32 teams in the NFL, divided into two conferences of 16 teams each.",
    category: "history",
  },
  {
    id: 5,
    question: "What is the oldest NFL franchise still in existence?",
    options: ["Chicago Bears", "Green Bay Packers", "New York Giants", "Arizona Cardinals"],
    correctAnswer: 3,
    explanation: "The Arizona Cardinals, founded in 1898 as the Morgan Athletic Club, are the oldest continuously operating pro football team.",
    category: "history",
  },
  {
    id: 6,
    question: "Which NFL game is known as 'The Greatest Game Ever Played'?",
    options: ["Super Bowl III", "1958 NFL Championship", "Ice Bowl (1967)", "Immaculate Reception game"],
    correctAnswer: 1,
    explanation: "The 1958 NFL Championship between the Colts and Giants is called 'The Greatest Game' as the first sudden-death overtime in NFL title history.",
    category: "history",
  },
  // ===== QUARTERBACKS =====
  {
    id: 7,
    question: "Who holds the NFL record for most career passing touchdowns?",
    options: ["Peyton Manning", "Tom Brady", "Drew Brees", "Brett Favre"],
    correctAnswer: 1,
    explanation: "Tom Brady holds the record with 649 career passing touchdowns.",
    category: "quarterbacks",
  },
  {
    id: 8,
    question: "Who holds the record for most passing yards in a single season?",
    options: ["Tom Brady", "Peyton Manning", "Drew Brees", "Patrick Mahomes"],
    correctAnswer: 1,
    explanation: "Peyton Manning threw for 5,477 yards in the 2013 season with the Denver Broncos.",
    category: "quarterbacks",
  },
  {
    id: 9,
    question: "Which quarterback has won the most Super Bowls?",
    options: ["Joe Montana", "Tom Brady", "Terry Bradshaw", "Peyton Manning"],
    correctAnswer: 1,
    explanation: "Tom Brady won seven Super Bowls (six with the Patriots, one with the Buccaneers).",
    category: "quarterbacks",
  },
  {
    id: 10,
    question: "Who was the first Black quarterback to start and win a Super Bowl?",
    options: ["Warren Moon", "Doug Williams", "Donovan McNabb", "Russell Wilson"],
    correctAnswer: 1,
    explanation: "Doug Williams led the Washington Redskins to a Super Bowl XXII victory in 1988.",
    category: "quarterbacks",
  },
  {
    id: 11,
    question: "Which QB threw for the most touchdowns in a single season?",
    options: ["Tom Brady", "Drew Brees", "Peyton Manning", "Patrick Mahomes"],
    correctAnswer: 2,
    explanation: "Peyton Manning threw 55 touchdowns in 2013 with the Denver Broncos.",
    category: "quarterbacks",
  },
  {
    id: 12,
    question: "At what age did Tom Brady retire from the NFL?",
    options: ["43", "44", "45", "46"],
    correctAnswer: 2,
    explanation: "Tom Brady retired at age 45 in February 2023 after the 2022 season.",
    category: "quarterbacks",
  },
  // ===== SUPER BOWL =====
  {
    id: 13,
    question: "Which team has won the most Super Bowls?",
    options: ["Dallas Cowboys", "San Francisco 49ers", "New England Patriots", "Pittsburgh Steelers"],
    correctAnswer: 2,
    explanation: "The New England Patriots and Pittsburgh Steelers are tied with 6 Super Bowl victories each.",
    category: "super_bowl",
  },
  {
    id: 14,
    question: "What is the largest margin of victory in Super Bowl history?",
    options: ["35 points", "39 points", "45 points", "49 points"],
    correctAnswer: 2,
    explanation: "The San Francisco 49ers beat the Denver Broncos 55-10 in Super Bowl XXIV, a 45-point margin.",
    category: "super_bowl",
  },
  {
    id: 15,
    question: "Which team famously guaranteed and won Super Bowl III?",
    options: ["Green Bay Packers", "Oakland Raiders", "New York Jets", "Kansas City Chiefs"],
    correctAnswer: 2,
    explanation: "Joe Namath famously 'guaranteed' a Jets victory and delivered, beating the Colts 16-7.",
    category: "super_bowl",
  },
  {
    id: 16,
    question: "What is the Super Bowl trophy officially called?",
    options: ["Lombardi Trophy", "Halas Trophy", "Commissioner's Trophy", "Rozelle Trophy"],
    correctAnswer: 0,
    explanation: "The Vince Lombardi Trophy is named after the legendary Green Bay Packers coach.",
    category: "super_bowl",
  },
  {
    id: 17,
    question: "Which team completed a perfect 17-0 season including the Super Bowl?",
    options: ["1985 Bears", "1972 Dolphins", "2007 Patriots", "1989 49ers"],
    correctAnswer: 1,
    explanation: "The 1972 Miami Dolphins went 17-0, the only team to complete a perfect season in NFL history.",
    category: "super_bowl",
  },
  {
    id: 18,
    question: "In Super Bowl LI, the Patriots overcame the largest deficit in Super Bowl history. How many points did they trail?",
    options: ["21 points", "25 points", "28 points", "31 points"],
    correctAnswer: 1,
    explanation: "The Patriots trailed the Falcons 28-3 in the third quarter and came back to win 34-28 in overtime.",
    category: "super_bowl",
  },
  // ===== RECORDS =====
  {
    id: 19,
    question: "Who holds the NFL record for most career rushing yards?",
    options: ["Walter Payton", "Barry Sanders", "Emmitt Smith", "Adrian Peterson"],
    correctAnswer: 2,
    explanation: "Emmitt Smith rushed for 18,355 career yards, the most in NFL history.",
    category: "records",
  },
  {
    id: 20,
    question: "Who holds the record for most receiving yards in a single season?",
    options: ["Jerry Rice", "Calvin Johnson", "Julio Jones", "Randy Moss"],
    correctAnswer: 1,
    explanation: "Calvin Johnson set the single-season record with 1,964 receiving yards in 2012.",
    category: "records",
  },
  {
    id: 21,
    question: "What is the NFL record for most points scored in a single game by one team?",
    options: ["62", "66", "72", "73"],
    correctAnswer: 3,
    explanation: "The Washington Redskins scored 72 points against the New York Giants on November 27, 1966.",
    category: "records",
  },
  {
    id: 22,
    question: "Who holds the career record for most sacks?",
    options: ["Reggie White", "Bruce Smith", "Michael Strahan", "T.J. Watt"],
    correctAnswer: 1,
    explanation: "Bruce Smith holds the all-time sack record with 200 career sacks.",
    category: "records",
  },
  {
    id: 23,
    question: "Who holds the record for most career interceptions?",
    options: ["Rod Woodson", "Deion Sanders", "Paul Krause", "Ed Reed"],
    correctAnswer: 2,
    explanation: "Paul Krause holds the record with 81 career interceptions.",
    category: "records",
  },
  {
    id: 24,
    question: "What is the longest play from scrimmage in NFL history?",
    options: ["99 yards", "103 yards", "105 yards", "109 yards"],
    correctAnswer: 0,
    explanation: "Multiple 99-yard plays have occurred (touchdowns from scrimmage), as 99 yards is the maximum possible.",
    category: "records",
  },
  // ===== TEAMS =====
  {
    id: 25,
    question: "Which NFL team plays its home games at Lambeau Field?",
    options: ["Minnesota Vikings", "Chicago Bears", "Green Bay Packers", "Detroit Lions"],
    correctAnswer: 2,
    explanation: "Lambeau Field, built in 1957, is the home of the Green Bay Packers and is nicknamed 'The Frozen Tundra.'",
    category: "teams",
  },
  {
    id: 26,
    question: "Which NFL team is the only one owned by its fans as a public nonprofit?",
    options: ["Pittsburgh Steelers", "Chicago Bears", "Green Bay Packers", "Buffalo Bills"],
    correctAnswer: 2,
    explanation: "The Green Bay Packers are a publicly owned nonprofit, the only such team in major American pro sports.",
    category: "teams",
  },
  {
    id: 27,
    question: "Which four teams have never appeared in a Super Bowl (as of 2024)?",
    options: ["Lions, Browns, Jaguars, Texans", "Lions, Browns, Vikings, Bengals", "Jaguars, Texans, Lions, Jets", "Browns, Lions, Saints, Chargers"],
    correctAnswer: 0,
    explanation: "The Detroit Lions, Cleveland Browns, Jacksonville Jaguars, and Houston Texans have never appeared in a Super Bowl.",
    category: "teams",
  },
  {
    id: 28,
    question: "The 1985 Chicago Bears' defense was known by what nickname?",
    options: ["The Purple People Eaters", "The Steel Curtain", "Monsters of the Midway", "The Legion of Boom"],
    correctAnswer: 2,
    explanation: "The 1985 Bears' dominant defense was called 'Monsters of the Midway,' a nickname from the 1940s Bears revived.",
    category: "teams",
  },
  {
    id: 29,
    question: "Which team's defense was known as 'The Steel Curtain'?",
    options: ["Baltimore Ravens", "Pittsburgh Steelers", "Chicago Bears", "New York Giants"],
    correctAnswer: 1,
    explanation: "The Pittsburgh Steelers' legendary 1970s defense was nicknamed 'The Steel Curtain.'",
    category: "teams",
  },
  {
    id: 30,
    question: "Which team moved from St. Louis back to Los Angeles in 2016?",
    options: ["Chargers", "Raiders", "Rams", "Cardinals"],
    correctAnswer: 2,
    explanation: "The Rams relocated from St. Louis back to Los Angeles in 2016 and now play at SoFi Stadium.",
    category: "teams",
  },
  {
    id: 31,
    question: "Who is the all-time leading scorer in NFL history?",
    options: ["Adam Vinatieri", "Morten Andersen", "Gary Anderson", "Jason Tucker"],
    correctAnswer: 0,
    explanation: "Adam Vinatieri retired with 2,673 career points, the most in NFL history.",
    category: "records",
  },
  {
    id: 32,
    question: "Which wide receiver holds the record for most career touchdowns?",
    options: ["Randy Moss", "Terrell Owens", "Jerry Rice", "Larry Fitzgerald"],
    correctAnswer: 2,
    explanation: "Jerry Rice scored 208 career touchdowns (197 receiving, 10 rushing, 1 fumble recovery).",
    category: "records",
  },
  {
    id: 33,
    question: "What is 'The Immaculate Reception'?",
    options: ["A Hail Mary by Doug Flutie", "Franco Harris's famous catch in 1972", "The Music City Miracle", "David Tyree's helmet catch"],
    correctAnswer: 1,
    explanation: "Franco Harris caught a deflected pass and ran it in for a TD in the 1972 AFC Divisional Playoff, one of the most famous plays ever.",
    category: "history",
  },
  {
    id: 34,
    question: "Which coach has the most career wins in NFL history?",
    options: ["Don Shula", "George Halas", "Bill Belichick", "Tom Landry"],
    correctAnswer: 2,
    explanation: "Bill Belichick surpassed Don Shula's record of 347 wins to become the winningest head coach in NFL history.",
    category: "history",
  },
  {
    id: 35,
    question: "What NFL event is held annually in late April?",
    options: ["The Combine", "The NFL Draft", "Free Agency", "Training Camp"],
    correctAnswer: 1,
    explanation: "The NFL Draft is held annually in late April, where teams select eligible college football players.",
    category: "history",
  },
];

export function getDailyNFLTriviaQuestions(date?: Date): NFLTriviaQuestion[] {
  const now = date || new Date();
  const totalQuestions = nflTriviaQuestions.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...nflTriviaQuestions];
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

export function getNFLTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `nfl-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
