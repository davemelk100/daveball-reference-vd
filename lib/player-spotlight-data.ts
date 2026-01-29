// Player spotlight data for Major League Numbers
// Features legendary and notable MLB players with interesting facts

export interface SpotlightPlayer {
  id: number;
  name: string;
  position: string;
  team: string;
  years: string;
  bats?: string;
  throws?: string;
  birthplace?: string;
  careerStats?: {
    isPitcher: boolean;
    // Hitting stats
    avg?: string;
    hr?: number;
    rbi?: number;
    hits?: number;
    sb?: number;
    ops?: string;
    games?: number;
    // Pitching stats
    wins?: number;
    losses?: number;
    era?: string;
    strikeouts?: number;
    saves?: number;
    inningsPitched?: string;
  };
  highlights?: string[];
}

// Internal type for curated players list (includes legacy fact field)
interface CuratedPlayer extends Omit<SpotlightPlayer, 'seasonStats'> {
  fact: string;
}

export const spotlightPlayers: CuratedPlayer[] = [
  {
    id: 121578,
    name: "Babe Ruth",
    position: "OF/P",
    team: "Yankees",
    years: "1914-1935",
    fact: "Started his career as a dominant pitcher before becoming baseball's greatest slugger, hitting 714 home runs.",
  },
  {
    id: 114680,
    name: "Lou Gehrig",
    position: "1B",
    team: "Yankees",
    years: "1923-1939",
    fact: "Played 2,130 consecutive games, a record that stood for 56 years until Cal Ripken Jr. broke it.",
  },
  {
    id: 121314,
    name: "Jackie Robinson",
    position: "2B",
    team: "Dodgers",
    years: "1947-1956",
    fact: "Broke baseball's color barrier on April 15, 1947, and his #42 is retired across all of MLB.",
  },
  {
    id: 118495,
    name: "Willie Mays",
    position: "CF",
    team: "Giants",
    years: "1951-1973",
    fact: "Made 'The Catch' in the 1954 World Series, widely considered the greatest defensive play ever.",
  },
  {
    id: 110001,
    name: "Hank Aaron",
    position: "OF",
    team: "Braves",
    years: "1954-1976",
    fact: "Held the career home run record (755) for 33 years and never struck out 100 times in a season.",
  },
  {
    id: 124341,
    name: "Ted Williams",
    position: "LF",
    team: "Red Sox",
    years: "1939-1960",
    fact: "Last player to hit .400 in a season (.406 in 1941) and lost nearly 5 prime years to military service.",
  },
  {
    id: 112391,
    name: "Roberto Clemente",
    position: "RF",
    team: "Pirates",
    years: "1955-1972",
    fact: "Got his 3,000th hit in his final at-bat before tragically dying in a plane crash delivering humanitarian aid.",
  },
  {
    id: 117277,
    name: "Sandy Koufax",
    position: "P",
    team: "Dodgers",
    years: "1955-1966",
    fact: "Retired at 30 due to arthritis after winning 3 Cy Youngs and throwing 4 no-hitters including a perfect game.",
  },
  {
    id: 114756,
    name: "Bob Gibson",
    position: "P",
    team: "Cardinals",
    years: "1959-1975",
    fact: "Posted a 1.12 ERA in 1968, so dominant that MLB lowered the mound the following year.",
  },
  {
    id: 118258,
    name: "Mickey Mantle",
    position: "CF",
    team: "Yankees",
    years: "1951-1968",
    fact: "Hit the longest measured home run (565 feet) and won the Triple Crown in 1956.",
  },
  {
    id: 119602,
    name: "Stan Musial",
    position: "OF/1B",
    team: "Cardinals",
    years: "1941-1963",
    fact: "Had exactly 1,815 hits at home and 1,815 hits on the road - perfect symmetry over 22 seasons.",
  },
  {
    id: 121597,
    name: "Nolan Ryan",
    position: "P",
    team: "Multiple",
    years: "1966-1993",
    fact: "Threw an MLB record 7 no-hitters and struck out 5,714 batters - nearly 1,000 more than second place.",
  },
  {
    id: 121222,
    name: "Cal Ripken Jr.",
    position: "SS",
    team: "Orioles",
    years: "1981-2001",
    fact: "Played 2,632 consecutive games, breaking Lou Gehrig's 'unbreakable' record.",
  },
  {
    id: 115009,
    name: "Rickey Henderson",
    position: "LF",
    team: "Multiple",
    years: "1979-2003",
    fact: "Stole 1,406 bases - 468 more than second place, making it perhaps the most unbreakable record.",
  },
  {
    id: 111432,
    name: "George Brett",
    position: "3B",
    team: "Royals",
    years: "1973-1993",
    fact: "Hit .390 in 1980, the closest anyone has come to .400 since Ted Williams.",
  },
  {
    id: 115270,
    name: "Tony Gwynn",
    position: "RF",
    team: "Padres",
    years: "1982-2001",
    fact: "Won 8 batting titles and struck out only 434 times in 20 seasons - less than some players in 2 years.",
  },
  {
    id: 118120,
    name: "Greg Maddux",
    position: "P",
    team: "Multiple",
    years: "1986-2008",
    fact: "Won 4 consecutive Cy Young Awards (1992-1995) with pinpoint control and baseball intelligence.",
  },
  {
    id: 116615,
    name: "Randy Johnson",
    position: "P",
    team: "Multiple",
    years: "1988-2009",
    fact: "At 6'10\", he was the tallest player in MLB history and struck out 4,875 batters.",
  },
  {
    id: 112388,
    name: "Roger Clemens",
    position: "P",
    team: "Multiple",
    years: "1984-2007",
    fact: "Won 7 Cy Young Awards - more than any other pitcher in MLB history.",
  },
  {
    id: 118377,
    name: "Pedro Martinez",
    position: "P",
    team: "Multiple",
    years: "1992-2009",
    fact: "In 2000, had a 1.74 ERA in the peak steroid era when league average was 4.77.",
  },
  {
    id: 115135,
    name: "Ken Griffey Jr.",
    position: "CF",
    team: "Multiple",
    years: "1989-2010",
    fact: "Had one of the sweetest swings in baseball history and hit 630 home runs.",
  },
  {
    id: 111188,
    name: "Barry Bonds",
    position: "LF",
    team: "Multiple",
    years: "1986-2007",
    fact: "Hit 73 home runs in 2001 and holds career records for home runs (762) and walks (2,558).",
  },
  {
    id: 116539,
    name: "Derek Jeter",
    position: "SS",
    team: "Yankees",
    years: "1995-2014",
    fact: "Collected 3,465 hits and won 5 World Series titles, all with the Yankees.",
  },
  {
    id: 121250,
    name: "Mariano Rivera",
    position: "P",
    team: "Yankees",
    years: "1995-2013",
    fact: "First player unanimously elected to the Hall of Fame, saved 652 games with his legendary cutter.",
  },
  {
    id: 425844,
    name: "Albert Pujols",
    position: "1B",
    team: "Multiple",
    years: "2001-2022",
    fact: "Won 3 MVPs in his first decade and finished with 703 home runs, 4th all-time.",
  },
  {
    id: 429665,
    name: "Miguel Cabrera",
    position: "1B",
    team: "Multiple",
    years: "2003-2023",
    fact: "Won the Triple Crown in 2012, the first player to do so since Carl Yastrzemski in 1967.",
  },
  {
    id: 477132,
    name: "Clayton Kershaw",
    position: "P",
    team: "Dodgers",
    years: "2008-present",
    fact: "Won 3 Cy Young Awards and is considered the best pitcher of his generation.",
  },
  {
    id: 545361,
    name: "Mike Trout",
    position: "CF",
    team: "Angels",
    years: "2011-present",
    fact: "Won 3 MVPs before turning 30 and is often called the best player of his generation.",
  },
  {
    id: 660271,
    name: "Shohei Ohtani",
    position: "P/DH",
    team: "Dodgers",
    years: "2018-present",
    fact: "First player since Babe Ruth to excel as both a pitcher and hitter, winning back-to-back MVPs.",
  },
  {
    id: 592450,
    name: "Aaron Judge",
    position: "RF",
    team: "Yankees",
    years: "2016-present",
    fact: "Set the AL single-season home run record with 62 in 2022, breaking Roger Maris's 61-year-old mark.",
  },
  {
    id: 493316,
    name: "Steve Pearce",
    position: "1B/OF",
    team: "Multiple",
    years: "2007-2019",
    fact: "Won the 2018 World Series MVP with the Red Sox, playing for every AL East team during his career.",
  },
  {
    id: 456030,
    name: "Dustin Ackley",
    position: "2B/OF",
    team: "Mariners/Yankees",
    years: "2011-2016",
    fact: "Second overall pick in the 2009 draft who had a brief but memorable career with the Mariners and Yankees.",
  },
  {
    id: 460075,
    name: "Ryan Ryan",
    position: "P",
    team: "Multiple",
    years: "1998-2003",
    fact: "A journeyman pitcher who appeared in 6 games over 5 seasons for 3 different teams.",
  },
  {
    id: 444432,
    name: "Mark Reynolds",
    position: "1B/3B",
    team: "Multiple",
    years: "2007-2019",
    fact: "Hit 298 career home runs but also struck out 223 times in 2009, setting a single-season record.",
  },
];

