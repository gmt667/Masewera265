// Comprehensive Malawian Football Historical, Competition, and Operational Data
// Sourced from FAM (Football Association of Malawi), SULOM, and documented sporting records.

export interface FootballSource {
  title: string;
  url: string;
  reviewed: string;
  note?: string;
}

export const footballSources: FootballSource[] = [
  { title: "FAM federation badge reference", url: "https://www.plus.fifa.com/en/showcase/football-association-of-malawi/9594524d-f279-4450-a1f8-1c67f2e9fc99", reviewed: "15 October 2026", note: "Used as the sourced federation identity mark for Flames, Scorchers and age-group profiles; no separate national-team crest is asserted." },
  { title: "FAM 2026/27 Season and FDH Bank Premiership Kick-off", url: "https://fam.mw/fam-sets-18-april-kick-off-for-2026-27-season/", reviewed: "15 October 2026", note: "Current top-flight naming and season start notice; does not supply live standings." },
  { title: "FAM Football Competitions Calendar 2025/26", url: "https://fam.mw/fam-football-competitions-calendar-2025-2026-season/", reviewed: "14 October 2026", note: "Authoritative national calendar & competition structure" },
  { title: "FAM Scorchers Senior Women National Team Profile", url: "https://fam.mw/womens-senior-national-team/", reviewed: "14 October 2026", note: "National team selections, squad lists & competition history" },
  { title: "FAM National Division League (NDL) Official Launch & Standings", url: "https://fam.mw/ndl-2025-26/", reviewed: "14 October 2026", note: "Second-tier league structure & regional feeder system" },
  { title: "FAM Pyramid Restructuring: Regional Leagues Alignment", url: "https://fam.mw/fam-renames-regional-leagues-to-align-football-pyramid/", reviewed: "14 October 2026", note: "Division One, Division Two & District Championship pyramid alignment" },
  { title: "SULOM (Super League of Malawi) Official Records", url: "https://sulom.mw/", reviewed: "14 October 2026", note: "Premiership standings, fixtures, results & player statistics" },
  { title: "COSAFA Official Tournament Archives", url: "https://cosafa.com/", reviewed: "14 October 2026", note: "COSAFA Senior Men & Women's Championships records" },
  { title: "CAF (Confederation of African Football) AFCON Records", url: "https://cafonline.com/", reviewed: "14 October 2026", note: "Malawi Flames appearances (1984, 2010, 2021)" },
];

export interface FootballCompetitionDetail {
  slug: string;
  name: string;
  tier: string;
  category: "League" | "Cup" | "Women" | "Grassroots";
  organizer: string;
  established: string;
  currentChampion: string;
  format: string;
  state: string;
  summary: string;
  teamsCount: number;
  season?: string;
  sponsor?: string;
  historicalNames?: { period: string; name: string }[];
  sourceUrl?: string;
  reviewedAt?: string;
  standings?: {
    rank: number;
    team: string;
    teamSlug: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gf: number;
    ga: number;
    gd: number;
    points: number;
  }[];
}

