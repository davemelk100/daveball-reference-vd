export interface USPBLSpotlightPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  years: string;
  fact: string;
}

export const uspblSpotlightPlayers: USPBLSpotlightPlayer[] = [
  {
    id: "spotlight-1",
    name: "Randy Dobnak",
    position: "RHP",
    team: "USPBL → Minnesota Twins",
    years: "2017 USPBL",
    fact: "Pitched in the USPBL before being signed by the Minnesota Twins, where he made his MLB debut in 2019 and became a key part of their rotation.",
  },
  {
    id: "spotlight-2",
    name: "Thomas Mariani",
    position: "RHP",
    team: "Eastside Diamond Hoppers",
    years: "2016 USPBL",
    fact: "One of the first USPBL players to be signed by an MLB organization, demonstrating the league's value as a showcase for talent.",
  },
  {
    id: "spotlight-3",
    name: "Donnie Wegner",
    position: "RHP",
    team: "Utica Unicorns",
    years: "2017 USPBL",
    fact: "Was signed by the Oakland Athletics after his time in the USPBL, continuing the league's track record of MLB pipeline success.",
  },
  {
    id: "spotlight-4",
    name: "Ethan Wiskur",
    position: "OF",
    team: "Birmingham Bloomfield Beavers",
    years: "2019 USPBL",
    fact: "Power-hitting outfielder who impressed scouts in the USPBL and earned a contract with an MLB organization.",
  },
  {
    id: "spotlight-5",
    name: "Austin Athmann",
    position: "RHP",
    team: "Westside Woolly Mammoths",
    years: "2018 USPBL",
    fact: "Used the USPBL as a springboard, eventually signing with the Minnesota Twins organization after dominant performances.",
  },
  {
    id: "spotlight-6",
    name: "Cooper Johnson",
    position: "C",
    team: "USPBL → Detroit Tigers",
    years: "2019 USPBL",
    fact: "Catcher who leveraged his USPBL experience to get noticed by MLB scouts and signed with the Detroit Tigers organization.",
  },
  {
    id: "spotlight-7",
    name: "Noah Childress",
    position: "RHP",
    team: "Utica Unicorns",
    years: "2022 USPBL",
    fact: "Dominated USPBL hitters with a devastating fastball-slider combination that caught the attention of multiple MLB organizations.",
  },
  {
    id: "spotlight-8",
    name: "Andy Appleby",
    position: "Founder",
    team: "USPBL",
    years: "2016-present",
    fact: "Founded the USPBL in 2016 with the vision of creating a showcase league that gives players a path to professional baseball while providing affordable family entertainment.",
  },
  {
    id: "spotlight-9",
    name: "Jimmy Latona",
    position: "IF",
    team: "Eastside Diamond Hoppers",
    years: "2018 USPBL",
    fact: "Versatile infielder who became one of the most popular players in USPBL history, known for his energy and leadership.",
  },
  {
    id: "spotlight-10",
    name: "Dan Ward",
    position: "LHP",
    team: "Birmingham Bloomfield Beavers",
    years: "2017 USPBL",
    fact: "Left-handed pitcher who used the USPBL to revive his career, eventually earning a look from multiple MLB organizations.",
  },
];

export function getDailyUSPBLPlayer(date?: Date): USPBLSpotlightPlayer {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % uspblSpotlightPlayers.length;
  return uspblSpotlightPlayers[index];
}
