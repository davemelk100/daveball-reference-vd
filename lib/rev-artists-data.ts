// Revelation Records Artists/Bands

export interface RevArtist {
  id: string;
  name: string;
  genre?: string;
  yearsActive?: string;
  notableReleases?: string[];
  wikipediaUrl?: string;
}

// Artist image URLs from Wikipedia
export const revArtistImages: Record<string, string> = {
  "battery": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Battery_Coney_Island_High_1998.jpg/330px-Battery_Coney_Island_High_1998.jpg",
  "be-well": "https://www.noecho.net/uploads/wysiwyg/be-well-keith-baillargeon.jpg",
  "bold": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Bold_live.jpg/250px-Bold_live.jpg",
  "civ": "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/CIV_Lava.jpg/250px-CIV_Lava.jpg",
  "dag-nasty": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Dag_Nasty.jpg/250px-Dag_Nasty.jpg",
  "drain": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/2023_Pol%E2%80%99and%E2%80%99Rock_-_Drain_%2801%29.jpg/330px-2023_Pol%E2%80%99and%E2%80%99Rock_-_Drain_%2801%29.jpg",
  "forced-order": "https://www.earsplitcompound.com/site/wp-content/uploads/2015/07/Forced-Order-promo-photo-by-Kiabad-Meza-e1436453199363.jpg",
  "garrison": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Garrisoncoast.jpg/250px-Garrisoncoast.jpg",
  "gameface": "https://cdn.shopify.com/s/files/1/0311/7770/3563/files/Gameface_4_1024x1024.jpg",
  "gorilla-biscuits": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Gorilla_Biscuits.jpg/250px-Gorilla_Biscuits.jpg",
  "himsa": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Himsa_%28band%29.jpg/330px-Himsa_%28band%29.jpg",
  "ignite": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Ignite_%E2%80%93_Reload_Festival_2015_02.jpg/330px-Ignite_%E2%80%93_Reload_Festival_2015_02.jpg",
  "in-my-eyes": "https://i.discogs.com/xigomZ_h1Yiyg0FLbE5zC_uxCUEiDpIq1M4zIWIWD6o/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI4MTA4/My0xMzEyOTc1MjA1/LmpwZWc.jpeg",
  "inside-out": "https://i1.wp.com/bandcampdaily.wpcomstaging.com/wp-content/uploads/2020/07/Inside-Out-Band-900.jpg",
  "into-another": "https://i.discogs.com/L-ubyG_ps3EB9hncKpsrUQ9ivmb4oN_OtF9dwysL1EA/rs:fit/g:sm/q:90/h:233/w:350/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI1OTg2/Ny0xMzY4MzQxNzEw/LTc4MjQuanBlZw.jpeg",
  "judge": "https://f4.bcbits.com/img/0010549785_10.jpg",
  "kill-holiday": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgE5hhXrv8forzfAJAEQJUugsLSfZEbtKkQQ&s",
  "kiss-it-goodbye": "https://i.discogs.com/Ff_VbvNdNufUf9w84N6Jk5Nbj3N48ZeBHP7uJpv80mY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTk0MTU1/Mi0xMzY4MzQyMDE4/LTc1MjcuanBlZw.jpeg",
  "living-hell": "https://static.scenepointblank.com/thumbs/features/hp_a_living_hell/1c8b6dfe33981caa7a0c0d38d9cd57cd.jpg",
  "morning-again": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Morning_Again_at_Ieperfest_2022-1.jpg/330px-Morning_Again_at_Ieperfest_2022-1.jpg",
  "mouthpiece": "https://www.awayfromlife.com/wp-content/uploads/Mouthpiece-Revelation-Records-324x235.jpg",
  "the-nerve-agents": "https://f4.bcbits.com/img/0039498422_25.jpg",
  "new-found-glory": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/NFG_SlamDunk_2019.jpg/330px-NFG_SlamDunk_2019.jpg",
  "no-for-an-answer": "https://i.discogs.com/hkHZIrtWyr9bZgLYwUpObvT5V8XvajPWfZb4Mqe08_c/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI2MDAw/OC0xMzI4ODA0OTEw/LmpwZWc.jpeg",
  "on-the-might-of-princes": "https://i.discogs.com/_jKWhcUPlB2IJhRMJUJU3Xc7vU0X8RoUU9b3GZsameM/rs:fit/g:sm/q:90/h:450/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE3NTU5/ODktMTQzNjYzMzg4/OS05Mjk4LmpwZWc.jpeg",
  "paint-it-black": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Paint_It_Black_in_performance_%282006%29.jpg/330px-Paint_It_Black_in_performance_%282006%29.jpg",
  "planet-on-a-chain": "https://www.noecho.net/uploads/wysiwyg/poac-revelation-records.jpg",
  "praise": "https://www.punkrocktheory.com/sites/default/files/styles/image_style_huge_horizontal_rectangle/public/praise-punk-rock-theory.jpg",
  "primal-rite": "https://f4.bcbits.com/img/0012130797_10.jpg",
  "quicksand": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Quicksand_Rock_am_Ring_2014_%2848%29.JPG/330px-Quicksand_Rock_am_Ring_2014_%2848%29.JPG",
  "the-rival-mob": "https://i.discogs.com/BdqQGdzT0XbX3FNl8WfabkFhANyudhsEvVW7bAO85vA/rs:fit/g:sm/q:90/h:451/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE1NDQy/MzMtMTQwMzcyMDc1/Ni01MjEwLmpwZWc.jpeg",
  "side-by-side": "https://lastfm.freetls.fastly.net/i/u/ar0/f32d2c266ca54490a31e446fa1b7e007.jpg",
  "self-defense-family": "https://i.discogs.com/SfzcaO40DTQgCY5ZsJRtmOpQK0hhwOGyu7t2TvV05u0/rs:fit/g:sm/q:90/h:390/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI1MjA5/NDgtMTU4MjUyNDg2/My0zMTYwLmpwZWc.jpeg",
  "sense-field": "https://lastfm.freetls.fastly.net/i/u/ar0/a22ac87881de4d42a46da00effc12d36.jpg",
  "shades-apart": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mark_Vecchiarelli_-_Shades_Apart.jpg/250px-Mark_Vecchiarelli_-_Shades_Apart.jpg",
  "shai-hulud": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mattfox_shaihulud.jpg/250px-Mattfox_shaihulud.jpg",
  "shelter": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ray_Cappo_%282010%29.jpg/330px-Ray_Cappo_%282010%29.jpg",
  "shook-ones": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Shook%2BOnes%2Bshookones.jpg/250px-Shook%2BOnes%2Bshookones.jpg",
  "spaced": "https://thoughtswordsaction.com/wp-content/uploads/2024/03/unnamed-5-4-e1711373328655.jpg",
  "speedway": "https://www.noecho.net/uploads/wysiwyg/SPEEDWAY-Alva_Nylander.jpg",
  "supertouch": "https://live.staticflickr.com/8056/8095874660_0288794516_b.jpg",
  "sick-of-it-all": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sick_of_It_All_-_Reload_Festival_2018_001_%28cropped%29.jpg/330px-Sick_of_It_All_-_Reload_Festival_2018_001_%28cropped%29.jpg",
  "sincebyman": "https://milwaukeerecord.com/wp-content/uploads/2018/09/SinceByeMan2-300x214.png",
  "sinking-ships": "https://www.psychedelicbabymag.com/wp-content/uploads/2022/02/Sinking-Ships.jpg",
  "texas-is-the-reason": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/13-04-27_Groezrock_Texas_05.jpg/250px-13-04-27_Groezrock_Texas_05.jpg",
  "the-movielife": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/The_Movielife.jpg/250px-The_Movielife.jpg",
  "the-plot-to-blow-up-the-eiffel-tower": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Plot_to_blow_up.jpg/250px-Plot_to_blow_up.jpg",
  "title-fight": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Title_Fight_2014.jpg/330px-Title_Fight_2014.jpg",
  "turning-point": "https://www.noecho.net/uploads/wysiwyg/turning-point-hardcore-interview.jpg",
  "violent-reaction": "https://revhq.com/cdn/shop/products/REV158-ViolentReaction-1024_400x.jpg",
  "warzone": "https://victoryrecords.com/wp-content/uploads/2020/11/warzone.jpg",
  "world-be-free": "https://www.punkrocktheory.com/sites/default/files/styles/image_style_huge_horizontal_rectangle/public/World-Be-Free1.jpg?itok=xi7YTwtM",
  "where-fear-and-weapons-meet": "https://i.discogs.com/bukcGy1KpkdZMUNDR2nVRLYh8KNc5Nt6GYh96Z77SGo/rs:fit/g:sm/q:90/h:395/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTEwMTIy/NjEtMTY2NjUyMDU5/Mi0xMTI0LnBuZw.jpeg",
  "youth-of-today": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Youth_of_Today_at_SO36_%282010%29.jpg/330px-Youth_of_Today_at_SO36_%282010%29.jpg",
};