// Convert a curated player to SpotlightPlayer format
function curatedToSpotlight(curated: CuratedPlayer): SpotlightPlayer {
  const { fact, ...rest } = curated;
  return rest;
}

// Check if a player has a real photo (not the generic silhouette)
// For older players (pre-2000), we accept placeholders since real photos don't exist
async function hasValidPhoto(playerId: number, acceptPlaceholder: boolean = false): Promise<boolean> {
  try {
    const imageUrl = `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`;
    const response = await fetch(imageUrl, { method: 'HEAD' });
    if (!response.ok) return false;

    // Accept any image for older players
    if (acceptPlaceholder) return true;

    // For modern players, check content-length to filter placeholders
    // Real player photos are larger (~10KB+), placeholders are smaller (~2-5KB)
    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      const size = parseInt(contentLength, 10);
      return size > 8000;
    }
    return false;
  } catch {
    return false;
  }
}

// Check multiple players for photos in parallel and return first valid one
async function findPlayerWithPhoto(players: any[], acceptPlaceholder: boolean = false): Promise<any | null> {
  const batchSize = 10;

  for (let i = 0; i < players.length; i += batchSize) {
    const batch = players.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (player) => {
        const hasPhoto = await hasValidPhoto(player.id, acceptPlaceholder);
        return hasPhoto ? player : null;
      })
    );

    // Return the first player with a valid photo
    const validPlayer = results.find((p) => p !== null);
    if (validPlayer) return validPlayer;
  }

  return null;
}