export const footballCompetitions: FootballCompetitionDetail[] = [
  {
    slug: "tnm-super-league",
    name: "FDH Bank Premiership",
    tier: "Tier 1",
    category: "League",
    organizer: "Super League of Malawi (SULOM) / FAM",
    established: "1986",
    currentChampion: "Not yet verified for 2026/27",
    format: "16 clubs · 30 rounds · Round-robin home & away",
    state: "Active 2026/27 season · current results unavailable",
    summary: "Malawi's current top-flight competition. FAM announced the FDH Bank Premiership for the 2026/27 season, with the season scheduled to begin on 25 April 2026. Historical editions retain their sponsor-era names.",
    teamsCount: 16,
    season: "2026/27",
    sponsor: "FDH Bank",
    historicalNames: [
      { period: "2025/26 and earlier in the supplied archive", name: "TNM Super League" },
      { period: "Historical editions", name: "Super League / other sponsor-era names" },
    ],
    sourceUrl: "https://fam.mw/fam-sets-18-april-kick-off-for-2026-27-season/",
    reviewedAt: "2026-10-15",
    /* 2026/27 standings are intentionally omitted until a connected source supplies them. */
    standings: undefined,
    /*
      { rank: 1, team: "FCB Nyasa Big Bullets", teamSlug: "nyasa-big-bullets", played: 26, won: 18, drawn: 6, lost: 2, gf: 54, ga: 18, gd: 36, points: 60 },
      { rank: 2, team: "Silver Strikers", teamSlug: "silver-strikers", played: 26, won: 17, drawn: 7, lost: 2, gf: 49, ga: 17, gd: 32, points: 58 },
      { rank: 3, team: "Mighty Mukuru Wanderers", teamSlug: "mighty-wanderers", played: 26, won: 15, drawn: 7, lost: 4, gf: 42, ga: 19, gd: 23, points: 52 },
      { rank: 4, team: "Moyale Barracks", teamSlug: "moyale-barracks", played: 26, won: 11, drawn: 9, lost: 6, gf: 31, ga: 24, gd: 7, points: 42 },
      { rank: 5, team: "Kamuzu Barracks", teamSlug: "kamuzu-barracks", played: 26, won: 10, drawn: 10, lost: 6, gf: 29, ga: 22, gd: 7, points: 40 },
      { rank: 6, team: "Civil Service United", teamSlug: "civil-service-united", played: 26, won: 9, drawn: 11, lost: 6, gf: 28, ga: 24, gd: 4, points: 38 },
      { rank: 7, team: "MAFCO FC", teamSlug: "mafco-fc", played: 26, won: 9, drawn: 8, lost: 9, gf: 26, ga: 28, gd: -2, points: 35 },
      { rank: 8, team: "Dedza Dynamos", teamSlug: "dedza-dynamos", played: 26, won: 8, drawn: 9, lost: 9, gf: 29, ga: 33, gd: -4, points: 33 },
      { rank: 9, team: "Karonga United", teamSlug: "karonga-united", played: 26, won: 8, drawn: 7, lost: 11, gf: 27, ga: 35, gd: -8, points: 31 },
      { rank: 10, team: "Creck Sporting Club", teamSlug: "creck-sporting", played: 26, won: 7, drawn: 9, lost: 10, gf: 24, ga: 31, gd: -7, points: 30 },
      { rank: 11, team: "Mighty Waka Waka Tigers", teamSlug: "mighty-tigers", played: 26, won: 6, drawn: 10, lost: 10, gf: 22, ga: 32, gd: -10, points: 28 },
      { rank: 12, team: "Chitipa United", teamSlug: "chitipa-united", played: 26, won: 6, drawn: 8, lost: 12, gf: 23, ga: 36, gd: -13, points: 26 },
      { rank: 13, team: "Bangwe All Stars", teamSlug: "bangwe-all-stars", played: 26, won: 5, drawn: 9, lost: 12, gf: 20, ga: 34, gd: -14, points: 24 },
      { rank: 14, team: "FOMO FC", teamSlug: "fomo-fc", played: 26, won: 5, drawn: 7, lost: 14, gf: 18, ga: 39, gd: -21, points: 22 },
      { rank: 15, team: "Baka City", teamSlug: "baka-city", played: 26, won: 3, drawn: 8, lost: 15, gf: 15, ga: 45, gd: -30, points: 17 },
      { rank: 16, team: "Songani Veterans / Regional Promoted", teamSlug: "songani-fc", played: 26, won: 2, drawn: 7, lost: 17, gf: 14, ga: 49, gd: -35, points: 13 },
    ]*/
  },
  {
    slug: "national-division-league",
    name: "National Division League (NDL)",
    tier: "Tier 2",
    category: "League",
    organizer: "Football Association of Malawi (FAM)",
    established: "2024",
    currentChampion: "Inaugural Edition Running",
    format: "National second tier bridging regional leagues to the Premiership",
    state: "Official pyramid tier 2 introduced by FAM",
    summary: "Created to raise competitive standards between the top flight and regional leagues, providing direct promotion into the Super League.",
    teamsCount: 12
  },
  {
    slug: "fdh-bank-cup",
    name: "FDH Bank Cup",
    tier: "Cup",
    category: "Cup",
    organizer: "FAM / FDH Bank",
    established: "2021",
    currentChampion: "FCB Nyasa Big Bullets",
    format: "Knockout competition open to Premiership and regional preliminary winners",
    state: "Documented cup edition",
    summary: "One of Malawi's most prestigious and lucrative knockout tournaments, pitting top-flight clubs against giant-killing regional contenders.",
    teamsCount: 32
  },
  {
    slug: "castel-challenge-cup",
    name: "Castel Challenge Cup",
    tier: "Cup",
    category: "Cup",
    organizer: "FAM / Castel Malawi",
    established: "2023",
    currentChampion: "FCB Nyasa Big Bullets",
    format: "All-inclusive knockout featuring district, regional and national phases",
    state: "Documented national cup",
    summary: "Malawi's widest football competition, engaging hundreds of teams from grassroots district preliminary stages through to the national final.",
    teamsCount: 64
  },
  {
    slug: "airtel-top-8",
    name: "Airtel Top 8",
    tier: "Cup",
    category: "Cup",
    organizer: "SULOM / Airtel Malawi",
    established: "2017",
    currentChampion: "Silver Strikers",
    format: "Elite knockout tournament contested by top 8 Super League finishers",
    state: "Documented seasonal cup",
    summary: "High-octane tournament contested exclusively by the top eight teams of the previous Super League season.",
    teamsCount: 8
  },
  {
    slug: "nbm-womens-premiership",
    name: "NBM Women's Premiership",
    tier: "Women Tier 1",
    category: "Women",
    organizer: "FAM / National Bank of Malawi",
    established: "2022",
    currentChampion: "Ascent Soccer / MDF Lionesses",
    format: "National women's league with regional championship playoffs",
    state: "Official national women's league",
    summary: "The flagship domestic league for women's football in Malawi, providing the pathway for Scorchers national team stars.",
    teamsCount: 12
  },
  {
    slug: "fam-charity-shield",
    name: "FAM Charity Shield",
    tier: "Cup",
    category: "Cup",
    organizer: "Football Association of Malawi (FAM)",
    established: "2016",
    currentChampion: "FCB Nyasa Big Bullets",
    format: "Pre-season mini-tournament / charity curtain-raiser",
    state: "Documented season opener",
    summary: "The traditional season opener matching league and cup champions to raise funds for humanitarian and educational causes across Malawi.",
    teamsCount: 4
  },
  {
    slug: "regional-division-one",
    name: "Regional Division League One",
    tier: "Tier 3",
    category: "Grassroots",
    organizer: "Southern, Central & Northern Region Football Associations",
    established: "Restructured May 2026",
    currentChampion: "Regional Champions",
    format: "Three regional divisions (CRFA, SRFA, NRFA)",
    state: "FAM pyramid alignment",
    summary: "The competitive tier beneath the National Division League, feeding into the national tier 2.",
    teamsCount: 48
  },
  {
    slug: "district-championship",
    name: "District Championship",
    tier: "Tier 5",
    category: "Grassroots",
    organizer: "District Football Associations / FAM",
    established: "Restructured May 2026",
    currentChampion: "District Selections",
    format: "Grassroots leagues across all 28 districts of Malawi",
    state: "Community foundation",
    summary: "The base of the Malawian football pyramid, discovering raw talent in every district from Chitipa to Nsanje.",
    teamsCount: 120
  }
];