// Get image URL for an artist
export function getRevArtistImageUrl(id: string): string | undefined {
  return revArtistImages[id];
}

export const revArtists: RevArtist[] = [
  { id: "youth-of-today", name: "Youth of Today", wikipediaUrl: "https://en.wikipedia.org/wiki/Youth_of_Today" },
  { id: "warzone", name: "Warzone", wikipediaUrl: "https://en.wikipedia.org/wiki/Warzone_(band)" },
  { id: "sick-of-it-all", name: "Sick of It All", wikipediaUrl: "https://en.wikipedia.org/wiki/Sick_of_It_All" },
  { id: "down-to-nothing", name: "Down To Nothing", wikipediaUrl: "https://en.wikipedia.org/wiki/Down_To_Nothing" },
  { id: "praise", name: "Praise" },
  { id: "civ", name: "CIV", wikipediaUrl: "https://en.wikipedia.org/wiki/CIV_(band)" },
  { id: "garrison", name: "Garrison", wikipediaUrl: "https://en.wikipedia.org/wiki/Garrison_(band)" },
  { id: "self-defense-family", name: "Self Defense Family", wikipediaUrl: "https://en.wikipedia.org/wiki/Self_Defense_Family" },
  { id: "calling-hours", name: "Calling Hours" },
  { id: "dag-nasty", name: "Dag Nasty", wikipediaUrl: "https://en.wikipedia.org/wiki/Dag_Nasty" },
  { id: "himsa", name: "Himsa", wikipediaUrl: "https://en.wikipedia.org/wiki/Himsa" },
  { id: "quicksand", name: "Quicksand", wikipediaUrl: "https://en.wikipedia.org/wiki/Quicksand_(American_band)" },
  { id: "new-found-glory", name: "New Found Glory", wikipediaUrl: "https://en.wikipedia.org/wiki/New_Found_Glory" },
  { id: "inside-out", name: "Inside Out", wikipediaUrl: "https://en.wikipedia.org/wiki/Inside_Out_(band)" },
  { id: "side-by-side", name: "Side By Side" },
  { id: "speedway", name: "Speedway" },
  { id: "gameface", name: "Gameface" },
  { id: "chain-of-strength", name: "Chain of Strength", wikipediaUrl: "https://en.wikipedia.org/wiki/Chain_of_Strength" },
  { id: "sinking-ships", name: "Sinking Ships", wikipediaUrl: "https://en.wikipedia.org/wiki/Sinking_Ships" },
  { id: "fall-silent", name: "Fall Silent" },
  { id: "in-my-eyes", name: "In My Eyes", wikipediaUrl: "https://en.wikipedia.org/wiki/In_My_Eyes_(band)" },
  { id: "farside", name: "Farside", wikipediaUrl: "https://en.wikipedia.org/wiki/Farside" },
  { id: "texas-is-the-reason", name: "Texas Is The Reason", wikipediaUrl: "https://en.wikipedia.org/wiki/Texas_Is_The_Reason" },
  { id: "shook-ones", name: "Shook Ones", wikipediaUrl: "https://en.wikipedia.org/wiki/Shook_Ones_(band)" },
  { id: "shelter", name: "Shelter", wikipediaUrl: "https://en.wikipedia.org/wiki/Shelter_(band)" },
  { id: "kill-holiday", name: "Kill Holiday" },
  { id: "sincebyman", name: "Sincebyman", wikipediaUrl: "https://en.wikipedia.org/wiki/Sincebyman" },
  { id: "on-the-might-of-princes", name: "On the Might of Princes", wikipediaUrl: "https://en.wikipedia.org/wiki/On_the_Might_of_Princes" },
  { id: "the-plot-to-blow-up-the-eiffel-tower", name: "The Plot to Blow Up the Eiffel Tower", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Plot_to_Blow_Up_the_Eiffel_Tower" },
  { id: "kiss-it-goodbye", name: "Kiss It Goodbye", wikipediaUrl: "https://en.wikipedia.org/wiki/Kiss_It_Goodbye" },
  { id: "judge", name: "Judge", wikipediaUrl: "https://en.wikipedia.org/wiki/Judge_(band)" },
  { id: "shai-hulud", name: "Shai Hulud", wikipediaUrl: "https://en.wikipedia.org/wiki/Shai_Hulud" },
  { id: "paint-it-black", name: "Paint It Black", wikipediaUrl: "https://en.wikipedia.org/wiki/Paint_It_Black" },
  { id: "dare", name: "Dare" },
  { id: "the-movielife", name: "The Movielife", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Movielife" },
  { id: "drain", name: "Drain", wikipediaUrl: "https://en.wikipedia.org/wiki/Drain_(punk_band)" },
  { id: "curl-up-and-die", name: "Curl Up and Die", wikipediaUrl: "https://en.wikipedia.org/wiki/Curl_Up_and_Die" },
  { id: "elliott", name: "Elliott", wikipediaUrl: "https://en.wikipedia.org/wiki/Elliott_(band)" },
  { id: "no-for-an-answer", name: "No For An Answer" },
  { id: "morning-again", name: "Morning Again", wikipediaUrl: "https://en.wikipedia.org/wiki/Morning_Again" },
  { id: "spaced", name: "Spaced" },
  { id: "capital", name: "Capital" },
  { id: "living-hell", name: "Living Hell" },
  { id: "bold", name: "Bold", wikipediaUrl: "https://en.wikipedia.org/wiki/Bold_(band)" },
  { id: "title-fight", name: "Title Fight", wikipediaUrl: "https://en.wikipedia.org/wiki/Title_Fight" },
  { id: "violent-reaction", name: "Violent Reaction", wikipediaUrl: "https://en.wikipedia.org/wiki/Violent_Reaction" },
  { id: "fell-to-low", name: "Fell To Low" },
  { id: "by-a-thread", name: "By A Thread" },
  { id: "the-rival-mob", name: "The Rival Mob" },
  { id: "the-nerve-agents", name: "The Nerve Agents", wikipediaUrl: "https://en.wikipedia.org/wiki/The_Nerve_Agents" },
  { id: "ignite", name: "Ignite", wikipediaUrl: "https://en.wikipedia.org/wiki/Ignite_(band)" },
  { id: "big-laugh", name: "Big Laugh" },
  { id: "sense-field", name: "Sense Field", wikipediaUrl: "https://en.wikipedia.org/wiki/Sense_Field" },
  { id: "mouthpiece", name: "Mouthpiece", wikipediaUrl: "https://en.wikipedia.org/wiki/Mouthpiece_(band)" },
  { id: "shades-apart", name: "Shades Apart", wikipediaUrl: "https://en.wikipedia.org/wiki/Shades_Apart" },
  { id: "planet-on-a-chain", name: "Planet On A Chain" },
  { id: "be-well", name: "Be Well" },
  { id: "primal-rite", name: "Primal Rite" },
  { id: "battery", name: "Battery", wikipediaUrl: "https://en.wikipedia.org/wiki/Battery_(hardcore_punk_band)" },
  { id: "gorilla-biscuits", name: "Gorilla Biscuits", wikipediaUrl: "https://en.wikipedia.org/wiki/Gorilla_Biscuits" },
  { id: "into-another", name: "Into Another" },
  { id: "world-be-free", name: "World Be Free" },
  { id: "turning-point", name: "Turning Point", wikipediaUrl: "https://en.wikipedia.org/wiki/Turning_Point_(American_band)" },
  { id: "end-of-a-year", name: "End of a Year", wikipediaUrl: "https://en.wikipedia.org/wiki/End_of_a_Year" },
  { id: "forced-order", name: "Forced Order" },
  { id: "drowningman", name: "Drowningman", wikipediaUrl: "https://en.wikipedia.org/wiki/Drowningman" },
  { id: "supertouch", name: "Supertouch" },
  { id: "where-fear-and-weapons-meet", name: "Where Fear and Weapons Meet", wikipediaUrl: "https://en.wikipedia.org/wiki/Where_Fear_and_Weapons_Meet_(band)" },
];

export function getAllRevArtists(): RevArtist[] {
  return revArtists.sort((a, b) => a.name.localeCompare(b.name));
}

export function getRevArtistById(id: string): RevArtist | undefined {
  return revArtists.find((a) => a.id === id);
}

export function searchRevArtists(query: string): RevArtist[] {
  const lowerQuery = query.toLowerCase();
  return revArtists.filter((a) => a.name.toLowerCase().includes(lowerQuery));
}