export async function getDailyPlayer(): Promise<SpotlightPlayer> {
  try {
    // Select a truly random season (1970-present for variety across eras)
    const currentYear = new Date().getFullYear();
    const minYear = 1970;
    const yearRange = currentYear - minYear + 1;
    const randomSeason = minYear + Math.floor(Math.random() * yearRange);

    // Fetch all players from the randomly selected season
    const response = await fetch(`/api/players?type=all&season=${randomSeason}`);
    const data = await response.json();
    const allPlayers = data.players || [];

    if (allPlayers.length === 0) {
      // Fallback to curated list - accept placeholders for legends
      const shuffledCurated = [...spotlightPlayers].sort(() => Math.random() - 0.5);
      return curatedToSpotlight(shuffledCurated[0]);
    }

    // Shuffle the players array for truly random selection
    const shuffled = [...allPlayers].sort(() => Math.random() - 0.5);

    // Accept placeholder images for older seasons (pre-2000) since real photos don't exist
    const acceptPlaceholder = randomSeason < 2000;

    // Find a player with a valid photo (checks in parallel batches)
    const player = await findPlayerWithPhoto(shuffled.slice(0, 30), acceptPlaceholder);

    if (!player) {
      // Fallback to curated list - accept placeholders for legends
      const shuffledCurated = [...spotlightPlayers].sort(() => Math.random() - 0.5);
      return curatedToSpotlight(shuffledCurated[0]);
    }

    // Fetch full player data with stats
    const statsResponse = await fetch(`/api/player/${player.id}`);
    const playerData = statsResponse.ok ? await statsResponse.json() : null;

    // Determine if pitcher and extract career stats
    const position = player.primaryPosition?.abbreviation || "";
    const isPitcher = position === "P" || position === "SP" || position === "RP";

    let careerStats: SpotlightPlayer["careerStats"] = undefined;

    if (playerData?.stats) {
      // Get all seasons and calculate career totals
      const hittingSeasons = playerData.stats
        ?.filter((s: any) => s.group?.displayName === "hitting")
        .flatMap((s: any) => s.splits || []);

      const pitchingSeasons = playerData.stats
        ?.filter((s: any) => s.group?.displayName === "pitching")
        .flatMap((s: any) => s.splits || []);

      if (isPitcher && pitchingSeasons?.length > 0) {
        // Calculate career pitching totals
        let totalWins = 0, totalLosses = 0, totalK = 0, totalSaves = 0;
        let totalIP = 0, totalER = 0;

        for (const season of pitchingSeasons) {
          const stat = season.stat;
          if (stat) {
            totalWins += stat.wins || 0;
            totalLosses += stat.losses || 0;
            totalK += stat.strikeOuts || 0;
            totalSaves += stat.saves || 0;
            const ip = parseFloat(stat.inningsPitched || "0");
            totalIP += ip;
            totalER += stat.earnedRuns || 0;
          }
        }

        const era = totalIP > 0 ? ((totalER / totalIP) * 9).toFixed(2) : undefined;

        careerStats = {
          isPitcher: true,
          wins: totalWins,
          losses: totalLosses,
          era,
          strikeouts: totalK,
          saves: totalSaves > 0 ? totalSaves : undefined,
          inningsPitched: totalIP.toFixed(1),
        };
      } else if (hittingSeasons?.length > 0) {
        // Calculate career hitting totals
        let totalHits = 0, totalAB = 0, totalHR = 0, totalRBI = 0, totalSB = 0, totalGames = 0;

        for (const season of hittingSeasons) {
          const stat = season.stat;
          if (stat) {
            totalHits += stat.hits || 0;
            totalAB += stat.atBats || 0;
            totalHR += stat.homeRuns || 0;
            totalRBI += stat.rbi || 0;
            totalSB += stat.stolenBases || 0;
            totalGames += stat.gamesPlayed || 0;
          }
        }

        const avg = totalAB > 0 ? (totalHits / totalAB).toFixed(3) : undefined;

        careerStats = {
          isPitcher: false,
          avg,
          hr: totalHR,
          rbi: totalRBI,
          hits: totalHits,
          sb: totalSB > 0 ? totalSB : undefined,
          games: totalGames,
        };
      }
    }

    // Check if this player is in our curated list for extra details
    const curatedPlayer = spotlightPlayers.find((p) => p.id === player.id);

    return {
      id: player.id,
      name: player.fullName || `${player.firstName} ${player.lastName}`,
      position: player.primaryPosition?.abbreviation || player.primaryPosition?.name || "Unknown",
      team: player.currentTeam?.name || "MLB",
      years: curatedPlayer?.years || `${randomSeason}`,
      bats: player.batSide?.description,
      throws: player.pitchHand?.description,
      birthplace: player.birthCity && player.birthCountry
        ? `${player.birthCity}, ${player.birthCountry}`
        : undefined,
      careerStats,
      highlights: curatedPlayer?.highlights,
    };
  } catch {
    // Fallback to curated list if fetch fails - use legends who definitely have photos
    return curatedToSpotlight(spotlightPlayers[0]); // Babe Ruth
  }
}