export interface FootballTimelineItem {
  year: string;
  category: "National Team" | "Club Football" | "Women's Football" | "Milestone";
  title: string;
  description: string;
  verifiedSource: string;
}

export const footballTimeline: FootballTimelineItem[] = [
  {
    year: "1964",
    category: "Milestone",
    title: "Independence of Malawi and Birth of National Football",
    description: "Following independence on 6 July 1964, the national football setup was officially established under what became the Football Association of Malawi (FAM).",
    verifiedSource: "FAM History Records & Malawi National Archives"
  },
  {
    year: "1967-1968",
    category: "Milestone",
    title: "Official FIFA and CAF Affiliation",
    description: "The Football Association of Malawi was formally admitted as a member of FIFA in 1967 and CAF (Confederation of African Football) in 1968, allowing entry into international tournaments.",
    verifiedSource: "FIFA & CAF Official Directories"
  },
  {
    year: "1978",
    category: "National Team",
    title: "All-Africa Games Bronze Medal & CECAFA Championship",
    description: "The Flames captured the Bronze medal at the 1978 All-Africa Games in Algiers, defeating Nigeria on penalties. Months later, Malawi hosted and won the CECAFA Cup, defeating Zambia 3-2 in the final with Kinnah Phiri starring.",
    verifiedSource: "CECAFA Archives & RSSSF International Records"
  },
  {
    year: "1979",
    category: "National Team",
    title: "Back-to-Back CECAFA Cup Champions",
    description: "Under English coach Ted Powell, The Flames defended their regional crown in Nairobi, Kenya, beating Kenya 3-2 in the final to seal a historic consecutive CECAFA triumph.",
    verifiedSource: "CECAFA Official Tournament Archive"
  },
  {
    year: "1984",
    category: "National Team",
    title: "Historic AFCON Debut in Côte d'Ivoire",
    description: "Malawi qualified for the Africa Cup of Nations for the first time in history. Drawn in Bouaké against Algeria, Nigeria, and Ghana, the Flames scored twice against 1982 finalists Nigeria in a thrilling 2-2 draw.",
    verifiedSource: "CAF AFCON 1984 Official Documentation"
  },
  {
    year: "1986",
    category: "Club Football",
    title: "Inauguration of the National Super League",
    description: "The national Super League was launched to unite regional club competitions into a coherent Malawian championship. Bata Bullets (now FCB Nyasa Big Bullets) won the inaugural championship.",
    verifiedSource: "SULOM Official League History"
  },
  {
    year: "1987",
    category: "National Team",
    title: "All-Africa Games Bronze in Nairobi",
    description: "The Flames clinched their second All-Africa Games bronze medal in Nairobi, defeating Cameroon 3-1 in the third-place playoff with goals from Peterkins Kayira and Lawrence Waya.",
    verifiedSource: "RSSSF All-Africa Games Records"
  },
  {
    year: "1988",
    category: "National Team",
    title: "Third CECAFA Championship Title",
    description: "Malawi secured their third CECAFA Cup in Blantyre, defeating Zambia in the final after extra time, cementing an era of regional supremacy.",
    verifiedSource: "FAM Archive Records"
  },
  {
    year: "2010",
    category: "National Team",
    title: "Memorable AFCON Victory in Angola (Malawi 3-0 Algeria)",
    description: "In Luanda, The Flames stunned World Cup-bound Algeria 3-0 in their AFCON 2010 opener with goals from Russell Mwafulirwa, Elvis Kafoteka, and Davie Banda under coach Kinnah Phiri.",
    verifiedSource: "CAF AFCON 2010 Match Records"
  },
  {
    year: "2021",
    category: "National Team",
    title: "Historic Round of 16 AFCON Run in Cameroon",
    description: "Malawi qualified for AFCON 2021 in Cameroon, advancing to the knockout stages for the first time after holding eventual champions Senegal to a 0-0 draw and beating Zimbabwe 2-1. Gabadinho Mhango scored three unforgettable goals, including a 40-yard screamer vs Morocco.",
    verifiedSource: "CAF AFCON 2021 Official Report"
  },
  {
    year: "2023",
    category: "Women's Football",
    title: "The Scorchers Crowned COSAFA Women's Champions",
    description: "The Malawi Scorchers won their maiden COSAFA Women's Championship in South Africa, winning all five matches including a 2-1 final victory over Zambia. Captain Temwa Chawinga claimed both the Golden Boot (9 goals) and Player of the Tournament.",
    verifiedSource: "COSAFA Official Women's Championship 2023 Archive"
  },
  {
    year: "2023",
    category: "Club Football",
    title: "FCB Nyasa Big Bullets Historic Quadruple",
    description: "Under Zimbabwean coach Kalisto Pasuwa, Bullets achieved an unprecedented sweep of all four major domestic honours: the TNM Super League, FDH Bank Cup, Castel Challenge Cup, and Airtel Top 8.",
    verifiedSource: "SULOM & FAM Domestic Season Review"
  },
  {
    year: "2024",
    category: "Women's Football",
    title: "Global Recognition: Chawinga Sisters Dominate World Football",
    description: "Tabitha Chawinga won the Division 1 Féminine Golden Boot with PSG, earned a historic Ballon d'Or nomination and moved to Lyon. Her sister Temwa Chawinga broke the single-season scoring record in the American NWSL with Kansas City Current, winning the NWSL Golden Boot.",
    verifiedSource: "NWSL, UEFA & France Football Official Records"
  }
];

