import { isYearQuestion } from "./trivia-utils";

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "history" | "records" | "players" | "teams" | "rules";
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "Who holds the record for most career home runs?",
    options: ["Babe Ruth", "Hank Aaron", "Barry Bonds", "Willie Mays"],
    correctAnswer: 2,
    explanation:
      "Barry Bonds hit 762 career home runs, surpassing Hank Aaron's 755 in 2007.",
    category: "records",
  },
  {
    id: 2,
    question: "Which team won the first World Series in 1903?",
    options: [
      "New York Yankees",
      "Boston Americans",
      "Chicago Cubs",
      "Pittsburgh Pirates",
    ],
    correctAnswer: 1,
    explanation:
      "The Boston Americans (later Red Sox) defeated the Pittsburgh Pirates 5 games to 3.",
    category: "history",
  },
  {
    id: 3,
    question: "What is the minimum distance for a home run in MLB?",
    options: ["300 feet", "325 feet", "350 feet", "375 feet"],
    correctAnswer: 1,
    explanation:
      "MLB rules require a minimum distance of 325 feet down the foul lines and 400 feet to center field.",
    category: "rules",
  },
  {
    id: 4,
    question: "Who threw the only perfect game in World Series history?",
    options: ["Sandy Koufax", "Don Larsen", "Nolan Ryan", "Randy Johnson"],
    correctAnswer: 1,
    explanation:
      "Don Larsen pitched a perfect game for the Yankees against the Dodgers in Game 5 of the 1956 World Series.",
    category: "history",
  },
  {
    id: 5,
    question: "Which player has the most career stolen bases?",
    options: ["Ty Cobb", "Lou Brock", "Rickey Henderson", "Tim Raines"],
    correctAnswer: 2,
    explanation:
      "Rickey Henderson stole 1,406 bases during his career, far surpassing Lou Brock's 938.",
    category: "records",
  },
  {
    id: 6,
    question: "What year did Jackie Robinson break the color barrier?",
    options: ["1945", "1947", "1949", "1951"],
    correctAnswer: 1,
    explanation:
      "Jackie Robinson debuted for the Brooklyn Dodgers on April 15, 1947.",
    category: "history",
  },
  {
    id: 7,
    question: "Which pitcher holds the record for most career strikeouts?",
    options: ["Randy Johnson", "Roger Clemens", "Nolan Ryan", "Steve Carlton"],
    correctAnswer: 2,
    explanation:
      "Nolan Ryan struck out 5,714 batters during his 27-year career.",
    category: "records",
  },
  {
    id: 8,
    question: "How many stitches are on a regulation MLB baseball?",
    options: ["88", "108", "128", "148"],
    correctAnswer: 1,
    explanation:
      "Every MLB baseball has exactly 108 double stitches (216 individual stitches).",
    category: "rules",
  },
  {
    id: 9,
    question: "Which team has won the most World Series titles?",
    options: [
      "St. Louis Cardinals",
      "Boston Red Sox",
      "New York Yankees",
      "San Francisco Giants",
    ],
    correctAnswer: 2,
    explanation: "The New York Yankees have won 27 World Series championships.",
    category: "teams",
  },
  {
    id: 10,
    question: "Who hit the 'Shot Heard Round the World' in 1951?",
    options: ["Willie Mays", "Bobby Thomson", "Jackie Robinson", "Duke Snider"],
    correctAnswer: 1,
    explanation:
      "Bobby Thomson's walk-off home run won the pennant for the Giants against the Dodgers.",
    category: "history",
  },
  {
    id: 11,
    question: "What is the highest single-season batting average since 1900?",
    options: [".406", ".424", ".426", ".440"],
    correctAnswer: 2,
    explanation:
      "Rogers Hornsby hit .424 for the Cardinals in 1924, the highest since 1900.",
    category: "records",
  },
  {
    id: 12,
    question: "Which stadium is known as 'The House That Ruth Built'?",
    options: [
      "Fenway Park",
      "Wrigley Field",
      "Old Yankee Stadium",
      "Polo Grounds",
    ],
    correctAnswer: 2,
    explanation:
      "The original Yankee Stadium (1923-2008) earned this nickname due to Babe Ruth's star power.",
    category: "teams",
  },
  {
    id: 13,
    question: "Who was the first player to earn $1 million per year?",
    options: ["Reggie Jackson", "Pete Rose", "Nolan Ryan", "Mike Schmidt"],
    correctAnswer: 2,
    explanation:
      "Nolan Ryan became MLB's first $1 million per year player when he signed with the Astros in 1980.",
    category: "players",
  },
  {
    id: 14,
    question: "What is the longest game in MLB history by innings?",
    options: ["22 innings", "25 innings", "26 innings", "33 innings"],
    correctAnswer: 2,
    explanation:
      "The Boston Braves and Brooklyn Robins played 26 innings on May 1, 1920, ending in a 1-1 tie.",
    category: "history",
  },
  {
    id: 15,
    question: "Which player has the most Gold Glove awards?",
    options: [
      "Ozzie Smith",
      "Roberto Clemente",
      "Greg Maddux",
      "Brooks Robinson",
    ],
    correctAnswer: 2,
    explanation:
      "Greg Maddux won 18 Gold Glove awards during his career as a pitcher.",
    category: "players",
  },
  {
    id: 16,
    question: "What is a 'cycle' in baseball?",
    options: [
      "Pitching 9 innings",
      "Hitting single, double, triple, and HR in one game",
      "Turning a triple play",
      "Stealing all four bases",
    ],
    correctAnswer: 1,
    explanation:
      "Hitting for the cycle means getting a single, double, triple, and home run in the same game.",
    category: "rules",
  },
  {
    id: 17,
    question: "Who was the youngest player to reach 3,000 hits?",
    options: ["Ty Cobb", "Pete Rose", "Hank Aaron", "Robin Yount"],
    correctAnswer: 0,
    explanation:
      "Ty Cobb reached 3,000 hits at age 34 years and 244 days in 1921.",
    category: "records",
  },
  {
    id: 18,
    question: "Which franchise moved from Milwaukee to Atlanta?",
    options: ["Brewers", "Braves", "Twins", "Orioles"],
    correctAnswer: 1,
    explanation:
      "The Braves played in Milwaukee from 1953-1965 before moving to Atlanta in 1966.",
    category: "teams",
  },
  {
    id: 19,
    question: "What is the 'Mendoza Line' named after?",
    options: [
      "A famous umpire",
      "A light-hitting shortstop",
      "A stadium",
      "A rule change",
    ],
    correctAnswer: 1,
    explanation:
      "Named after Mario Mendoza, it represents a .200 batting average—the threshold of poor hitting.",
    category: "players",
  },
  {
    id: 20,
    question: "How many players are on the field for the defensive team?",
    options: ["8", "9", "10", "11"],
    correctAnswer: 1,
    explanation:
      "Nine players: pitcher, catcher, first baseman, second baseman, shortstop, third baseman, and three outfielders.",
    category: "rules",
  },
  {
    id: 21,
    question: "Who holds the record for most consecutive games played?",
    options: ["Lou Gehrig", "Cal Ripken Jr.", "Pete Rose", "Steve Garvey"],
    correctAnswer: 1,
    explanation:
      "Cal Ripken Jr. played 2,632 consecutive games from 1982 to 1998.",
    category: "records",
  },
  {
    id: 22,
    question: "What year was the designated hitter rule introduced in the AL?",
    options: ["1969", "1973", "1977", "1981"],
    correctAnswer: 1,
    explanation:
      "The American League adopted the DH rule in 1973. The NL followed in 2022.",
    category: "rules",
  },
  {
    id: 23,
    question: "Which DiMaggio brother won 3 MVP awards?",
    options: [
      "Dom DiMaggio",
      "Joe DiMaggio",
      "Vince DiMaggio",
      "None of them",
    ],
    correctAnswer: 1,
    explanation:
      "Joe DiMaggio won 3 MVP awards (1939, 1941, 1947) with the New York Yankees.",
    category: "players",
  },
  {
    id: 24,
    question: "What is the oldest MLB stadium still in use?",
    options: [
      "Wrigley Field",
      "Fenway Park",
      "Dodger Stadium",
      "Oakland Coliseum",
    ],
    correctAnswer: 1,
    explanation:
      "Fenway Park opened on April 20, 1912, making it the oldest active MLB stadium.",
    category: "teams",
  },
  {
    id: 25,
    question: "Who pitched the most no-hitters in MLB history?",
    options: ["Sandy Koufax", "Bob Feller", "Nolan Ryan", "Randy Johnson"],
    correctAnswer: 2,
    explanation:
      "Nolan Ryan threw 7 career no-hitters, 3 more than any other pitcher.",
    category: "records",
  },
  {
    id: 26,
    question: "What is a 'walk-off' hit?",
    options: [
      "A hit that ends an inning",
      "A game-winning hit by the home team in their final at-bat",
      "A hit that clears the bases",
      "A hit during a pitching change",
    ],
    correctAnswer: 1,
    explanation:
      "A walk-off hit ends the game immediately when the home team takes the lead in their last at-bat.",
    category: "rules",
  },
  {
    id: 27,
    question: "Which player won the Triple Crown most recently before 2012?",
    options: [
      "Ted Williams",
      "Mickey Mantle",
      "Frank Robinson",
      "Carl Yastrzemski",
    ],
    correctAnswer: 3,
    explanation:
      "Carl Yastrzemski won the Triple Crown in 1967. Miguel Cabrera ended the 45-year drought in 2012.",
    category: "history",
  },
  {
    id: 28,
    question: "What is the 'Green Monster'?",
    options: [
      "Oakland's mascot",
      "Fenway Park's left field wall",
      "A type of curveball",
      "Chicago's ivy walls",
    ],
    correctAnswer: 1,
    explanation:
      "The Green Monster is Fenway Park's famous 37-foot left field wall, painted green since 1947.",
    category: "teams",
  },
  {
    id: 29,
    question: "Who was the first African American manager in MLB?",
    options: [
      "Jackie Robinson",
      "Frank Robinson",
      "Dusty Baker",
      "Cito Gaston",
    ],
    correctAnswer: 1,
    explanation:
      "Frank Robinson became MLB's first Black manager when he was hired by the Indians in 1975.",
    category: "history",
  },
  {
    id: 30,
    question: "What is the most runs scored in a single MLB game by one team?",
    options: ["27", "30", "33", "36"],
    correctAnswer: 1,
    explanation:
      "The Texas Rangers scored 30 runs against the Baltimore Orioles on August 22, 2007.",
    category: "records",
  },
  {
    id: 31,
    question: "Who was the first player to hit 60 home runs in a season?",
    options: ["Babe Ruth", "Roger Maris", "Mark McGwire", "Sammy Sosa"],
    correctAnswer: 0,
    explanation:
      "Babe Ruth hit 60 home runs in 1927, a record that stood for 34 years.",
    category: "records",
  },
  {
    id: 32,
    question: "What team did Babe Ruth play for before the Yankees?",
    options: [
      "Philadelphia Athletics",
      "Boston Red Sox",
      "Chicago White Sox",
      "Detroit Tigers",
    ],
    correctAnswer: 1,
    explanation:
      "Babe Ruth started his career with the Boston Red Sox as a pitcher before being sold to the Yankees in 1920.",
    category: "history",
  },
  {
    id: 33,
    question: "Who holds the record for most hits in a single season?",
    options: ["Ty Cobb", "George Sisler", "Ichiro Suzuki", "Pete Rose"],
    correctAnswer: 2,
    explanation:
      "Ichiro Suzuki had 262 hits in 2004, breaking George Sisler's 84-year-old record of 257.",
    category: "records",
  },
  {
    id: 34,
    question: "Which pitcher won the most Cy Young Awards?",
    options: ["Randy Johnson", "Roger Clemens", "Greg Maddux", "Steve Carlton"],
    correctAnswer: 1,
    explanation: "Roger Clemens won 7 Cy Young Awards during his career.",
    category: "records",
  },
  {
    id: 35,
    question: "What does 'WHIP' stand for in baseball statistics?",
    options: [
      "Wins Held In Proportion",
      "Walks and Hits per Innings Pitched",
      "Winning Hits In Play",
      "Weighted Hitting Impact Percentage",
    ],
    correctAnswer: 1,
    explanation:
      "WHIP measures the number of walks and hits a pitcher allows per inning pitched.",
    category: "rules",
  },
  {
    id: 36,
    question: "Which team broke the 'Curse of the Bambino' in 2004?",
    options: [
      "Chicago Cubs",
      "Boston Red Sox",
      "Cleveland Indians",
      "Chicago White Sox",
    ],
    correctAnswer: 1,
    explanation:
      "The Red Sox won the 2004 World Series, ending an 86-year championship drought since trading Babe Ruth.",
    category: "history",
  },
  {
    id: 37,
    question: "Who was known as 'The Say Hey Kid'?",
    options: ["Hank Aaron", "Willie Mays", "Mickey Mantle", "Roberto Clemente"],
    correctAnswer: 1,
    explanation:
      "Willie Mays earned this nickname for his enthusiastic greeting of 'Say hey!' to teammates and fans.",
    category: "players",
  },
  {
    id: 38,
    question: "What is the 'infield fly rule' designed to prevent?",
    options: [
      "Stolen bases",
      "Double plays on easy fly balls",
      "Hit batters",
      "Balks",
    ],
    correctAnswer: 1,
    explanation:
      "The rule prevents infielders from intentionally dropping pop-ups to turn easy double or triple plays.",
    category: "rules",
  },
  {
    id: 39,
    question: "Which stadium has the deepest center field in MLB?",
    options: [
      "Coors Field",
      "Comerica Park",
      "Minute Maid Park",
      "Oracle Park",
    ],
    correctAnswer: 1,
    explanation: "Comerica Park's center field is 420 feet from home plate.",
    category: "teams",
  },
  {
    id: 40,
    question: "Who threw the fastest pitch ever officially recorded?",
    options: [
      "Nolan Ryan",
      "Aroldis Chapman",
      "Joel Zumaya",
      "Justin Verlander",
    ],
    correctAnswer: 1,
    explanation:
      "Aroldis Chapman threw a 105.8 mph fastball in 2010, the fastest ever recorded by Statcast.",
    category: "records",
  },
  {
    id: 41,
    question: "What year did the Seattle Mariners win 116 games?",
    options: ["1998", "2001", "2004", "2007"],
    correctAnswer: 1,
    explanation:
      "The 2001 Mariners won 116 games, tying the 1906 Cubs for most wins in a season.",
    category: "history",
  },
  {
    id: 42,
    question: "Who has the most career RBIs in MLB history?",
    options: ["Babe Ruth", "Hank Aaron", "Lou Gehrig", "Barry Bonds"],
    correctAnswer: 1,
    explanation: "Hank Aaron drove in 2,297 runs during his 23-year career.",
    category: "records",
  },
  {
    id: 43,
    question: "What is a 'balk' in baseball?",
    options: [
      "A wild pitch",
      "An illegal pitching motion",
      "A missed swing",
      "A foul ball",
    ],
    correctAnswer: 1,
    explanation:
      "A balk is an illegal motion by the pitcher that deceives baserunners, advancing them one base.",
    category: "rules",
  },
  {
    id: 44,
    question: "Which team plays at Wrigley Field?",
    options: [
      "Chicago White Sox",
      "Chicago Cubs",
      "Milwaukee Brewers",
      "St. Louis Cardinals",
    ],
    correctAnswer: 1,
    explanation: "The Chicago Cubs have called Wrigley Field home since 1916.",
    category: "teams",
  },
  {
    id: 45,
    question:
      "Who was the first player to be unanimously elected to the Hall of Fame?",
    options: ["Babe Ruth", "Ty Cobb", "Ken Griffey Jr.", "Mariano Rivera"],
    correctAnswer: 3,
    explanation:
      "Mariano Rivera received 100% of the vote in 2019, the first unanimous selection.",
    category: "history",
  },
  {
    id: 46,
    question: "What is the 'hot corner' in baseball?",
    options: ["Home plate", "Third base", "First base", "The dugout"],
    correctAnswer: 1,
    explanation:
      "Third base is called the hot corner due to the hard-hit balls and quick reaction time needed.",
    category: "rules",
  },
  {
    id: 47,
    question: "Who holds the record for most career walks?",
    options: ["Babe Ruth", "Ted Williams", "Barry Bonds", "Rickey Henderson"],
    correctAnswer: 2,
    explanation:
      "Barry Bonds walked 2,558 times in his career, including an MLB-record 232 in 2004.",
    category: "records",
  },
  {
    id: 48,
    question:
      "Which expansion team won a World Series in just their fifth season?",
    options: [
      "Colorado Rockies",
      "Arizona Diamondbacks",
      "Tampa Bay Rays",
      "Miami Marlins",
    ],
    correctAnswer: 1,
    explanation:
      "The Arizona Diamondbacks won the 2001 World Series, just four years after their founding.",
    category: "teams",
  },
  {
    id: 49,
    question: "What is 'batting around' in baseball?",
    options: [
      "Switch hitting",
      "When all 9 batters come to the plate in one inning",
      "A batting practice drill",
      "A pinch-hit situation",
    ],
    correctAnswer: 1,
    explanation:
      "Batting around occurs when a team sends all nine batters to the plate in a single inning.",
    category: "rules",
  },
  {
    id: 50,
    question: "Who was MLB's first $30 million per year player?",
    options: ["Alex Rodriguez", "Derek Jeter", "Mike Trout", "Manny Ramirez"],
    correctAnswer: 0,
    explanation:
      "Alex Rodriguez signed a 10-year, $252 million contract with Texas in 2000.",
    category: "history",
  },
  {
    id: 51,
    question: "What is a 'can of corn' in baseball slang?",
    options: ["A home run", "An easy fly ball", "A strikeout", "A ground ball"],
    correctAnswer: 1,
    explanation:
      "An easy fly ball that falls softly into a fielder's glove, like cans being caught from a shelf.",
    category: "rules",
  },
  {
    id: 52,
    question: "Which player hit the longest verified home run?",
    options: [
      "Mickey Mantle",
      "Babe Ruth",
      "Mark McGwire",
      "Giancarlo Stanton",
    ],
    correctAnswer: 0,
    explanation:
      "Mickey Mantle's 1953 shot at Griffith Stadium was measured at 565 feet.",
    category: "records",
  },
  {
    id: 53,
    question: "What team did Derek Jeter play his entire career for?",
    options: [
      "Boston Red Sox",
      "New York Mets",
      "New York Yankees",
      "Baltimore Orioles",
    ],
    correctAnswer: 2,
    explanation:
      "Derek Jeter spent all 20 seasons (1995-2014) with the New York Yankees.",
    category: "players",
  },
  {
    id: 54,
    question: "Who was nicknamed 'The Big Unit'?",
    options: ["Frank Thomas", "Randy Johnson", "David Ortiz", "Mark McGwire"],
    correctAnswer: 1,
    explanation:
      "At 6'10\", Randy Johnson earned this nickname for his imposing height on the mound.",
    category: "players",
  },
  {
    id: 55,
    question: "What year did MLB expand to 30 teams?",
    options: ["1993", "1998", "2000", "2005"],
    correctAnswer: 1,
    explanation:
      "The Arizona Diamondbacks and Tampa Bay Devil Rays joined MLB in 1998.",
    category: "history",
  },
  {
    id: 56,
    question: "Which catcher has the most career home runs?",
    options: ["Johnny Bench", "Mike Piazza", "Carlton Fisk", "Ivan Rodriguez"],
    correctAnswer: 1,
    explanation:
      "Mike Piazza hit 427 career home runs, 396 of them as a catcher.",
    category: "records",
  },
  {
    id: 57,
    question: "What is a 'brushback pitch'?",
    options: [
      "A changeup",
      "A pitch thrown close to move the batter back",
      "A curveball",
      "A pitch to first base",
    ],
    correctAnswer: 1,
    explanation:
      "A brushback is an inside pitch intended to make the batter step away from the plate.",
    category: "rules",
  },
  {
    id: 58,
    question: "Which team has the longest World Series drought currently?",
    options: [
      "Cleveland Guardians",
      "Seattle Mariners",
      "Milwaukee Brewers",
      "San Diego Padres",
    ],
    correctAnswer: 1,
    explanation:
      "The Seattle Mariners have never won a World Series and have never even appeared in one.",
    category: "teams",
  },
  {
    id: 59,
    question: "Who was known as 'Mr. October'?",
    options: ["Mickey Mantle", "Reggie Jackson", "David Ortiz", "Derek Jeter"],
    correctAnswer: 1,
    explanation:
      "Reggie Jackson earned this nickname for his clutch postseason performances, especially in the World Series.",
    category: "players",
  },
  {
    id: 60,
    question: "What is the 'suicide squeeze' play?",
    options: [
      "A double steal",
      "A bunt with runner on third breaking for home on the pitch",
      "A hidden ball trick",
      "A pickoff play",
    ],
    correctAnswer: 1,
    explanation:
      "The runner breaks for home as the pitch is delivered, relying on the batter to make contact.",
    category: "rules",
  },
  {
    id: 61,
    question: "Who holds the record for most career games played?",
    options: ["Cal Ripken Jr.", "Pete Rose", "Hank Aaron", "Carl Yastrzemski"],
    correctAnswer: 1,
    explanation: "Pete Rose played in 3,562 career games over 24 seasons.",
    category: "records",
  },
  {
    id: 62,
    question:
      "What year did the Colorado Rockies and Florida Marlins join MLB?",
    options: ["1991", "1993", "1995", "1998"],
    correctAnswer: 1,
    explanation: "Both teams began play in 1993 as expansion franchises.",
    category: "history",
  },
  {
    id: 63,
    question: "Who was the first Japanese-born player in MLB?",
    options: [
      "Ichiro Suzuki",
      "Hideo Nomo",
      "Hideki Matsui",
      "Masanori Murakami",
    ],
    correctAnswer: 3,
    explanation:
      "Masanori Murakami pitched for the San Francisco Giants in 1964-65.",
    category: "history",
  },
  {
    id: 64,
    question: "What is a 'twin killing' in baseball?",
    options: [
      "Hitting two home runs",
      "A double play",
      "Two strikeouts in a row",
      "Back-to-back errors",
    ],
    correctAnswer: 1,
    explanation:
      "A twin killing is slang for a double play, getting two outs on one batted ball.",
    category: "rules",
  },
  {
    id: 65,
    question: "Which ballpark is at the highest elevation?",
    options: ["Chase Field", "Coors Field", "Oracle Park", "Dodger Stadium"],
    correctAnswer: 1,
    explanation:
      "Coors Field in Denver sits at 5,280 feet above sea level, affecting ball flight significantly.",
    category: "teams",
  },
  {
    id: 66,
    question: "Who has the most career doubles in MLB history?",
    options: ["Tris Speaker", "Pete Rose", "Stan Musial", "Craig Biggio"],
    correctAnswer: 0,
    explanation:
      "Tris Speaker hit 792 career doubles, 46 more than second-place Pete Rose.",
    category: "records",
  },
  {
    id: 67,
    question: "What is the 'neighborhood play'?",
    options: [
      "A home run to the stands",
      "A second baseman not touching the bag on a double play",
      "A stolen base",
      "A walk-off hit",
    ],
    correctAnswer: 1,
    explanation:
      "The neighborhood play allowed middle infielders to be near but not touching second base on double plays.",
    category: "rules",
  },
  {
    id: 68,
    question: "Who hit the first home run at new Yankee Stadium?",
    options: ["Derek Jeter", "Johnny Damon", "Jorge Posada", "Robinson Cano"],
    correctAnswer: 1,
    explanation:
      "Johnny Damon hit the first homer at the new Yankee Stadium on April 16, 2009.",
    category: "history",
  },
  {
    id: 69,
    question: "Which pitcher has the lowest career ERA (minimum 1500 innings)?",
    options: [
      "Walter Johnson",
      "Christy Mathewson",
      "Ed Walsh",
      "Mariano Rivera",
    ],
    correctAnswer: 2,
    explanation:
      "Ed Walsh had a career ERA of 1.82 over 2,964 innings pitched from 1904-1917.",
    category: "records",
  },
  {
    id: 70,
    question: "What is 'OPS' a combination of?",
    options: [
      "Outs Per Season",
      "On-base Plus Slugging",
      "Offensive Player Score",
      "Overall Pitching Stats",
    ],
    correctAnswer: 1,
    explanation:
      "OPS adds a player's on-base percentage and slugging percentage together.",
    category: "rules",
  },
  {
    id: 71,
    question: "Which team won back-to-back World Series in 1992 and 1993?",
    options: [
      "Atlanta Braves",
      "Toronto Blue Jays",
      "Oakland Athletics",
      "Minnesota Twins",
    ],
    correctAnswer: 1,
    explanation:
      "The Toronto Blue Jays won consecutive championships, the only Canadian team to win the World Series.",
    category: "teams",
  },
  {
    id: 72,
    question: "Who was the first player to hit 500 career home runs?",
    options: ["Babe Ruth", "Jimmie Foxx", "Mel Ott", "Ted Williams"],
    correctAnswer: 0,
    explanation: "Babe Ruth reached 500 home runs on August 11, 1929.",
    category: "history",
  },
  {
    id: 73,
    question: "What is a 'Golden Sombrero' in baseball?",
    options: [
      "Winning the batting title",
      "Striking out four times in one game",
      "Hitting for the cycle",
      "A defensive gem",
    ],
    correctAnswer: 1,
    explanation:
      "A Golden Sombrero refers to a batter striking out four times in a single game.",
    category: "rules",
  },
  {
    id: 74,
    question: "Who holds the record for most saves in a career?",
    options: [
      "Trevor Hoffman",
      "Mariano Rivera",
      "Lee Smith",
      "Dennis Eckersley",
    ],
    correctAnswer: 1,
    explanation:
      "Mariano Rivera recorded 652 career saves over his 19-year career with the Yankees.",
    category: "records",
  },
  {
    id: 75,
    question: "What nickname was given to the 1927 Yankees lineup?",
    options: [
      "The Big Red Machine",
      "Murderers' Row",
      "The Bronx Bombers",
      "The Bash Brothers",
    ],
    correctAnswer: 1,
    explanation:
      "Murderers' Row featured Babe Ruth, Lou Gehrig, and other power hitters on the legendary 1927 team.",
    category: "history",
  },
  {
    id: 76,
    question: "Which player won MVP awards in both leagues?",
    options: [
      "Barry Bonds",
      "Frank Robinson",
      "Alex Rodriguez",
      "All of the above",
    ],
    correctAnswer: 1,
    explanation:
      "Frank Robinson won MVP with Cincinnati (1961) and Baltimore (1966), the first to do so.",
    category: "players",
  },
  {
    id: 77,
    question:
      "Who holds the record for most career putouts by a first baseman?",
    options: ["Eddie Murray", "Jake Beckley", "Cap Anson", "Lou Gehrig"],
    correctAnswer: 1,
    explanation:
      "Jake Beckley recorded 23,696 putouts at first base during his career from 1888-1907.",
    category: "records",
  },
  {
    id: 78,
    question: "Which team moved from Brooklyn to Los Angeles?",
    options: ["Giants", "Dodgers", "Athletics", "Senators"],
    correctAnswer: 1,
    explanation:
      "The Brooklyn Dodgers moved to Los Angeles after the 1957 season.",
    category: "teams",
  },
  {
    id: 79,
    question: "Who was the youngest player to reach 600 home runs?",
    options: ["Babe Ruth", "Hank Aaron", "Alex Rodriguez", "Barry Bonds"],
    correctAnswer: 2,
    explanation:
      "Alex Rodriguez reached 600 home runs at age 35 years, 8 days in 2010.",
    category: "records",
  },
  {
    id: 80,
    question: "What is a 'Baltimore chop'?",
    options: [
      "A type of pitch",
      "A high-bouncing ground ball",
      "A defensive shift",
      "A base-stealing technique",
    ],
    correctAnswer: 1,
    explanation:
      "A Baltimore chop is a ground ball that bounces high off the plate or hard dirt, often resulting in a hit.",
    category: "rules",
  },
  {
    id: 81,
    question: "Who threw the last pitch of the 2016 World Series?",
    options: [
      "Aroldis Chapman",
      "Mike Montgomery",
      "Jon Lester",
      "Kyle Hendricks",
    ],
    correctAnswer: 1,
    explanation:
      "Mike Montgomery got the final out as the Cubs won their first championship in 108 years.",
    category: "history",
  },
  {
    id: 82,
    question: "Which player has the most All-Star Game selections?",
    options: ["Hank Aaron", "Willie Mays", "Stan Musial", "Pete Rose"],
    correctAnswer: 0,
    explanation:
      "Hank Aaron was selected to 25 All-Star Games during his career.",
    category: "records",
  },
  {
    id: 83,
    question: "What does 'WAR' stand for in baseball analytics?",
    options: [
      "Wins Above Replacement",
      "Weighted Average Runs",
      "Walk And Run",
      "Win Advance Rating",
    ],
    correctAnswer: 0,
    explanation:
      "WAR measures a player's total value compared to a replacement-level player.",
    category: "rules",
  },
  {
    id: 84,
    question: "Which team has retired the most jersey numbers?",
    options: [
      "Boston Red Sox",
      "New York Yankees",
      "St. Louis Cardinals",
      "Los Angeles Dodgers",
    ],
    correctAnswer: 1,
    explanation:
      "The New York Yankees have retired 23 numbers, more than any other team.",
    category: "teams",
  },
  {
    id: 85,
    question: "Who was the last Triple Crown winner before Miguel Cabrera?",
    options: [
      "Ted Williams",
      "Mickey Mantle",
      "Frank Robinson",
      "Carl Yastrzemski",
    ],
    correctAnswer: 3,
    explanation:
      "Carl Yastrzemski won the Triple Crown in 1967, 45 years before Cabrera's 2012 achievement.",
    category: "history",
  },
  {
    id: 86,
    question: "What is an 'immaculate inning'?",
    options: [
      "Three strikeouts on 9 pitches",
      "A perfect game",
      "No balls thrown in an inning",
      "Three ground outs",
    ],
    correctAnswer: 0,
    explanation:
      "An immaculate inning is when a pitcher strikes out three batters on exactly nine pitches.",
    category: "rules",
  },
  {
    id: 87,
    question: "Who hit the most home runs in their final season?",
    options: ["Babe Ruth", "Ted Williams", "Dave Kingman", "Mark McGwire"],
    correctAnswer: 1,
    explanation:
      "Ted Williams hit 29 home runs in 1960, his final season, including a homer in his last at-bat.",
    category: "records",
  },
  {
    id: 88,
    question: "Which team waited longest to have their first no-hitter (until 2021)?",
    options: [
      "San Diego Padres",
      "New York Mets",
      "Colorado Rockies",
      "Tampa Bay Rays",
    ],
    correctAnswer: 0,
    explanation:
      "The Padres waited 53 years for their first no-hitter until Joe Musgrove threw one on April 9, 2021.",
    category: "teams",
  },
  {
    id: 89,
    question: "Who was nicknamed 'The Splendid Splinter'?",
    options: ["Joe DiMaggio", "Ted Williams", "Stan Musial", "Mickey Mantle"],
    correctAnswer: 1,
    explanation:
      "Ted Williams earned this nickname due to his thin frame and exceptional hitting ability.",
    category: "players",
  },
  {
    id: 90,
    question:
      "What is the maximum number of players on an active MLB roster during the regular season?",
    options: ["25", "26", "28", "40"],
    correctAnswer: 1,
    explanation:
      "MLB expanded the regular-season active roster from 25 to 26 players starting in 2020.",
    category: "rules",
  },
  {
    id: 91,
    question: "Which father-son duo both hit 200+ career home runs?",
    options: [
      "Bobby and Barry Bonds",
      "Ken Griffey Sr. and Jr.",
      "Cecil and Prince Fielder",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation: "All three father-son combinations achieved this milestone.",
    category: "players",
  },
  {
    id: 92,
    question: "What year did instant replay reviews begin in MLB?",
    options: ["2008", "2010", "2014", "2016"],
    correctAnswer: 2,
    explanation:
      "MLB expanded replay review to include most calls starting in 2014.",
    category: "history",
  },
  {
    id: 93,
    question: "Who holds the record for most strikeouts in a 9-inning game?",
    options: ["Nolan Ryan", "Roger Clemens", "Kerry Wood", "Max Scherzer"],
    correctAnswer: 2,
    explanation:
      "Kerry Wood and Roger Clemens both struck out 20 batters in a 9-inning game.",
    category: "records",
  },
  {
    id: 94,
    question: "What is a 'pickle' in baseball?",
    options: [
      "A difficult pitch",
      "A rundown between bases",
      "A defensive error",
      "A bad hop",
    ],
    correctAnswer: 1,
    explanation:
      "A pickle is when a baserunner is caught between two bases and fielders try to tag them out.",
    category: "rules",
  },
  {
    id: 95,
    question: "Who holds the record for most career wins as a manager?",
    options: ["Connie Mack", "John McGraw", "Tony La Russa", "Joe Torre"],
    correctAnswer: 0,
    explanation:
      "Connie Mack won 3,731 games as a manager during his 53-year career.",
    category: "records",
  },
  {
    id: 96,
    question:
      "Who holds the record for highest career fielding percentage by a shortstop?",
    options: ["Omar Vizquel", "Rey Ordonez", "Troy Tulowitzki", "Ozzie Smith"],
    correctAnswer: 0,
    explanation:
      "Omar Vizquel holds the career fielding percentage record for shortstops at .9847.",
    category: "records",
  },
  {
    id: 97,
    question: "What is a 'Texas Leaguer'?",
    options: ["A home run", "A blooper hit", "A curveball", "A stolen base"],
    correctAnswer: 1,
    explanation:
      "A Texas Leaguer is a softly hit ball that drops between the infield and outfield for a hit.",
    category: "rules",
  },
  {
    id: 98,
    question: "Who holds the record for most grand slams in a career?",
    options: ["Lou Gehrig", "Manny Ramirez", "Alex Rodriguez", "Eddie Murray"],
    correctAnswer: 2,
    explanation:
      "Alex Rodriguez hit 25 career grand slams, surpassing Lou Gehrig's 23.",
    category: "records",
  },
  {
    id: 99,
    question: "Which team plays at Oracle Park?",
    options: [
      "Oakland Athletics",
      "San Francisco Giants",
      "San Diego Padres",
      "Los Angeles Angels",
    ],
    correctAnswer: 1,
    explanation:
      "The San Francisco Giants have played at Oracle Park (formerly AT&T Park) since 2000.",
    category: "teams",
  },
  {
    id: 100,
    question:
      "Who was the first designated hitter to be inducted into the Hall of Fame?",
    options: ["Edgar Martinez", "David Ortiz", "Frank Thomas", "Harold Baines"],
    correctAnswer: 0,
    explanation:
      "Edgar Martinez was inducted in 2019, primarily recognized for his role as a DH with the Mariners.",
    category: "history",
  },
  {
    id: 101,
    question: "What is the 'Eephus pitch'?",
    options: [
      "A fastball",
      "A very slow, high-arcing pitch",
      "A knuckleball",
      "A slider",
    ],
    correctAnswer: 1,
    explanation:
      "The Eephus is a very slow pitch with a high arc, famously used by Rip Sewell in the 1940s.",
    category: "rules",
  },
  {
    id: 102,
    question: "Who has the most career triples in MLB history?",
    options: ["Ty Cobb", "Sam Crawford", "Honus Wagner", "Tris Speaker"],
    correctAnswer: 1,
    explanation: "Sam Crawford hit 309 career triples between 1899 and 1917.",
    category: "records",
  },
  {
    id: 103,
    question: "Which team was known as 'The Big Red Machine' in the 1970s?",
    options: [
      "Boston Red Sox",
      "St. Louis Cardinals",
      "Cincinnati Reds",
      "Los Angeles Angels",
    ],
    correctAnswer: 2,
    explanation:
      "The Cincinnati Reds dominated the 1970s, winning back-to-back World Series in 1975-76.",
    category: "teams",
  },
  {
    id: 104,
    question: "Who was the first Latino player inducted into the Hall of Fame?",
    options: [
      "Roberto Clemente",
      "Juan Marichal",
      "Luis Aparicio",
      "Orlando Cepeda",
    ],
    correctAnswer: 0,
    explanation:
      "Roberto Clemente was inducted posthumously in 1973, the first Latino player honored.",
    category: "history",
  },
  {
    id: 105,
    question: "What is a 'quality start' in baseball?",
    options: [
      "Pitching 5+ innings with 3 or fewer earned runs",
      "Pitching 6+ innings with 3 or fewer earned runs",
      "Pitching 7+ innings with 2 or fewer earned runs",
      "Pitching a complete game",
    ],
    correctAnswer: 1,
    explanation:
      "A quality start is when a pitcher completes at least 6 innings and allows 3 or fewer earned runs.",
    category: "rules",
  },
  {
    id: 106,
    question: "Who hit the most home runs in a World Series?",
    options: ["Babe Ruth", "Reggie Jackson", "Mickey Mantle", "Chase Utley"],
    correctAnswer: 2,
    explanation:
      "Mickey Mantle hit 18 home runs in World Series play during his career.",
    category: "records",
  },
  {
    id: 107,
    question: "Which team plays at Camden Yards?",
    options: [
      "Washington Nationals",
      "Baltimore Orioles",
      "Philadelphia Phillies",
      "Pittsburgh Pirates",
    ],
    correctAnswer: 1,
    explanation:
      "Oriole Park at Camden Yards has been home to the Baltimore Orioles since 1992.",
    category: "teams",
  },
  {
    id: 108,
    question: "Who was known as 'Stan the Man'?",
    options: ["Stan Musial", "Stan Coveleski", "Stan Hack", "Stan Williams"],
    correctAnswer: 0,
    explanation:
      "Stan Musial earned this nickname during his legendary 22-year career with the Cardinals.",
    category: "players",
  },
  {
    id: 109,
    question: "What year did Babe Ruth 'call his shot' in the World Series?",
    options: ["1927", "1928", "1932", "1934"],
    correctAnswer: 2,
    explanation:
      "Ruth allegedly pointed to center field before hitting a home run in the 1932 World Series.",
    category: "history",
  },
  {
    id: 110,
    question: "What does 'FIP' stand for in pitching statistics?",
    options: [
      "Fastball Impact Percentage",
      "Fielding Independent Pitching",
      "Final Innings Pitched",
      "Full Inning Performance",
    ],
    correctAnswer: 1,
    explanation:
      "FIP measures a pitcher's effectiveness based only on events they can control: strikeouts, walks, and home runs.",
    category: "rules",
  },
  {
    id: 111,
    question: "Who holds the record for most wins by a pitcher?",
    options: [
      "Cy Young",
      "Walter Johnson",
      "Christy Mathewson",
      "Grover Alexander",
    ],
    correctAnswer: 0,
    explanation: "Cy Young won 511 games during his career from 1890-1911.",
    category: "records",
  },
  {
    id: 112,
    question: "Which stadium is known for its ivy-covered outfield walls?",
    options: [
      "Fenway Park",
      "Wrigley Field",
      "Yankee Stadium",
      "Tiger Stadium",
    ],
    correctAnswer: 1,
    explanation:
      "Wrigley Field's iconic ivy was planted on the outfield walls in 1937.",
    category: "teams",
  },
  {
    id: 113,
    question: "Who was the first player to appear on a Wheaties box?",
    options: ["Babe Ruth", "Lou Gehrig", "Ty Cobb", "Walter Johnson"],
    correctAnswer: 1,
    explanation:
      "Lou Gehrig appeared on the Wheaties box in 1934, the first athlete featured.",
    category: "history",
  },
  {
    id: 114,
    question: "What is 'BABIP' in baseball analytics?",
    options: [
      "Batting Average By Impact Percentage",
      "Batting Average on Balls In Play",
      "Base Achievement Before Inning Progress",
      "Ball Analysis By Initial Position",
    ],
    correctAnswer: 1,
    explanation:
      "BABIP measures how often a batted ball that stays in play falls for a hit.",
    category: "rules",
  },
  {
    id: 115,
    question: "Who pitched the most complete games in MLB history?",
    options: ["Cy Young", "Walter Johnson", "Christy Mathewson", "Pud Galvin"],
    correctAnswer: 0,
    explanation: "Cy Young completed 749 of his 815 career starts.",
    category: "records",
  },
  {
    id: 116,
    question:
      "Which team won three World Series titles in five years (2010, 2012, 2014)?",
    options: [
      "Boston Red Sox",
      "St. Louis Cardinals",
      "San Francisco Giants",
      "Kansas City Royals",
    ],
    correctAnswer: 2,
    explanation:
      "The San Francisco Giants won championships in 2010, 2012, and 2014.",
    category: "teams",
  },
  {
    id: 117,
    question: "Who was nicknamed 'The Iron Horse'?",
    options: ["Cal Ripken Jr.", "Lou Gehrig", "Joe DiMaggio", "Hank Aaron"],
    correctAnswer: 1,
    explanation:
      "Lou Gehrig earned this nickname for his durability, playing 2,130 consecutive games.",
    category: "players",
  },
  {
    id: 118,
    question: "What year did the 'Black Sox Scandal' occur?",
    options: ["1915", "1919", "1923", "1927"],
    correctAnswer: 1,
    explanation:
      "Eight Chicago White Sox players were accused of intentionally losing the 1919 World Series.",
    category: "history",
  },
  {
    id: 119,
    question: "What is a 'slash line' in baseball statistics?",
    options: [
      "Batting average / On-base / Slugging",
      "Hits / Runs / RBIs",
      "Singles / Doubles / Triples",
      "Wins / Losses / Saves",
    ],
    correctAnswer: 0,
    explanation:
      "A slash line shows a batter's batting average, on-base percentage, and slugging percentage.",
    category: "rules",
  },
  {
    id: 120,
    question: "Who holds the record for most RBIs in a single season?",
    options: ["Babe Ruth", "Hack Wilson", "Lou Gehrig", "Hank Greenberg"],
    correctAnswer: 1,
    explanation: "Hack Wilson drove in 191 runs for the Cubs in 1930.",
    category: "records",
  },
  {
    id: 121,
    question: "Which team plays at Petco Park?",
    options: [
      "San Diego Padres",
      "Los Angeles Dodgers",
      "San Francisco Giants",
      "Arizona Diamondbacks",
    ],
    correctAnswer: 0,
    explanation: "The San Diego Padres have called Petco Park home since 2004.",
    category: "teams",
  },
  {
    id: 122,
    question: "Who was known as 'The Georgia Peach'?",
    options: ["Hank Aaron", "Ty Cobb", "Dale Murphy", "Chipper Jones"],
    correctAnswer: 1,
    explanation:
      "Ty Cobb, who was from Georgia, earned this nickname during his Hall of Fame career.",
    category: "players",
  },
  {
    id: 123,
    question: "What year did MLB hold its first All-Star Game?",
    options: ["1927", "1933", "1939", "1947"],
    correctAnswer: 1,
    explanation:
      "The first All-Star Game was played at Comiskey Park in Chicago in 1933.",
    category: "history",
  },
  {
    id: 124,
    question: "What does 'LOB' stand for in baseball?",
    options: [
      "Left On Base",
      "Loss Of Batting",
      "Line Out Bounce",
      "Last Out By",
    ],
    correctAnswer: 0,
    explanation:
      "LOB measures the number of baserunners left stranded when an inning ends.",
    category: "rules",
  },
  {
    id: 125,
    question: "Who has the highest career batting average?",
    options: ["Ty Cobb", "Rogers Hornsby", "Joe Jackson", "Ted Williams"],
    correctAnswer: 0,
    explanation:
      "Ty Cobb's career batting average of .366 is the highest in MLB history.",
    category: "records",
  },
  {
    id: 126,
    question: "Which team has the longest championship drought in MLB?",
    options: [
      "Cleveland Guardians",
      "Seattle Mariners",
      "Texas Rangers",
      "Milwaukee Brewers",
    ],
    correctAnswer: 1,
    explanation:
      "The Seattle Mariners have never won a World Series since their founding in 1977.",
    category: "teams",
  },
  {
    id: 127,
    question: "Who was nicknamed 'The Wizard of Oz'?",
    options: ["Omar Vizquel", "Ozzie Smith", "Ozzie Guillen", "Ozzie Albies"],
    correctAnswer: 1,
    explanation:
      "Ozzie Smith earned this nickname for his incredible defensive plays at shortstop.",
    category: "players",
  },
  {
    id: 128,
    question:
      "What year did Roger Maris break Babe Ruth's single-season home run record?",
    options: ["1957", "1961", "1965", "1969"],
    correctAnswer: 1,
    explanation:
      "Roger Maris hit 61 home runs in 1961, breaking Ruth's record of 60 set in 1927.",
    category: "history",
  },
  {
    id: 129,
    question: "What is a 'rubber game' in baseball?",
    options: [
      "A rain-delayed game",
      "The deciding game of a three-game series",
      "A game played on artificial turf",
      "A Spring Training game",
    ],
    correctAnswer: 1,
    explanation:
      "A rubber game is the third game of a series when the teams have split the first two games.",
    category: "rules",
  },
  {
    id: 130,
    question: "Who holds the record for most stolen bases in a single season?",
    options: ["Lou Brock", "Rickey Henderson", "Vince Coleman", "Tim Raines"],
    correctAnswer: 1,
    explanation:
      "Rickey Henderson stole 130 bases in 1982, the single-season record.",
    category: "records",
  },
  {
    id: 131,
    question: "Which stadium is known as 'The Friendly Confines'?",
    options: [
      "Fenway Park",
      "Wrigley Field",
      "Yankee Stadium",
      "Dodger Stadium",
    ],
    correctAnswer: 1,
    explanation:
      "Wrigley Field earned this nickname, popularized by Cubs player and broadcaster Ernie Banks.",
    category: "teams",
  },
  {
    id: 132,
    question: "Who was nicknamed 'Charlie Hustle'?",
    options: [
      "Pete Rose",
      "Charlie Gehringer",
      "Charlie Hough",
      "Chuck Knoblauch",
    ],
    correctAnswer: 0,
    explanation:
      "Pete Rose earned this nickname for his aggressive, all-out style of play.",
    category: "players",
  },
  {
    id: 133,
    question: "What year was the first night game played in MLB?",
    options: ["1930", "1935", "1940", "1945"],
    correctAnswer: 1,
    explanation:
      "The first night game was played on May 24, 1935, at Crosley Field in Cincinnati.",
    category: "history",
  },
  {
    id: 134,
    question: "What is 'ISO' in baseball statistics?",
    options: [
      "Inside Strike Outs",
      "Isolated Power",
      "Initial Strike Offset",
      "Infield Single Opportunities",
    ],
    correctAnswer: 1,
    explanation:
      "Isolated Power (ISO) measures a hitter's raw power by subtracting batting average from slugging percentage.",
    category: "rules",
  },
  {
    id: 135,
    question: "Who pitched the most innings in MLB history?",
    options: ["Cy Young", "Walter Johnson", "Phil Niekro", "Nolan Ryan"],
    correctAnswer: 0,
    explanation: "Cy Young pitched 7,356 innings during his 22-year career.",
    category: "records",
  },
  {
    id: 136,
    question: "Which team plays at Guaranteed Rate Field?",
    options: [
      "Chicago Cubs",
      "Chicago White Sox",
      "Milwaukee Brewers",
      "St. Louis Cardinals",
    ],
    correctAnswer: 1,
    explanation:
      "The Chicago White Sox have played at this stadium (formerly U.S. Cellular Field) since 1991.",
    category: "teams",
  },
  {
    id: 137,
    question: "Who was known as 'Big Papi'?",
    options: [
      "Albert Pujols",
      "David Ortiz",
      "Manny Ramirez",
      "Vladimir Guerrero",
    ],
    correctAnswer: 1,
    explanation:
      "David Ortiz was affectionately called 'Big Papi' during his career with the Red Sox.",
    category: "players",
  },
  {
    id: 138,
    question:
      "What year did Hank Aaron break Babe Ruth's career home run record?",
    options: ["1972", "1974", "1976", "1978"],
    correctAnswer: 1,
    explanation:
      "Hank Aaron hit his 715th home run on April 8, 1974, surpassing Ruth's record.",
    category: "history",
  },
  {
    id: 139,
    question: "What is a 'meatball' in baseball slang?",
    options: [
      "A home run",
      "An easy-to-hit pitch",
      "A bad call",
      "A fielding error",
    ],
    correctAnswer: 1,
    explanation:
      "A meatball is a pitch right down the middle of the plate that's easy to hit.",
    category: "rules",
  },
  {
    id: 140,
    question: "Who has the most career hits in MLB history?",
    options: ["Ty Cobb", "Hank Aaron", "Pete Rose", "Stan Musial"],
    correctAnswer: 2,
    explanation: "Pete Rose collected 4,256 hits during his 24-year career.",
    category: "records",
  },
  {
    id: 141,
    question: "Which team won the first World Series of the 2000s?",
    options: [
      "New York Yankees",
      "Arizona Diamondbacks",
      "New York Mets",
      "Atlanta Braves",
    ],
    correctAnswer: 0,
    explanation:
      "The New York Yankees won the 2000 World Series, their third consecutive championship.",
    category: "teams",
  },
  {
    id: 142,
    question: "Who was nicknamed 'The Bambino'?",
    options: ["Lou Gehrig", "Babe Ruth", "Ty Cobb", "Walter Johnson"],
    correctAnswer: 1,
    explanation:
      "Babe Ruth's most famous nickname was 'The Bambino', Italian for 'the baby'.",
    category: "players",
  },
  {
    id: 143,
    question:
      "What year did the Montreal Expos relocate to become the Washington Nationals?",
    options: ["2002", "2004", "2005", "2007"],
    correctAnswer: 2,
    explanation:
      "The Expos moved to Washington D.C. and became the Nationals for the 2005 season.",
    category: "history",
  },
  {
    id: 144,
    question: "What is 'launch angle' in baseball analytics?",
    options: [
      "The speed of a pitch",
      "The vertical angle at which a ball leaves the bat",
      "The trajectory of a throw",
      "The arc of a fly ball",
    ],
    correctAnswer: 1,
    explanation:
      "Launch angle measures the vertical angle at which the ball leaves a player's bat after contact.",
    category: "rules",
  },
  {
    id: 145,
    question: "Who threw the most shutouts in MLB history?",
    options: [
      "Walter Johnson",
      "Cy Young",
      "Grover Alexander",
      "Christy Mathewson",
    ],
    correctAnswer: 0,
    explanation:
      "Walter Johnson recorded 110 shutouts during his career with the Senators.",
    category: "records",
  },
  {
    id: 146,
    question: "Which team plays at T-Mobile Park?",
    options: [
      "Seattle Mariners",
      "Oakland Athletics",
      "Los Angeles Angels",
      "San Diego Padres",
    ],
    correctAnswer: 0,
    explanation:
      "The Seattle Mariners have played at T-Mobile Park (formerly Safeco Field) since 1999.",
    category: "teams",
  },
  {
    id: 147,
    question: "Who was known as 'Shoeless Joe'?",
    options: ["Joe DiMaggio", "Joe Jackson", "Joe Morgan", "Joe Torre"],
    correctAnswer: 1,
    explanation:
      "Joe Jackson earned this nickname after reportedly playing a minor league game in his stocking feet.",
    category: "players",
  },
  {
    id: 148,
    question:
      "What year did Mark McGwire and Sammy Sosa chase the home run record?",
    options: ["1996", "1998", "2000", "2001"],
    correctAnswer: 1,
    explanation:
      "In 1998, McGwire hit 70 home runs and Sosa hit 66, both breaking Maris's record of 61.",
    category: "history",
  },
  {
    id: 149,
    question: "What is a 'wheel play' in baseball?",
    options: [
      "A hit-and-run",
      "A defensive play where all infielders charge on a bunt",
      "A double steal",
      "A pitching rotation",
    ],
    correctAnswer: 1,
    explanation:
      "The wheel play is a defensive strategy where all infielders crash toward home on a bunt attempt.",
    category: "rules",
  },
  {
    id: 150,
    question: "Who has the most career home runs by a switch hitter?",
    options: [
      "Mickey Mantle",
      "Eddie Murray",
      "Chipper Jones",
      "Bernie Williams",
    ],
    correctAnswer: 0,
    explanation:
      "Mickey Mantle hit 536 home runs as a switch hitter during his career.",
    category: "records",
  },
  {
    id: 151,
    question:
      "Which team won the 2001 World Series in a thrilling seven-game series?",
    options: [
      "New York Yankees",
      "Arizona Diamondbacks",
      "Seattle Mariners",
      "Oakland Athletics",
    ],
    correctAnswer: 1,
    explanation:
      "The Diamondbacks defeated the Yankees in Game 7 with a walk-off hit in the bottom of the 9th.",
    category: "teams",
  },
  {
    id: 152,
    question: "Who was known as 'The Big Hurt'?",
    options: ["Barry Bonds", "Ken Griffey Jr.", "Frank Thomas", "Mo Vaughn"],
    correctAnswer: 2,
    explanation:
      "Frank Thomas earned this nickname for his powerful hitting and intimidating presence with the White Sox.",
    category: "players",
  },
  {
    id: 153,
    question:
      "What year did Cal Ripken Jr. break Lou Gehrig's consecutive games record?",
    options: ["1993", "1995", "1997", "1999"],
    correctAnswer: 1,
    explanation:
      "Cal Ripken Jr. played in his 2,131st consecutive game on September 6, 1995.",
    category: "history",
  },
  {
    id: 154,
    question: "What is 'wOBA' in baseball analytics?",
    options: [
      "Wins Over Batting Average",
      "Weighted On-Base Average",
      "Walk Opportunities By At-bat",
      "Win Outcome Before Average",
    ],
    correctAnswer: 1,
    explanation:
      "wOBA is a version of on-base percentage that accounts for the different values of different hits.",
    category: "rules",
  },
  {
    id: 155,
    question:
      "Who holds the record for highest single-season on-base percentage?",
    options: ["Babe Ruth", "Ted Williams", "Barry Bonds", "Rogers Hornsby"],
    correctAnswer: 2,
    explanation:
      "Barry Bonds posted a .609 on-base percentage in 2004, the highest in MLB history.",
    category: "records",
  },
  {
    id: 156,
    question: "Which team plays at American Family Field?",
    options: [
      "Minnesota Twins",
      "Milwaukee Brewers",
      "Kansas City Royals",
      "St. Louis Cardinals",
    ],
    correctAnswer: 1,
    explanation:
      "The Milwaukee Brewers play at American Family Field (formerly Miller Park).",
    category: "teams",
  },
  {
    id: 157,
    question: "Who was nicknamed 'The Rocket'?",
    options: ["Nolan Ryan", "Randy Johnson", "Roger Clemens", "Pedro Martinez"],
    correctAnswer: 2,
    explanation:
      "Roger Clemens earned this nickname for his powerful fastball during his Hall of Fame career.",
    category: "players",
  },
  {
    id: 158,
    question: "What year did Barry Bonds hit 73 home runs?",
    options: ["1998", "2000", "2001", "2004"],
    correctAnswer: 2,
    explanation:
      "Barry Bonds broke Mark McGwire's record by hitting 73 home runs in 2001.",
    category: "history",
  },
  {
    id: 159,
    question: "What is 'exit velocity' in baseball?",
    options: [
      "The speed a pitcher releases the ball",
      "The speed the ball travels off the bat after contact",
      "The speed of a stolen base",
      "The speed of a throw from the outfield",
    ],
    correctAnswer: 1,
    explanation:
      "Exit velocity measures how fast the baseball travels off the bat after being struck.",
    category: "rules",
  },
  {
    id: 160,
    question: "Who hit four home runs in a single game most recently?",
    options: [
      "Mike Cameron",
      "Carlos Delgado",
      "Josh Hamilton",
      "J.D. Martinez",
    ],
    correctAnswer: 3,
    explanation:
      "J.D. Martinez hit four home runs in a game for Arizona against Los Angeles in 2017.",
    category: "records",
  },
  {
    id: 161,
    question:
      "Which team won the 2016 World Series, breaking a 108-year drought?",
    options: [
      "Cleveland Indians",
      "Chicago Cubs",
      "Boston Red Sox",
      "Chicago White Sox",
    ],
    correctAnswer: 1,
    explanation:
      "The Cubs won their first championship since 1908, defeating Cleveland in seven games.",
    category: "teams",
  },
  {
    id: 162,
    question: "Who was known as 'The Flying Dutchman'?",
    options: ["Honus Wagner", "Christy Mathewson", "Ty Cobb", "Walter Johnson"],
    correctAnswer: 0,
    explanation:
      "Honus Wagner, of Dutch-German ancestry, earned this nickname for his speed and excellence.",
    category: "players",
  },
  {
    id: 163,
    question:
      "What year did the designated hitter rule start in the American League?",
    options: ["1969", "1971", "1973", "1975"],
    correctAnswer: 2,
    explanation:
      "The American League adopted the designated hitter rule in 1973.",
    category: "history",
  },
  {
    id: 164,
    question: "What is a 'dinger' in baseball slang?",
    options: ["A strikeout", "A home run", "A double play", "A stolen base"],
    correctAnswer: 1,
    explanation: "'Dinger' is slang for a home run.",
    category: "rules",
  },
  {
    id: 165,
    question: "Who has the most career at-bats without a home run?",
    options: ["Bill Bergen", "Tom Oliver", "Eddie Waitkus", "Bud Harrelson"],
    correctAnswer: 0,
    explanation:
      "Bill Bergen had 3,028 at-bats without ever hitting a home run.",
    category: "records",
  },
  {
    id: 166,
    question: "Which team plays at Kauffman Stadium?",
    options: [
      "Kansas City Royals",
      "St. Louis Cardinals",
      "Minnesota Twins",
      "Colorado Rockies",
    ],
    correctAnswer: 0,
    explanation:
      "The Kansas City Royals have played at Kauffman Stadium since 1973.",
    category: "teams",
  },
  {
    id: 167,
    question: "Who was nicknamed 'The Yankee Clipper'?",
    options: ["Babe Ruth", "Lou Gehrig", "Joe DiMaggio", "Mickey Mantle"],
    correctAnswer: 2,
    explanation:
      "Joe DiMaggio earned this elegant nickname during his 13 seasons with the Yankees.",
    category: "players",
  },
  {
    id: 168,
    question:
      "What year did the Seattle Pilots move to Milwaukee to become the Brewers?",
    options: ["1968", "1970", "1972", "1974"],
    correctAnswer: 1,
    explanation:
      "The Pilots played only one season in Seattle (1969) before relocating to Milwaukee in 1970.",
    category: "history",
  },
  {
    id: 169,
    question: "What is a 'moon shot' in baseball?",
    options: [
      "A night game",
      "A very high, long home run",
      "A popup",
      "A changeup",
    ],
    correctAnswer: 1,
    explanation:
      "A moon shot is a towering, majestic home run that travels a very long distance.",
    category: "rules",
  },
  {
    id: 170,
    question: "Who has the most seasons with 200+ hits?",
    options: ["Pete Rose", "Ty Cobb", "Ichiro Suzuki", "Wade Boggs"],
    correctAnswer: 2,
    explanation:
      "Ichiro Suzuki had 10 consecutive seasons with 200+ hits from 2001-2010.",
    category: "records",
  },
  {
    id: 171,
    question: "Which team plays at Chase Field?",
    options: [
      "Arizona Diamondbacks",
      "Colorado Rockies",
      "San Diego Padres",
      "Texas Rangers",
    ],
    correctAnswer: 0,
    explanation:
      "The Arizona Diamondbacks have played at Chase Field (formerly Bank One Ballpark) since 1998.",
    category: "teams",
  },
  {
    id: 172,
    question: "Who was known as 'The Kid'?",
    options: [
      "Ken Griffey Jr.",
      "Derek Jeter",
      "Alex Rodriguez",
      "Chipper Jones",
    ],
    correctAnswer: 0,
    explanation:
      "Ken Griffey Jr. was widely known as 'The Kid' throughout his illustrious career.",
    category: "players",
  },
  {
    id: 173,
    question: "What year was the first MLB Draft held?",
    options: ["1960", "1963", "1965", "1970"],
    correctAnswer: 2,
    explanation: "The first MLB amateur draft was held on June 8, 1965.",
    category: "history",
  },
  {
    id: 174,
    question: "What is a 'frozen rope' in baseball?",
    options: [
      "A fastball",
      "A line drive hit hard and straight",
      "A double play",
      "A stolen base",
    ],
    correctAnswer: 1,
    explanation:
      "A frozen rope is a hard-hit line drive that travels in a straight line.",
    category: "rules",
  },
  {
    id: 175,
    question: "Who holds the record for most career sacrifice bunts?",
    options: ["Eddie Collins", "Ray Chapman", "Jake Daubert", "Stuffy McInnis"],
    correctAnswer: 0,
    explanation:
      "Eddie Collins had 512 sacrifice bunts during his career from 1906-1930.",
    category: "records",
  },
  {
    id: 176,
    question: "Which team won four consecutive World Series from 1936-1939?",
    options: [
      "St. Louis Cardinals",
      "New York Yankees",
      "Detroit Tigers",
      "Cincinnati Reds",
    ],
    correctAnswer: 1,
    explanation:
      "The Yankees dynasty won four straight championships from 1936-1939.",
    category: "teams",
  },
  {
    id: 177,
    question: "Who was nicknamed 'King Felix'?",
    options: ["Felix Hernandez", "Felix Millan", "Felix Pie", "Felix Fermin"],
    correctAnswer: 0,
    explanation:
      "Felix Hernandez earned this regal nickname during his dominant years with the Seattle Mariners.",
    category: "players",
  },
  {
    id: 178,
    question:
      "What year did the New York Giants and Brooklyn Dodgers move to California?",
    options: ["1955", "1957", "1960", "1962"],
    correctAnswer: 1,
    explanation:
      "Both teams moved west after the 1957 season, becoming the San Francisco Giants and Los Angeles Dodgers.",
    category: "history",
  },
  {
    id: 179,
    question: "What is a 'chin music' in baseball?",
    options: [
      "A curveball",
      "A pitch thrown high and inside near the batter's head",
      "A home run celebration",
      "Umpire chatter",
    ],
    correctAnswer: 1,
    explanation:
      "Chin music is a pitch thrown high and tight to intimidate or back off the batter.",
    category: "rules",
  },
  {
    id: 180,
    question: "Who has the most career intentional walks?",
    options: ["Babe Ruth", "Ted Williams", "Barry Bonds", "Hank Aaron"],
    correctAnswer: 2,
    explanation:
      "Barry Bonds was intentionally walked 688 times during his career.",
    category: "records",
  },
  {
    id: 181,
    question: "Which team plays at Globe Life Field?",
    options: [
      "Houston Astros",
      "Texas Rangers",
      "Kansas City Royals",
      "Arizona Diamondbacks",
    ],
    correctAnswer: 1,
    explanation: "The Texas Rangers moved to Globe Life Field in 2020.",
    category: "teams",
  },
  {
    id: 182,
    question: "Who was known as 'The Commerce Comet'?",
    options: ["Joe DiMaggio", "Mickey Mantle", "Whitey Ford", "Yogi Berra"],
    correctAnswer: 1,
    explanation:
      "Mickey Mantle was called 'The Commerce Comet' after his hometown of Commerce, Oklahoma.",
    category: "players",
  },
  {
    id: 183,
    question:
      "What year did the Houston Astros move from the National League to the American League?",
    options: ["2010", "2011", "2013", "2015"],
    correctAnswer: 2,
    explanation: "The Astros moved to the AL West division in 2013.",
    category: "history",
  },
  {
    id: 184,
    question: "What is a 'cheese' in baseball slang?",
    options: ["A curveball", "A fastball", "A home run", "An error"],
    correctAnswer: 1,
    explanation:
      "'Cheese' or 'high cheese' refers to a fastball, especially one thrown high in the strike zone.",
    category: "rules",
  },
  {
    id: 185,
    question: "Who has the most career caught stealing?",
    options: ["Rickey Henderson", "Lou Brock", "Ty Cobb", "Vince Coleman"],
    correctAnswer: 0,
    explanation:
      "Rickey Henderson was caught stealing 335 times, the most in MLB history.",
    category: "records",
  },
  {
    id: 186,
    question: "Which team plays at Minute Maid Park?",
    options: [
      "Texas Rangers",
      "Houston Astros",
      "Tampa Bay Rays",
      "Miami Marlins",
    ],
    correctAnswer: 1,
    explanation:
      "The Houston Astros have played at Minute Maid Park (formerly Enron Field) since 2000.",
    category: "teams",
  },
  {
    id: 187,
    question: "Who was known as 'Pudge'?",
    options: ["Carlton Fisk", "Ivan Rodriguez", "Both A and B", "Gary Carter"],
    correctAnswer: 2,
    explanation:
      "Both Carlton Fisk and Ivan Rodriguez were nicknamed 'Pudge' during their Hall of Fame careers.",
    category: "players",
  },
  {
    id: 188,
    question:
      "What year did the Tampa Bay Devil Rays change their name to just the Rays?",
    options: ["2005", "2006", "2008", "2010"],
    correctAnswer: 2,
    explanation:
      "The team rebranded as the Tampa Bay Rays before the 2008 season.",
    category: "history",
  },
  {
    id: 189,
    question: "What is a 'gapper' in baseball?",
    options: ["A strikeout", "A hit between outfielders", "A walk", "A bunt"],
    correctAnswer: 1,
    explanation:
      "A gapper is a ball hit into the gap between two outfielders, often resulting in extra bases.",
    category: "rules",
  },
  {
    id: 190,
    question: "Who has the highest single-season slugging percentage?",
    options: ["Babe Ruth", "Barry Bonds", "Rogers Hornsby", "Ted Williams"],
    correctAnswer: 1,
    explanation:
      "Barry Bonds slugged .863 in 2001, the highest single-season percentage ever.",
    category: "records",
  },
  {
    id: 191,
    question: "Which team plays at Truist Park?",
    options: [
      "Atlanta Braves",
      "Miami Marlins",
      "Tampa Bay Rays",
      "Washington Nationals",
    ],
    correctAnswer: 0,
    explanation:
      "The Atlanta Braves moved to Truist Park (formerly SunTrust Park) in 2017.",
    category: "teams",
  },
  {
    id: 192,
    question: "Who was nicknamed 'The Human Rain Delay'?",
    options: [
      "Mike Hargrove",
      "Steve Trachsel",
      "David Wells",
      "Nomar Garciaparra",
    ],
    correctAnswer: 0,
    explanation:
      "Mike Hargrove earned this nickname for his extensive pre-pitch routine at the plate.",
    category: "players",
  },
  {
    id: 193,
    question: "What year did the wild card playoff system begin in MLB?",
    options: ["1992", "1994", "1995", "1997"],
    correctAnswer: 2,
    explanation:
      "The wild card system was introduced for the 1995 season (though planned for 1994).",
    category: "history",
  },
  {
    id: 194,
    question: "What is 'small ball' in baseball strategy?",
    options: [
      "Using shorter players",
      "Playing in a small stadium",
      "Manufacturing runs through bunts, steals, and contact hitting",
      "Playing indoor baseball",
    ],
    correctAnswer: 2,
    explanation:
      "Small ball emphasizes bunts, stolen bases, and hitting to advance runners rather than relying on home runs.",
    category: "rules",
  },
  {
    id: 195,
    question: "Who has the most career pinch hits?",
    options: ["Lenny Harris", "Mark Sweeney", "John Vander Wal", "Matt Stairs"],
    correctAnswer: 0,
    explanation:
      "Lenny Harris collected 212 pinch hits during his 18-year career.",
    category: "records",
  },
  {
    id: 196,
    question: "Which team plays at Nationals Park?",
    options: [
      "Baltimore Orioles",
      "Philadelphia Phillies",
      "Washington Nationals",
      "Pittsburgh Pirates",
    ],
    correctAnswer: 2,
    explanation:
      "The Washington Nationals have played at Nationals Park since 2008.",
    category: "teams",
  },
  {
    id: 197,
    question: "Who was known as 'The Professor'?",
    options: ["Greg Maddux", "Tom Glavine", "John Smoltz", "Warren Spahn"],
    correctAnswer: 0,
    explanation:
      "Greg Maddux earned this nickname for his intelligence, precision, and mastery of pitching.",
    category: "players",
  },
  {
    id: 198,
    question: "What year did interleague play begin in MLB?",
    options: ["1995", "1997", "1999", "2001"],
    correctAnswer: 1,
    explanation:
      "Interleague play between the American and National Leagues began in 1997.",
    category: "history",
  },
  {
    id: 199,
    question: "What is a 'blue moon' in baseball slang?",
    options: [
      "A rare occurrence",
      "A night game",
      "A curveball",
      "A defensive shift",
    ],
    correctAnswer: 0,
    explanation:
      "'Once in a blue moon' refers to something that happens very rarely in baseball.",
    category: "rules",
  },
  {
    id: 200,
    question: "Who has the most career grand slams as a pitcher?",
    options: ["Tony Cloninger", "Wes Ferrell", "Bob Gibson", "Don Drysdale"],
    correctAnswer: 0,
    explanation:
      "Tony Cloninger hit two grand slams in a single game on July 3, 1966.",
    category: "records",
  },
  {
    id: 201,
    question: "Which team plays at Progressive Field?",
    options: [
      "Cincinnati Reds",
      "Cleveland Guardians",
      "Pittsburgh Pirates",
      "Detroit Tigers",
    ],
    correctAnswer: 1,
    explanation:
      "The Cleveland Guardians (formerly Indians) have played at Progressive Field since 1994.",
    category: "teams",
  },
  {
    id: 202,
    question: "Who was nicknamed 'The Iron Man'?",
    options: ["Cal Ripken Jr.", "Lou Gehrig", "Joe Sewell", "Steve Garvey"],
    correctAnswer: 0,
    explanation:
      "Cal Ripken Jr. was called 'The Iron Man' for his incredible durability and consecutive games streak.",
    category: "players",
  },
  {
    id: 203,
    question: "What year did the Angels win their only World Series?",
    options: ["1999", "2002", "2005", "2007"],
    correctAnswer: 1,
    explanation:
      "The Anaheim Angels won the 2002 World Series, defeating the San Francisco Giants.",
    category: "history",
  },
  {
    id: 204,
    question: "What is a 'worm burner' in baseball?",
    options: ["A fastball", "A low, hard ground ball", "A home run", "A bunt"],
    correctAnswer: 1,
    explanation:
      "A worm burner is a ground ball hit so hard and low that it seems to burn the grass.",
    category: "rules",
  },
  {
    id: 205,
    question: "Who has the most career extra-base hits?",
    options: ["Babe Ruth", "Hank Aaron", "Stan Musial", "Barry Bonds"],
    correctAnswer: 1,
    explanation:
      "Hank Aaron had 1,477 extra-base hits (doubles, triples, and home runs) in his career.",
    category: "records",
  },
  {
    id: 206,
    question: "Which team plays at Target Field?",
    options: [
      "Kansas City Royals",
      "Minnesota Twins",
      "Milwaukee Brewers",
      "Chicago White Sox",
    ],
    correctAnswer: 1,
    explanation: "The Minnesota Twins have played at Target Field since 2010.",
    category: "teams",
  },
  {
    id: 207,
    question: "Who was known as 'The Sultan of Swat'?",
    options: ["Lou Gehrig", "Babe Ruth", "Jimmie Foxx", "Hank Greenberg"],
    correctAnswer: 1,
    explanation:
      "Babe Ruth was called 'The Sultan of Swat' for his prodigious home run hitting.",
    category: "players",
  },
  {
    id: 208,
    question: "What year did the Florida Marlins win their first World Series?",
    options: ["1995", "1997", "1999", "2003"],
    correctAnswer: 1,
    explanation:
      "The Florida Marlins won the 1997 World Series in just their fifth year of existence.",
    category: "history",
  },
  {
    id: 209,
    question: "What is a 'rally cap' in baseball?",
    options: [
      "A special hat",
      "Wearing your cap inside-out or backwards to inspire a rally",
      "A type of pitch",
      "A defensive strategy",
    ],
    correctAnswer: 1,
    explanation:
      "A rally cap is a baseball cap worn in an unconventional way to inspire the team to come back.",
    category: "rules",
  },
  {
    id: 210,
    question: "Who has the most career plate appearances?",
    options: ["Pete Rose", "Hank Aaron", "Carl Yastrzemski", "Ty Cobb"],
    correctAnswer: 0,
    explanation:
      "Pete Rose had 15,890 plate appearances during his 24-year career.",
    category: "records",
  },
  {
    id: 211,
    question: "Which team plays at loanDepot park?",
    options: [
      "Tampa Bay Rays",
      "Miami Marlins",
      "Atlanta Braves",
      "Washington Nationals",
    ],
    correctAnswer: 1,
    explanation:
      "The Miami Marlins have played at loanDepot park (formerly Marlins Park) since 2012.",
    category: "teams",
  },
  {
    id: 212,
    question: "Who was nicknamed 'Hammerin' Hank'?",
    options: ["Hank Greenberg", "Hank Aaron", "Hank Bauer", "Hank Sauer"],
    correctAnswer: 1,
    explanation:
      "Hank Aaron was known as 'Hammerin' Hank' for his consistent power hitting.",
    category: "players",
  },
  {
    id: 213,
    question:
      "What year did the Kansas City Royals win their first World Series?",
    options: ["1980", "1983", "1985", "1987"],
    correctAnswer: 2,
    explanation:
      "The Kansas City Royals won the 1985 World Series, defeating the St. Louis Cardinals.",
    category: "history",
  },
  {
    id: 214,
    question: "What is a 'cookie' in baseball pitching?",
    options: [
      "A reward pitch",
      "An easy pitch to hit",
      "A curveball",
      "A called strike",
    ],
    correctAnswer: 1,
    explanation:
      "A cookie is a pitch right over the plate that's easy for the batter to hit hard.",
    category: "rules",
  },
  {
    id: 215,
    question: "Who has pitched the most seasons in MLB history?",
    options: ["Nolan Ryan", "Tommy John", "Charlie Hough", "Jamie Moyer"],
    correctAnswer: 0,
    explanation: "Nolan Ryan pitched for 27 seasons from 1966 to 1993.",
    category: "records",
  },
  {
    id: 216,
    question: "Which team plays at Angel Stadium?",
    options: [
      "Los Angeles Dodgers",
      "Los Angeles Angels",
      "San Diego Padres",
      "Oakland Athletics",
    ],
    correctAnswer: 1,
    explanation:
      "The Los Angeles Angels have played at Angel Stadium (in Anaheim) since 1966.",
    category: "teams",
  },
  {
    id: 217,
    question: "Who was known as 'The Ryan Express'?",
    options: ["Ryan Howard", "Ryan Braun", "Nolan Ryan", "Ryan Sandberg"],
    correctAnswer: 2,
    explanation:
      "Nolan Ryan was called 'The Ryan Express' for his blazing fastball.",
    category: "players",
  },
  {
    id: 218,
    question: "What year did the Miracle Mets win the World Series?",
    options: ["1967", "1969", "1971", "1973"],
    correctAnswer: 1,
    explanation:
      "The New York Mets won their first championship in 1969, shocking the baseball world.",
    category: "history",
  },
  {
    id: 219,
    question: "What is a 'comebacker' in baseball?",
    options: [
      "A comeback win",
      "A ball hit directly back to the pitcher",
      "A stolen base",
      "A pinch hitter",
    ],
    correctAnswer: 1,
    explanation:
      "A comebacker is a batted ball hit sharply right back at the pitcher.",
    category: "rules",
  },
  {
    id: 220,
    question: "Who has the most career sacrifice flies?",
    options: [
      "Eddie Murray",
      "Cal Ripken Jr.",
      "Rafael Palmeiro",
      "Robin Yount",
    ],
    correctAnswer: 0,
    explanation:
      "Eddie Murray had 128 sacrifice flies during his Hall of Fame career.",
    category: "records",
  },
  {
    id: 221,
    question: "Which team plays at Tropicana Field?",
    options: [
      "Miami Marlins",
      "Tampa Bay Rays",
      "Atlanta Braves",
      "Texas Rangers",
    ],
    correctAnswer: 1,
    explanation:
      "The Tampa Bay Rays have played at Tropicana Field since their founding in 1998.",
    category: "teams",
  },
  {
    id: 222,
    question: "Who was nicknamed 'The Vacuum Cleaner'?",
    options: ["Brooks Robinson", "Ozzie Smith", "Omar Vizquel", "Rey Ordonez"],
    correctAnswer: 0,
    explanation:
      "Brooks Robinson earned this nickname for his ability to field everything hit near him at third base.",
    category: "players",
  },
  {
    id: 223,
    question:
      "What year did the Oakland Athletics complete their three-peat World Series wins?",
    options: ["1972", "1973", "1974", "1975"],
    correctAnswer: 2,
    explanation: "The A's won three consecutive World Series from 1972-1974.",
    category: "history",
  },
  {
    id: 224,
    question: "What is a 'ducks on the pond' in baseball?",
    options: ["A rain delay", "Runners on base", "A slow game", "An error"],
    correctAnswer: 1,
    explanation:
      "'Ducks on the pond' is slang for having baserunners, representing scoring opportunities.",
    category: "rules",
  },
  {
    id: 225,
    question: "Who has the most career leadoff home runs?",
    options: [
      "Rickey Henderson",
      "Brady Anderson",
      "Alfonso Soriano",
      "Craig Biggio",
    ],
    correctAnswer: 0,
    explanation: "Rickey Henderson hit 81 leadoff home runs during his career.",
    category: "records",
  },
  {
    id: 226,
    question: "Which team plays at PNC Park?",
    options: [
      "Philadelphia Phillies",
      "Pittsburgh Pirates",
      "Cincinnati Reds",
      "Milwaukee Brewers",
    ],
    correctAnswer: 1,
    explanation: "The Pittsburgh Pirates have played at PNC Park since 2001.",
    category: "teams",
  },
  {
    id: 227,
    question: "Who was known as 'The Great Bambino'?",
    options: ["Lou Gehrig", "Babe Ruth", "Ty Cobb", "Rogers Hornsby"],
    correctAnswer: 1,
    explanation:
      "'The Great Bambino' was another nickname for the legendary Babe Ruth.",
    category: "players",
  },
  {
    id: 228,
    question: "What year did the World Series go to a best-of-seven format?",
    options: ["1900", "1905", "1919", "1922"],
    correctAnswer: 3,
    explanation:
      "The World Series became a best-of-seven series starting in 1922.",
    category: "history",
  },
  {
    id: 229,
    question: "What is a 'seeing-eye single' in baseball?",
    options: [
      "A home run",
      "A weak ground ball that finds a hole",
      "A stolen base",
      "A strikeout",
    ],
    correctAnswer: 1,
    explanation:
      "A seeing-eye single is a weak ground ball that somehow finds its way through the infield for a hit.",
    category: "rules",
  },
  {
    id: 230,
    question: "Who has the most career total bases?",
    options: ["Hank Aaron", "Stan Musial", "Willie Mays", "Barry Bonds"],
    correctAnswer: 0,
    explanation:
      "Hank Aaron accumulated 6,856 total bases during his 23-year career.",
    category: "records",
  },
  {
    id: 231,
    question: "Which team plays at Busch Stadium?",
    options: [
      "Kansas City Royals",
      "Cincinnati Reds",
      "St. Louis Cardinals",
      "Milwaukee Brewers",
    ],
    correctAnswer: 2,
    explanation:
      "The St. Louis Cardinals have played at the current Busch Stadium since 2006.",
    category: "teams",
  },
  {
    id: 232,
    question: "Who was nicknamed 'The Man of Steal'?",
    options: ["Lou Brock", "Rickey Henderson", "Vince Coleman", "Tim Raines"],
    correctAnswer: 1,
    explanation:
      "Rickey Henderson, the all-time stolen base leader, was known as 'The Man of Steal'.",
    category: "players",
  },
  {
    id: 233,
    question: "What year did the New York Mets win their second World Series?",
    options: ["1983", "1984", "1986", "1988"],
    correctAnswer: 2,
    explanation:
      "The Mets won their second championship in 1986, defeating the Boston Red Sox.",
    category: "history",
  },
  {
    id: 234,
    question: "What is a 'can of corn' referring to?",
    options: ["An easy fly ball", "A home run", "A stolen base", "A strikeout"],
    correctAnswer: 0,
    explanation:
      "An easy fly ball is called a 'can of corn' because it falls softly into the fielder's glove.",
    category: "rules",
  },
  {
    id: 235,
    question: "Who has the most career inside-the-park home runs?",
    options: ["Ty Cobb", "Sam Crawford", "Jesse Burkett", "Honus Wagner"],
    correctAnswer: 1,
    explanation:
      "Sam Crawford hit 51 inside-the-park home runs during his career.",
    category: "records",
  },
  {
    id: 236,
    question: "Which team plays at Great American Ball Park?",
    options: [
      "Pittsburgh Pirates",
      "Cincinnati Reds",
      "St. Louis Cardinals",
      "Cleveland Guardians",
    ],
    correctAnswer: 1,
    explanation:
      "The Cincinnati Reds have played at Great American Ball Park since 2003.",
    category: "teams",
  },
  {
    id: 237,
    question: "Who was known as 'The Capital Punisher'?",
    options: ["Frank Howard", "Harmon Killebrew", "Jim Thome", "Adam Dunn"],
    correctAnswer: 0,
    explanation:
      "Frank Howard, who played for the Washington Senators, was called 'The Capital Punisher'.",
    category: "players",
  },
  {
    id: 238,
    question:
      "What year did the Pittsburgh Pirates win their last World Series?",
    options: ["1971", "1979", "1981", "1992"],
    correctAnswer: 1,
    explanation:
      "The Pirates won the 1979 World Series, led by Willie Stargell.",
    category: "history",
  },
  {
    id: 239,
    question: "What is 'launch angle' optimized for?",
    options: ["Home runs", "Ground balls", "Line drives", "Strikeouts"],
    correctAnswer: 0,
    explanation:
      "Players often try to optimize launch angle (25-30 degrees) to hit more home runs.",
    category: "rules",
  },
  {
    id: 240,
    question: "Who has the most career hit by pitches?",
    options: ["Don Baylor", "Craig Biggio", "Ron Hunt", "Jason Kendall"],
    correctAnswer: 1,
    explanation: "Craig Biggio was hit by pitches 285 times during his career.",
    category: "records",
  },
  {
    id: 241,
    question: "Which team plays at Citi Field?",
    options: [
      "New York Yankees",
      "New York Mets",
      "Philadelphia Phillies",
      "Boston Red Sox",
    ],
    correctAnswer: 1,
    explanation: "The New York Mets have played at Citi Field since 2009.",
    category: "teams",
  },
  {
    id: 242,
    question: "Who was nicknamed 'The Mick'?",
    options: [
      "Mike Schmidt",
      "Mickey Mantle",
      "Mike Piazza",
      "Mickey Cochrane",
    ],
    correctAnswer: 1,
    explanation:
      "Mickey Mantle was commonly called 'The Mick' during his legendary Yankee career.",
    category: "players",
  },
  {
    id: 243,
    question:
      "What year did the Cincinnati Reds complete their back-to-back championships?",
    options: ["1974", "1975", "1976", "1977"],
    correctAnswer: 2,
    explanation:
      "The Big Red Machine won consecutive World Series in 1975 and 1976.",
    category: "history",
  },
  {
    id: 244,
    question: "What is a 'can of corn' pitch?",
    options: [
      "An easy pitch",
      "A fastball",
      "A curveball",
      "There is no such pitch",
    ],
    correctAnswer: 3,
    explanation: "'Can of corn' refers only to an easy fly ball, not a pitch.",
    category: "rules",
  },
  {
    id: 245,
    question: "Who has the most career grounded into double plays?",
    options: [
      "Cal Ripken Jr.",
      "Hank Aaron",
      "Albert Pujols",
      "Carl Yastrzemski",
    ],
    correctAnswer: 2,
    explanation:
      "Albert Pujols grounded into 426 double plays during his career, the most in MLB history.",
    category: "records",
  },
  {
    id: 246,
    question: "Which team plays at Comerica Park?",
    options: [
      "Cleveland Guardians",
      "Detroit Tigers",
      "Chicago White Sox",
      "Kansas City Royals",
    ],
    correctAnswer: 1,
    explanation: "The Detroit Tigers have played at Comerica Park since 2000.",
    category: "teams",
  },
  {
    id: 247,
    question: "Who was known as 'Hammering Hank'?",
    options: ["Hank Greenberg", "Hank Aaron", "Hank Blalock", "Hank Majeski"],
    correctAnswer: 0,
    explanation:
      "Hank Greenberg was known as 'Hammering Hank' before Aaron used 'Hammerin' Hank'.",
    category: "players",
  },
  {
    id: 248,
    question: "What year did the Minnesota Twins win their first World Series?",
    options: ["1987", "1989", "1991", "1993"],
    correctAnswer: 0,
    explanation: "The Minnesota Twins won their first championship in 1987.",
    category: "history",
  },
  {
    id: 249,
    question: "What is a 'twin killing' referring to?",
    options: ["Two home runs", "A double play", "Two strikeouts", "Two errors"],
    correctAnswer: 1,
    explanation: "A twin killing is another term for a double play.",
    category: "rules",
  },
  {
    id: 250,
    question: "Who has the most career home runs by a third baseman?",
    options: [
      "Mike Schmidt",
      "Eddie Mathews",
      "Chipper Jones",
      "Adrian Beltre",
    ],
    correctAnswer: 0,
    explanation:
      "Mike Schmidt hit 548 home runs, the most by a third baseman in MLB history.",
    category: "records",
  },
  {
    id: 251,
    question: "Which team plays at Citizens Bank Park?",
    options: [
      "Pittsburgh Pirates",
      "Philadelphia Phillies",
      "Washington Nationals",
      "Baltimore Orioles",
    ],
    correctAnswer: 1,
    explanation:
      "The Philadelphia Phillies have played at Citizens Bank Park since 2004.",
    category: "teams",
  },
  {
    id: 252,
    question: "Who was nicknamed 'The Big Cat'?",
    options: [
      "Andres Galarraga",
      "Johnny Mize",
      "Both A and B",
      "Cecil Fielder",
    ],
    correctAnswer: 2,
    explanation:
      "Both Andres Galarraga and Johnny Mize were nicknamed 'The Big Cat'.",
    category: "players",
  },
  {
    id: 253,
    question:
      "What year did the Los Angeles Dodgers win their last World Series?",
    options: ["2018", "2019", "2020", "2021"],
    correctAnswer: 2,
    explanation:
      "The Dodgers won the 2020 World Series, ending a 32-year drought.",
    category: "history",
  },
  {
    id: 254,
    question: "What is a 'swan song' in baseball?",
    options: [
      "A celebration",
      "A player's final game or season",
      "A perfect game",
      "A no-hitter",
    ],
    correctAnswer: 1,
    explanation:
      "A swan song refers to a player's final performance before retirement.",
    category: "rules",
  },
  {
    id: 255,
    question: "Who has the most career home runs by a shortstop?",
    options: ["Cal Ripken Jr.", "Alex Rodriguez", "Ernie Banks", "Derek Jeter"],
    correctAnswer: 1,
    explanation:
      "Alex Rodriguez hit 351 home runs as a shortstop before moving to third base.",
    category: "records",
  },
  {
    id: 256,
    question: "Which team plays at RingCentral Coliseum?",
    options: [
      "San Francisco Giants",
      "Oakland Athletics",
      "San Diego Padres",
      "Los Angeles Angels",
    ],
    correctAnswer: 1,
    explanation:
      "The Oakland Athletics play at RingCentral Coliseum (formerly Oakland Coliseum).",
    category: "teams",
  },
  {
    id: 257,
    question: "Who was known as 'The Mad Hungarian'?",
    options: ["Al Hrabosky", "Mike Nagy", "Moe Drabowsky", "Charlie Leibrandt"],
    correctAnswer: 0,
    explanation:
      "Reliever Al Hrabosky was called 'The Mad Hungarian' for his intense mound presence.",
    category: "players",
  },
  {
    id: 258,
    question:
      "What year did the Philadelphia Phillies win their first World Series?",
    options: ["1977", "1980", "1983", "1993"],
    correctAnswer: 1,
    explanation:
      "The Phillies won their first championship in 1980, defeating the Kansas City Royals.",
    category: "history",
  },
  {
    id: 259,
    question: "What is a 'tweener' in baseball?",
    options: [
      "A player who plays multiple positions",
      "A ball hit between fielders",
      "A middle reliever",
      "A utility player",
    ],
    correctAnswer: 1,
    explanation:
      "A tweener is a ball hit between two fielders that drops for a hit.",
    category: "rules",
  },
  {
    id: 260,
    question: "Who has the most career pitching wins in the postseason?",
    options: [
      "Andy Pettitte",
      "John Smoltz",
      "Mariano Rivera",
      "Randy Johnson",
    ],
    correctAnswer: 0,
    explanation: "Andy Pettitte won 19 postseason games during his career.",
    category: "records",
  },
  {
    id: 261,
    question: "Which team plays at Coors Field?",
    options: [
      "Arizona Diamondbacks",
      "Colorado Rockies",
      "San Diego Padres",
      "Texas Rangers",
    ],
    correctAnswer: 1,
    explanation: "The Colorado Rockies have played at Coors Field since 1995.",
    category: "teams",
  },
  {
    id: 262,
    question: "Who was nicknamed 'Donnie Baseball'?",
    options: ["Don Mattingly", "Don Baylor", "Don Drysdale", "Don Sutton"],
    correctAnswer: 0,
    explanation:
      "Don Mattingly was affectionately called 'Donnie Baseball' during his Yankees career.",
    category: "players",
  },
  {
    id: 263,
    question: "What year did the Houston Astros win their first World Series?",
    options: ["2015", "2017", "2019", "2021"],
    correctAnswer: 1,
    explanation:
      "The Astros won their first championship in 2017, though it was later tainted by scandal.",
    category: "history",
  },
  {
    id: 264,
    question: "What is a 'crooked number' in baseball?",
    options: [
      "An error",
      "A score of 2 or more runs in an inning",
      "An odd number of players",
      "A pitcher's number",
    ],
    correctAnswer: 1,
    explanation:
      "A crooked number refers to scoring 2 or more runs in an inning (any number but 0 or 1).",
    category: "rules",
  },
  {
    id: 265,
    question: "Who has the most career postseason strikeouts?",
    options: [
      "Randy Johnson",
      "John Smoltz",
      "Justin Verlander",
      "Pedro Martinez",
    ],
    correctAnswer: 2,
    explanation:
      "Justin Verlander has struck out 219 batters in postseason play.",
    category: "records",
  },
  {
    id: 266,
    question: "Which team plays at Dodger Stadium?",
    options: [
      "Los Angeles Angels",
      "Los Angeles Dodgers",
      "San Diego Padres",
      "San Francisco Giants",
    ],
    correctAnswer: 1,
    explanation:
      "The Los Angeles Dodgers have played at Dodger Stadium since 1962.",
    category: "teams",
  },
  {
    id: 267,
    question: "Who was known as 'Señor Octubre' (Mr. October)?",
    options: [
      "Carlos Beltran",
      "Mariano Rivera",
      "David Ortiz",
      "Reggie Jackson",
    ],
    correctAnswer: 2,
    explanation:
      "David Ortiz earned this nickname for his clutch postseason hitting with the Red Sox.",
    category: "players",
  },
  {
    id: 268,
    question: "What year did the Arizona Diamondbacks and Tampa Bay Devil Rays join MLB?",
    options: ["1993", "1995", "1998", "2000"],
    correctAnswer: 2,
    explanation:
      "The Arizona Diamondbacks and Tampa Bay Devil Rays joined MLB in 1998 as expansion teams.",
    category: "history",
  },
  {
    id: 269,
    question: "What is a 'backdoor breaking ball'?",
    options: [
      "A fastball",
      "A breaking pitch that starts outside and curves back over the plate",
      "A changeup",
      "A wild pitch",
    ],
    correctAnswer: 1,
    explanation:
      "A backdoor breaking ball appears to be outside but curves back to catch the corner for a strike.",
    category: "rules",
  },
  {
    id: 270,
    question: "Who has the most career postseason home runs?",
    options: [
      "Derek Jeter",
      "Bernie Williams",
      "Manny Ramirez",
      "Albert Pujols",
    ],
    correctAnswer: 2,
    explanation: "Manny Ramirez hit 29 postseason home runs during his career.",
    category: "records",
  },
  {
    id: 271,
    question: "Which team originally played as the Seattle Pilots?",
    options: [
      "Seattle Mariners",
      "Milwaukee Brewers",
      "Texas Rangers",
      "Houston Astros",
    ],
    correctAnswer: 1,
    explanation:
      "The Seattle Pilots moved to Milwaukee after one season and became the Brewers.",
    category: "teams",
  },
  {
    id: 272,
    question: "Who was nicknamed 'Yogi'?",
    options: ["Lawrence Berra", "Gary Carter", "Johnny Bench", "Carlton Fisk"],
    correctAnswer: 0,
    explanation:
      "Lawrence 'Yogi' Berra got his nickname from a childhood friend who said he looked like a yogi.",
    category: "players",
  },
  {
    id: 273,
    question:
      "What year did the Washington Nationals win their first World Series?",
    options: ["2016", "2017", "2019", "2021"],
    correctAnswer: 2,
    explanation:
      "The Nationals won their first championship in 2019, defeating the Houston Astros.",
    category: "history",
  },
  {
    id: 274,
    question: "What is a 'five-tool player'?",
    options: [
      "A utility player",
      "A player who excels at hitting for average, power, running, fielding, and throwing",
      "A switch hitter",
      "A player with five positions",
    ],
    correctAnswer: 1,
    explanation:
      "A five-tool player excels in all five key skills: hitting for average and power, speed, fielding, and arm strength.",
    category: "rules",
  },
  {
    id: 275,
    question: "Who has the most career postseason RBIs?",
    options: ["Derek Jeter", "Bernie Williams", "Manny Ramirez", "David Ortiz"],
    correctAnswer: 2,
    explanation: "Manny Ramirez drove in 78 runs in postseason play.",
    category: "records",
  },
  {
    id: 276,
    question:
      "Which team was known as the Colt .45s before changing their name?",
    options: [
      "Texas Rangers",
      "Houston Astros",
      "Kansas City Royals",
      "Seattle Mariners",
    ],
    correctAnswer: 1,
    explanation:
      "The Houston Colt .45s became the Astros in 1965 when they moved to the Astrodome.",
    category: "teams",
  },
  {
    id: 277,
    question: "Who was known as 'The Eck'?",
    options: [
      "Dennis Eckersley",
      "Dave Eckstein",
      "Dwight Evans",
      "Darrell Evans",
    ],
    correctAnswer: 0,
    explanation:
      "Dennis Eckersley, the Hall of Fame closer, was nicknamed 'The Eck'.",
    category: "players",
  },
  {
    id: 278,
    question:
      "What year did the Atlanta Braves win their only World Series in Atlanta?",
    options: ["1991", "1992", "1995", "1999"],
    correctAnswer: 2,
    explanation:
      "The Braves won the 1995 World Series despite reaching the Fall Classic five times in the 1990s.",
    category: "history",
  },
  {
    id: 279,
    question: "What is a 'four-bagger'?",
    options: ["Four runs", "A home run", "Four hits", "Four errors"],
    correctAnswer: 1,
    explanation:
      "A four-bagger is slang for a home run (touching all four bases).",
    category: "rules",
  },
  {
    id: 280,
    question: "Who has the most career sacrifice hits (bunts)?",
    options: [
      "Eddie Collins",
      "Willie Keeler",
      "Stuffy McInnis",
      "Jake Daubert",
    ],
    correctAnswer: 0,
    explanation:
      "Eddie Collins had 512 career sacrifice hits during his Hall of Fame career.",
    category: "records",
  },
  {
    id: 281,
    question: "Which team was originally called the Washington Senators?",
    options: [
      "Washington Nationals",
      "Texas Rangers",
      "Minnesota Twins",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All three teams have roots as the Washington Senators at different times.",
    category: "teams",
  },
  {
    id: 282,
    question: "Who was nicknamed 'The Big Hurt'?",
    options: ["Frank Thomas", "Jim Thome", "David Ortiz", "Albert Pujols"],
    correctAnswer: 0,
    explanation:
      "Frank Thomas was called 'The Big Hurt' for the damage he did to opposing pitchers.",
    category: "players",
  },
  {
    id: 283,
    question: "What year did the wild card game become a one-game playoff?",
    options: ["2010", "2012", "2014", "2016"],
    correctAnswer: 1,
    explanation: "MLB added a one-game wild card playoff starting in 2012.",
    category: "history",
  },
  {
    id: 284,
    question: "What is a 'rope' in baseball slang?",
    options: [
      "A stolen base",
      "A hard line drive",
      "A curveball",
      "A double play",
    ],
    correctAnswer: 1,
    explanation:
      "A rope is a hard-hit line drive that travels in a straight line.",
    category: "rules",
  },
  {
    id: 285,
    question: "Who has the most career cycles?",
    options: ["Tris Speaker", "John Reilly", "Babe Herman", "Adrian Beltre"],
    correctAnswer: 1,
    explanation: "John Reilly hit for the cycle three times in the 1880s.",
    category: "records",
  },
  {
    id: 286,
    question: "Which team originally played in Brooklyn before moving?",
    options: [
      "New York Mets",
      "Los Angeles Dodgers",
      "San Francisco Giants",
      "Philadelphia Phillies",
    ],
    correctAnswer: 1,
    explanation:
      "The Brooklyn Dodgers moved to Los Angeles after the 1957 season.",
    category: "teams",
  },
  {
    id: 287,
    question: "Who was known as 'Crime Dog'?",
    options: ["Fred McGriff", "Mark McGwire", "Will Clark", "Rafael Palmeiro"],
    correctAnswer: 0,
    explanation:
      "Fred McGriff earned this nickname from a 1980s cartoon character 'McGruff the Crime Dog'.",
    category: "players",
  },
  {
    id: 288,
    question:
      "What year did the Cleveland Indians change their name to the Guardians?",
    options: ["2019", "2020", "2021", "2022"],
    correctAnswer: 3,
    explanation:
      "The team changed its name to the Cleveland Guardians before the 2022 season.",
    category: "history",
  },
  {
    id: 289,
    question: "What is 'hard contact' percentage?",
    options: [
      "Percentage of balls hit over 95 mph",
      "Percentage of home runs",
      "Percentage of line drives",
      "Percentage of extra-base hits",
    ],
    correctAnswer: 0,
    explanation:
      "Hard contact percentage measures the rate of batted balls with exit velocity of 95+ mph.",
    category: "rules",
  },
  {
    id: 290,
    question: "Who has the most career unassisted triple plays?",
    options: [
      "Multiple players are tied with 1",
      "Neal Ball",
      "Bill Wambsganss",
      "Ron Hansen",
    ],
    correctAnswer: 0,
    explanation:
      "No player has more than one unassisted triple play; they are extremely rare.",
    category: "records",
  },
  {
    id: 291,
    question:
      "Which team originally played in New York before moving to San Francisco?",
    options: [
      "New York Yankees",
      "New York Mets",
      "San Francisco Giants",
      "Oakland Athletics",
    ],
    correctAnswer: 2,
    explanation:
      "The New York Giants moved to San Francisco after the 1957 season.",
    category: "teams",
  },
  {
    id: 292,
    question: "Who was nicknamed 'The Chairman of the Board'?",
    options: ["Whitey Ford", "Bob Gibson", "Tom Seaver", "Don Drysdale"],
    correctAnswer: 0,
    explanation:
      "Whitey Ford was called 'The Chairman of the Board' for his leadership and excellence.",
    category: "players",
  },
  {
    id: 293,
    question:
      "What year did MLB implement expanded playoffs with three divisions per league?",
    options: ["1993", "1994", "1995", "1996"],
    correctAnswer: 1,
    explanation:
      "MLB restructured into three divisions per league in 1994, though the playoffs began in 1995.",
    category: "history",
  },
  {
    id: 294,
    question: "What is a 'pepper' game in baseball?",
    options: [
      "A practice drill with rapid hitting and fielding",
      "A type of pitch",
      "A defensive alignment",
      "A base-running drill",
    ],
    correctAnswer: 0,
    explanation:
      "Pepper is a pregame exercise where one player hits short, quick grounders to fielders standing close by.",
    category: "rules",
  },
  {
    id: 295,
    question: "Who has the most career pinch-hit home runs?",
    options: [
      "Cliff Johnson",
      "Matt Stairs",
      "John Vander Wal",
      "Lenny Harris",
    ],
    correctAnswer: 1,
    explanation: "Matt Stairs hit 23 pinch-hit home runs during his career.",
    category: "records",
  },
  {
    id: 296,
    question: "Which team was originally the Boston Braves?",
    options: [
      "Boston Red Sox",
      "Atlanta Braves",
      "Milwaukee Brewers",
      "Chicago Cubs",
    ],
    correctAnswer: 1,
    explanation:
      "The Boston Braves moved to Milwaukee in 1953, then to Atlanta in 1966.",
    category: "teams",
  },
  {
    id: 297,
    question: "Who was known as 'The Franchise'?",
    options: ["Tom Seaver", "Nolan Ryan", "Steve Carlton", "Bob Gibson"],
    correctAnswer: 0,
    explanation:
      "Tom Seaver was called 'The Franchise' for being the cornerstone of the Mets organization.",
    category: "players",
  },
  {
    id: 298,
    question:
      "What year did the American League adopt the designated hitter in the World Series?",
    options: ["1973", "1976", "1986", "It alternates by year"],
    correctAnswer: 3,
    explanation:
      "The DH has been used in World Series games at AL parks; it varied until 2022 when it became universal.",
    category: "history",
  },
  {
    id: 299,
    question: "What is a 'Baltimore chop' named after?",
    options: [
      "A player",
      "The Baltimore Orioles",
      "The style of play in 1890s Baltimore",
      "A stadium",
    ],
    correctAnswer: 2,
    explanation:
      "The Baltimore chop was named after the hitting style popularized by the 1890s Baltimore Orioles.",
    category: "rules",
  },
  {
    id: 300,
    question: "Who has the highest career slugging percentage?",
    options: ["Babe Ruth", "Ted Williams", "Lou Gehrig", "Barry Bonds"],
    correctAnswer: 0,
    explanation:
      "Babe Ruth's career slugging percentage of .690 is the highest in MLB history.",
    category: "records",
  },
  {
    id: 301,
    question: "Which team was originally the St. Louis Browns?",
    options: [
      "St. Louis Cardinals",
      "Baltimore Orioles",
      "Kansas City Royals",
      "Cleveland Guardians",
    ],
    correctAnswer: 1,
    explanation:
      "The St. Louis Browns moved to Baltimore and became the Orioles in 1954.",
    category: "teams",
  },
  {
    id: 302,
    question: "Who was nicknamed 'Slammin' Sammy'?",
    options: ["Sammy Sosa", "Samuel Ewing", "Sam Crawford", "Sam Rice"],
    correctAnswer: 0,
    explanation:
      "Sammy Sosa was called 'Slammin' Sammy' for his powerful home run hitting.",
    category: "players",
  },
  {
    id: 303,
    question: "What year was the MLB strike that cancelled the World Series?",
    options: ["1992", "1994", "1996", "1998"],
    correctAnswer: 1,
    explanation:
      "The 1994 player strike resulted in the cancellation of the World Series for the first time since 1904.",
    category: "history",
  },
  {
    id: 304,
    question: "What is a 'around the horn' double play?",
    options: [
      "1st to 2nd to 1st",
      "3rd to 2nd to 1st",
      "2nd to short to 1st",
      "Short to 2nd to 1st",
    ],
    correctAnswer: 1,
    explanation:
      "'Around the horn' refers to a 5-4-3 double play (third to second to first).",
    category: "rules",
  },
  {
    id: 305,
    question: "Who has the most career errors by a position player?",
    options: ["Herman Long", "Bill Dahlen", "Germany Smith", "Tommy Corcoran"],
    correctAnswer: 0,
    explanation:
      "Shortstop Herman Long committed 1,096 errors during his career in the 1890s-1900s.",
    category: "records",
  },
  {
    id: 306,
    question: "Which team was originally the Philadelphia Athletics?",
    options: [
      "Philadelphia Phillies",
      "Kansas City Royals",
      "Oakland Athletics",
      "Baltimore Orioles",
    ],
    correctAnswer: 2,
    explanation:
      "The Philadelphia Athletics moved to Kansas City in 1955, then to Oakland in 1968.",
    category: "teams",
  },
  {
    id: 307,
    question: "Who was known as 'The Barber'?",
    options: ["Sal Maglie", "Don Drysdale", "Bob Gibson", "Early Wynn"],
    correctAnswer: 0,
    explanation:
      "Sal Maglie was called 'The Barber' for his tendency to pitch close to batters' chins.",
    category: "players",
  },
  {
    id: 308,
    question: "What year did the All-Star Game end in a tie?",
    options: ["1999", "2002", "2005", "2008"],
    correctAnswer: 1,
    explanation:
      "The 2002 All-Star Game was declared a 7-7 tie after 11 innings when both teams ran out of pitchers.",
    category: "history",
  },
  {
    id: 309,
    question: "What is 'spin rate' in pitching?",
    options: [
      "How fast a pitcher throws",
      "The number of revolutions per minute on a pitch",
      "The pitcher's ERA",
      "The pitcher's strikeout rate",
    ],
    correctAnswer: 1,
    explanation:
      "Spin rate measures how many times per minute a baseball rotates as it travels to the plate.",
    category: "rules",
  },
  {
    id: 310,
    question: "Who has the most career putouts by an outfielder?",
    options: ["Willie Mays", "Tris Speaker", "Ty Cobb", "Max Carey"],
    correctAnswer: 1,
    explanation:
      "Tris Speaker recorded 6,794 putouts as an outfielder during his career.",
    category: "records",
  },
  {
    id: 311,
    question: "Which team was originally the Montreal Expos?",
    options: [
      "Toronto Blue Jays",
      "Washington Nationals",
      "Tampa Bay Rays",
      "Miami Marlins",
    ],
    correctAnswer: 1,
    explanation:
      "The Montreal Expos relocated to become the Washington Nationals in 2005.",
    category: "teams",
  },
  {
    id: 312,
    question: "Who was nicknamed 'Kung Fu Panda'?",
    options: [
      "Pablo Sandoval",
      "Prince Fielder",
      "C.C. Sabathia",
      "Bartolo Colon",
    ],
    correctAnswer: 0,
    explanation:
      "Pablo Sandoval earned this playful nickname for his physique and agility.",
    category: "players",
  },
  {
    id: 313,
    question:
      "What year did MLB begin testing for performance-enhancing drugs?",
    options: ["2000", "2003", "2005", "2007"],
    correctAnswer: 1,
    explanation:
      "MLB implemented its first drug-testing program with penalties in 2003.",
    category: "history",
  },
  {
    id: 314,
    question: "What is a 'chest bump' in baseball?",
    options: ["A celebration", "A collision", "A pitch", "An ejection"],
    correctAnswer: 0,
    explanation:
      "A chest bump is a celebratory gesture between teammates after a good play.",
    category: "rules",
  },
  {
    id: 315,
    question: "Who has the most career outfield assists?",
    options: ["Tris Speaker", "Ty Cobb", "Max Carey", "Roberto Clemente"],
    correctAnswer: 0,
    explanation:
      "Tris Speaker recorded 449 outfield assists during his career.",
    category: "records",
  },
  {
    id: 316,
    question: "Which team plays at the oldest active MLB stadium?",
    options: [
      "Chicago Cubs",
      "Boston Red Sox",
      "New York Yankees",
      "Detroit Tigers",
    ],
    correctAnswer: 1,
    explanation:
      "The Boston Red Sox play at Fenway Park, which opened in 1912.",
    category: "teams",
  },
  {
    id: 317,
    question: "Who was known as 'The Big Train'?",
    options: [
      "Cy Young",
      "Walter Johnson",
      "Christy Mathewson",
      "Grover Alexander",
    ],
    correctAnswer: 1,
    explanation:
      "Walter Johnson was called 'The Big Train' for his powerful fastball.",
    category: "players",
  },
  {
    id: 318,
    question: "What year did pitch clocks get introduced to MLB?",
    options: ["2020", "2021", "2022", "2023"],
    correctAnswer: 3,
    explanation:
      "MLB introduced pitch clocks for the 2023 season to speed up the pace of play.",
    category: "history",
  },
  {
    id: 319,
    question: "What is a 'passed ball'?",
    options: [
      "A wild pitch",
      "A pitch the catcher should have caught but didn't",
      "A stolen base",
      "An intentional walk",
    ],
    correctAnswer: 1,
    explanation:
      "A passed ball is charged to the catcher when they fail to catch a pitch they should have handled.",
    category: "rules",
  },
  {
    id: 320,
    question: "Who has the most career complete games in the modern era?",
    options: [
      "Walter Johnson",
      "Cy Young",
      "Warren Spahn",
      "Christy Mathewson",
    ],
    correctAnswer: 1,
    explanation:
      "Cy Young completed 749 games during his career from 1890-1911.",
    category: "records",
  },
  {
    id: 321,
    question: "Which team has won the most National League pennants?",
    options: [
      "St. Louis Cardinals",
      "Los Angeles Dodgers",
      "San Francisco Giants",
      "Atlanta Braves",
    ],
    correctAnswer: 1,
    explanation: "The Dodgers franchise has won 24 National League pennants.",
    category: "teams",
  },
  {
    id: 322,
    question: "Who was nicknamed 'Three Finger Brown'?",
    options: [
      "Mordecai Brown",
      "Rollie Fingers",
      "Bruce Sutter",
      "Goose Gossage",
    ],
    correctAnswer: 0,
    explanation:
      "Mordecai Brown lost part of two fingers in a farming accident, hence the nickname.",
    category: "players",
  },
  {
    id: 323,
    question: "What year did the universal designated hitter rule begin?",
    options: ["2020", "2021", "2022", "2023"],
    correctAnswer: 2,
    explanation:
      "The National League adopted the designated hitter rule starting in 2022.",
    category: "history",
  },
  {
    id: 324,
    question: "What is a 'charged mound visit'?",
    options: [
      "A fine for arguing",
      "A counted trip to the mound by a coach or catcher",
      "An ejection",
      "A pitching change",
    ],
    correctAnswer: 1,
    explanation:
      "Teams are limited to a certain number of mound visits per game that don't result in a pitching change.",
    category: "rules",
  },
  {
    id: 325,
    question: "Who has the most career caught stealing as a catcher?",
    options: ["Ivan Rodriguez", "Johnny Bench", "Yadier Molina", "Gary Carter"],
    correctAnswer: 0,
    explanation:
      "Ivan Rodriguez threw out 1,215 baserunners attempting to steal during his career.",
    category: "records",
  },
  {
    id: 326,
    question: "Which team has won the most American League pennants?",
    options: [
      "Boston Red Sox",
      "New York Yankees",
      "Oakland Athletics",
      "Detroit Tigers",
    ],
    correctAnswer: 1,
    explanation: "The New York Yankees have won 40 American League pennants.",
    category: "teams",
  },
  {
    id: 327,
    question: "Who was known as 'The Old Professor'?",
    options: ["Casey Stengel", "Joe Torre", "Sparky Anderson", "Earl Weaver"],
    correctAnswer: 0,
    explanation:
      "Casey Stengel was called 'The Old Professor' for his wisdom and colorful managing style.",
    category: "players",
  },
  {
    id: 328,
    question: "What year did MLB expand to 162 games per season?",
    options: ["1960", "1961", "1962", "1965"],
    correctAnswer: 1,
    explanation:
      "The American League expanded to 162 games in 1961; the National League followed in 1962.",
    category: "history",
  },
  {
    id: 329,
    question: "What is 'launch velocity'?",
    options: [
      "The speed of a pitch",
      "The speed of the ball off the bat",
      "The speed of a throw",
      "The speed of a runner",
    ],
    correctAnswer: 1,
    explanation:
      "Launch velocity is another term for exit velocity - the speed the ball leaves the bat.",
    category: "rules",
  },
  {
    id: 330,
    question: "Who has the most career one-hitters?",
    options: ["Nolan Ryan", "Bob Feller", "Cy Young", "Walter Johnson"],
    correctAnswer: 0,
    explanation: "Nolan Ryan threw 12 one-hitters during his career.",
    category: "records",
  },
  {
    id: 331,
    question: "Which team has the second-most World Series championships?",
    options: [
      "Boston Red Sox",
      "St. Louis Cardinals",
      "Oakland Athletics",
      "Los Angeles Dodgers",
    ],
    correctAnswer: 1,
    explanation:
      "The St. Louis Cardinals have won 11 World Series, second only to the Yankees' 27.",
    category: "teams",
  },
  {
    id: 332,
    question: "Who was nicknamed 'Wahoo Sam'?",
    options: [
      "Sam Crawford",
      "Sam Rice",
      "Sam McDowell",
      "Sammy Sosa",
    ],
    correctAnswer: 0,
    explanation:
      "Sam Crawford was nicknamed 'Wahoo Sam' after his hometown of Wahoo, Nebraska.",
    category: "players",
  },
  {
    id: 333,
    question:
      "What year was the first designated hitter used in an All-Star Game?",
    options: ["1973", "1975", "1976", "1989"],
    correctAnswer: 3,
    explanation: "The DH was first used in the All-Star Game in 1989.",
    category: "history",
  },
  {
    id: 334,
    question: "What is a 'hanging breaking ball'?",
    options: [
      "A well-executed curve",
      "A breaking pitch that doesn't break enough and stays up in the zone",
      "A slider",
      "A change-up",
    ],
    correctAnswer: 1,
    explanation:
      "A hanging breaking ball fails to drop properly and is easy for batters to hit.",
    category: "rules",
  },
  {
    id: 335,
    question: "Who has the most career balks?",
    options: ["Steve Carlton", "Dave Stewart", "Warren Spahn", "Bob Welch"],
    correctAnswer: 0,
    explanation: "Steve Carlton was called for 90 balks during his career, the most in MLB history.",
    category: "records",
  },
  {
    id: 336,
    question: "Which team has the third-most World Series championships?",
    options: [
      "Boston Red Sox",
      "Oakland Athletics",
      "San Francisco Giants",
      "Los Angeles Dodgers",
    ],
    correctAnswer: 0,
    explanation: "The Boston Red Sox have won 9 World Series championships.",
    category: "teams",
  },
  {
    id: 337,
    question: "Who was known as 'The Big Unit'?",
    options: ["Randy Johnson", "Frank Thomas", "Roger Clemens", "David Ortiz"],
    correctAnswer: 0,
    explanation:
      "Randy Johnson earned 'The Big Unit' nickname for his imposing 6'10\" frame.",
    category: "players",
  },
  {
    id: 338,
    question:
      "What year did the Colorado Rockies reach their first World Series?",
    options: ["2005", "2006", "2007", "2009"],
    correctAnswer: 2,
    explanation:
      "The Colorado Rockies reached the 2007 World Series but were swept by the Red Sox.",
    category: "history",
  },
  {
    id: 339,
    question: "What is a 'club in the strike zone'?",
    options: [
      "A power hitter",
      "When a batter has very good plate discipline",
      "A fastball",
      "A wooden bat",
    ],
    correctAnswer: 1,
    explanation:
      "Having 'club' in the strike zone means a player has excellent command and control of the zone.",
    category: "rules",
  },
  {
    id: 340,
    question: "Who has the lowest career WHIP (minimum 1000 IP)?",
    options: [
      "Pedro Martinez",
      "Mariano Rivera",
      "Addie Joss",
      "Walter Johnson",
    ],
    correctAnswer: 2,
    explanation:
      "Addie Joss had a career WHIP of 0.968, the lowest in MLB history.",
    category: "records",
  },
  {
    id: 341,
    question: "Which team won the first World Series in the 1900s?",
    options: [
      "Pittsburgh Pirates",
      "Boston Americans",
      "New York Giants",
      "Chicago Cubs",
    ],
    correctAnswer: 1,
    explanation:
      "The Boston Americans (later Red Sox) won the first modern World Series in 1903.",
    category: "teams",
  },
  {
    id: 342,
    question: "Who was nicknamed 'Rapid Robert'?",
    options: ["Bob Feller", "Bob Gibson", "Roberto Clemente", "Robin Roberts"],
    correctAnswer: 0,
    explanation:
      "Bob Feller was called 'Rapid Robert' for his blazing fastball.",
    category: "players",
  },
  {
    id: 343,
    question:
      "What year did the Tampa Bay Rays reach their first World Series?",
    options: ["2006", "2007", "2008", "2010"],
    correctAnswer: 2,
    explanation:
      "The Rays reached the 2008 World Series but lost to the Philadelphia Phillies.",
    category: "history",
  },
  {
    id: 344,
    question: "What is a 'swing and miss' rate?",
    options: [
      "Percentage of swings that miss the ball",
      "Batting average",
      "Strikeout rate",
      "Contact rate",
    ],
    correctAnswer: 0,
    explanation:
      "Swing and miss rate measures what percentage of swings result in no contact with the ball.",
    category: "rules",
  },
  {
    id: 345,
    question: "Who has the highest career on-base percentage?",
    options: ["Babe Ruth", "Ted Williams", "Lou Gehrig", "Barry Bonds"],
    correctAnswer: 1,
    explanation:
      "Ted Williams' career on-base percentage of .482 is the highest in MLB history.",
    category: "records",
  },
  {
    id: 346,
    question: "Which team has never won a World Series?",
    options: [
      "Seattle Mariners",
      "San Diego Padres",
      "Milwaukee Brewers",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "The Mariners, Padres, Brewers, and Rays have never won a World Series.",
    category: "teams",
  },
  {
    id: 347,
    question: "Who was known as 'Hammerin' Hank' first?",
    options: ["Hank Aaron", "Hank Greenberg", "Hank Bauer", "Hank Sauer"],
    correctAnswer: 1,
    explanation:
      "Hank Greenberg was the original 'Hammerin' Hank' in the 1930s-1940s before Aaron.",
    category: "players",
  },
  {
    id: 348,
    question: "What year did the Texas Rangers reach their first World Series?",
    options: ["2008", "2009", "2010", "2011"],
    correctAnswer: 2,
    explanation:
      "The Rangers reached the World Series in 2010 and 2011 but lost both times.",
    category: "history",
  },
  {
    id: 349,
    question: "What is a 'called strike three'?",
    options: [
      "A swinging strikeout",
      "A strikeout where the batter doesn't swing at strike three",
      "An appeal play",
      "A checked swing",
    ],
    correctAnswer: 1,
    explanation:
      "A called strike three is when the umpire calls the third strike on a pitch the batter takes.",
    category: "rules",
  },
  {
    id: 350,
    question: "Who has the most 20-win seasons?",
    options: [
      "Cy Young",
      "Christy Mathewson",
      "Walter Johnson",
      "Warren Spahn",
    ],
    correctAnswer: 0,
    explanation: "Cy Young had 15 seasons with 20 or more wins.",
    category: "records",
  },
  {
    id: 351,
    question: "Which team has won the most games in a single season?",
    options: ["1906 Cubs", "1998 Yankees", "2001 Mariners", "1927 Yankees"],
    correctAnswer: 0,
    explanation:
      "The 1906 Chicago Cubs won 116 games, tied with the 2001 Mariners.",
    category: "teams",
  },
  {
    id: 352,
    question: "Who was nicknamed 'The Mule'?",
    options: ["George Sisler", "Jimmie Foxx", "Lou Gehrig", "Hank Greenberg"],
    correctAnswer: 1,
    explanation:
      "Jimmie Foxx was called 'The Mule' for his powerful strength and hitting.",
    category: "players",
  },
  {
    id: 353,
    question:
      "What year did the Baltimore Orioles win their last World Series?",
    options: ["1979", "1983", "1987", "1989"],
    correctAnswer: 1,
    explanation:
      "The Orioles won the 1983 World Series, defeating the Philadelphia Phillies.",
    category: "history",
  },
  {
    id: 354,
    question: "What is 'hard-hit ball' percentage?",
    options: [
      "Percentage of balls hit over 95 mph",
      "Percentage of home runs",
      "Percentage of line drives",
      "Percentage of fly balls",
    ],
    correctAnswer: 0,
    explanation:
      "Hard-hit ball percentage measures batted balls with exit velocity of 95 mph or higher.",
    category: "rules",
  },
  {
    id: 355,
    question: "Who has the most career 200-hit seasons?",
    options: ["Pete Rose", "Ty Cobb", "Ichiro Suzuki", "Wade Boggs"],
    correctAnswer: 2,
    explanation:
      "Ichiro Suzuki had 10 consecutive 200-hit seasons from 2001-2010.",
    category: "records",
  },
  {
    id: 356,
    question: "Which team won the 2020 World Series in the shortened season?",
    options: [
      "Tampa Bay Rays",
      "Los Angeles Dodgers",
      "Houston Astros",
      "Atlanta Braves",
    ],
    correctAnswer: 1,
    explanation:
      "The Los Angeles Dodgers won the 2020 World Series during the COVID-shortened season.",
    category: "teams",
  },
  {
    id: 357,
    question: "Who was known as 'Cool Papa Bell'?",
    options: ["A Negro Leagues legend", "A pitcher", "A manager", "An umpire"],
    correctAnswer: 0,
    explanation:
      "Cool Papa Bell was a legendary Negro Leagues player known for his incredible speed.",
    category: "players",
  },
  {
    id: 358,
    question:
      "What year did the San Diego Padres reach their first World Series?",
    options: ["1982", "1984", "1996", "1998"],
    correctAnswer: 1,
    explanation:
      "The Padres reached the 1984 World Series but lost to the Detroit Tigers.",
    category: "history",
  },
  {
    id: 359,
    question: "What is 'barrel' rate in baseball analytics?",
    options: [
      "Home run rate",
      "Rate of ideal contact combining exit velocity and launch angle",
      "Batting average",
      "Slugging percentage",
    ],
    correctAnswer: 1,
    explanation:
      "Barrel rate measures the percentage of batted balls with optimal exit velocity and launch angle.",
    category: "rules",
  },
  {
    id: 360,
    question: "Who has the most career 30-home run seasons?",
    options: ["Babe Ruth", "Hank Aaron", "Barry Bonds", "Alex Rodriguez"],
    correctAnswer: 2,
    explanation: "Barry Bonds had 13 seasons with 30 or more home runs.",
    category: "records",
  },
  {
    id: 361,
    question: "Which team won the 2021 World Series?",
    options: [
      "Los Angeles Dodgers",
      "Atlanta Braves",
      "Houston Astros",
      "Tampa Bay Rays",
    ],
    correctAnswer: 1,
    explanation:
      "The Atlanta Braves defeated the Houston Astros in the 2021 World Series.",
    category: "teams",
  },
  {
    id: 362,
    question: "Who was nicknamed 'Shoeless'?",
    options: ["Joe Jackson", "Joe DiMaggio", "Joe Morgan", "Joe Cronin"],
    correctAnswer: 0,
    explanation:
      "'Shoeless Joe' Jackson allegedly played a minor league game without shoes due to blisters.",
    category: "players",
  },
  {
    id: 363,
    question:
      "What year did the Milwaukee Brewers reach their only World Series?",
    options: ["1979", "1982", "1987", "1992"],
    correctAnswer: 1,
    explanation:
      "The Brewers reached the 1982 World Series but lost to the St. Louis Cardinals.",
    category: "history",
  },
  {
    id: 364,
    question: "What is 'chase rate' in baseball?",
    options: [
      "Stolen base rate",
      "Percentage of swings at pitches outside the strike zone",
      "Batting average",
      "On-base percentage",
    ],
    correctAnswer: 1,
    explanation:
      "Chase rate measures how often a batter swings at pitches outside the strike zone.",
    category: "rules",
  },
  {
    id: 365,
    question: "Who has the most career 40-home run seasons?",
    options: ["Babe Ruth", "Sammy Sosa", "Mark McGwire", "Alex Rodriguez"],
    correctAnswer: 0,
    explanation: "Babe Ruth had 11 seasons with 40 or more home runs.",
    category: "records",
  },
];

export function getDailyTriviaQuestions(date?: Date): TriviaQuestion[] {
  const now = date || new Date();
  const pool = triviaQuestions.filter((q) => !isYearQuestion(q));
  const totalQuestions = pool.length;
  const questionsPerDay = 5;

  if (totalQuestions < questionsPerDay) {
    return pool.slice();
  }

  const getEpochDay = (value: Date) => {
    const utc = Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
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
  if (cycleLength === 0) {
    return triviaQuestions.slice(0, questionsPerDay);
  }

  const dayIndex = getEpochDay(now) % cycleLength;
  const startIndex = dayIndex * questionsPerDay;
  const shuffledQuestions = shuffleQuestions(915341);

  return shuffledQuestions.slice(startIndex, startIndex + questionsPerDay);
}

export function getTodayStorageKey(date?: Date): string {
  const now = date || new Date();
  return `trivia-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function getNextTriviaTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
