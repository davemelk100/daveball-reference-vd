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
    id: "spotlight-dobnak",
    name: "Randy Dobnak",
    position: "RHP",
    team: "Utica Unicorns → Minnesota Twins",
    years: "2017 USPBL → 2019 MLB Debut",
    fact: "The USPBL's biggest success story. Pitched for the Utica Unicorns before being signed by the Minnesota Twins, making his MLB debut on August 9, 2019. He became the first USPBL alum to reach the Major Leagues.",
  },
  {
    id: "spotlight-koenig",
    name: "Jared Koenig",
    position: "LHP",
    team: "Utica Unicorns → Oakland Athletics",
    years: "USPBL → 2022 MLB Debut",
    fact: "Left-handed pitcher who used the USPBL as a springboard to professional baseball. Made his MLB debut with the Oakland Athletics during the 2022 season.",
  },
  {
    id: "spotlight-gillaspie",
    name: "Logan Gillaspie",
    position: "RHP",
    team: "Diamond Hoppers → Baltimore Orioles",
    years: "USPBL → 2022 MLB Debut",
    fact: "Pitched for the Eastside Diamond Hoppers before being signed by the Baltimore Orioles organization. Was called up to the Orioles on May 17, 2022.",
  },
  {
    id: "spotlight-wiemer",
    name: "Joey Wiemer",
    position: "OF",
    team: "Beavers → Milwaukee Brewers",
    years: "USPBL → 2023 MLB",
    fact: "Outfielder who played for the Birmingham Bloomfield Beavers before being signed by the Milwaukee Brewers organization and reaching the Major League roster in 2023.",
  },
  {
    id: "spotlight-wynne",
    name: "Randy Wynne",
    position: "RHP",
    team: "Beavers → Cincinnati Reds",
    years: "USPBL → 2023 MLB",
    fact: "Right-handed pitcher from the Birmingham Bloomfield Beavers who was signed by the Cincinnati Reds and reached their Major League roster in 2023.",
  },
  {
    id: "spotlight-contreras",
    name: "Luis Contreras",
    position: "IF",
    team: "Diamond Hoppers → Houston Astros",
    years: "USPBL → 2024 MLB",
    fact: "Infielder who played for the Eastside Diamond Hoppers before being signed by the Houston Astros organization and making it to the MLB roster in 2024.",
  },
  {
    id: "spotlight-darnell",
    name: "Dugan Darnell",
    position: "OF",
    team: "Diamond Hoppers → Colorado Rockies",
    years: "USPBL → 2025 MLB",
    fact: "The latest USPBL success story. Played for the Eastside Diamond Hoppers before being signed by the Colorado Rockies and reaching the Major League roster in 2025.",
  },
  {
    id: "spotlight-johnson",
    name: "Cooper Johnson",
    position: "C",
    team: "Beavers → Detroit Tigers",
    years: "2019 USPBL",
    fact: "Catcher who played for the Birmingham Bloomfield Beavers and leveraged his USPBL experience to get signed by the Detroit Tigers organization.",
  },
  {
    id: "spotlight-childress",
    name: "Noah Childress",
    position: "RHP",
    team: "Utica Unicorns → Tampa Bay Rays",
    years: "2022 USPBL",
    fact: "Dominant right-handed pitcher for the Utica Unicorns who was signed by the Tampa Bay Rays organization in 2022.",
  },
  {
    id: "spotlight-appleby",
    name: "Andy Appleby",
    position: "Founder & CEO",
    team: "USPBL",
    years: "2016-present",
    fact: "Former Detroit Pistons executive who founded the USPBL in 2016. His vision created a league that has sent 52+ players to MLB organizations and 7 to Major League rosters, all from a single stadium in Utica, Michigan.",
  },
];

export function getDailyUSPBLPlayer(date?: Date): USPBLSpotlightPlayer {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % uspblSpotlightPlayers.length;
  return uspblSpotlightPlayers[index];
}