export interface FootballLegend {
  slug: string;
  name: string;
  nickname: string;
  role: "Striker" | "Midfielder" | "Defender" | "Goalkeeper" | "Coach / Player";
  era: string;
  clubs: string[];
  capsGoals?: string;
  honours: string[];
  summary: string;
  verifiedSource: string;
}

export const footballLegends: FootballLegend[] = [
  {
    slug: "kinnah-phiri",
    name: "Kinnah Phiri",
    nickname: "Electric Workhorse",
    role: "Striker",
    era: "1973–1981",
    clubs: ["Big Bullets", "Manzini Wanderers (Eswatini)"],
    capsGoals: "117 caps / 71 goals (National Record)",
    honours: ["CECAFA Champions 1978, 1979", "All-Africa Games Bronze 1978", "AFCON 2010 Head Coach"],
    summary: "Widely regarded as Malawi's greatest ever footballer. With 71 goals in 117 international matches, Phiri ranks among the top 10 international goalscorers in world football history. He later coached the Flames to AFCON 2010.",
    verifiedSource: "RSSSF International Scoring Records & FAM Official Profiles"
  },
  {
    slug: "ernest-mtawali",
    name: "Ernest Mtawali",
    nickname: "Chirambo",
    role: "Midfielder",
    era: "1985–2003",
    clubs: ["Mighty Wanderers", "Mamelodi Sundowns (RSA)", "Toulouse (France)", "Al-Wehda (Saudi Arabia)", "Orlando Pirates (RSA)"],
    capsGoals: "70+ caps / 12 goals",
    honours: ["NSL Players' Player of the Year (South Africa)", "1993/94 South Africa Champion with Sundowns"],
    summary: "One of the most gifted midfielders to emerge from Southern Africa. Mtawali enjoyed a stellar professional career in South Africa, France, and Argentina, earning international praise for his exceptional vision and passing range.",
    verifiedSource: "Premier Soccer League (PSL) Archives & FAM Records"
  },
  {
    slug: "jack-chamangwana",
    name: "Jack Chamangwana",
    nickname: "Africa",
    role: "Defender",
    era: "1975–1985",
    clubs: ["Mighty Wanderers", "Kaizer Chiefs (South Africa)"],
    capsGoals: "133 caps / 10 goals",
    honours: ["CECAFA Champions 1978, 1979", "Kaizer Chiefs Captain & Head Coach"],
    summary: "A towering figure in African football defense, Chamangwana was capped over 130 times for Malawi, led Mighty Wanderers and captained South African powerhouse Kaizer Chiefs, where he also managed.",
    verifiedSource: "Kaizer Chiefs Heritage Archive & FAM Records"
  },
  {
    slug: "young-chimodzi",
    name: "Young Chimodzi",
    nickname: "Master of Defense",
    role: "Defender",
    era: "1979–1995",
    clubs: ["Silver Strikers"],
    capsGoals: "159 caps / 13 goals (Malawi Appearance Record)",
    honours: ["All-Africa Games Bronze 1987", "CECAFA Cup 1988", "Flames Head Coach 2014-2015"],
    summary: "Malawi's all-time record appearance holder with 159 caps. A calm, authoritative centre-back who spent his entire domestic career anchored at Silver Strikers before serving multiple tenures on the national coaching staff.",
    verifiedSource: "RSSSF Century Club & SULOM Archives"
  },
  {
    slug: "peterkins-kayira",
    name: "Peterkins Kayira",
    nickname: "The Magician",
    role: "Midfielder",
    era: "1983–1996",
    clubs: ["Bata Bullets", "Apostel Club (Belgium)", "Mighty Tigers"],
    capsGoals: "102 caps / 18 goals",
    honours: ["All-Africa Games Bronze 1987", "CECAFA Champions 1988", "Multiple Super League Titles"],
    summary: "Revered for his mesmerising left foot, set-piece precision, and dribbling wizardry. Kayira was one of the first Malawians to play professional club football in Europe (Belgium).",
    verifiedSource: "FAM Historical Archives"
  },
  {
    slug: "temwa-chawinga",
    name: "Temwa Chawinga",
    nickname: "The Flash",
    role: "Striker",
    era: "2016–Present",
    clubs: ["Kvarnsvedens IK (Sweden)", "Wuhan Jiangda (China)", "Kansas City Current (USA)"],
    capsGoals: "25+ caps / 30+ goals for Scorchers",
    honours: ["COSAFA Women's Champions 2023", "COSAFA Golden Boot & Best Player 2023", "World Top Goalscorer 2023 (63 goals)", "NWSL Golden Boot 2024 (20 goals)"],
    summary: "A global superstar in women's football. Crowned the world's highest goalscorer across all competitions in 2023 (63 goals for club and country) and shattered the all-time single season scoring record in the American NWSL.",
    verifiedSource: "NWSL, IFFHS World Scoring Archives & COSAFA"
  },
  {
    slug: "tabitha-chawinga",
    name: "Tabitha Chawinga",
    nickname: "Queen Tabitha",
    role: "Striker",
    era: "2014–Present",
    clubs: ["Kvarnsvedens IK", "Jiangsu Suning", "Wuhan Jiangda", "Inter Milan (Italy)", "PSG (France)", "Olympique Lyonnais (France)"],
    capsGoals: "35+ caps / 35+ goals for Scorchers",
    honours: ["Ballon d'Or Féminin Nominee 2024", "Serie A Women Golden Boot 2023", "D1 Féminine Golden Boot & Best Player 2024", "African Women's Player of the Year Top 3"],
    summary: "The pioneer of Malawian women's football on the world stage. Won the Golden Boot in Sweden, China, Italy (with Inter Milan) and France (with PSG), becoming the first African woman ever nominated for the Ballon d'Or.",
    verifiedSource: "France Football Ballon d'Or Records & UEFA / Serie A Femminile"
  },
  {
    slug: "gabadinho-mhango",
    name: "Hellings Gabadinho Mhango",
    nickname: "Gaba",
    role: "Striker",
    era: "2012–Present",
    clubs: ["Big Bullets", "Bloemfontein Celtic", "Bidvest Wits", "Orlando Pirates", "AmaZulu", "Moroka Swallows"],
    capsGoals: "68 caps / 17 goals",
    honours: ["South African PSL Golden Boot 2019/20", "PSL Champion with Bidvest Wits", "AFCON 2021 Team of the Tournament (3 goals)"],
    summary: "Famed for his explosive pace, direct dribbling and sensational shooting. Mhango captured the PSL Golden Boot in South Africa with Orlando Pirates and was the sensation of AFCON 2021 with his 40-yard goal against Morocco.",
    verifiedSource: "CAF AFCON 2021 Official Report & PSL Records"
  },
  {
    slug: "essau-kanyenda",
    name: "Essau Kanyenda",
    nickname: "Black Mamba",
    role: "Striker",
    era: "1999–2015",
    clubs: ["FC Dwasco", "Jomo Cosmos (RSA)", "Rostov (Russia)", "Lokomotiv Moscow (Russia)", "Polokwane City"],
    capsGoals: "72 caps / 19 goals",
    honours: ["PSL Top Scorer 2002", "AFCON 2010 squad member", "First Malawian in UEFA Champions League qualifiers"],
    summary: "A powerhouse striker who became a legend in the Russian Premier League with FC Rostov and Lokomotiv Moscow after dominating South African football with Jomo Cosmos.",
    verifiedSource: "Russian Football Premier League Archive & FAM"
  },
  {
    slug: "joseph-kamwendo",
    name: "Joseph Kamwendo",
    nickname: "Shakira",
    role: "Midfielder",
    era: "2003–2019",
    clubs: ["Mighty Wanderers", "CAPS United (Zimbabwe)", "Nordsjælland (Denmark)", "Orlando Pirates", "TP Mazembe (DRC)"],
    capsGoals: "104 caps / 6 goals",
    honours: ["Zimbabwe Premier League Soccer Star of the Year 2005 (First Foreigner)", "CAF Champions League Winner 2015 with TP Mazembe", "Multiple Super League Titles"],
    summary: "A midfield conductor endowed with sublime technique. The first foreign player to be named Soccer Star of the Year in Zimbabwe, Kamwendo also won the CAF Champions League with DR Congo giants TP Mazembe.",
    verifiedSource: "CAF Champions League Archives & Zimbabwe FA"
  }
];

