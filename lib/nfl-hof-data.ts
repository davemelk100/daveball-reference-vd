// Pro Football Hall of Fame inductees
// Source: https://www.profootballhof.com

export interface PFHOFInductee {
  name: string;
  inductionYear: number;
  position: string;
  team: string; // Primary team association
  // ESPN player ID if available for headshot
  playerId?: number;
}

export const pfhofInductees: PFHOFInductee[] = [
  // 2024
  { name: "Dwight Freeney", inductionYear: 2024, position: "DE", team: "Indianapolis Colts" },
  { name: "Antonio Gates", inductionYear: 2024, position: "TE", team: "San Diego Chargers" },
  { name: "Devin Hester", inductionYear: 2024, position: "KR/PR", team: "Chicago Bears" },
  { name: "Andre Johnson", inductionYear: 2024, position: "WR", team: "Houston Texans" },
  { name: "Steve McMichael", inductionYear: 2024, position: "DT", team: "Chicago Bears" },
  { name: "Julius Peppers", inductionYear: 2024, position: "DE", team: "Carolina Panthers" },
  { name: "Patrick Willis", inductionYear: 2024, position: "LB", team: "San Francisco 49ers" },
  { name: "Randy Gradishar", inductionYear: 2024, position: "LB", team: "Denver Broncos" },

  // 2023
  { name: "Darrelle Revis", inductionYear: 2023, position: "CB", team: "New York Jets" },
  { name: "Joe Thomas", inductionYear: 2023, position: "OT", team: "Cleveland Browns" },
  { name: "Zach Thomas", inductionYear: 2023, position: "LB", team: "Miami Dolphins" },
  { name: "Ronde Barber", inductionYear: 2023, position: "CB", team: "Tampa Bay Buccaneers" },
  { name: "Joe Klecko", inductionYear: 2023, position: "DL", team: "New York Jets" },
  { name: "Chuck Howley", inductionYear: 2023, position: "LB", team: "Dallas Cowboys" },
  { name: "DeMarcus Ware", inductionYear: 2023, position: "DE/OLB", team: "Dallas Cowboys" },
  { name: "Don Coryell", inductionYear: 2023, position: "Coach", team: "San Diego Chargers" },
  { name: "Ken Riley", inductionYear: 2023, position: "CB", team: "Cincinnati Bengals" },

  // 2022
  { name: "Tony Boselli", inductionYear: 2022, position: "OT", team: "Jacksonville Jaguars" },
  { name: "Cliff Branch", inductionYear: 2022, position: "WR", team: "Oakland Raiders" },
  { name: "LeRoy Butler", inductionYear: 2022, position: "S", team: "Green Bay Packers" },
  { name: "Art McNally", inductionYear: 2022, position: "Official", team: "NFL" },
  { name: "Sam Mills", inductionYear: 2022, position: "LB", team: "New Orleans Saints" },
  { name: "Richard Seymour", inductionYear: 2022, position: "DT", team: "New England Patriots" },
  { name: "Dick Vermeil", inductionYear: 2022, position: "Coach", team: "St. Louis Rams" },
  { name: "Bryant Young", inductionYear: 2022, position: "DT", team: "San Francisco 49ers" },

  // 2021
  { name: "Peyton Manning", inductionYear: 2021, position: "QB", team: "Indianapolis Colts", playerId: 5529 },
  { name: "Calvin Johnson", inductionYear: 2021, position: "WR", team: "Detroit Lions" },
  { name: "Charles Woodson", inductionYear: 2021, position: "CB/S", team: "Oakland Raiders" },
  { name: "John Lynch", inductionYear: 2021, position: "S", team: "Tampa Bay Buccaneers" },
  { name: "Alan Faneca", inductionYear: 2021, position: "G", team: "Pittsburgh Steelers" },
  { name: "Drew Pearson", inductionYear: 2021, position: "WR", team: "Dallas Cowboys" },
  { name: "Tom Flores", inductionYear: 2021, position: "Coach", team: "Oakland Raiders" },
  { name: "Bill Nunn", inductionYear: 2021, position: "Contributor", team: "Pittsburgh Steelers" },

  // 2020
  { name: "Troy Polamalu", inductionYear: 2020, position: "S", team: "Pittsburgh Steelers" },
  { name: "Edgerrin James", inductionYear: 2020, position: "RB", team: "Indianapolis Colts" },
  { name: "Steve Hutchinson", inductionYear: 2020, position: "G", team: "Seattle Seahawks" },
  { name: "Isaac Bruce", inductionYear: 2020, position: "WR", team: "St. Louis Rams" },
  { name: "Steve Atwater", inductionYear: 2020, position: "S", team: "Denver Broncos" },
  { name: "Donnie Shell", inductionYear: 2020, position: "S", team: "Pittsburgh Steelers" },
  { name: "Paul Tagliabue", inductionYear: 2020, position: "Contributor", team: "NFL" },
  { name: "Jimmie Johnson", inductionYear: 2020, position: "Coach", team: "Dallas Cowboys" },

  // 2019
  { name: "Champ Bailey", inductionYear: 2019, position: "CB", team: "Denver Broncos" },
  { name: "Tony Gonzalez", inductionYear: 2019, position: "TE", team: "Kansas City Chiefs" },
  { name: "Ed Reed", inductionYear: 2019, position: "S", team: "Baltimore Ravens" },
  { name: "Ty Law", inductionYear: 2019, position: "CB", team: "New England Patriots" },
  { name: "Kevin Mawae", inductionYear: 2019, position: "C", team: "New York Jets" },
  { name: "Johnny Robinson", inductionYear: 2019, position: "S", team: "Kansas City Chiefs" },

  // 2018
  { name: "Ray Lewis", inductionYear: 2018, position: "LB", team: "Baltimore Ravens", playerId: 5536 },
  { name: "Brian Urlacher", inductionYear: 2018, position: "LB", team: "Chicago Bears" },
  { name: "Randy Moss", inductionYear: 2018, position: "WR", team: "Minnesota Vikings" },
  { name: "Terrell Owens", inductionYear: 2018, position: "WR", team: "San Francisco 49ers" },
  { name: "Brian Dawkins", inductionYear: 2018, position: "S", team: "Philadelphia Eagles" },
  { name: "Robert Brazile", inductionYear: 2018, position: "LB", team: "Houston Oilers" },
  { name: "Jerry Kramer", inductionYear: 2018, position: "G", team: "Green Bay Packers" },

  // 2017
  { name: "LaDainian Tomlinson", inductionYear: 2017, position: "RB", team: "San Diego Chargers" },
  { name: "Jason Taylor", inductionYear: 2017, position: "DE", team: "Miami Dolphins" },
  { name: "Terrell Davis", inductionYear: 2017, position: "RB", team: "Denver Broncos" },
  { name: "Kurt Warner", inductionYear: 2017, position: "QB", team: "St. Louis Rams" },
  { name: "Morten Andersen", inductionYear: 2017, position: "K", team: "New Orleans Saints" },
  { name: "Kenny Easley", inductionYear: 2017, position: "S", team: "Seattle Seahawks" },
  { name: "Jerry Jones", inductionYear: 2017, position: "Contributor", team: "Dallas Cowboys" },

  // 2016
  { name: "Brett Favre", inductionYear: 2016, position: "QB", team: "Green Bay Packers" },
  { name: "Marvin Harrison", inductionYear: 2016, position: "WR", team: "Indianapolis Colts" },
  { name: "Tony Dungy", inductionYear: 2016, position: "Coach", team: "Indianapolis Colts" },
  { name: "Orlando Pace", inductionYear: 2016, position: "OT", team: "St. Louis Rams" },
  { name: "Kevin Greene", inductionYear: 2016, position: "LB", team: "Pittsburgh Steelers" },
  { name: "Dick Stanfel", inductionYear: 2016, position: "G", team: "Detroit Lions" },
  { name: "Ken Stabler", inductionYear: 2016, position: "QB", team: "Oakland Raiders" },
  { name: "Edward DeBartolo Jr.", inductionYear: 2016, position: "Contributor", team: "San Francisco 49ers" },

  // 2015
  { name: "Junior Seau", inductionYear: 2015, position: "LB", team: "San Diego Chargers" },
  { name: "Jerome Bettis", inductionYear: 2015, position: "RB", team: "Pittsburgh Steelers" },
  { name: "Tim Brown", inductionYear: 2015, position: "WR", team: "Oakland Raiders" },
  { name: "Charles Haley", inductionYear: 2015, position: "DE/LB", team: "San Francisco 49ers" },
  { name: "Bill Polian", inductionYear: 2015, position: "Contributor", team: "Buffalo Bills" },
  { name: "Will Shields", inductionYear: 2015, position: "G", team: "Kansas City Chiefs" },
  { name: "Mick Tingelhoff", inductionYear: 2015, position: "C", team: "Minnesota Vikings" },

  // 2014
  { name: "Derrick Brooks", inductionYear: 2014, position: "LB", team: "Tampa Bay Buccaneers" },
  { name: "Walter Jones", inductionYear: 2014, position: "OT", team: "Seattle Seahawks" },
  { name: "Andre Reed", inductionYear: 2014, position: "WR", team: "Buffalo Bills" },
  { name: "Aeneas Williams", inductionYear: 2014, position: "CB", team: "Arizona Cardinals" },
  { name: "Michael Strahan", inductionYear: 2014, position: "DE", team: "New York Giants" },
  { name: "Claude Humphrey", inductionYear: 2014, position: "DE", team: "Atlanta Falcons" },
  { name: "Ray Guy", inductionYear: 2014, position: "P", team: "Oakland Raiders" },

  // Legends
  { name: "Tom Brady", inductionYear: 2025, position: "QB", team: "New England Patriots", playerId: 2330 },
  { name: "Jerry Rice", inductionYear: 2010, position: "WR", team: "San Francisco 49ers" },
  { name: "Jim Brown", inductionYear: 1971, position: "RB", team: "Cleveland Browns" },
  { name: "Joe Montana", inductionYear: 2000, position: "QB", team: "San Francisco 49ers" },
  { name: "Walter Payton", inductionYear: 1993, position: "RB", team: "Chicago Bears" },
  { name: "Lawrence Taylor", inductionYear: 1999, position: "LB", team: "New York Giants" },
  { name: "Johnny Unitas", inductionYear: 1979, position: "QB", team: "Baltimore Colts" },
  { name: "Barry Sanders", inductionYear: 2004, position: "RB", team: "Detroit Lions" },
  { name: "Emmitt Smith", inductionYear: 2010, position: "RB", team: "Dallas Cowboys" },
  { name: "John Elway", inductionYear: 2004, position: "QB", team: "Denver Broncos" },
  { name: "Dan Marino", inductionYear: 2005, position: "QB", team: "Miami Dolphins" },
  { name: "Joe Greene", inductionYear: 1987, position: "DT", team: "Pittsburgh Steelers" },
  { name: "Reggie White", inductionYear: 2006, position: "DE", team: "Philadelphia Eagles" },
  { name: "Deion Sanders", inductionYear: 2011, position: "CB", team: "Dallas Cowboys" },
  { name: "Ronnie Lott", inductionYear: 2000, position: "S", team: "San Francisco 49ers" },
  { name: "Dick Butkus", inductionYear: 1979, position: "LB", team: "Chicago Bears" },
  { name: "Mike Singletary", inductionYear: 1998, position: "LB", team: "Chicago Bears" },
];

export function getPFHOFByYear(): Record<number, PFHOFInductee[]> {
  const byYear: Record<number, PFHOFInductee[]> = {};
  for (const inductee of pfhofInductees) {
    if (!byYear[inductee.inductionYear]) {
      byYear[inductee.inductionYear] = [];
    }
    byYear[inductee.inductionYear].push(inductee);
  }
  return byYear;
}

export function getPFHOFYears(): number[] {
  const years = [...new Set(pfhofInductees.map((i) => i.inductionYear))];
  return years.sort((a, b) => b - a);
}

export function getPFHOFByPosition(): Record<string, PFHOFInductee[]> {
  const byPos: Record<string, PFHOFInductee[]> = {};
  for (const inductee of pfhofInductees) {
    const pos = inductee.position;
    if (!byPos[pos]) {
      byPos[pos] = [];
    }
    byPos[pos].push(inductee);
  }
  return byPos;
}
