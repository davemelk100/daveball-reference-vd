export interface NBASpotlightPlayer {
  id: number;
  name: string;
  position: string;
  team: string;
  years: string;
  fact: string;
  hasHeadshot?: boolean;
}

export const nbaSpotlightPlayers: NBASpotlightPlayer[] = [
  {
    id: 1966,
    name: "Michael Jordan",
    position: "SG",
    team: "Chicago Bulls",
    years: "1984-2003",
    fact: "Six-time NBA champion, five-time MVP, and ten-time scoring champion. Widely considered the greatest basketball player of all time.",
    hasHeadshot: false,
  },
  {
    id: 2544,
    name: "LeBron James",
    position: "SF",
    team: "Los Angeles Lakers",
    years: "2003-present",
    fact: "The NBA's all-time leading scorer with four championships and four MVP awards across three different franchises.",
  },
  {
    id: 3032977,
    name: "Nikola Jokic",
    position: "C",
    team: "Denver Nuggets",
    years: "2015-present",
    fact: "Three-time MVP and 2023 NBA champion. Drafted 41st overall, the lowest pick to win MVP in NBA history.",
  },
  {
    id: 110,
    name: "Magic Johnson",
    position: "PG",
    team: "Los Angeles Lakers",
    years: "1979-1991, 1996",
    fact: "Won the NBA Finals MVP as a rookie, playing center in Game 6 of the 1980 Finals. Five-time champion and three-time MVP.",
    hasHeadshot: false,
  },
  {
    id: 1449,
    name: "Larry Bird",
    position: "SF",
    team: "Boston Celtics",
    years: "1979-1992",
    fact: "Won three consecutive MVP awards (1984-86), the only non-center to accomplish this at the time. Three-time champion.",
    hasHeadshot: false,
  },
  {
    id: 3975,
    name: "Stephen Curry",
    position: "PG",
    team: "Golden State Warriors",
    years: "2009-present",
    fact: "Revolutionized basketball with his three-point shooting. NBA's all-time leader in three-pointers made with four championships.",
  },
  {
    id: 3112335,
    name: "Giannis Antetokounmpo",
    position: "PF",
    team: "Milwaukee Bucks",
    years: "2013-present",
    fact: "The 'Greek Freak' won back-to-back MVPs and led the Bucks to the 2021 championship with a 50-point Finals closeout game.",
  },
  {
    id: 614,
    name: "Tim Duncan",
    position: "PF/C",
    team: "San Antonio Spurs",
    years: "1997-2016",
    fact: "Won five championships in three decades. Named to 15 All-NBA teams and is widely considered the greatest power forward ever.",
    hasHeadshot: false,
  },
  {
    id: 110,
    name: "Kareem Abdul-Jabbar",
    position: "C",
    team: "Milwaukee Bucks / Los Angeles Lakers",
    years: "1969-1989",
    fact: "Six-time MVP and six-time champion. His skyhook was virtually unblockable and he held the scoring record for 39 years.",
    hasHeadshot: false,
  },
  {
    id: 1035,
    name: "Kobe Bryant",
    position: "SG",
    team: "Los Angeles Lakers",
    years: "1996-2016",
    fact: "Won five championships and scored 81 points in a single game, the second-highest total in NBA history. Known as the 'Black Mamba.'",
    hasHeadshot: false,
  },
  {
    id: 3547,
    name: "Kevin Durant",
    position: "SF",
    team: "Phoenix Suns",
    years: "2007-present",
    fact: "Four-time scoring champion and two-time Finals MVP. One of the most skilled scorers in NBA history at 6'10\".",
  },
  {
    id: 3468,
    name: "Dirk Nowitzki",
    position: "PF",
    team: "Dallas Mavericks",
    years: "1998-2019",
    fact: "Revolutionized the power forward position with his shooting. Led the Mavericks to the 2011 championship and won Finals MVP.",
    hasHeadshot: false,
  },
  {
    id: 1112,
    name: "Allen Iverson",
    position: "PG/SG",
    team: "Philadelphia 76ers",
    years: "1996-2010",
    fact: "The 2001 MVP who stood just 6'0\" and led the 76ers to the Finals. Four-time scoring champion known as 'The Answer.'",
    hasHeadshot: false,
  },
  {
    id: 3945274,
    name: "Luka Doncic",
    position: "PG/SG",
    team: "Los Angeles Lakers",
    years: "2018-present",
    fact: "EuroLeague MVP at age 19 before being drafted. Became the youngest player to average a triple-double for a season.",
  },
  {
    id: 406,
    name: "Shaquille O'Neal",
    position: "C",
    team: "Los Angeles Lakers",
    years: "1992-2011",
    fact: "One of the most dominant players ever, winning three consecutive Finals MVPs (2000-02). Combined size and athleticism like no other center.",
    hasHeadshot: false,
  },
  {
    id: 3202,
    name: "Kawhi Leonard",
    position: "SF",
    team: "Los Angeles Clippers",
    years: "2011-present",
    fact: "Two-time Finals MVP with two different teams (Spurs 2014, Raptors 2019). Known for his elite defense and clutch scoring.",
  },
  {
    id: 3059318,
    name: "Jayson Tatum",
    position: "SF",
    team: "Boston Celtics",
    years: "2017-present",
    fact: "Led the Celtics to the 2024 NBA championship and won Finals MVP, cementing his status among the league's elite.",
  },
  {
    id: 4066648,
    name: "Anthony Edwards",
    position: "SG",
    team: "Minnesota Timberwolves",
    years: "2020-present",
    fact: "The #1 overall pick in 2020 who has become one of the most exciting and athletic scorers in the NBA.",
  },
  {
    id: 3136193,
    name: "Joel Embiid",
    position: "C",
    team: "Philadelphia 76ers",
    years: "2016-present",
    fact: "The 2023 MVP who came to the US from Cameroon at age 16. Missed his first two seasons with injuries before becoming dominant.",
  },
  {
    id: 1015,
    name: "Hakeem Olajuwon",
    position: "C",
    team: "Houston Rockets",
    years: "1984-2002",
    fact: "Won back-to-back championships (1994-95) while Michael Jordan was retired. Holds the all-time blocks record with 3,830.",
    hasHeadshot: false,
  },
];

export function getDailyNBAPlayer(date?: Date): NBASpotlightPlayer {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % nbaSpotlightPlayers.length;
  return nbaSpotlightPlayers[index];
}