export interface FootballDerby {
  slug: string;
  name: string;
  teams: [string, string];
  teamSlugs: [string, string];
  city: string;
  stadium: string;
  firstPlayed: string;
  description: string;
  headToHead: {
    totalMatches: number;
    team1Wins: number;
    team2Wins: number;
    draws: number;
  };
  keyMoments: string[];
}

export const footballDerbies: FootballDerby[] = [
  {
    slug: "blantyre-derby",
    name: "The Blantyre Derby",
    teams: ["FCB Nyasa Big Bullets", "Mighty Mukuru Wanderers"],
    teamSlugs: ["nyasa-big-bullets", "mighty-wanderers"],
    city: "Blantyre",
    stadium: "Kamuzu Stadium",
    firstPlayed: "1969",
    description: "The biggest, oldest, and most fiercely contested football fixture in Malawi. Nicknamed 'The Battle of the Giants', it divides Blantyre and the entire nation into Red (Bullets) and Blue (Wanderers).",
    headToHead: {
      totalMatches: 84,
      team1Wins: 34,
      team2Wins: 23,
      draws: 27
    },
    keyMoments: [
      "1970s: The emergence of Bata Bullets vs Yamaha Wanderers as national cultural touchstones.",
      "1999: Bullets beat Wanderers 2-1 before a record 50,000 capacity crowd at Kamuzu Stadium.",
      "2023: Castel Challenge Cup semi-final shootout epic won by Bullets after a 2-2 thriller."
    ]
  },
  {
    slug: "lilongwe-derby",
    name: "The Lilongwe Derby (Capital Clash)",
    teams: ["Silver Strikers", "Civil Service United"],
    teamSlugs: ["silver-strikers", "civil-service-united"],
    city: "Lilongwe",
    stadium: "Silver Stadium / CIVO Stadium",
    firstPlayed: "1982",
    description: "The supreme capital rivalry pitting 'The Bankers' (Silver Strikers) against the civil servants ('Civo'). It showcases the football identity of the Central Region.",
    headToHead: {
      totalMatches: 62,
      team1Wins: 27,
      team2Wins: 18,
      draws: 17
    },
    keyMoments: [
      "1993: Silver Strikers defeat Civo 1-0 to seal their first Super League title.",
      "2015: Civo claim Standard Bank Cup victory over Silver in a dramatic final at CIVO Stadium."
    ]
  },
  {
    slug: "military-barracks-derby",
    name: "The Forces Derby (Barracks Rivalry)",
    teams: ["Moyale Barracks", "Kamuzu Barracks"],
    teamSlugs: ["moyale-barracks", "kamuzu-barracks"],
    city: "Mzuzu / Lilongwe",
    stadium: "Mzuzu Stadium / CIVO Stadium",
    firstPlayed: "2002",
    description: "Contested between Malawi Defence Force (MDF) battalion teams: the Northern soldiers of Moyale Barracks and the Central soldiers of Kamuzu Barracks (along with MAFCO from Salima). Renowned for immense physical intensity and tactical discipline.",
    headToHead: {
      totalMatches: 38,
      team1Wins: 14,
      team2Wins: 13,
      draws: 11
    },
    keyMoments: [
      "2016: Kamuzu Barracks capture the Super League championship on the final matchday.",
      "2021: Moyale Barracks reach the FDH Bank Cup final through a dramatic soldier clash."
    ]
  }
];

