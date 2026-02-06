export interface NFLSpotlightPlayer {
  id: number;
  name: string;
  position: string;
  team: string;
  years: string;
  fact: string;
  // If false, don't use ESPN headshot (historical players have wrong/recycled IDs)
  hasHeadshot?: boolean;
}

export const nflSpotlightPlayers: NFLSpotlightPlayer[] = [
  {
    id: 2330,
    name: "Tom Brady",
    position: "QB",
    team: "New England Patriots / Tampa Bay Buccaneers",
    years: "2000-2022",
    fact: "Won seven Super Bowls and five Super Bowl MVPs, widely considered the greatest quarterback of all time.",
  },
  {
    id: 3139477,
    name: "Patrick Mahomes",
    position: "QB",
    team: "Kansas City Chiefs",
    years: "2017-present",
    fact: "Won three Super Bowls and two Super Bowl MVPs before turning 30, the youngest QB to win multiple titles.",
  },
  {
    id: 2580,
    name: "Jerry Rice",
    position: "WR",
    team: "San Francisco 49ers",
    years: "1985-2004",
    fact: "Holds virtually every major receiving record including 1,549 receptions, 22,895 yards, and 197 receiving touchdowns.",
    hasHeadshot: false, // Historical player
  },
  {
    id: 2547,
    name: "Walter Payton",
    position: "RB",
    team: "Chicago Bears",
    years: "1975-1987",
    fact: "Known as 'Sweetness,' he held the rushing record for nearly two decades. The Man of the Year award bears his name.",
    hasHeadshot: false, // Historical player
  },
  {
    id: 2565,
    name: "Joe Montana",
    position: "QB",
    team: "San Francisco 49ers",
    years: "1979-1994",
    fact: "Won four Super Bowls with a perfect 4-0 record and never threw an interception in Super Bowl play. Named 'Joe Cool.'",
    hasHeadshot: false, // Historical player
  },
  {
    id: 2549,
    name: "Jim Brown",
    position: "RB",
    team: "Cleveland Browns",
    years: "1957-1965",
    fact: "Led the NFL in rushing eight of his nine seasons and retired at his peak, averaging 5.2 yards per carry for his career.",
    hasHeadshot: false, // Historical player
  },
  {
    id: 5529,
    name: "Peyton Manning",
    position: "QB",
    team: "Indianapolis Colts / Denver Broncos",
    years: "1998-2015",
    fact: "Five-time MVP and two-time Super Bowl champion who revolutionized the quarterback position with his pre-snap reads.",
    hasHeadshot: false, // Historical player
  },
  {
    id: 2564,
    name: "Lawrence Taylor",
    position: "LB",
    team: "New York Giants",
    years: "1981-1993",
    fact: "Changed the way defense is played in the NFL. Won three Defensive Player of the Year awards and was the 1986 MVP.",
    hasHeadshot: false, // Historical player
  },
  {
    id: 4040715,
    name: "Lamar Jackson",
    position: "QB",
    team: "Baltimore Ravens",
    years: "2018-present",
    fact: "Unanimous 2019 MVP at age 22, the youngest QB to win the award. Known for his electrifying dual-threat ability.",
  },
  {
    id: 3918298,
    name: "Josh Allen",
    position: "QB",
    team: "Buffalo Bills",
    years: "2018-present",
    fact: "One of the most physically gifted QBs ever at 6'5\" 237 lbs. Has thrown for 30+ TDs in multiple seasons.",
  },
  {
    id: 3116593,
    name: "Tyreek Hill",
    position: "WR",
    team: "Kansas City Chiefs / Miami Dolphins",
    years: "2016-present",
    fact: "Known as 'Cheetah' for his blazing speed, he recorded the fastest speed ever tracked by NFL Next Gen Stats at 23.24 mph.",
  },
  {
    id: 3116406,
    name: "Derrick Henry",
    position: "RB",
    team: "Tennessee Titans / Baltimore Ravens",
    years: "2016-present",
    fact: "Rushed for 2,027 yards in 2020 and is known for his punishing running style at 6'3\" 247 lbs.",
  },
  {
    id: 2977187,
    name: "Aaron Donald",
    position: "DT",
    team: "Los Angeles Rams",
    years: "2014-2023",
    fact: "Three-time Defensive Player of the Year and eight-time first-team All-Pro, considered the greatest defensive tackle ever.",
  },
  {
    id: 3046779,
    name: "Travis Kelce",
    position: "TE",
    team: "Kansas City Chiefs",
    years: "2013-present",
    fact: "Holds the record for most 1,000-yard receiving seasons by a tight end and has been named to nine Pro Bowls.",
  },
  {
    id: 16757,
    name: "Barry Sanders",
    position: "RB",
    team: "Detroit Lions",
    years: "1989-1998",
    fact: "One of the most elusive runners ever, he rushed for 15,269 yards and retired at 30, still in his prime.",
    hasHeadshot: false, // Historical player
  },
  {
    id: 5536,
    name: "Ray Lewis",
    position: "LB",
    team: "Baltimore Ravens",
    years: "1996-2012",
    fact: "Two-time Defensive Player of the Year and Super Bowl XXXV MVP, considered one of the greatest linebackers ever.",
    hasHeadshot: false, // Historical player
  },
  {
    id: 4241479,
    name: "Justin Jefferson",
    position: "WR",
    team: "Minnesota Vikings",
    years: "2020-present",
    fact: "Set the NFL record for most receiving yards in a player's first two seasons with 3,016 yards.",
  },
  {
    id: 4361307,
    name: "Micah Parsons",
    position: "LB",
    team: "Dallas Cowboys",
    years: "2021-present",
    fact: "Won Defensive Rookie of the Year in 2021 and has recorded 40+ sacks in his first three NFL seasons.",
  },
];

export function getDailyNFLPlayer(date?: Date): NFLSpotlightPlayer {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % nflSpotlightPlayers.length;
  return nflSpotlightPlayers[index];
}
