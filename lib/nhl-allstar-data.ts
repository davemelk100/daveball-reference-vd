// NHL All-Star Game data
// Source: NHL.com

export interface NHLAllStarPlayer {
  name: string;
  team: string;
  position: string;
  playerId?: number;
}

export interface NHLAllStarRoster {
  year: number;
  location: string;
  format: string; // "3-on-3", "East vs West", "North America vs World", etc.
  teams: {
    name: string;
    captain?: string;
    players: NHLAllStarPlayer[];
  }[];
  mvp?: string;
}

export const nhlAllStarGames: NHLAllStarRoster[] = [
  {
    year: 2024,
    location: "Toronto",
    format: "4 Nations Face-Off (Division Format)",
    mvp: "Kirill Kaprizov",
    teams: [
      {
        name: "Atlantic Division",
        captain: "Auston Matthews",
        players: [
          { name: "Auston Matthews", team: "TOR", position: "C", playerId: 8479318 },
          { name: "Nikita Kucherov", team: "TBL", position: "RW", playerId: 8476453 },
          { name: "David Pastrnak", team: "BOS", position: "RW", playerId: 8477956 },
          { name: "Aleksander Barkov", team: "FLA", position: "C", playerId: 8477493 },
          { name: "Brady Tkachuk", team: "OTT", position: "LW", playerId: 8480801 },
          { name: "Andrei Vasilevskiy", team: "TBL", position: "G", playerId: 8476883 },
        ],
      },
      {
        name: "Metropolitan Division",
        captain: "Sidney Crosby",
        players: [
          { name: "Sidney Crosby", team: "PIT", position: "C", playerId: 8471675 },
          { name: "Alex Ovechkin", team: "WSH", position: "LW", playerId: 8471214 },
          { name: "Jack Hughes", team: "NJD", position: "C", playerId: 8481559 },
          { name: "Artemi Panarin", team: "NYR", position: "LW", playerId: 8478550 },
          { name: "Zach Werenski", team: "CBJ", position: "D", playerId: 8478460 },
          { name: "Igor Shesterkin", team: "NYR", position: "G", playerId: 8478048 },
        ],
      },
      {
        name: "Central Division",
        captain: "Nathan MacKinnon",
        players: [
          { name: "Nathan MacKinnon", team: "COL", position: "C", playerId: 8477492 },
          { name: "Kirill Kaprizov", team: "MIN", position: "LW", playerId: 8478864 },
          { name: "Connor Bedard", team: "CHI", position: "C", playerId: 8484144 },
          { name: "Mikko Rantanen", team: "COL", position: "RW", playerId: 8478420 },
          { name: "Josh Morrissey", team: "WPG", position: "D", playerId: 8476454 },
          { name: "Connor Hellebuyck", team: "WPG", position: "G", playerId: 8476945 },
        ],
      },
      {
        name: "Pacific Division",
        captain: "Connor McDavid",
        players: [
          { name: "Connor McDavid", team: "EDM", position: "C", playerId: 8478402 },
          { name: "Leon Draisaitl", team: "EDM", position: "C", playerId: 8477934 },
          { name: "Elias Pettersson", team: "VAN", position: "C", playerId: 8480012 },
          { name: "Timo Meier", team: "NJD", position: "RW", playerId: 8478414 },
          { name: "Quinn Hughes", team: "VAN", position: "D", playerId: 8480800 },
          { name: "Stuart Skinner", team: "EDM", position: "G", playerId: 8479973 },
        ],
      },
    ],
  },
  {
    year: 2023,
    location: "Sunrise, FL",
    format: "3-on-3 Tournament (Division Format)",
    mvp: "Matthew Tkachuk",
    teams: [
      {
        name: "Atlantic Division",
        captain: "Auston Matthews",
        players: [
          { name: "Auston Matthews", team: "TOR", position: "C" },
          { name: "Nikita Kucherov", team: "TBL", position: "RW" },
          { name: "David Pastrnak", team: "BOS", position: "RW" },
          { name: "Dylan Larkin", team: "DET", position: "C" },
          { name: "Nick Suzuki", team: "MTL", position: "C" },
          { name: "Andrei Vasilevskiy", team: "TBL", position: "G" },
        ],
      },
      {
        name: "Metropolitan Division",
        captain: "Alex Ovechkin",
        players: [
          { name: "Alex Ovechkin", team: "WSH", position: "LW" },
          { name: "Sidney Crosby", team: "PIT", position: "C" },
          { name: "Jack Hughes", team: "NJD", position: "C" },
          { name: "Johnny Gaudreau", team: "CBJ", position: "LW" },
          { name: "Adam Fox", team: "NYR", position: "D" },
          { name: "Igor Shesterkin", team: "NYR", position: "G" },
        ],
      },
      {
        name: "Central Division",
        captain: "Nathan MacKinnon",
        players: [
          { name: "Nathan MacKinnon", team: "COL", position: "C" },
          { name: "Kirill Kaprizov", team: "MIN", position: "LW" },
          { name: "Clayton Keller", team: "ARI", position: "C" },
          { name: "Jason Robertson", team: "DAL", position: "LW" },
          { name: "Josh Morrissey", team: "WPG", position: "D" },
          { name: "Juuse Saros", team: "NSH", position: "G" },
        ],
      },
      {
        name: "Pacific Division",
        captain: "Connor McDavid",
        players: [
          { name: "Connor McDavid", team: "EDM", position: "C" },
          { name: "Leon Draisaitl", team: "EDM", position: "C" },
          { name: "Timo Meier", team: "SJS", position: "RW" },
          { name: "Bo Horvat", team: "VAN", position: "C" },
          { name: "Troy Terry", team: "ANA", position: "RW" },
          { name: "Logan Thompson", team: "VGK", position: "G" },
        ],
      },
    ],
  },
  {
    year: 2022,
    location: "Las Vegas",
    format: "3-on-3 Tournament (Division Format)",
    mvp: "Claude Giroux",
    teams: [
      {
        name: "Metropolitan Division",
        players: [
          { name: "Alex Ovechkin", team: "WSH", position: "LW" },
          { name: "Sidney Crosby", team: "PIT", position: "C" },
          { name: "Claude Giroux", team: "PHI", position: "C" },
          { name: "Chris Kreider", team: "NYR", position: "LW" },
          { name: "Adam Fox", team: "NYR", position: "D" },
          { name: "Tristan Jarry", team: "PIT", position: "G" },
        ],
      },
      {
        name: "Atlantic Division",
        players: [
          { name: "Auston Matthews", team: "TOR", position: "C" },
          { name: "Jonathan Huberdeau", team: "FLA", position: "LW" },
          { name: "Steven Stamkos", team: "TBL", position: "C" },
          { name: "Rasmus Dahlin", team: "BUF", position: "D" },
          { name: "Nick Suzuki", team: "MTL", position: "C" },
          { name: "Jack Campbell", team: "TOR", position: "G" },
        ],
      },
      {
        name: "Central Division",
        players: [
          { name: "Nathan MacKinnon", team: "COL", position: "C" },
          { name: "Kirill Kaprizov", team: "MIN", position: "LW" },
          { name: "Joe Pavelski", team: "DAL", position: "C" },
          { name: "Jordan Kyrou", team: "STL", position: "C" },
          { name: "Cale Makar", team: "COL", position: "D" },
          { name: "Juuse Saros", team: "NSH", position: "G" },
        ],
      },
      {
        name: "Pacific Division",
        players: [
          { name: "Connor McDavid", team: "EDM", position: "C" },
          { name: "Leon Draisaitl", team: "EDM", position: "C" },
          { name: "Johnny Gaudreau", team: "CGY", position: "LW" },
          { name: "Timo Meier", team: "SJS", position: "RW" },
          { name: "Alex Pietrangelo", team: "VGK", position: "D" },
          { name: "Thatcher Demko", team: "VAN", position: "G" },
        ],
      },
    ],
  },
  {
    year: 2020,
    location: "St. Louis",
    format: "3-on-3 Tournament (Division Format)",
    mvp: "David Pastrnak",
    teams: [
      {
        name: "Atlantic Division",
        players: [
          { name: "David Pastrnak", team: "BOS", position: "RW" },
          { name: "Auston Matthews", team: "TOR", position: "C" },
          { name: "Mitchell Marner", team: "TOR", position: "RW" },
          { name: "Tyler Bertuzzi", team: "DET", position: "LW" },
          { name: "Victor Hedman", team: "TBL", position: "D" },
          { name: "Andrei Vasilevskiy", team: "TBL", position: "G" },
        ],
      },
      {
        name: "Metropolitan Division",
        players: [
          { name: "Alex Ovechkin", team: "WSH", position: "LW" },
          { name: "Sidney Crosby", team: "PIT", position: "C" },
          { name: "Mathew Barzal", team: "NYI", position: "C" },
          { name: "Travis Konecny", team: "PHI", position: "RW" },
          { name: "John Carlson", team: "WSH", position: "D" },
          { name: "Tristan Jarry", team: "PIT", position: "G" },
        ],
      },
      {
        name: "Central Division",
        players: [
          { name: "Nathan MacKinnon", team: "COL", position: "C" },
          { name: "Patrick Kane", team: "CHI", position: "RW" },
          { name: "Ryan O'Reilly", team: "STL", position: "C" },
          { name: "Mark Scheifele", team: "WPG", position: "C" },
          { name: "Roman Josi", team: "NSH", position: "D" },
          { name: "Connor Hellebuyck", team: "WPG", position: "G" },
        ],
      },
      {
        name: "Pacific Division",
        players: [
          { name: "Connor McDavid", team: "EDM", position: "C" },
          { name: "Leon Draisaitl", team: "EDM", position: "C" },
          { name: "Max Pacioretty", team: "VGK", position: "LW" },
          { name: "Elias Pettersson", team: "VAN", position: "C" },
          { name: "Quinn Hughes", team: "VAN", position: "D" },
          { name: "Jacob Markstrom", team: "VAN", position: "G" },
        ],
      },
    ],
  },
  {
    year: 2019,
    location: "San Jose",
    format: "3-on-3 Tournament (Division Format)",
    mvp: "Sidney Crosby",
    teams: [
      {
        name: "Metropolitan Division",
        players: [
          { name: "Sidney Crosby", team: "PIT", position: "C" },
          { name: "Alex Ovechkin", team: "WSH", position: "LW" },
          { name: "Claude Giroux", team: "PHI", position: "C" },
          { name: "Sebastian Aho", team: "CAR", position: "C" },
          { name: "Seth Jones", team: "CBJ", position: "D" },
          { name: "Braden Holtby", team: "WSH", position: "G" },
        ],
      },
      {
        name: "Atlantic Division",
        players: [
          { name: "Auston Matthews", team: "TOR", position: "C" },
          { name: "Nikita Kucherov", team: "TBL", position: "RW" },
          { name: "John Tavares", team: "TOR", position: "C" },
          { name: "Jeff Skinner", team: "BUF", position: "LW" },
          { name: "Thomas Chabot", team: "OTT", position: "D" },
          { name: "Andrei Vasilevskiy", team: "TBL", position: "G" },
        ],
      },
      {
        name: "Central Division",
        players: [
          { name: "Nathan MacKinnon", team: "COL", position: "C" },
          { name: "Patrick Kane", team: "CHI", position: "RW" },
          { name: "Blake Wheeler", team: "WPG", position: "RW" },
          { name: "Ryan O'Reilly", team: "STL", position: "C" },
          { name: "Roman Josi", team: "NSH", position: "D" },
          { name: "Devan Dubnyk", team: "MIN", position: "G" },
        ],
      },
      {
        name: "Pacific Division",
        players: [
          { name: "Connor McDavid", team: "EDM", position: "C" },
          { name: "Johnny Gaudreau", team: "CGY", position: "LW" },
          { name: "Joe Pavelski", team: "SJS", position: "C" },
          { name: "Clayton Keller", team: "ARI", position: "C" },
          { name: "Brent Burns", team: "SJS", position: "D" },
          { name: "Marc-Andre Fleury", team: "VGK", position: "G" },
        ],
      },
    ],
  },
];

export function getNHLAllStarYears(): number[] {
  return nhlAllStarGames.map((g) => g.year).sort((a, b) => b - a);
}

export function getNHLAllStarByYear(year: number): NHLAllStarRoster | undefined {
  return nhlAllStarGames.find((g) => g.year === year);
}

export function getLatestNHLAllStar(): NHLAllStarRoster {
  return nhlAllStarGames[0];
}