export interface FootballStadium {
  slug: string;
  name: string;
  location: string;
  district: string;
  region: "Southern" | "Central" | "Northern";
  capacity: string;
  surface: string;
  opened: string;
  residentClubs: string[];
  summary: string;
}

export const footballStadiums: FootballStadium[] = [
  {
    slug: "kamuzu-stadium",
    name: "Kamuzu Stadium",
    location: "Ginnery Corner, Blantyre",
    district: "Blantyre",
    region: "Southern",
    capacity: "45,000",
    surface: "Artificial Turf (FIFA Certified)",
    opened: "1952 (Renovated)",
    residentClubs: ["FCB Nyasa Big Bullets", "Mighty Mukuru Wanderers", "Mighty Tigers"],
    summary: "The historic spiritual home of Malawian football. Hosted historic Flames victories including the 1978 and 1988 CECAFA championships and generations of Blantyre derbies."
  },
  {
    slug: "bingu-national-stadium",
    name: "Bingu National Stadium (BNS)",
    location: "Area 48, Lilongwe",
    district: "Lilongwe",
    region: "Central",
    capacity: "40,090",
    surface: "Natural Grass",
    opened: "January 2017",
    residentClubs: ["Malawi Flames (Selected Matches)", "Malawi Scorchers", "Domestic Cup Finals"],
    summary: "Malawi's premier, state-of-the-art national stadium. Fully equipped with international standard media, VIP, and athletic facilities."
  },
  {
    slug: "silver-stadium",
    name: "Silver Stadium",
    location: "Area 47, Lilongwe",
    district: "Lilongwe",
    region: "Central",
    capacity: "20,000",
    surface: "Natural Grass",
    opened: "1984",
    residentClubs: ["Silver Strikers FC"],
    summary: "The privately owned home ground of Silver Strikers, known for its pristine natural turf and passionate banker faithful."
  },
  {
    slug: "civo-stadium",
    name: "CIVO Stadium",
    location: "Area 9, Lilongwe",
    district: "Lilongwe",
    region: "Central",
    capacity: "25,000",
    surface: "Natural Grass",
    opened: "1978",
    residentClubs: ["Civil Service United", "Kamuzu Barracks FC", "Creck Sporting Club"],
    summary: "The traditional centre of football in the capital city, hosting historic league battles and cup ties."
  },
  {
    slug: "mzuzu-stadium",
    name: "Mzuzu Stadium",
    location: "Central Mzuzu",
    district: "Mzimba / Mzuzu City",
    region: "Northern",
    capacity: "15,000",
    surface: "Natural Grass",
    opened: "1970",
    residentClubs: ["Moyale Barracks FC", "Mzuzu City Hammers"],
    summary: "The football fortress of Northern Malawi, renowned for intense local support and home of the 'Lions of Kaning'ina'."
  },
  {
    slug: "karonga-stadium",
    name: "Karonga Stadium",
    location: "Karonga Boma",
    district: "Karonga",
    region: "Northern",
    capacity: "12,000",
    surface: "Natural Grass",
    opened: "2018",
    residentClubs: ["Karonga United FC", "Chitipa United", "Baka City"],
    summary: "A vibrant football venue on the shores of Lake Malawi near the northern border, serving clubs across Karonga and Chitipa."
  },
  {
    slug: "mpira-stadium",
    name: "Mpira Stadium",
    location: "Chiendembo, Blantyre",
    district: "Blantyre",
    region: "Southern",
    capacity: "8,000",
    surface: "Artificial Turf",
    opened: "2019",
    residentClubs: ["Bangwe All Stars", "Mighty Tigers", "FAM Women's League Matches"],
    summary: "Built at the FAM Technical Centre in Chiendembo with FIFA Forward funds, serving as a hub for top-tier matches, youth development, and women's competitions."
  }
];

