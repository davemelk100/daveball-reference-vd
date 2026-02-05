export interface NHLTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "players" | "teams" | "records" | "stanley_cup";
}

export const nhlTriviaQuestions: NHLTriviaQuestion[] = [
  // ===== HISTORY =====
  {
    id: 1,
    question: "In what year was the NHL founded?",
    options: ["1910", "1917", "1924", "1930"],
    correctAnswer: 1,
    explanation: "The National Hockey League was founded on November 26, 1917, in Montreal, Quebec.",
    category: "history",
  },
  {
    id: 2,
    question: "How many teams were in the 'Original Six' era?",
    options: ["4", "6", "8", "10"],
    correctAnswer: 1,
    explanation: "The Original Six consisted of: Canadiens, Maple Leafs, Red Wings, Bruins, Rangers, and Blackhawks.",
    category: "history",
  },
  {
    id: 3,
    question: "What year did the NHL expand from six to twelve teams?",
    options: ["1960", "1963", "1967", "1970"],
    correctAnswer: 2,
    explanation: "The NHL doubled in size in 1967, adding six new teams in one of sports' biggest expansions.",
    category: "history",
  },
  {
    id: 4,
    question: "Which rival league merged with the NHL in 1979?",
    options: ["AHL", "WHA", "IHL", "CHL"],
    correctAnswer: 1,
    explanation: "The World Hockey Association (WHA) merged with the NHL in 1979, adding four teams.",
    category: "history",
  },
  {
    id: 5,
    question: "What is the oldest trophy awarded in professional North American sports?",
    options: ["World Series Trophy", "Stanley Cup", "Grey Cup", "Lombardi Trophy"],
    correctAnswer: 1,
    explanation: "The Stanley Cup, first awarded in 1893, is the oldest professional sports trophy in North America.",
    category: "history",
  },
  {
    id: 6,
    question: "Who donated the Stanley Cup?",
    options: ["Queen Victoria", "Lord Stanley of Preston", "Sir Wilfrid Laurier", "King Edward VII"],
    correctAnswer: 1,
    explanation: "Lord Stanley of Preston, Governor General of Canada, donated the cup in 1892.",
    category: "history",
  },
  {
    id: 7,
    question: "Which city hosted the first NHL game?",
    options: ["Toronto", "Montreal", "Ottawa", "Quebec City"],
    correctAnswer: 1,
    explanation: "The first NHL game was played on December 19, 1917, in Montreal.",
    category: "history",
  },
  {
    id: 8,
    question: "When did NHL players first compete in the Olympics?",
    options: ["1988", "1992", "1998", "2002"],
    correctAnswer: 2,
    explanation: "NHL players first participated in the Winter Olympics at the 1998 Nagano Games.",
    category: "history",
  },
  // ===== PLAYERS =====
  {
    id: 9,
    question: "Who holds the NHL record for most career goals?",
    options: ["Gordie Howe", "Wayne Gretzky", "Jaromir Jagr", "Alex Ovechkin"],
    correctAnswer: 1,
    explanation: "Wayne Gretzky holds the record with 894 career goals, though Alex Ovechkin is closing in.",
    category: "players",
  },
  {
    id: 10,
    question: "What is Wayne Gretzky's famous nickname?",
    options: ["The Great One", "The Rocket", "Mr. Hockey", "The Golden Jet"],
    correctAnswer: 0,
    explanation: "Wayne Gretzky is universally known as 'The Great One.'",
    category: "players",
  },
  {
    id: 11,
    question: "Who was known as 'Mr. Hockey'?",
    options: ["Bobby Orr", "Gordie Howe", "Jean Beliveau", "Maurice Richard"],
    correctAnswer: 1,
    explanation: "Gordie Howe earned the nickname 'Mr. Hockey' over his remarkable career spanning five decades.",
    category: "players",
  },
  {
    id: 12,
    question: "Which player was the first to score 50 goals in 50 games?",
    options: ["Wayne Gretzky", "Bobby Hull", "Maurice Richard", "Mike Bossy"],
    correctAnswer: 2,
    explanation: "Maurice 'Rocket' Richard scored 50 goals in 50 games during the 1944-45 season.",
    category: "players",
  },
  {
    id: 13,
    question: "Who holds the record for most points in a single NHL season?",
    options: ["Mario Lemieux", "Wayne Gretzky", "Phil Esposito", "Bobby Orr"],
    correctAnswer: 1,
    explanation: "Wayne Gretzky scored 215 points (52G, 163A) with the Oilers in 1985-86.",
    category: "players",
  },
  {
    id: 14,
    question: "Which goaltender holds the record for most career wins?",
    options: ["Patrick Roy", "Martin Brodeur", "Terry Sawchuk", "Ed Belfour"],
    correctAnswer: 1,
    explanation: "Martin Brodeur holds the record with 691 career wins.",
    category: "players",
  },
  {
    id: 15,
    question: "Bobby Orr revolutionized which position in hockey?",
    options: ["Center", "Goaltender", "Defenseman", "Right wing"],
    correctAnswer: 2,
    explanation: "Bobby Orr transformed the defenseman position with his offensive rushing style.",
    category: "players",
  },
  {
    id: 16,
    question: "Which player wore #99, now retired league-wide?",
    options: ["Mario Lemieux", "Wayne Gretzky", "Gordie Howe", "Bobby Orr"],
    correctAnswer: 1,
    explanation: "Wayne Gretzky's #99 was retired across the entire NHL in 2000.",
    category: "players",
  },
  // ===== TEAMS =====
  {
    id: 17,
    question: "Which NHL team has won the most Stanley Cups?",
    options: ["Toronto Maple Leafs", "Detroit Red Wings", "Montreal Canadiens", "Boston Bruins"],
    correctAnswer: 2,
    explanation: "The Montreal Canadiens have won a record 24 Stanley Cup championships.",
    category: "teams",
  },
  {
    id: 18,
    question: "Which team is the newest NHL franchise (as of 2024)?",
    options: ["Vegas Golden Knights", "Seattle Kraken", "Utah Hockey Club", "Arizona Coyotes"],
    correctAnswer: 2,
    explanation: "The Utah Hockey Club joined the NHL in 2024 after the Arizona Coyotes relocated.",
    category: "teams",
  },
  {
    id: 19,
    question: "How many teams are currently in the NHL?",
    options: ["28", "30", "32", "34"],
    correctAnswer: 2,
    explanation: "There are currently 32 teams in the NHL.",
    category: "teams",
  },
  {
    id: 20,
    question: "Which Canadian team has NOT won a Stanley Cup since 1993?",
    options: ["Montreal Canadiens", "All Canadian teams", "Edmonton Oilers", "Calgary Flames"],
    correctAnswer: 1,
    explanation: "No Canadian team has won the Stanley Cup since the Montreal Canadiens in 1993.",
    category: "teams",
  },
  {
    id: 21,
    question: "The Vegas Golden Knights reached the Stanley Cup Final in their first season. What year was that?",
    options: ["2016-17", "2017-18", "2018-19", "2019-20"],
    correctAnswer: 1,
    explanation: "The Golden Knights reached the Cup Final in 2017-18, their inaugural season.",
    category: "teams",
  },
  {
    id: 22,
    question: "Which Original Six team plays at Madison Square Garden?",
    options: ["Boston Bruins", "Chicago Blackhawks", "New York Rangers", "Detroit Red Wings"],
    correctAnswer: 2,
    explanation: "The New York Rangers have played at Madison Square Garden since 1968.",
    category: "teams",
  },
  {
    id: 23,
    question: "Which team drafted Connor McDavid 1st overall in 2015?",
    options: ["Buffalo Sabres", "Arizona Coyotes", "Edmonton Oilers", "Toronto Maple Leafs"],
    correctAnswer: 2,
    explanation: "The Edmonton Oilers selected Connor McDavid with the first overall pick in the 2015 NHL Draft.",
    category: "teams",
  },
  {
    id: 24,
    question: "Which team's arena is known as 'The Madhouse on Madison'?",
    options: ["Detroit Red Wings", "Chicago Blackhawks", "New York Rangers", "Boston Bruins"],
    correctAnswer: 1,
    explanation: "Chicago's United Center (and formerly Chicago Stadium) earned the nickname 'The Madhouse on Madison.'",
    category: "teams",
  },
  // ===== RECORDS =====
  {
    id: 25,
    question: "What is the longest winning streak in NHL history?",
    options: ["15 games", "17 games", "19 games", "21 games"],
    correctAnswer: 1,
    explanation: "The Pittsburgh Penguins won 17 consecutive games in the 1992-93 season.",
    category: "records",
  },
  {
    id: 26,
    question: "How many points did Gretzky accumulate in his career?",
    options: ["1,850", "2,215", "2,857", "3,100"],
    correctAnswer: 2,
    explanation: "Wayne Gretzky retired with 2,857 career points, a record considered nearly unbreakable.",
    category: "records",
  },
  {
    id: 27,
    question: "Who holds the record for most penalty minutes in a career?",
    options: ["Tie Domi", "Tiger Williams", "Bob Probert", "Marty McSorley"],
    correctAnswer: 1,
    explanation: "Tiger Williams holds the career record with 3,966 penalty minutes.",
    category: "records",
  },
  {
    id: 28,
    question: "What is the most goals scored by one team in a single game?",
    options: ["12", "14", "16", "18"],
    correctAnswer: 2,
    explanation: "The Montreal Canadiens scored 16 goals against the Quebec Bulldogs on March 3, 1920.",
    category: "records",
  },
  {
    id: 29,
    question: "Who holds the record for fastest hat trick?",
    options: ["Wayne Gretzky", "Bill Mosienko", "Mario Lemieux", "Mike Bossy"],
    correctAnswer: 1,
    explanation: "Bill Mosienko scored three goals in 21 seconds on March 23, 1952.",
    category: "records",
  },
  {
    id: 30,
    question: "What is the longest game in NHL history (by overtime periods)?",
    options: ["4 OT", "5 OT", "6 OT", "7 OT"],
    correctAnswer: 2,
    explanation: "The longest NHL game went to 6 overtimes: Detroit vs. Montreal Maroons on March 24, 1936.",
    category: "records",
  },
  // ===== STANLEY CUP =====
  {
    id: 31,
    question: "How many rounds are in the NHL playoffs?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "The NHL playoffs consist of four rounds, each a best-of-seven series.",
    category: "stanley_cup",
  },
  {
    id: 32,
    question: "Which award is given to the NHL's most valuable player in the playoffs?",
    options: ["Hart Trophy", "Conn Smythe Trophy", "Norris Trophy", "Vezina Trophy"],
    correctAnswer: 1,
    explanation: "The Conn Smythe Trophy is awarded to the most valuable player in the NHL playoffs.",
    category: "stanley_cup",
  },
  {
    id: 33,
    question: "What is the Hart Trophy awarded for?",
    options: ["Best defenseman", "Most valuable player", "Top rookie", "Best goaltender"],
    correctAnswer: 1,
    explanation: "The Hart Memorial Trophy is awarded to the NHL's most valuable player in the regular season.",
    category: "stanley_cup",
  },
  {
    id: 34,
    question: "Which trophy is awarded to the NHL's best defenseman?",
    options: ["Selke Trophy", "Calder Trophy", "Norris Trophy", "Lady Byng Trophy"],
    correctAnswer: 2,
    explanation: "The James Norris Memorial Trophy is awarded to the NHL's best defenseman.",
    category: "stanley_cup",
  },
  {
    id: 35,
    question: "Every member of the winning team gets the Stanley Cup for how long?",
    options: ["One week", "One day", "24 hours", "One month"],
    correctAnswer: 1,
    explanation: "Each member of the winning team traditionally gets to spend one day with the Stanley Cup.",
    category: "stanley_cup",
  },
  {
    id: 36,
    question: "Which team ended a 54-year Cup drought in 2019?",
    options: ["Toronto Maple Leafs", "New York Rangers", "St. Louis Blues", "Chicago Blackhawks"],
    correctAnswer: 2,
    explanation: "The St. Louis Blues won their first Stanley Cup in 2019, ending a 51-year wait since their founding.",
    category: "stanley_cup",
  },
  {
    id: 37,
    question: "The Calder Trophy is awarded to the NHL's best what?",
    options: ["Goaltender", "Rookie", "Coach", "Defenseman"],
    correctAnswer: 1,
    explanation: "The Calder Memorial Trophy is awarded to the NHL's top rookie each season.",
    category: "stanley_cup",
  },
  {
    id: 38,
    question: "What is the Vezina Trophy awarded for?",
    options: ["Best defenseman", "Most valuable player", "Best goaltender", "Most sportsmanlike"],
    correctAnswer: 2,
    explanation: "The Vezina Trophy is awarded annually to the NHL's best goaltender.",
    category: "stanley_cup",
  },
  {
    id: 39,
    question: "Which team won the Stanley Cup in their inaugural season?",
    options: ["Seattle Kraken", "Vegas Golden Knights", "No team has done this", "Florida Panthers"],
    correctAnswer: 2,
    explanation: "No NHL team has won the Stanley Cup in their inaugural season. Vegas came closest, reaching the Final in 2017-18.",
    category: "stanley_cup",
  },
  {
    id: 40,
    question: "The Stanley Cup has how many names engraved on it?",
    options: ["About 1,000", "About 1,500", "Over 2,000", "Over 2,500"],
    correctAnswer: 3,
    explanation: "The Stanley Cup has over 2,500 names engraved on its bands from winning teams throughout history.",
    category: "stanley_cup",
  },
];

export function getDailyNHLTriviaQuestions(date?: Date): NHLTriviaQuestion[] {
  const now = date || new Date();
  const totalQuestions = nhlTriviaQuestions.length;
  const questionsPerDay = 5;

  const getEpochDay = (d: Date) => {
    const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    return Math.floor(utc / 86400000);
  };

  const shuffleQuestions = (seed: number) => {
    const shuffled = [...nhlTriviaQuestions];
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
  const shuffled = shuffleQuestions(99);
  const startIndex = dayIndex * questionsPerDay;
  return shuffled.slice(startIndex, startIndex + questionsPerDay);
}

export function getNHLTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `nhl-trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
