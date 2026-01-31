/**
 * AmRep release artwork
 */

const amrepAlbumImages: Record<number, string> = {
  1: "https://upload.wikimedia.org/wikipedia/en/4/4c/Cows_Peacetika.JPG",
  3: "https://upload.wikimedia.org/wikipedia/en/4/40/Helios_Creed_-_Lactating_Purple.jpg",
  4: "https://i.discogs.com/_UZtMIcz6PYthFJxpIVfIQjye5jy18u2KWD_-JCvsBs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ2ODA1/Ny0xNzE5MTY1NjM4/LTgyMzMuanBlZw.jpeg",
  6: "https://upload.wikimedia.org/wikipedia/en/9/91/God_Bullies_-_War_on_Everybody.jpeg",
  9: "https://i.discogs.com/LnnSq9RdZyr_lKb7tnYUjSc5cVpEeChpR7J9GEQM3-Q/rs:fit/g:sm/q:90/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1ODk4/NC0xMTE2NDQzNjc1/LmdpZg.jpeg",
  10: "https://upload.wikimedia.org/wikipedia/en/9/9b/Helios_Creed_-_Kiss_to_the_Brain.jpeg",
  12: "https://upload.wikimedia.org/wikipedia/en/1/1d/Hammerhead_-_Ethereal_Killer.jpg",
  14: "https://upload.wikimedia.org/wikipedia/en/1/12/Big_Metal_Birds.jpg",
  15: "https://upload.wikimedia.org/wikipedia/en/6/68/Cows_Sexy_Pee_Story.JPG",
  17: "https://upload.wikimedia.org/wikipedia/en/0/0d/Boss_Hog_Girl_Positive.jpg",
  18: "https://upload.wikimedia.org/wikipedia/en/d/de/Surgery_-_Trim%2C_9th_Ward_High_Roller.jpeg",
  19: "https://i.discogs.com/QJ2uc5ktcpi1STRZ5H8vGaNf9Qj-YLldLvCDa2NymSM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNTA5/ODItMTQ0ODA0Njg1/OC04MDkyLmpwZWc.jpeg",
  20: "https://i.discogs.com/45fHwuKwXlvRP-wsuZriqO5mrIB_Opau0HkvnIpNa7A/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1Mzk2/MS0xMzAyODc4OTY5/LmpwZWc.jpeg",
  21: "https://i.discogs.com/8pibZ_aYJkV_42SN9n2LJhv-RmZtq3HjCVvQeIXa5kw/rs:fit/g:sm/q:90/h:350/w:347/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0OTUw/ODUtMTIyMzk5MTI4/My5qcGVn.jpeg",
  22: "https://upload.wikimedia.org/wikipedia/en/4/43/Today_is_the_Day_Supernova.jpg",
  24: "https://upload.wikimedia.org/wikipedia/en/b/bf/Hammerhead_-_Evil_Twin.jpeg",
  26: "https://upload.wikimedia.org/wikipedia/en/0/07/Hammerhead_-_Into_the_Vortex.jpg",
  28: "https://upload.wikimedia.org/wikipedia/en/a/a5/Cows_Orphans_Tragedy.JPG",
  30: "https://i.discogs.com/sBLNotmYVHY56onX3ZclzLIaLiw-MCilewXpGR69dYQ/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMTMx/MTYtMTE5MzAwNTI5/Mi5qcGVn.jpeg",
  31: "https://upload.wikimedia.org/wikipedia/en/7/7c/Prick.png",
  33: "https://upload.wikimedia.org/wikipedia/en/e/e5/Today_Is_the_Day_Willpower.JPG",
  35: "https://i.discogs.com/jDOTL2W65Mazlzbnc7zCX4NYcJs727E-d50Nlke37GY/rs:fit/g:sm/q:90/h:595/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4ODY2/OC0xMjUzMDg1NjY0/LmpwZWc.jpeg",
  36: "https://upload.wikimedia.org/wikipedia/en/9/90/Helmet-BornAnnoying.jpg",
  39: "https://upload.wikimedia.org/wikipedia/en/6/6f/ScattredUnsane.jpg",
  41: "https://i.discogs.com/6xIpKmY0kYM_uT7IvZy3o2P6Ev90TSIAKn4xqa1JX2U/rs:fit/g:sm/q:90/h:250/w:250/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzOTA4/OTgtMTM1NjY1NDg0/My00NTE3LmpwZWc.jpeg",
  42: "https://i.discogs.com/KaTFUxqgAdGTRqAJCRJux37UmMhecg_cI6RQY290xPk/rs:fit/g:sm/q:90/h:593/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg0ODI2/NC0xMTY1MjQyMTI1/LmpwZWc.jpeg",
  46: "https://upload.wikimedia.org/wikipedia/en/2/21/Today_Is_the_Day_Today_Is_the_Day.jpg",
  47: "https://upload.wikimedia.org/wikipedia/en/4/43/Cows_-_Old_Gold.jpg",
  48: "https://i.discogs.com/DzG3laPT-hVdb5rwmMVfpHAWaNEW23iB3LLeCvW4xkg/rs:fit/g:sm/q:90/h:579/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2NDYz/ODctMTIzNDM4NDY0/Ny5qcGVn.jpeg",
  49: "https://i.discogs.com/WbE9OjtCsSIDrXRPtzJ9XVMUnQJdH37jcewY850AfOA/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyODc3/MzItMTc1Nzg5OTU3/OS03NDk5LnBuZw.jpeg",
  50: "https://upload.wikimedia.org/wikipedia/en/6/6e/Cows_Whorn.jpeg",
  51: "https://i.discogs.com/fw9J7oLDq7V9klreMGZeLSP_FFA2aw-DKc-zk8smgXQ/rs:fit/g:sm/q:90/h:450/w:450/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NTgx/NTctMTI0MTQ0NDAx/NS5qcGVn.jpeg",
  54: "https://i.discogs.com/8vn3xVAWmh5UXISnMaC4ei3Ub9HcDb1QBgRLtWu3iUo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg2OTk2/Ny0xMTY3NDY2ODg1/LmpwZWc.jpeg",
  55: "https://i.discogs.com/13RaBNgoQ_I9GARxJSX58HOzTaPAs1zSSj0PpvX8XLU/rs:fit/g:sm/q:90/h:522/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NTg0/MjUtMTU5NTgzNDk5/MS0xNzY3LmpwZWc.jpeg",
  56: "https://upload.wikimedia.org/wikipedia/en/7/7e/Feedtime_-_Billy.jpg",
  57: "https://i.discogs.com/JHtQcwPGt_ptEdHi2mPsxFKOFA46nrCR6kW1Ihof2e8/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI3MTA0/MzktMTI5NzU3MjA5/Ny5qcGVn.jpeg",
  58: "https://i.discogs.com/mlnLjHrBAt7gOrIzLUcTnPpAK1AIFAPBPveS25fietg/rs:fit/g:sm/q:90/h:170/w:170/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMjk2/MjctMTIxMDEzMDA3/NS5qcGVn.jpeg",
  59: "https://i.discogs.com/5wtOKFuq0LfWig8wjGqaDgvngT6ulYRR4gSj17BA_3c/rs:fit/g:sm/q:90/h:300/w:299/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMwNjgw/MTEtMTMzMDExMDg5/Ny5qcGVn.jpeg",
  62: "https://upload.wikimedia.org/wikipedia/en/f/f9/Servotronspare.jpg",
  63: "https://upload.wikimedia.org/wikipedia/en/c/c4/Melvins_Singles_1-12.jpg",
  64: "https://upload.wikimedia.org/wikipedia/en/7/72/Melvins-honky.jpg",
  65: "https://i.discogs.com/7-KAgc60xUOzdQYK6xwRO4K62Wn71cLRQqaJS4X09UI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc2MzE0/OTItMTQ0NTUzMzgz/Ny04NDcwLmpwZWc.jpeg",
  66: "https://upload.wikimedia.org/wikipedia/en/b/b1/Sorry_In_Pig_Minor.png",
  67: "https://i.discogs.com/MWbM1AYavegphkLmb7IPfZrtYdM6Y6OyLUmjGIJBnKg/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0NDE5/ODktMTczODcwMDE2/OC0xOTAzLmpwZWc.jpeg",
  68: "https://i.discogs.com/SsOYvBxMqVd379RoNcBCVmLK-Abn1uJFzh03rXLb17Y/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0NDE5/ODctMTI4NDUyMDQz/NC5qcGVn.jpeg",
  69: "https://upload.wikimedia.org/wikipedia/en/8/85/Letthemeatpussy.JPG",
  70: "https://i.discogs.com/pIW6SnXDe9QM3o8JtjuRsbYtbD4HvFBVJ6ZH2rwQVGo/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwOTk2/ODAtMTQ3MjQzMTMz/My03NTEwLmpwZWc.jpeg",
  72: "https://upload.wikimedia.org/wikipedia/en/8/8c/Melvins-aatfc.jpg",
  74: "https://upload.wikimedia.org/wikipedia/en/7/75/Melvins_vs._Minneapolis.jpg",
  78: "https://upload.wikimedia.org/wikipedia/en/6/65/Melvins2010.jpg",
  83: "https://upload.wikimedia.org/wikipedia/en/0/0c/Melvins_-_The_Bulls_%26_The_Bees_front_cover.jpg",
  84: "https://upload.wikimedia.org/wikipedia/en/7/75/Freak_Puke-cdcover-.jpg",
  102: "https://upload.wikimedia.org/wikipedia/en/2/25/Drinkin%27%2C_Lechin%27_%26_Lyin%27.jpg",
  106: "https://upload.wikimedia.org/wikipedia/en/d/d6/Teenage_Jesus_and_the_Jerks_-_Teenage_Jesus_and_the_Jerks.jpg",
  107: "https://upload.wikimedia.org/wikipedia/en/7/7f/Crystal_fairy_-_album_cover.jpg",
  108: "https://upload.wikimedia.org/wikipedia/en/f/ff/Cows_Taint_Pluribus_Taint_Unum.JPG",
  109: "https://upload.wikimedia.org/wikipedia/en/4/4d/Cherubs_-_Heroin_Man.jpg",
  110: "https://upload.wikimedia.org/wikipedia/en/8/86/Lydia_Lunch_-_Queen_of_Siam.jpeg",
  111: "https://i.discogs.com/v2_BTUSALDDhs9zwIKqAc7xsMXmBLX7TN_dXafUnMZE/rs:fit/g:sm/q:90/h:225/w:225/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNTE2/MjU1LTE0OTkwMzg0/NTctODI0OC5qcGVn.jpeg",
  114: "https://upload.wikimedia.org/wikipedia/en/d/d6/Gluey_orig.jpg",
  115: "https://upload.wikimedia.org/wikipedia/en/3/3f/The_Cows_Effete_and_Impudent_Snobs.jpg",
  117: "https://upload.wikimedia.org/wikipedia/en/5/5c/Pinkus_Abortion_Technician_%282018%29_cover.jpg",
  118: "https://upload.wikimedia.org/wikipedia/en/a/a5/A_Walk_with_Love_%26_Death.jpg",
  120: "https://upload.wikimedia.org/wikipedia/en/7/74/God_Bullies_-_Mama_Womb_Womb.jpeg",
  125: "https://i.discogs.com/fYecSeKBJfkwgAc2h7oOFTEtE8e4Yr3lPZs1VUJuhy8/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQzMjkz/NzYtMTU3MDk5MTIw/My0zNTcwLmpwZWc.jpeg",
  129: "https://upload.wikimedia.org/wikipedia/en/b/b8/Melvins-electroretard.jpg",
  138: "https://i.discogs.com/Emi9kVIWJOq_QHxT6Az1wAdkp7NdDScR2O8ih-Ru03Y/rs:fit/g:sm/q:90/h:495/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0MDgy/MzktMTMxOTU1Nzgy/Ni5qcGVn.jpeg",
  164: "https://i.discogs.com/szOW98gLop_UYkth-2DHPwbqrdtNmxNwlx1gDJmLM_k/rs:fit/g:sm/q:90/h:600/w:593/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgyODcw/MC0xMTYzMDA2NDg3/LmpwZWc.jpeg",
};

/**
 * Get album artwork for an AmRep release
 */
export function getAmrepAlbumImage(releaseId: number): string | null {
  return amrepAlbumImages[releaseId] ?? null;
}

/**
 * Check if a release has custom artwork (not fallback)
 */
export function hasAmrepAlbumArtwork(releaseId: number): boolean {
  return releaseId in amrepAlbumImages;
}