export interface FootballTransfer {
  id: string;
  player: string;
  position: string;
  fromTeam: string;
  toTeam: string;
  feeType: "Undisclosed Fee" | "Free Transfer" | "Loan" | "Academy Promotion";
  date: string;
  status: "Official" | "Verified" | "Reported";
  source: string;
}

export const footballTransfers: FootballTransfer[] = [
  {
    id: "tx-01",
    player: "Lanjesi Nkhoma",
    position: "Forward",
    fromTeam: "FCB Nyasa Big Bullets",
    toTeam: "Don Bosco (DR Congo)",
    feeType: "Undisclosed Fee",
    date: "August 2024",
    status: "Official",
    source: "FCB Nyasa Big Bullets Official Press Release"
  },
  {
    id: "tx-02",
    player: "Chimwemwe Idana",
    position: "Midfielder",
    fromTeam: "Silver Strikers",
    toTeam: "Silver Strikers (Contract Extension)",
    feeType: "Free Transfer",
    date: "July 2024",
    status: "Official",
    source: "Silver Strikers FC Media"
  },
  {
    id: "tx-03",
    player: "Temwa Chawinga",
    position: "Forward",
    fromTeam: "Wuhan Jiangda (China)",
    toTeam: "Kansas City Current (USA)",
    feeType: "Undisclosed Fee",
    date: "January 2024",
    status: "Official",
    source: "Kansas City Current / NWSL Official Announcement"
  },
  {
    id: "tx-04",
    player: "Tabitha Chawinga",
    position: "Forward",
    fromTeam: "Wuhan Jiangda / PSG",
    toTeam: "Olympique Lyonnais Féminin (France)",
    feeType: "Undisclosed Fee",
    date: "July 2024",
    status: "Official",
    source: "Olympique Lyonnais Official Club Site"
  },
  {
    id: "tx-05",
    player: "Patrick Mwaungulu",
    position: "Winger",
    fromTeam: "FCB Nyasa Big Bullets",
    toTeam: "TP Mazembe (DR Congo)",
    feeType: "Undisclosed Fee",
    date: "July 2024",
    status: "Official",
    source: "TP Mazembe & Bullets Press Statements"
  },
  {
    id: "tx-06",
    player: "Gomezgani Chirwa",
    position: "Defender",
    fromTeam: "FCB Nyasa Big Bullets",
    toTeam: "FCB Nyasa Big Bullets (Contract Extension)",
    feeType: "Free Transfer",
    date: "February 2024",
    status: "Official",
    source: "Bullets Communications Team"
  }
];

