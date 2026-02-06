// NFL Pro Bowl data
// Source: NFL.com, Pro-Football-Reference

export interface NFLProBowlPlayer {
  name: string;
  team: string;
  position: string;
  playerId?: number;
}

export interface NFLProBowlRoster {
  year: number;
  location: string;
  format: string; // "Pro Bowl Games", "AFC vs NFC", etc.
  teams: {
    name: string;
    players: NFLProBowlPlayer[];
  }[];
  mvp?: string;
}

export const nflProBowlGames: NFLProBowlRoster[] = [
  {
    year: 2024,
    location: "Orlando, FL",
    format: "Pro Bowl Games (Skills Competition + Flag Football)",
    mvp: "Saquon Barkley",
    teams: [
      {
        name: "NFC",
        players: [
          { name: "Jalen Hurts", team: "PHI", position: "QB", playerId: 4040715 },
          { name: "Saquon Barkley", team: "PHI", position: "RB", playerId: 3929630 },
          { name: "CeeDee Lamb", team: "DAL", position: "WR", playerId: 4241389 },
          { name: "Justin Jefferson", team: "MIN", position: "WR", playerId: 4241479 },
          { name: "A.J. Brown", team: "PHI", position: "WR", playerId: 4047646 },
          { name: "George Kittle", team: "SF", position: "TE", playerId: 3046518 },
          { name: "Lane Johnson", team: "PHI", position: "OT" },
          { name: "Zack Martin", team: "DAL", position: "G" },
          { name: "Micah Parsons", team: "DAL", position: "LB", playerId: 4361307 },
          { name: "Fred Warner", team: "SF", position: "LB" },
          { name: "Jaycee Horn", team: "CAR", position: "CB" },
          { name: "Budda Baker", team: "ARI", position: "S" },
        ],
      },
      {
        name: "AFC",
        players: [
          { name: "Lamar Jackson", team: "BAL", position: "QB", playerId: 4040715 },
          { name: "Derrick Henry", team: "BAL", position: "RB", playerId: 3116406 },
          { name: "Tyreek Hill", team: "MIA", position: "WR", playerId: 3116593 },
          { name: "Ja'Marr Chase", team: "CIN", position: "WR", playerId: 4362628 },
          { name: "Nico Collins", team: "HOU", position: "WR" },
          { name: "Travis Kelce", team: "KC", position: "TE", playerId: 3046779 },
          { name: "Laremy Tunsil", team: "HOU", position: "OT" },
          { name: "Quenton Nelson", team: "IND", position: "G" },
          { name: "T.J. Watt", team: "PIT", position: "LB" },
          { name: "Myles Garrett", team: "CLE", position: "DE" },
          { name: "Sauce Gardner", team: "NYJ", position: "CB" },
          { name: "Derwin James", team: "LAC", position: "S" },
        ],
      },
    ],
  },
  {
    year: 2023,
    location: "Orlando, FL",
    format: "Pro Bowl Games (Skills Competition + Flag Football)",
    mvp: "Geno Smith",
    teams: [
      {
        name: "NFC",
        players: [
          { name: "Jalen Hurts", team: "PHI", position: "QB" },
          { name: "Geno Smith", team: "SEA", position: "QB" },
          { name: "Saquon Barkley", team: "NYG", position: "RB" },
          { name: "Justin Jefferson", team: "MIN", position: "WR" },
          { name: "Davante Adams", team: "LV", position: "WR" },
          { name: "Travis Kelce", team: "KC", position: "TE" },
          { name: "Micah Parsons", team: "DAL", position: "LB" },
          { name: "Nick Bosa", team: "SF", position: "DE" },
          { name: "Jalen Ramsey", team: "LAR", position: "CB" },
        ],
      },
      {
        name: "AFC",
        players: [
          { name: "Patrick Mahomes", team: "KC", position: "QB", playerId: 3139477 },
          { name: "Josh Allen", team: "BUF", position: "QB", playerId: 3918298 },
          { name: "Derrick Henry", team: "TEN", position: "RB" },
          { name: "Tyreek Hill", team: "MIA", position: "WR" },
          { name: "Stefon Diggs", team: "BUF", position: "WR" },
          { name: "Travis Kelce", team: "KC", position: "TE" },
          { name: "T.J. Watt", team: "PIT", position: "LB" },
          { name: "Myles Garrett", team: "CLE", position: "DE" },
          { name: "Sauce Gardner", team: "NYJ", position: "CB" },
        ],
      },
    ],
  },
  {
    year: 2022,
    location: "Las Vegas, NV",
    format: "Pro Bowl Games (Skills Competition)",
    teams: [
      {
        name: "NFC",
        players: [
          { name: "Kyler Murray", team: "ARI", position: "QB" },
          { name: "Aaron Rodgers", team: "GB", position: "QB" },
          { name: "Dalvin Cook", team: "MIN", position: "RB" },
          { name: "Cooper Kupp", team: "LAR", position: "WR" },
          { name: "Davante Adams", team: "GB", position: "WR" },
          { name: "Kyle Pitts", team: "ATL", position: "TE" },
          { name: "Trent Williams", team: "SF", position: "OT" },
          { name: "Micah Parsons", team: "DAL", position: "LB" },
          { name: "Aaron Donald", team: "LAR", position: "DT", playerId: 2977187 },
        ],
      },
      {
        name: "AFC",
        players: [
          { name: "Patrick Mahomes", team: "KC", position: "QB" },
          { name: "Justin Herbert", team: "LAC", position: "QB" },
          { name: "Jonathan Taylor", team: "IND", position: "RB" },
          { name: "Tyreek Hill", team: "KC", position: "WR" },
          { name: "Ja'Marr Chase", team: "CIN", position: "WR" },
          { name: "Mark Andrews", team: "BAL", position: "TE" },
          { name: "T.J. Watt", team: "PIT", position: "LB" },
          { name: "Myles Garrett", team: "CLE", position: "DE" },
          { name: "Xavien Howard", team: "MIA", position: "CB" },
        ],
      },
    ],
  },
  {
    year: 2020,
    location: "Orlando, FL",
    format: "AFC vs NFC",
    mvp: "Lamar Jackson",
    teams: [
      {
        name: "AFC",
        players: [
          { name: "Lamar Jackson", team: "BAL", position: "QB" },
          { name: "Patrick Mahomes", team: "KC", position: "QB" },
          { name: "Derrick Henry", team: "TEN", position: "RB" },
          { name: "DeAndre Hopkins", team: "HOU", position: "WR" },
          { name: "Michael Thomas", team: "NO", position: "WR" },
          { name: "Travis Kelce", team: "KC", position: "TE" },
          { name: "Calais Campbell", team: "JAX", position: "DE" },
          { name: "T.J. Watt", team: "PIT", position: "LB" },
          { name: "Stephon Gilmore", team: "NE", position: "CB" },
        ],
      },
      {
        name: "NFC",
        players: [
          { name: "Russell Wilson", team: "SEA", position: "QB" },
          { name: "Drew Brees", team: "NO", position: "QB" },
          { name: "Dalvin Cook", team: "MIN", position: "RB" },
          { name: "Michael Thomas", team: "NO", position: "WR" },
          { name: "Julio Jones", team: "ATL", position: "WR" },
          { name: "George Kittle", team: "SF", position: "TE" },
          { name: "Aaron Donald", team: "LAR", position: "DT" },
          { name: "Chandler Jones", team: "ARI", position: "DE" },
          { name: "Richard Sherman", team: "SF", position: "CB" },
        ],
      },
    ],
  },
  {
    year: 2019,
    location: "Orlando, FL",
    format: "AFC vs NFC",
    mvp: "Deshaun Watson & Jaylon Smith",
    teams: [
      {
        name: "AFC",
        players: [
          { name: "Patrick Mahomes", team: "KC", position: "QB" },
          { name: "Deshaun Watson", team: "HOU", position: "QB" },
          { name: "Todd Gurley", team: "LAR", position: "RB" },
          { name: "Tyreek Hill", team: "KC", position: "WR" },
          { name: "JuJu Smith-Schuster", team: "PIT", position: "WR" },
          { name: "Travis Kelce", team: "KC", position: "TE" },
          { name: "J.J. Watt", team: "HOU", position: "DE" },
          { name: "Von Miller", team: "DEN", position: "LB" },
          { name: "Stephon Gilmore", team: "NE", position: "CB" },
        ],
      },
      {
        name: "NFC",
        players: [
          { name: "Drew Brees", team: "NO", position: "QB" },
          { name: "Russell Wilson", team: "SEA", position: "QB" },
          { name: "Ezekiel Elliott", team: "DAL", position: "RB" },
          { name: "Michael Thomas", team: "NO", position: "WR" },
          { name: "Julio Jones", team: "ATL", position: "WR" },
          { name: "Zach Ertz", team: "PHI", position: "TE" },
          { name: "Aaron Donald", team: "LAR", position: "DT" },
          { name: "Jaylon Smith", team: "DAL", position: "LB" },
          { name: "Kyle Fuller", team: "CHI", position: "CB" },
        ],
      },
    ],
  },
];

export function getNFLProBowlYears(): number[] {
  return nflProBowlGames.map((g) => g.year).sort((a, b) => b - a);
}

export function getNFLProBowlByYear(year: number): NFLProBowlRoster | undefined {
  return nflProBowlGames.find((g) => g.year === year);
}

export function getLatestNFLProBowl(): NFLProBowlRoster {
  return nflProBowlGames[0];
}
