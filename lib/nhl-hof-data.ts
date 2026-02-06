// Hockey Hall of Fame inductees
// Source: https://www.hhof.com

export interface HHOFInductee {
  name: string;
  inductionYear: number;
  category: "Player" | "Builder" | "Referee/Linesman";
  position?: string;
  // ESPN player ID if available for headshot
  playerId?: number;
}

export const hhofInductees: HHOFInductee[] = [
  // 2024
  { name: "Pavel Datsyuk", inductionYear: 2024, category: "Player", position: "C", playerId: 1816 },
  { name: "Jeremy Roenick", inductionYear: 2024, category: "Player", position: "C" },
  { name: "Shea Weber", inductionYear: 2024, category: "Player", position: "D", playerId: 3671 },
  { name: "Natalie Darwitz", inductionYear: 2024, category: "Player", position: "F" },
  { name: "Colin Campbell", inductionYear: 2024, category: "Builder" },

  // 2023
  { name: "Henrik Lundqvist", inductionYear: 2023, category: "Player", position: "G", playerId: 3331 },
  { name: "Tom Barrasso", inductionYear: 2023, category: "Player", position: "G" },
  { name: "Caroline Ouellette", inductionYear: 2023, category: "Player", position: "C" },
  { name: "Pierre Turgeon", inductionYear: 2023, category: "Player", position: "C" },
  { name: "Mike Vernon", inductionYear: 2023, category: "Player", position: "G" },

  // 2022
  { name: "Daniel Alfredsson", inductionYear: 2022, category: "Player", position: "RW" },
  { name: "Roberto Luongo", inductionYear: 2022, category: "Player", position: "G", playerId: 2523 },
  { name: "Riikka Sallinen", inductionYear: 2022, category: "Player", position: "F" },
  { name: "Daniel Sedin", inductionYear: 2022, category: "Player", position: "LW", playerId: 1706 },
  { name: "Henrik Sedin", inductionYear: 2022, category: "Player", position: "C", playerId: 1705 },
  { name: "Herb Carnegie", inductionYear: 2022, category: "Builder" },

  // 2021
  { name: "Jarome Iginla", inductionYear: 2021, category: "Player", position: "RW" },
  { name: "Marian Hossa", inductionYear: 2021, category: "Player", position: "RW" },
  { name: "Doug Wilson", inductionYear: 2021, category: "Player", position: "D" },
  { name: "Kim St-Pierre", inductionYear: 2021, category: "Player", position: "G" },
  { name: "Kevin Lowe", inductionYear: 2021, category: "Builder" },
  { name: "Ken Holland", inductionYear: 2021, category: "Builder" },

  // 2020 (no ceremony due to COVID)

  // 2019
  { name: "Hayley Wickenheiser", inductionYear: 2019, category: "Player", position: "F" },
  { name: "Guy Carbonneau", inductionYear: 2019, category: "Player", position: "C" },
  { name: "Vaclav Nedomansky", inductionYear: 2019, category: "Player", position: "C" },
  { name: "Sergei Zubov", inductionYear: 2019, category: "Player", position: "D" },
  { name: "Jim Rutherford", inductionYear: 2019, category: "Builder" },
  { name: "Jerry York", inductionYear: 2019, category: "Builder" },

  // 2018
  { name: "Martin Brodeur", inductionYear: 2018, category: "Player", position: "G" },
  { name: "Martin St. Louis", inductionYear: 2018, category: "Player", position: "RW" },
  { name: "Jayna Hefford", inductionYear: 2018, category: "Player", position: "F" },
  { name: "Alexander Yakushev", inductionYear: 2018, category: "Player", position: "LW" },
  { name: "Gary Bettman", inductionYear: 2018, category: "Builder" },
  { name: "Willie O'Ree", inductionYear: 2018, category: "Builder" },

  // 2017
  { name: "Teemu Selanne", inductionYear: 2017, category: "Player", position: "RW" },
  { name: "Paul Kariya", inductionYear: 2017, category: "Player", position: "LW" },
  { name: "Mark Recchi", inductionYear: 2017, category: "Player", position: "RW" },
  { name: "Dave Andreychuk", inductionYear: 2017, category: "Player", position: "LW" },
  { name: "Danielle Goyette", inductionYear: 2017, category: "Player", position: "F" },
  { name: "Clare Drake", inductionYear: 2017, category: "Builder" },
  { name: "Jeremy Jacobs", inductionYear: 2017, category: "Builder" },

  // 2016
  { name: "Eric Lindros", inductionYear: 2016, category: "Player", position: "C" },
  { name: "Sergei Makarov", inductionYear: 2016, category: "Player", position: "RW" },
  { name: "Rogie Vachon", inductionYear: 2016, category: "Player", position: "G" },
  { name: "Pat Quinn", inductionYear: 2016, category: "Builder" },

  // 2015
  { name: "Chris Pronger", inductionYear: 2015, category: "Player", position: "D" },
  { name: "Niklas Lidstrom", inductionYear: 2015, category: "Player", position: "D" },
  { name: "Sergei Fedorov", inductionYear: 2015, category: "Player", position: "C" },
  { name: "Phil Housley", inductionYear: 2015, category: "Player", position: "D" },
  { name: "Angela James", inductionYear: 2015, category: "Builder" },

  // 2014
  { name: "Dominik Hasek", inductionYear: 2014, category: "Player", position: "G" },
  { name: "Peter Forsberg", inductionYear: 2014, category: "Player", position: "C" },
  { name: "Mike Modano", inductionYear: 2014, category: "Player", position: "C" },
  { name: "Rob Blake", inductionYear: 2014, category: "Player", position: "D" },

  // 2013
  { name: "Chris Chelios", inductionYear: 2013, category: "Player", position: "D" },
  { name: "Brendan Shanahan", inductionYear: 2013, category: "Player", position: "LW" },
  { name: "Scott Niedermayer", inductionYear: 2013, category: "Player", position: "D" },
  { name: "Geraldine Heaney", inductionYear: 2013, category: "Player", position: "D" },

  // 2012
  { name: "Joe Sakic", inductionYear: 2012, category: "Player", position: "C" },
  { name: "Mats Sundin", inductionYear: 2012, category: "Player", position: "C" },
  { name: "Adam Oates", inductionYear: 2012, category: "Player", position: "C" },
  { name: "Pavel Bure", inductionYear: 2012, category: "Player", position: "RW" },

  // 2011
  { name: "Mark Howe", inductionYear: 2011, category: "Player", position: "D" },
  { name: "Joe Nieuwendyk", inductionYear: 2011, category: "Player", position: "C" },
  { name: "Doug Gilmour", inductionYear: 2011, category: "Player", position: "C" },
  { name: "Ed Belfour", inductionYear: 2011, category: "Player", position: "G" },

  // 2010
  { name: "Dino Ciccarelli", inductionYear: 2010, category: "Player", position: "RW" },
  { name: "Angela Ruggiero", inductionYear: 2010, category: "Player", position: "D" },
  { name: "Cammi Granato", inductionYear: 2010, category: "Player", position: "F" },

  // 2009
  { name: "Steve Yzerman", inductionYear: 2009, category: "Player", position: "C" },
  { name: "Brett Hull", inductionYear: 2009, category: "Player", position: "RW" },
  { name: "Luc Robitaille", inductionYear: 2009, category: "Player", position: "LW" },
  { name: "Brian Leetch", inductionYear: 2009, category: "Player", position: "D" },

  // 2008
  { name: "Glenn Anderson", inductionYear: 2008, category: "Player", position: "RW" },
  { name: "Igor Larionov", inductionYear: 2008, category: "Player", position: "C" },

  // 2007
  { name: "Mark Messier", inductionYear: 2007, category: "Player", position: "C" },
  { name: "Scott Stevens", inductionYear: 2007, category: "Player", position: "D" },
  { name: "Ron Francis", inductionYear: 2007, category: "Player", position: "C" },
  { name: "Al MacInnis", inductionYear: 2007, category: "Player", position: "D" },

  // 2006
  { name: "Patrick Roy", inductionYear: 2006, category: "Player", position: "G" },
  { name: "Dick Duff", inductionYear: 2006, category: "Player", position: "LW" },
  { name: "Harley Hotchkiss", inductionYear: 2006, category: "Builder" },

  // 2005
  { name: "Cam Neely", inductionYear: 2005, category: "Player", position: "RW" },
  { name: "Valeri Kharlamov", inductionYear: 2005, category: "Player", position: "LW" },

  // 2004
  { name: "Ray Bourque", inductionYear: 2004, category: "Player", position: "D" },
  { name: "Paul Coffey", inductionYear: 2004, category: "Player", position: "D" },
  { name: "Larry Murphy", inductionYear: 2004, category: "Player", position: "D" },

  // 2003
  { name: "Grant Fuhr", inductionYear: 2003, category: "Player", position: "G" },
  { name: "Pat LaFontaine", inductionYear: 2003, category: "Player", position: "C" },

  // 2002
  { name: "Bernie Federko", inductionYear: 2002, category: "Player", position: "C" },
  { name: "Clark Gillies", inductionYear: 2002, category: "Player", position: "LW" },
  { name: "Rod Langway", inductionYear: 2002, category: "Player", position: "D" },

  // 2001
  { name: "Dale Hawerchuk", inductionYear: 2001, category: "Player", position: "C" },
  { name: "Jari Kurri", inductionYear: 2001, category: "Player", position: "RW" },
  { name: "Mike Gartner", inductionYear: 2001, category: "Player", position: "RW" },

  // 2000
  { name: "Denis Savard", inductionYear: 2000, category: "Player", position: "C" },
  { name: "Joe Mullen", inductionYear: 2000, category: "Player", position: "RW" },

  // 1999
  { name: "Wayne Gretzky", inductionYear: 1999, category: "Player", position: "C" },

  // Legends (selected)
  { name: "Mario Lemieux", inductionYear: 1997, category: "Player", position: "C" },
  { name: "Bobby Orr", inductionYear: 1979, category: "Player", position: "D" },
  { name: "Gordie Howe", inductionYear: 1972, category: "Player", position: "RW" },
  { name: "Maurice Richard", inductionYear: 1961, category: "Player", position: "RW" },
  { name: "Jean Beliveau", inductionYear: 1972, category: "Player", position: "C" },
  { name: "Bobby Hull", inductionYear: 1983, category: "Player", position: "LW" },
  { name: "Phil Esposito", inductionYear: 1984, category: "Player", position: "C" },
  { name: "Guy Lafleur", inductionYear: 1988, category: "Player", position: "RW" },
  { name: "Mike Bossy", inductionYear: 1991, category: "Player", position: "RW" },
  { name: "Bryan Trottier", inductionYear: 1997, category: "Player", position: "C" },
];

export function getHHOFByYear(): Record<number, HHOFInductee[]> {
  const byYear: Record<number, HHOFInductee[]> = {};
  for (const inductee of hhofInductees) {
    if (!byYear[inductee.inductionYear]) {
      byYear[inductee.inductionYear] = [];
    }
    byYear[inductee.inductionYear].push(inductee);
  }
  return byYear;
}

export function getHHOFYears(): number[] {
  const years = [...new Set(hhofInductees.map((i) => i.inductionYear))];
  return years.sort((a, b) => b - a);
}

export function getHHOFPlayers(): HHOFInductee[] {
  return hhofInductees.filter((i) => i.category === "Player");
}