export interface HistoricalChampion {
  season: string;
  competition: string;
  champion: string;
  runnerUp: string;
  topScorer?: string;
  source: string;
}

export const historicalChampions: HistoricalChampion[] = [
  { season: "2023", competition: "TNM Super League", champion: "FCB Nyasa Big Bullets", runnerUp: "Silver Strikers", topScorer: "Clement Nyondo (16 goals)", source: "SULOM 2023 Official Report" },
  { season: "2022", competition: "TNM Super League", champion: "FCB Nyasa Big Bullets", runnerUp: "Blue Eagles", topScorer: "Babatunde Adepoju (18 goals)", source: "SULOM 2022 Official Report" },
  { season: "2020/21", competition: "TNM Super League", champion: "Nyasa Big Bullets", runnerUp: "Silver Strikers", topScorer: "Maxwell Phodo (12 goals)", source: "SULOM 2021 Official Report" },
  { season: "2019", competition: "TNM Super League", champion: "Nyasa Big Bullets", runnerUp: "Mighty Wanderers", topScorer: "Khuda Muyaba (21 goals)", source: "SULOM 2019 Official Report" },
  { season: "2018", competition: "TNM Super League", champion: "Nyasa Big Bullets", runnerUp: "Mighty Wanderers", topScorer: "Chiukepo Msowoya (16 goals)", source: "SULOM 2018 Official Report" },
  { season: "2017", competition: "TNM Super League", champion: "Mighty Wanderers", runnerUp: "Nyasa Big Bullets", topScorer: "Innocent Bokosi (13 goals)", source: "SULOM 2017 Official Report" },
  { season: "2016", competition: "TNM Super League", champion: "Kamuzu Barracks", runnerUp: "Nyasa Big Bullets", topScorer: "Richard Mbulu (19 goals)", source: "SULOM 2016 Official Report" },
  { season: "2015", competition: "TNM Super League", champion: "Big Bullets", runnerUp: "MAFCO FC", topScorer: "Chiukepo Msowoya & Innocent Bokosi (14 goals)", source: "SULOM 2015 Official Report" },
  { season: "2014", competition: "TNM Super League", champion: "Big Bullets", runnerUp: "Moyale Barracks", topScorer: "Gastin Simkonda (17 goals)", source: "SULOM 2014 Official Report" },
  { season: "2013/14", competition: "TNM Super League", champion: "Silver Strikers", runnerUp: "Moyale Barracks", topScorer: "Ishmael Thindwa (18 goals)", source: "SULOM 2013 Official Report" },
  { season: "2012/13", competition: "TNM Super League", champion: "Silver Strikers", runnerUp: "Big Bullets", topScorer: "Vincent Chinthenga (18 goals)", source: "SULOM 2012 Official Report" },
  { season: "2011/12", competition: "TNM Super League", champion: "Silver Strikers", runnerUp: "ESCOM United", topScorer: "Ishmael Thindwa (18 goals)", source: "SULOM 2011 Official Report" },
  { season: "2010/11", competition: "TNM Super League", champion: "ESCOM United", runnerUp: "Silver Strikers", topScorer: "Chikondi Mpulula (18 goals)", source: "SULOM 2010 Official Report" },
  { season: "2006", competition: "Marlboro Super League", champion: "Mighty Wanderers", runnerUp: "Silver Strikers", topScorer: "Aggrey Kanyenda (18 goals)", source: "SULOM Historical Archive" },
  { season: "1986", competition: "Inaugural Super League", champion: "Bata Bullets", runnerUp: "Silver Strikers", topScorer: "Lawrence Waya", source: "FAM Historical Archive" }
];

export const archiveSections = [
  ["Timeline", "Significant historical developments across the Flames, Scorchers, domestic clubs, and grassroots football from 1964 to 2026."],
  ["Season archive", "Historical league tables, standings, champions, and runners-up from the 1986 inaugural season to the present."],
  ["Trophy archive", "Documented competition editions, cup winners, finalists, and final scores for the Super League, FDH Bank Cup, Castel Cup, and Airtel Top 8."],
  ["Legends & careers", "Profiles of celebrated Malawian players, coaches, and trailblazers with verified records."],
  ["Memorable matches", "Historic finals, iconic derbies, and momentous Flames and Scorchers international victories."],
  ["Great goals", "Editorial compilation of iconic Malawian football strikes with tactical context and scorer details."],
  ["Historic teams", "Celebrated squads who achieved legendary regional and domestic milestones."],
  ["Records", "Sourced statistics: appearance records, all-time scoring leaders, and club milestone totals."],
  ["Women's history", "The rise of the Scorchers, the 2023 COSAFA conquest, and international trailblazers Tabitha and Temwa Chawinga."]
];