export interface SpotlightManager {
  id: number;
  name: string;
  team: string;
  years: string;
  fact: string;
}

export const spotlightManagers: SpotlightManager[] = [
  {
    id: 112334,
    name: "Connie Mack",
    team: "Athletics",
    years: "1901-1950",
    fact: "Managed for 53 seasons, winning 3,731 games - both records that will never be broken.",
  },
  {
    id: 118825,
    name: "John McGraw",
    team: "Giants",
    years: "1899-1932",
    fact: "Won 10 pennants and 3 World Series, pioneering aggressive 'inside baseball' tactics.",
  },
  {
    id: 112375,
    name: "Casey Stengel",
    team: "Yankees/Mets",
    years: "1934-1965",
    fact: "Won 7 World Series with the Yankees, including 5 straight from 1949-1953.",
  },
  {
    id: 119015,
    name: "Joe McCarthy",
    team: "Yankees/Cubs",
    years: "1926-1950",
    fact: "Has the highest career winning percentage (.615) among managers with 10+ seasons.",
  },
  {
    id: 116876,
    name: "Walter Alston",
    team: "Dodgers",
    years: "1954-1976",
    fact: "Signed 23 consecutive one-year contracts and won 4 World Series titles.",
  },
  {
    id: 117555,
    name: "Earl Weaver",
    team: "Orioles",
    years: "1968-1986",
    fact: "Never had a losing season and pioneered the use of detailed statistics and platoon systems.",
  },
  {
    id: 112932,
    name: "Sparky Anderson",
    team: "Reds/Tigers",
    years: "1970-1995",
    fact: "Only manager to win World Series in both leagues, with the Big Red Machine and '84 Tigers.",
  },
  {
    id: 117591,
    name: "Tommy Lasorda",
    team: "Dodgers",
    years: "1976-1996",
    fact: "Famous for saying he 'bleeds Dodger blue' and won 2 World Series titles.",
  },
  {
    id: 118813,
    name: "Tony La Russa",
    team: "Multiple",
    years: "1979-2022",
    fact: "Won 3 World Series with two different teams and pioneered the modern use of relief pitchers.",
  },
  {
    id: 112375,
    name: "Bobby Cox",
    team: "Braves/Blue Jays",
    years: "1978-2010",
    fact: "Led the Braves to 14 consecutive division titles and holds the record for most ejections (162).",
  },
  {
    id: 117601,
    name: "Joe Torre",
    team: "Multiple",
    years: "1977-2010",
    fact: "Won 4 World Series with the Yankees and later served as MLB's Chief Baseball Officer.",
  },
  {
    id: 113476,
    name: "Dusty Baker",
    team: "Multiple",
    years: "1993-2023",
    fact: "Finally won his first World Series in 2022 with Houston after managing for 25 seasons.",
  },
  {
    id: 113547,
    name: "Bruce Bochy",
    team: "Padres/Giants/Rangers",
    years: "1995-present",
    fact: "Won 4 World Series titles - 3 with the Giants and 1 with the Rangers in 2023.",
  },
  {
    id: 119177,
    name: "Miller Huggins",
    team: "Cardinals/Yankees",
    years: "1913-1929",
    fact: "Built the 1927 Yankees 'Murderers Row' dynasty despite standing only 5'6\".",
  },
  {
    id: 116344,
    name: "Leo Durocher",
    team: "Multiple",
    years: "1939-1973",
    fact: "Coined the phrase 'Nice guys finish last' and managed both the Giants' and Cubs' pennant runs.",
  },
  {
    id: 117001,
    name: "Dick Williams",
    team: "Multiple",
    years: "1967-1988",
    fact: "Won World Series with three different franchises: Red Sox, A's, and Padres pennant.",
  },
  {
    id: 113567,
    name: "Whitey Herzog",
    team: "Multiple",
    years: "1973-1990",
    fact: "Perfected 'Whiteyball' - speed, defense, and pitching - winning the 1982 World Series.",
  },
  {
    id: 122285,
    name: "Billy Martin",
    team: "Multiple",
    years: "1969-1988",
    fact: "Managed the Yankees 5 different times and was known for his fiery temperament.",
  },
  {
    id: 118744,
    name: "Jim Leyland",
    team: "Multiple",
    years: "1986-2013",
    fact: "Won the 1997 World Series with the Marlins and led 3 different teams to the playoffs.",
  },
  {
    id: 116990,
    name: "Terry Francona",
    team: "Multiple",
    years: "2004-present",
    fact: "Broke the 86-year 'Curse of the Bambino' by leading the Red Sox to the 2004 World Series.",
  },
];

export function getDailyManager(): SpotlightManager {
  const today = new Date();
  // Use a different seed than players by adding 'mgr' to the string
  const dateString = `mgr-${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const index = Math.abs(hash) % spotlightManagers.length;
  return spotlightManagers[index];
}

export interface SpotlightTeam {
  id: number;
  name: string;
  city: string;
  league: string;
  founded: string;
  fact: string;
}

export const spotlightTeams: SpotlightTeam[] = [
  {
    id: 147,
    name: "Yankees",
    city: "New York",
    league: "AL East",
    founded: "1901",
    fact: "Won 27 World Series titles, more than any other MLB franchise.",
  },
  {
    id: 111,
    name: "Red Sox",
    city: "Boston",
    league: "AL East",
    founded: "1901",
    fact: "Broke the 86-year 'Curse of the Bambino' by winning the 2004 World Series.",
  },
  {
    id: 119,
    name: "Dodgers",
    city: "Los Angeles",
    league: "NL West",
    founded: "1883",
    fact: "Originally the Brooklyn Dodgers, moved to LA in 1958 and have won 7 World Series.",
  },
  {
    id: 138,
    name: "Cardinals",
    city: "St. Louis",
    league: "NL Central",
    founded: "1882",
    fact: "Won 11 World Series titles, second most in MLB history.",
  },
  {
    id: 137,
    name: "Giants",
    city: "San Francisco",
    league: "NL West",
    founded: "1883",
    fact: "One of the oldest franchises, moved from New York to San Francisco in 1958.",
  },
  {
    id: 112,
    name: "Cubs",
    city: "Chicago",
    league: "NL Central",
    founded: "1876",
    fact: "Ended a 108-year championship drought by winning the 2016 World Series.",
  },
  {
    id: 145,
    name: "White Sox",
    city: "Chicago",
    league: "AL Central",
    founded: "1901",
    fact: "The 1919 'Black Sox' scandal remains one of baseball's most infamous moments.",
  },
  {
    id: 133,
    name: "Athletics",
    city: "Oakland",
    league: "AL West",
    founded: "1901",
    fact: "Won 3 straight World Series (1972-74) and pioneered 'Moneyball' analytics.",
  },
  {
    id: 114,
    name: "Tigers",
    city: "Detroit",
    league: "AL Central",
    founded: "1901",
    fact: "Home to legends like Ty Cobb, who holds the highest career batting average (.366).",
  },
  {
    id: 134,
    name: "Pirates",
    city: "Pittsburgh",
    league: "NL Central",
    founded: "1881",
    fact: "Won the first World Series in 1903 and Roberto Clemente's #21 is retired league-wide.",
  },
  {
    id: 110,
    name: "Orioles",
    city: "Baltimore",
    league: "AL East",
    founded: "1901",
    fact: "Camden Yards (1992) revolutionized ballpark design, inspiring the retro-modern era.",
  },
  {
    id: 113,
    name: "Reds",
    city: "Cincinnati",
    league: "NL Central",
    founded: "1881",
    fact: "The 'Big Red Machine' of the 1970s is considered one of the greatest teams ever.",
  },
  {
    id: 142,
    name: "Twins",
    city: "Minnesota",
    league: "AL Central",
    founded: "1901",
    fact: "Originally the Washington Senators, moved to Minnesota in 1961.",
  },
  {
    id: 158,
    name: "Brewers",
    city: "Milwaukee",
    league: "NL Central",
    founded: "1969",
    fact: "Started as the Seattle Pilots for one season before moving to Milwaukee.",
  },
  {
    id: 117,
    name: "Astros",
    city: "Houston",
    league: "AL West",
    founded: "1962",
    fact: "Played in the iconic Astrodome, the world's first domed stadium.",
  },
  {
    id: 120,
    name: "Nationals",
    city: "Washington",
    league: "NL East",
    founded: "1969",
    fact: "Won their first World Series in 2019 after being down 3-2 in the NLCS.",
  },
  {
    id: 121,
    name: "Mets",
    city: "New York",
    league: "NL East",
    founded: "1962",
    fact: "The 'Miracle Mets' won the 1969 World Series just 7 years after their first 120-loss season.",
  },
  {
    id: 139,
    name: "Rays",
    city: "Tampa Bay",
    league: "AL East",
    founded: "1998",
    fact: "Consistently compete despite having one of MLB's lowest payrolls.",
  },
  {
    id: 140,
    name: "Rangers",
    city: "Texas",
    league: "AL West",
    founded: "1961",
    fact: "Won their first World Series in 2023 after 63 years as a franchise.",
  },
  {
    id: 136,
    name: "Mariners",
    city: "Seattle",
    league: "AL West",
    founded: "1977",
    fact: "Hold the record for most wins in a season (116 in 2001) without winning the World Series.",
  },
];

export function getDailyTeam(): SpotlightTeam {
  const today = new Date();
  // Use a different seed than players/managers
  const dateString = `team-${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const index = Math.abs(hash) % spotlightTeams.length;
  return spotlightTeams[index];
}

export interface RandomFact {
  category: string;
  fact: string;
}

export const randomFacts: RandomFact[] = [
  {
    category: "Records",
    fact: "The longest game in MLB history lasted 8 hours and 6 minutes - a 25-inning marathon between the White Sox and Brewers in 1984.",
  },
  {
    category: "Streaks",
    fact: "Joe DiMaggio's 56-game hitting streak in 1941 is considered one of the most unbreakable records in sports.",
  },
  {
    category: "Oddities",
    fact: "In 1920, Ray Chapman became the only player to die from an injury sustained during an MLB game, leading to the ban on scuffed baseballs.",
  },
  {
    category: "Firsts",
    fact: "The first night game in MLB history was played on May 24, 1935, when the Reds hosted the Phillies under lights.",
  },
  {
    category: "Records",
    fact: "Johnny Vander Meer threw consecutive no-hitters in 1938 - a feat never matched before or since.",
  },
  {
    category: "Oddities",
    fact: "In 1974, Hank Aaron received 930,000 letters - more than any non-politician in U.S. history - as he chased Babe Ruth's home run record.",
  },
  {
    category: "Streaks",
    fact: "The 1916 Giants won 26 consecutive games, the longest winning streak in MLB history.",
  },
  {
    category: "Firsts",
    fact: "Jackie Robinson's jersey #42 was retired across all of MLB in 1997 - the first league-wide retirement in any sport.",
  },
  {
    category: "Records",
    fact: "Cy Young won 511 games - 94 more than second place. He also lost 316, also a record.",
  },
  {
    category: "Oddities",
    fact: "The Cubs' Billy Goat Curse lasted 71 years (1945-2016) after a tavern owner was asked to leave a World Series game with his pet goat.",
  },
  {
    category: "Streaks",
    fact: "Cal Ripken Jr. played 8,243 consecutive innings from 1982-1987 before voluntarily sitting out.",
  },
  {
    category: "Firsts",
    fact: "The first televised MLB game was on August 26, 1939, a doubleheader between the Reds and Dodgers.",
  },
  {
    category: "Records",
    fact: "Fernando Tatis hit 2 grand slams in the same inning (April 23, 1999) - both off the same pitcher.",
  },
  {
    category: "Oddities",
    fact: "In 1930, the entire NL batted .303, with the Giants hitting .319 as a team yet finishing third.",
  },
  {
    category: "Streaks",
    fact: "The Oakland A's won 20 consecutive games in 2002, inspiring the book and movie 'Moneyball.'",
  },
  {
    category: "Firsts",
    fact: "The designated hitter was first used in 1973 - Ron Blomberg of the Yankees was the first DH to bat in an MLB game.",
  },
  {
    category: "Records",
    fact: "In 2001, Barry Bonds walked 177 times (73 intentional) - pitchers preferred to face anyone else.",
  },
  {
    category: "Oddities",
    fact: "Dock Ellis claimed he pitched a no-hitter on June 12, 1970, while under the influence of LSD.",
  },
  {
    category: "Streaks",
    fact: "The 1988 Orioles started 0-21, the worst start in MLB history.",
  },
  {
    category: "Firsts",
    fact: "The first World Series was in 1903, with Boston defeating Pittsburgh 5 games to 3.",
  },
  {
    category: "Records",
    fact: "Pete Rose has 4,256 career hits - 67 more than Ty Cobb and 786 more than Hank Aaron.",
  },
  {
    category: "Oddities",
    fact: "The 1962 Mets lost 120 games. Manager Casey Stengel asked, 'Can't anybody here play this game?'",
  },
  {
    category: "Streaks",
    fact: "The Cleveland Guardians had a 22-game winning streak in 2017, tied for second-longest ever.",
  },
  {
    category: "Firsts",
    fact: "Vin Scully called Dodgers games for 67 seasons (1950-2016), the longest tenure of any announcer with one team.",
  },
  {
    category: "Records",
    fact: "Tom Seaver was named on 98.84% of Hall of Fame ballots, a record until Mariano Rivera got 100%.",
  },
  {
    category: "Oddities",
    fact: "In 1961, Roger Maris received hate mail while chasing Ruth's record because fans wanted Mickey Mantle to break it instead.",
  },
  {
    category: "Streaks",
    fact: "Orel Hershiser threw 59 consecutive scoreless innings in 1988, breaking Don Drysdale's record.",
  },
  {
    category: "Firsts",
    fact: "The first MLB game played outside North America was in Tokyo, Japan in 2000 (Cubs vs. Mets).",
  },
  {
    category: "Records",
    fact: "Nolan Ryan is the only pitcher to throw no-hitters in three different decades (1970s, 1980s, 1990s).",
  },
  {
    category: "Oddities",
    fact: "The only unassisted triple play in World Series history was turned by Bill Wambsganss in 1920.",
  },
];

export function getDailyFact(): RandomFact {
  const today = new Date();
  const dateString = `fact-${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const index = Math.abs(hash) % randomFacts.length;
  return randomFacts[index];
}
