"use client";

import Image from "@/src/platform/image";
import Link from "@/src/platform/link";
import { useRouter, useSearchParams } from "@/src/platform/navigation";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Globe,
  MapPin,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SportIcon } from "@/components/sport-icon";
import { TeamLogo } from "@/components/team-logo";
import { DemoBadge } from "@/components/ui";

interface SportSpotlight {
  name: string;
  slug: string;
  federation: string;
  tagline: string;
  ranking?: string;
  format: string;
  league: string;
  teamsCount: string;
  hubUrl: string;
  accentColor: string;
}

const sportSpotlights: Record<string, SportSpotlight> = {
  football: {
    name: "Football",
    slug: "football",
    federation: "Football Association of Malawi (FAM)",
    tagline:
      "Malawi's national game: The Flames, The Scorchers, TNM Super League, FDH Bank Cup, clubs, grassroots, and official archives.",
    ranking: "FIFA #122 · CAF #33",
    format: "90 mins · 2 halves",
    league: "TNM Super League",
    teamsCount: "16 Premiership Clubs",
    hubUrl: "/sports/football",
    accentColor: "#c92c38",
  },
  netball: {
    name: "Netball",
    slug: "netball",
    federation: "Netball Association of Malawi (NAM)",
    tagline:
      "Pride of the nation: World #6 Malawi Queens, Rainbow Paints National League, FCB Diamonds, Tigresses & grassroots court champions.",
    ranking: "World Netball #6 · African Giants",
    format: "60 mins · 4 quarters",
    league: "Rainbow Paints National League",
    teamsCount: "12 Top Flight Clubs",
    hubUrl: "/sports/netball",
    accentColor: "#087f73",
  },
  basketball: {
    name: "Basketball",
    slug: "basketball",
    federation: "Basketball Association of Malawi (BASMAL)",
    tagline:
      "High-flying action across Lilongwe and Blantyre: Bravehearts BC, Central Knights, Cougars, and the BASMAL National Elite League.",
    ranking: "Zone VI Contenders",
    format: "40 mins · 4 quarters",
    league: "BASMAL National Elite League",
    teamsCount: "14 Elite Clubs",
    hubUrl: "/sports/basketball",
    accentColor: "#ea580c",
  },
  athletics: {
    name: "Athletics",
    slug: "athletics",
    federation: "Athletics Malawi",
    tagline:
      "Track, cross-country, and distance runners representing Malawi from Bingu National Stadium to international championships.",
    ranking: "National Championship Series",
    format: "Heats · Finals · Timed Trials",
    league: "National Track & Field Trials",
    teamsCount: "8 Regional Teams",
    hubUrl: "/sports/athletics",
    accentColor: "#eab308",
  },
  volleyball: {
    name: "Volleyball",
    slug: "volleyball",
    federation: "Volleyball Association of Malawi (VAM)",
    tagline:
      "Dynamic spikers and national supremacy: Kamuzu Barracks VC, Wolves, Moyale Spikers, and regional championship circuits.",
    ranking: "National Championship Tour",
    format: "Best of 5 sets · 25 pts",
    league: "VAM National Championship",
    teamsCount: "10 League Clubs",
    hubUrl: "/sports/volleyball",
    accentColor: "#15803d",
  },
  boxing: {
    name: "Boxing",
    slug: "boxing",
    federation: "Malawi Boxing Association (MABA)",
    tagline:
      "Championship title cards, weight classes, ranking tables, and rising Olympic boxing prospects across all three regions.",
    ranking: "National Ranking Registry",
    format: "3-min rounds · Bouts",
    league: "National Boxing Title Series",
    teamsCount: "6 Regional Stables",
    hubUrl: "/sports/boxing",
    accentColor: "#991b1b",
  },
};

interface FixtureItem {
  id: string;
  sport: string;
  category: string;
  date: string;
  time: string;
  home: string;
  homeSlug: string;
  homeColor: string;
  away: string;
  awaySlug: string;
  awayColor: string;
  venue: string;
  link: string;
  status?: "LIVE" | "FINAL" | "UPCOMING";
  homeScore?: number;
  awayScore?: number;
  statusNote?: string;
}

const allFixturesData: Record<string, FixtureItem[]> = {
  all: [
    {
      id: "fix-all-1",
      sport: "Football",
      category: "TNM Super League",
      date: "Today",
      time: "15:00",
      home: "Silver Strikers",
      homeSlug: "silver-strikers",
      homeColor: "#168149",
      away: "Mighty Wanderers",
      awaySlug: "mighty-wanderers",
      awayColor: "#1e3a8a",
      venue: "Bingu National Stadium, Lilongwe",
      link: "/events/silver-strikers-v-mighty-wanderers",
      status: "LIVE",
      homeScore: 1,
      awayScore: 1,
      statusNote: "63′ · Second half",
    },
    {
      id: "fix-all-2",
      sport: "Netball",
      category: "Rainbow Paints League",
      date: "Today",
      time: "14:30",
      home: "FCB Diamonds",
      homeSlug: "fcb-diamonds",
      homeColor: "#0284c7",
      away: "First Choice Tigresses",
      awaySlug: "tigresses-netball",
      awayColor: "#ea580c",
      venue: "Blantyre Youth Centre Court",
      link: "/events/fcb-diamonds-v-tigresses-netball",
      status: "LIVE",
      homeScore: 56,
      awayScore: 51,
      statusNote: "Q4 06:45 remaining",
    },
    {
      id: "fix-all-3",
      sport: "Basketball",
      category: "BASMAL Elite League",
      date: "Today",
      time: "18:30",
      home: "Bravehearts BC",
      homeSlug: "bravehearts-basketball",
      homeColor: "#ea580c",
      away: "Central Knights",
      awaySlug: "central-knights",
      awayColor: "#111827",
      venue: "ABC Lions Den Court, Lilongwe",
      link: "/events/bravehearts-v-central-knights",
      status: "LIVE",
      homeScore: 82,
      awayScore: 78,
      statusNote: "Q4 3:12 remaining",
    },
    {
      id: "fix-all-4",
      sport: "Football",
      category: "AFCON Qualifier",
      date: "Recent",
      time: "15:00",
      home: "The Flames",
      homeSlug: "the-flames",
      homeColor: "#c92c38",
      away: "Chipolopolo (Zambia)",
      awaySlug: "zambia-football",
      awayColor: "#168149",
      venue: "Bingu National Stadium, Lilongwe",
      link: "/events/the-flames-v-zambia",
      status: "FINAL",
      homeScore: 2,
      awayScore: 1,
    },
    {
      id: "fix-all-5",
      sport: "Netball",
      category: "Africa Netball Challenge",
      date: "Recent",
      time: "16:00",
      home: "Malawi Queens",
      homeSlug: "malawi-queens",
      homeColor: "#c92c38",
      away: "South Africa Proteas",
      awaySlug: "south-africa-netball",
      awayColor: "#168149",
      venue: "Griffin Saenda Sports Complex, Lilongwe",
      link: "/events/malawi-queens-v-south-africa",
      status: "FINAL",
      homeScore: 58,
      awayScore: 54,
    },
    {
      id: "fix-all-6",
      sport: "Basketball",
      category: "Southern Zone Championship",
      date: "Recent",
      time: "17:00",
      home: "Cougars Basketball",
      homeSlug: "cougars-basketball",
      homeColor: "#1e3a8a",
      away: "Blantyre Blazers",
      awaySlug: "blantyre-blazers",
      awayColor: "#0284c7",
      venue: "Blantyre Youth Centre Court",
      link: "/events/cougars-v-blantyre-blazers",
      status: "FINAL",
      homeScore: 74,
      awayScore: 69,
    },
  ],
  football: [
    {
      id: "fb-1",
      sport: "Football",
      category: "TNM Super League",
      date: "Today",
      time: "15:00",
      home: "Silver Strikers",
      homeSlug: "silver-strikers",
      homeColor: "#168149",
      away: "Mighty Wanderers",
      awaySlug: "mighty-wanderers",
      awayColor: "#1e3a8a",
      venue: "Bingu National Stadium, Lilongwe",
      link: "/events/silver-strikers-v-mighty-wanderers",
      status: "LIVE",
      homeScore: 1,
      awayScore: 1,
      statusNote: "63′ · Live",
    },
    {
      id: "fb-2",
      sport: "Football",
      category: "TNM Super League",
      date: "Today",
      time: "15:30",
      home: "Nyasa Big Bullets",
      homeSlug: "nyasa-big-bullets",
      homeColor: "#c92c38",
      away: "Moyale Barracks",
      awaySlug: "moyale-barracks",
      awayColor: "#168149",
      venue: "Kamuzu Stadium, Blantyre",
      link: "/events/nyasa-big-bullets-v-moyale-barracks",
      status: "UPCOMING",
    },
    {
      id: "fb-3",
      sport: "Football",
      category: "AFCON Qualifier",
      date: "Recent",
      time: "15:00",
      home: "The Flames",
      homeSlug: "the-flames",
      homeColor: "#c92c38",
      away: "Chipolopolo (Zambia)",
      awaySlug: "zambia-football",
      awayColor: "#168149",
      venue: "Bingu National Stadium, Lilongwe",
      link: "/events/the-flames-v-zambia",
      status: "FINAL",
      homeScore: 2,
      awayScore: 1,
    },
  ],
  netball: [
    {
      id: "net-1",
      sport: "Netball",
      category: "Rainbow Paints League",
      date: "Today",
      time: "14:30",
      home: "FCB Diamonds",
      homeSlug: "fcb-diamonds",
      homeColor: "#0284c7",
      away: "First Choice Tigresses",
      awaySlug: "tigresses-netball",
      awayColor: "#ea580c",
      venue: "Blantyre Youth Centre Court",
      link: "/events/fcb-diamonds-v-tigresses-netball",
      status: "LIVE",
      homeScore: 56,
      awayScore: 51,
      statusNote: "Q4 06:45 remaining",
    },
    {
      id: "net-2",
      sport: "Netball",
      category: "Africa Netball Challenge",
      date: "Recent",
      time: "16:00",
      home: "Malawi Queens",
      homeSlug: "malawi-queens",
      homeColor: "#c92c38",
      away: "South Africa Proteas",
      awaySlug: "south-africa-netball",
      awayColor: "#168149",
      venue: "Griffin Saenda Sports Complex, Lilongwe",
      link: "/events/malawi-queens-v-south-africa",
      status: "FINAL",
      homeScore: 58,
      awayScore: 54,
    },
    {
      id: "net-3",
      sport: "Netball",
      category: "Central Zone Netball League",
      date: "Sun, 19 Oct",
      time: "15:00",
      home: "Blue Eagles Sisters",
      homeSlug: "blue-eagles-sisters",
      homeColor: "#1e3a8a",
      away: "Civonets Netball",
      awaySlug: "civonets",
      awayColor: "#168149",
      venue: "Area 30 Police Court, Lilongwe",
      link: "/events/blue-eagles-sisters-v-civonets",
      status: "UPCOMING",
    },
  ],
  basketball: [
    {
      id: "bb-1",
      sport: "Basketball",
      category: "BASMAL National Elite League",
      date: "Today",
      time: "18:30",
      home: "Bravehearts BC",
      homeSlug: "bravehearts-basketball",
      homeColor: "#ea580c",
      away: "Central Knights",
      awaySlug: "central-knights",
      awayColor: "#111827",
      venue: "ABC Lions Den Court, Lilongwe",
      link: "/events/bravehearts-v-central-knights",
      status: "LIVE",
      homeScore: 82,
      awayScore: 78,
      statusNote: "Q4 3:12 remaining",
    },
    {
      id: "bb-2",
      sport: "Basketball",
      category: "Southern Zone Championship",
      date: "Recent",
      time: "17:00",
      home: "Cougars Basketball",
      homeSlug: "cougars-basketball",
      homeColor: "#1e3a8a",
      away: "Blantyre Blazers",
      awaySlug: "blantyre-blazers",
      awayColor: "#0284c7",
      venue: "Blantyre Youth Centre Court",
      link: "/events/cougars-v-blantyre-blazers",
      status: "FINAL",
      homeScore: 74,
      awayScore: 69,
    },
    {
      id: "bb-3",
      sport: "Basketball",
      category: "Bravehearts International Tourney",
      date: "Fri, 24 Oct",
      time: "16:00",
      home: "Bravehearts Ladies",
      homeSlug: "bravehearts-basketball",
      homeColor: "#ea580c",
      away: "Mzuzu Jazz",
      awaySlug: "mzuzu-jazz",
      awayColor: "#15803d",
      venue: "ABC Lions Den Court, Lilongwe",
      link: "/events/bravehearts-ladies-v-mzuzu-jazz",
      status: "UPCOMING",
    },
  ],
  athletics: [
    {
      id: "ath-1",
      sport: "Athletics",
      category: "National Championship Series",
      date: "Sat, 25 Oct",
      time: "08:30",
      home: "Athletics Malawi Trials",
      homeSlug: "athletics-malawi",
      homeColor: "#eab308",
      away: "Regional Finalists",
      awaySlug: "regional-athletics",
      awayColor: "#0f172a",
      venue: "Bingu National Stadium Track, Lilongwe",
      link: "/fixtures?sport=athletics",
      status: "UPCOMING",
    },
    {
      id: "ath-2",
      sport: "Athletics",
      category: "City Road Challenge",
      date: "Sun, 26 Oct",
      time: "06:30",
      home: "Blantyre 10km Road Race",
      homeSlug: "athletics-malawi",
      homeColor: "#c92c38",
      away: "National Elite Field",
      awaySlug: "regional-athletics",
      awayColor: "#0284c7",
      venue: "Kamuzu Stadium Circuit, Blantyre",
      link: "/fixtures?sport=athletics",
      status: "UPCOMING",
    },
    {
      id: "ath-3",
      sport: "Athletics",
      category: "Northern Region Trials",
      date: "Sat, 01 Nov",
      time: "09:00",
      home: "Mzuzu Track Meet",
      homeSlug: "athletics-malawi",
      homeColor: "#168149",
      away: "District Selections",
      awaySlug: "regional-athletics",
      awayColor: "#111827",
      venue: "Mzuzu Stadium, Mzuzu",
      link: "/fixtures?sport=athletics",
      status: "UPCOMING",
    },
  ],
  volleyball: [
    {
      id: "vb-1",
      sport: "Volleyball",
      category: "VAM National Elite Series",
      date: "Sat, 25 Oct",
      time: "14:00",
      home: "Kamuzu Barracks VC",
      homeSlug: "kamuzu-barracks-vc",
      homeColor: "#168149",
      away: "Wolves Volleyball",
      awaySlug: "wolves-volleyball",
      awayColor: "#1e3a8a",
      venue: "Lilongwe Community Indoor Court",
      link: "/fixtures?sport=volleyball",
      status: "UPCOMING",
    },
    {
      id: "vb-2",
      sport: "Volleyball",
      category: "Northern Zone Championship",
      date: "Sun, 26 Oct",
      time: "15:00",
      home: "Moyale Spikers",
      homeSlug: "moyale-spikers",
      homeColor: "#c92c38",
      away: "Police Spikers",
      awaySlug: "police-spikers",
      awayColor: "#0284c7",
      venue: "Mzuzu Youth Centre Arena",
      link: "/fixtures?sport=volleyball",
      status: "UPCOMING",
    },
    {
      id: "vb-3",
      sport: "Volleyball",
      category: "Central Zone Volleyball Cup",
      date: "Sat, 01 Nov",
      time: "16:30",
      home: "Blue Eagles VC",
      homeSlug: "blue-eagles-vc",
      homeColor: "#1e3a8a",
      away: "Lilongwe Titans VC",
      awaySlug: "lilongwe-titans",
      awayColor: "#ea580c",
      venue: "Area 30 Indoor Sports Hall",
      link: "/fixtures?sport=volleyball",
      status: "UPCOMING",
    },
  ],
  boxing: [
    {
      id: "box-1",
      sport: "Boxing",
      category: "National Welterweight Title Card",
      date: "Sat, 25 Oct",
      time: "19:00",
      home: "Southern Zone Champion",
      homeSlug: "maba",
      homeColor: "#991b1b",
      away: "Central Challenger",
      awaySlug: "maba",
      awayColor: "#111827",
      venue: "Robins Park Arena, Blantyre",
      link: "/fixtures?sport=boxing",
      status: "UPCOMING",
    },
    {
      id: "box-2",
      sport: "Boxing",
      category: "MABA Elimination Bout",
      date: "Sun, 26 Oct",
      time: "18:00",
      home: "Lilongwe Boxing Club",
      homeSlug: "maba",
      homeColor: "#ea580c",
      away: "Mzuzu Pugilists",
      awaySlug: "maba",
      awayColor: "#168149",
      venue: "Community Centre Hall, Lilongwe",
      link: "/fixtures?sport=boxing",
      status: "UPCOMING",
    },
  ],
};

interface NationalTeamItem {
  slug: string;
  name: string;
  title: string;
  image: string;
  link: string;
  sport: string;
}

const allNationalTeamsData: Record<string, NationalTeamItem[]> = {
  all: [
    {
      slug: "the-flames",
      name: "The Flames",
      title: "Malawi Men's National Football Team",
      image: "/images/card-flames.jpg",
      link: "/teams/the-flames",
      sport: "Football",
    },
    {
      slug: "the-scorchers",
      name: "The Scorchers",
      title: "Malawi Women's National Football Team · 2023 COSAFA Champions",
      image: "/images/card-scorchers.jpg",
      link: "/teams/the-scorchers",
      sport: "Football",
    },
    {
      slug: "malawi-queens",
      name: "The Queens",
      title: "Malawi Women's National Netball Team · World #6 Powerhouse",
      image: "/images/card-queens.jpg",
      link: "/teams/malawi-queens",
      sport: "Netball",
    },
  ],
  football: [
    {
      slug: "the-flames",
      name: "The Flames",
      title: "Malawi Men's National Football Team · AFCON Contenders",
      image: "/images/card-flames.jpg",
      link: "/teams/the-flames",
      sport: "Football",
    },
    {
      slug: "the-scorchers",
      name: "The Scorchers",
      title: "Malawi Women's National Football Team · 2023 COSAFA Champions",
      image: "/images/card-scorchers.jpg",
      link: "/teams/the-scorchers",
      sport: "Football",
    },
    {
      slug: "malawi-u20-flames",
      name: "Junior Flames",
      title: "Malawi U-20 Men's National Selection · Next Gen Talent",
      image: "/images/hero-football.jpg",
      link: "/national-teams",
      sport: "Football",
    },
  ],
  netball: [
    {
      slug: "malawi-queens",
      name: "The Queens",
      title: "Malawi Women's National Netball Team · World #6 Powerhouse",
      image: "/images/card-queens.jpg",
      link: "/teams/malawi-queens",
      sport: "Netball",
    },
    {
      slug: "malawi-u21-queens",
      name: "Young Queens",
      title: "Malawi U-21 National Selection · World Youth Cup Qualifiers",
      image: "/images/hero-netball.jpg",
      link: "/teams/malawi-queens",
      sport: "Netball",
    },
    {
      slug: "malawi-fast5-queens",
      name: "Fast5 Queens",
      title: "Fast5 World Netball Series · Global Championship Finalists",
      image: "/images/team-queens.jpg",
      link: "/teams/malawi-queens",
      sport: "Netball",
    },
  ],
  basketball: [
    {
      slug: "malawi-mens-basketball",
      name: "Malawi Men's Basketball",
      title: "Malawi National Senior Men's Selection · FIBA Qualifiers",
      image: "/images/hero-basketball.jpg",
      link: "/national-teams",
      sport: "Basketball",
    },
    {
      slug: "malawi-womens-basketball",
      name: "Malawi Women's Basketball",
      title: "Malawi National Senior Women's Selection · Zone VI Tourney",
      image: "/images/hero-basketball.jpg",
      link: "/national-teams",
      sport: "Basketball",
    },
    {
      slug: "bravehearts-continental",
      name: "Bravehearts BC",
      title: "Malawi Elite Champions · Continental Basketball League Entry",
      image: "/images/hero-basketball.jpg",
      link: "/sports/basketball",
      sport: "Basketball",
    },
  ],
  athletics: [
    {
      slug: "athletics-malawi-national",
      name: "Athletics Malawi Squad",
      title: "National Track, 5000m & 10000m Championship Representatives",
      image: "/images/hero-athletics.jpg",
      link: "/national-teams",
      sport: "Athletics",
    },
    {
      slug: "malawi-olympic-track",
      name: "Olympic Track Delegation",
      title: "Malawi International Games & Commonwealth Athletes",
      image: "/images/hero-athletics.jpg",
      link: "/national-teams",
      sport: "Athletics",
    },
    {
      slug: "junior-athletics-mw",
      name: "National Junior Sprinters",
      title: "Under-20 Regional Sprint and Distance Contenders",
      image: "/images/hero-athletics.jpg",
      link: "/sports/athletics",
      sport: "Athletics",
    },
  ],
  volleyball: [
    {
      slug: "malawi-mens-volleyball",
      name: "Malawi National Volleyball",
      title: "National Men's Team · Zone VI International Representation",
      image: "/images/hero-volleyball.jpg",
      link: "/national-teams",
      sport: "Volleyball",
    },
    {
      slug: "kamuzu-barracks-vc",
      name: "Kamuzu Barracks VC",
      title: "Reigning National Champions · Lilongwe Dominance",
      image: "/images/hero-volleyball.jpg",
      link: "/sports/volleyball",
      sport: "Volleyball",
    },
    {
      slug: "moyale-spikers",
      name: "Moyale Spikers",
      title: "Northern Zone Champions · Mzuzu Volleyball Club",
      image: "/images/hero-volleyball.jpg",
      link: "/sports/volleyball",
      sport: "Volleyball",
    },
  ],
  boxing: [
    {
      slug: "malawi-national-boxing",
      name: "Malawi National Boxing Squad",
      title: "Commonwealth Games and Olympic Pugilism Qualifiers",
      image: "/images/hero-boxing.jpg",
      link: "/national-teams",
      sport: "Boxing",
    },
    {
      slug: "maba-titleholders",
      name: "MABA Titleholders",
      title: "Malawi Professional and Amateur Championship Registry",
      image: "/images/hero-boxing.jpg",
      link: "/sports/boxing",
      sport: "Boxing",
    },
  ],
};

interface NewsItem {
  slug: string;
  sport: string;
  tagColor: string;
  title: string;
  date: string;
  image: string;
}

const allNewsData: Record<string, NewsItem[]> = {
  all: [
    {
      slug: "the-flames-and-scorchers-inspire-a-nation",
      sport: "All Sports",
      tagColor: "bg-blue",
      title: "The Flames and Scorchers carry Malawi's colors into international competition",
      date: "12 Oct 2026",
      image: "/images/news-football.jpg",
    },
    {
      slug: "malawi-queens-conquer-africa-showcase",
      sport: "Netball",
      tagColor: "bg-purple",
      title: "Malawi Queens shine on the world stage with dominant defensive masterclass",
      date: "13 Oct 2026",
      image: "/images/news-netball.jpg",
    },
    {
      slug: "bravehearts-basketball-championship-thriller",
      sport: "Basketball",
      tagColor: "bg-orange",
      title: "Bravehearts outlast Central Knights in epic 82-78 capital basketball derby",
      date: "13 Oct 2026",
      image: "/images/news-athletics.jpg",
    },
  ],
  football: [
    {
      slug: "grassroots-football-growth",
      sport: "Football",
      tagColor: "bg-blue",
      title: "Grassroots football continues to grow across all 28 Malawi districts",
      date: "12 Sep 2026",
      image: "/images/news-football.jpg",
    },
    {
      slug: "the-flames-and-scorchers-inspire-a-nation",
      sport: "Football",
      tagColor: "bg-blue",
      title: "The Flames and Scorchers carry Malawi's colors into international qualifiers",
      date: "14 Oct 2026",
      image: "/images/hero-football.jpg",
    },
    {
      slug: "tnm-super-league-title-race",
      sport: "Football",
      tagColor: "bg-blue",
      title: "TNM Super League title race heats up as Silver Strikers and Wanderers clash",
      date: "13 Oct 2026",
      image: "/images/card-flames.jpg",
    },
  ],
  netball: [
    {
      slug: "malawi-queens-conquer-africa-showcase",
      sport: "Netball",
      tagColor: "bg-purple",
      title: "Malawi Queens shine on the world stage with dominant defensive masterclass",
      date: "13 Oct 2026",
      image: "/images/news-netball.jpg",
    },
    {
      slug: "netball-inspiring-youth",
      sport: "Netball",
      tagColor: "bg-purple",
      title: "Netball inspiring a new generation of young athletes across Blantyre and Lilongwe",
      date: "10 Sep 2026",
      image: "/images/hero-netball.jpg",
    },
    {
      slug: "rainbow-paints-showdown",
      sport: "Netball",
      tagColor: "bg-purple",
      title: "Rainbow Paints League: FCB Diamonds and Tigresses produce electric 56-51 thriller",
      date: "13 Oct 2026",
      image: "/images/card-queens.jpg",
    },
  ],
  basketball: [
    {
      slug: "bravehearts-basketball-championship-thriller",
      sport: "Basketball",
      tagColor: "bg-orange",
      title: "Bravehearts outlast Central Knights in epic 82-78 capital basketball derby",
      date: "13 Oct 2026",
      image: "/images/hero-basketball.jpg",
    },
    {
      slug: "basmal-league-expands-nationwide",
      sport: "Basketball",
      tagColor: "bg-orange",
      title: "BASMAL National Elite League reports record weekend attendance in Lilongwe",
      date: "11 Oct 2026",
      image: "/images/hero-basketball.jpg",
    },
    {
      slug: "southern-basketball-rise",
      sport: "Basketball",
      tagColor: "bg-orange",
      title: "Cougars Basketball and Blantyre Blazers set high standards in Southern Zone showdown",
      date: "09 Oct 2026",
      image: "/images/hero-basketball.jpg",
    },
  ],
  athletics: [
    {
      slug: "athletes-shine-regional",
      sport: "Athletics",
      tagColor: "bg-orange",
      title: "Malawian athletes shine at regional track and field championships",
      date: "8 Sep 2026",
      image: "/images/news-athletics.jpg",
    },
    {
      slug: "bingu-track-trials-record",
      sport: "Athletics",
      tagColor: "bg-orange",
      title: "Bingu National Stadium hosts record turnout for national long-distance trials",
      date: "12 Oct 2026",
      image: "/images/hero-athletics.jpg",
    },
    {
      slug: "kefasi-chitsala-paces-qualifiers",
      sport: "Athletics",
      tagColor: "bg-orange",
      title: "Kefasi Chitsala leads 5,000m field as Athletics Malawi gears for international season",
      date: "10 Oct 2026",
      image: "/images/news-athletics.jpg",
    },
  ],
  volleyball: [
    {
      slug: "kamuzu-barracks-wolves-clash",
      sport: "Volleyball",
      tagColor: "bg-green",
      title: "Kamuzu Barracks and Wolves renew fierce Lilongwe rivalry in VAM Elite Series",
      date: "12 Oct 2026",
      image: "/images/hero-volleyball.jpg",
    },
    {
      slug: "moyale-spikers-northern-dominance",
      sport: "Volleyball",
      tagColor: "bg-green",
      title: "Moyale Spikers retain top standing across Northern Region volleyball circuit",
      date: "08 Oct 2026",
      image: "/images/hero-volleyball.jpg",
    },
  ],
  boxing: [
    {
      slug: "maba-title-fight-preview",
      sport: "Boxing",
      tagColor: "bg-red",
      title: "National welterweight title fight set for Robins Park in Blantyre this month",
      date: "11 Oct 2026",
      image: "/images/hero-boxing.jpg",
    },
    {
      slug: "rising-pugilists-mzuzu",
      sport: "Boxing",
      tagColor: "bg-red",
      title: "MABA unearths exciting amateur talent during Northern Region youth card",
      date: "07 Oct 2026",
      image: "/images/hero-boxing.jpg",
    },
  ],
};

const regions = [
  {
    name: "Northern Region",
    tagline: "Sporting talent. Thriving communities.",
    image: "/images/region-north.jpg",
    query: "Northern",
  },
  {
    name: "Central Region",
    tagline: "Active people. Stronger together.",
    image: "/images/region-central.jpg",
    query: "Central",
  },
  {
    name: "Southern Region",
    tagline: "Passion in every game. Brighter futures.",
    image: "/images/region-south.jpg",
    query: "Southern",
  },
];

const allSportsTiles = [
  {
    name: "Football",
    slug: "football",
    subtitle: "TNM Super League · The Flames & Scorchers",
    image: "/images/card-flames.jpg",
    badge: "16 Clubs · National Game",
    color: "#c92c38",
  },
  {
    name: "Netball",
    slug: "netball",
    subtitle: "Rainbow Paints League · World #6 Queens",
    image: "/images/card-queens.jpg",
    badge: "World #6 · African Giants",
    color: "#087f73",
  },
  {
    name: "Basketball",
    slug: "basketball",
    subtitle: "BASMAL Elite League · Bravehearts BC",
    image: "/images/hero-basketball.jpg",
    badge: "14 Clubs · Zone VI",
    color: "#ea580c",
  },
  {
    name: "Athletics",
    slug: "athletics",
    subtitle: "National Track & Field Trials · BNS",
    image: "/images/news-athletics.jpg",
    badge: "Championship Trials",
    color: "#ca8a04",
  },
  {
    name: "Volleyball",
    slug: "volleyball",
    subtitle: "VAM National Tour · Kamuzu Barracks VC",
    image: "/images/hero-volleyball.jpg",
    badge: "10 League Clubs",
    color: "#16a34a",
  },
  {
    name: "Boxing",
    slug: "boxing",
    subtitle: "MABA Championship Cards · Robins Park",
    image: "/images/hero-boxing.jpg",
    badge: "6 Regional Stables",
    color: "#dc2626",
  },
  {
    name: "Cricket",
    slug: "cricket",
    subtitle: "Malawi Cricket Association · T20 Series",
    image: "/images/sport-cricket.jpg",
    badge: "National T20 Cup",
    color: "#0284c7",
  },
  {
    name: "Rugby",
    slug: "rugby",
    subtitle: "Malawi Rugby Union · Regional 7s",
    image: "/images/sport-rugby.jpg",
    badge: "National 7s Circuit",
    color: "#7c3aed",
  },
  {
    name: "Swimming",
    slug: "swimming",
    subtitle: "Aquatics Union · National Gala Trials",
    image: "/images/sport-swimming.jpg",
    badge: "Olympic Qualifiers",
    color: "#06b6d4",
  },
  {
    name: "Cycling",
    slug: "cycling",
    subtitle: "Cycling Federation · Tour de Malawi",
    image: "/images/sport-cycling.jpg",
    badge: "Road & Cross-Country",
    color: "#10b981",
  },
  {
    name: "Tennis",
    slug: "tennis",
    subtitle: "Lawn Tennis Association · Blantyre Open",
    image: "/images/sport-tennis.jpg",
    badge: "National Open Circuit",
    color: "#d97706",
  },
  {
    name: "Chess",
    slug: "chess",
    subtitle: "Chess Association of Malawi (CHESSAM)",
    image: "/images/sport-chess.jpg",
    badge: "FIDE Rated Tournaments",
    color: "#64748b",
  },
];

export function HomeExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Primary sports tabs available on the landing page
  const sportsTabs = [
    { id: "all", name: "All Sports", icon: "all" },
    { id: "football", name: "Football", icon: "football" },
    { id: "netball", name: "Netball", icon: "netball" },
    { id: "basketball", name: "Basketball", icon: "basketball" },
    { id: "athletics", name: "Athletics", icon: "athletics" },
    { id: "volleyball", name: "Volleyball", icon: "volleyball" },
    { id: "boxing", name: "Boxing", icon: "boxing" },
  ];

  // Default to "all" sports so Football is NOT falsely pre-selected on the home page!
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Sync with URL query parameter ?sport=...
  useEffect(() => {
    const param = searchParams?.get("sport")?.toLowerCase();
    if (param && (sportSpotlights[param] || param === "all")) {
      setSelectedSport(param);
    } else {
      setSelectedSport("all");
    }
  }, [searchParams]);

  // Close "More Sports" dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    if (moreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [moreOpen]);

  // Handle in-page tab selection without unexpected redirection away from the landing page!
  const handleSelectSport = (sportId: string) => {
    setSelectedSport(sportId);
    setMoreOpen(false);

    // Update URL query smoothly without full page refresh
    if (typeof window !== "undefined") {
      const url = sportId === "all" ? "/" : `/?sport=${sportId}`;
      window.history.replaceState(null, "", url);
    }
  };

  const currentSpotlight = sportSpotlights[selectedSport];
  const activeFixtures = allFixturesData[selectedSport] || allFixturesData.all;
  const activeNationalTeams = allNationalTeamsData[selectedSport] || allNationalTeamsData.all;
  const validNewsSlugs = new Set([
    "malawi-queens-conquer-africa-showcase",
    "bravehearts-basketball-championship-thriller",
    "the-flames-and-scorchers-inspire-a-nation",
  ]);
  const requestedNews = allNewsData[selectedSport] || allNewsData.all;
  const filteredNews = requestedNews.filter((article) => validNewsSlugs.has(article.slug));
  const activeNews = filteredNews.length
    ? filteredNews
    : allNewsData.all.filter((article) => validNewsSlugs.has(article.slug));

  const currentSportName = selectedSport === "all" ? "All Sports" : currentSpotlight?.name || selectedSport;

  return (
    <div className="design-home">
      {/* Hero Section */}
      <section className="design-hero">
        <Image
          src="/images/hero-banner.jpg"
          width={1680}
          height={945}
          priority
          sizes="100vw"
          alt="Malawi multi-sport athletes representing the Flames, Scorchers, Queens and athletics against a Malawi landscape"
          className="design-hero-bg"
        />
        <div className="design-hero-shade" />

        <div className="container design-hero-container">
          <div className="design-hero-content">
            <h1 className="hero-headline">
              Malawi&apos;s Digital
              <br />
              <em>Home for Sport</em>
            </h1>
            <p className="hero-subtext">Every sport. Every community.</p>

            <div className="hero-actions">
              <Link className="button design-primary" href="/sports">
                Explore Sports <ArrowRight size={18} />
              </Link>
              <Link className="button design-outline" href="/fixtures">
                View Fixtures <CalendarDays size={18} />
              </Link>
            </div>

            {/* Quick Sports Platform Direct Entry Row */}
            <div className="hero-sports-entry" aria-label="Direct sports hubs entry">
              <span className="hero-sports-entry-label">DIRECT SPORTS HUBS:</span>
              <div className="hero-sports-chips">
                <Link className="hero-sport-chip football" href="/sports/football" title="Enter Football Platform">
                  <SportIcon sport="football" size={14} />
                  <span>Football</span>
                  <ArrowRight size={11} />
                </Link>
                <Link className="hero-sport-chip netball" href="/sports/netball" title="Enter Netball Platform">
                  <SportIcon sport="netball" size={14} />
                  <span>Netball</span>
                  <ArrowRight size={11} />
                </Link>
                <Link className="hero-sport-chip basketball" href="/sports/basketball" title="Enter Basketball Platform">
                  <SportIcon sport="basketball" size={14} />
                  <span>Basketball</span>
                  <ArrowRight size={11} />
                </Link>
                <Link className="hero-sport-chip athletics" href="/sports/athletics" title="Enter Athletics Platform">
                  <SportIcon sport="athletics" size={14} />
                  <span>Athletics</span>
                  <ArrowRight size={11} />
                </Link>
                <Link className="hero-sport-chip volleyball" href="/sports/volleyball" title="Enter Volleyball Platform">
                  <SportIcon sport="volleyball" size={14} />
                  <span>Volleyball</span>
                  <ArrowRight size={11} />
                </Link>
                <Link className="hero-sport-chip all-sports" href="/sports" title="View all 14 sports hubs">
                  <span>All 14 Hubs ↗</span>
                </Link>
              </div>
            </div>

            <div className="design-promises">
              <span>
                <div className="promise-icon">
                  <Users size={16} />
                </div>
                <div>
                  <b>More People</b>
                  <small>A Stronger Sporting Nation</small>
                </div>
              </span>
              <span>
                <div className="promise-icon">
                  <BarChart3 size={16} />
                </div>
                <div>
                  <b>More Opportunities</b>
                  <small>Across Every Community</small>
                </div>
              </span>
              <span>
                <div className="promise-icon">
                  <Trophy size={16} />
                </div>
                <div>
                  <b>More Stories</b>
                  <small>Malawi Moves Forward</small>
                </div>
              </span>
            </div>
          </div>

          <div className="hero-motto-wrapper" aria-hidden="true">
            <span className="hero-motto">Same Passion, A Brighter Malawi</span>
            <div className="motto-ribbons">
              <span className="ribbon red" />
              <span className="ribbon green" />
            </div>
          </div>
        </div>

        <span className="concept-label">Concept artwork — not real national-team players</span>
      </section>

      {/* Horizontal Sports Navigation Bar */}
      <div className="design-sport-bar-wrap">
        <nav className="design-sport-nav container" aria-label="Featured sports selector">
          {sportsTabs.map((tab) => {
            const isActive = selectedSport === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`sport-nav-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  if (isActive && tab.id !== "all") {
                    router.push(`/sports/${tab.id}`);
                  } else {
                    handleSelectSport(tab.id);
                  }
                }}
                aria-pressed={isActive}
                title={isActive && tab.id !== "all" ? `Enter ${tab.name} Platform` : `Filter ${tab.name}`}
              >
                <span className="sport-nav-icon">
                  {tab.id === "all" ? (
                    <Trophy size={16} />
                  ) : (
                    <SportIcon sport={tab.icon} size={17} />
                  )}
                </span>
                <span>{tab.name}</span>
                {isActive && tab.id !== "all" && (
                  <Link
                    href={`/sports/${tab.id}`}
                    className="sport-pill-enter-link"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    title={`Enter ${tab.name} Platform`}
                  >
                    Enter ↗
                  </Link>
                )}
              </button>
            );
          })}

          <div className="more-sports-wrap" ref={moreRef}>
            <button
              type="button"
              className="more-sports-btn"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              aria-label="Explore more sports hubs"
            >
              <span>•••</span> More Sports <ChevronDown size={14} className={moreOpen ? "rotate-180" : ""} />
            </button>

            {moreOpen && (
              <div className="more-sports-popover" role="menu">
                <Link
                  className="more-sports-item"
                  href="/sports/cricket"
                  onClick={() => setMoreOpen(false)}
                >
                  <SportIcon sport="cricket" size={15} /> Cricket
                </Link>
                <Link
                  className="more-sports-item"
                  href="/sports/rugby"
                  onClick={() => setMoreOpen(false)}
                >
                  <SportIcon sport="rugby" size={15} /> Rugby
                </Link>
                <Link
                  className="more-sports-item"
                  href="/sports/swimming"
                  onClick={() => setMoreOpen(false)}
                >
                  <SportIcon sport="swimming" size={15} /> Swimming
                </Link>
                <Link
                  className="more-sports-item"
                  href="/sports/cycling"
                  onClick={() => setMoreOpen(false)}
                >
                  <SportIcon sport="cycling" size={15} /> Cycling
                </Link>
                <Link
                  className="more-sports-item"
                  href="/sports/tennis"
                  onClick={() => setMoreOpen(false)}
                >
                  <SportIcon sport="tennis" size={15} /> Tennis
                </Link>
                <Link
                  className="more-sports-item"
                  href="/sports/chess"
                  onClick={() => setMoreOpen(false)}
                >
                  <SportIcon sport="chess" size={15} /> Chess
                </Link>
                <Link
                  className="more-sports-item"
                  href="/sports/hockey"
                  onClick={() => setMoreOpen(false)}
                >
                  <SportIcon sport="hockey" size={15} /> Hockey
                </Link>
                <Link
                  className="more-sports-item"
                  href="/sports"
                  onClick={() => setMoreOpen(false)}
                  style={{ gridColumn: "1 / -1", borderTop: "1px solid #e2e8f0", paddingTop: 8, color: "#00875a", fontWeight: 700 }}
                >
                  All 14 Sports Hubs <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Sport Spotlight Ribbon: Appears smoothly when a specific sport is selected on the landing page */}
      {selectedSport !== "all" && currentSpotlight && (
        <section className="sport-spotlight-wrap" aria-label={`${currentSpotlight.name} spotlight`}>
          <div className="container sport-spotlight-container">
            <div className="spotlight-info">
              <div className="spotlight-header">
                <span className="spotlight-sport-pill">
                  <SportIcon sport={currentSpotlight.slug} size={15} /> {currentSpotlight.name}
                </span>
                <span className="spotlight-federation">{currentSpotlight.federation}</span>
                {currentSpotlight.ranking && (
                  <span className="spotlight-rank-badge">
                    <Globe size={12} /> {currentSpotlight.ranking}
                  </span>
                )}
              </div>

              <p className="spotlight-tagline">{currentSpotlight.tagline}</p>

              <div className="spotlight-meta-row">
                <span className="spotlight-meta-item">
                  <span>Match Format:</span>
                  <strong>{currentSpotlight.format}</strong>
                </span>
                <span className="spotlight-meta-item">
                  <span>Top League:</span>
                  <strong>{currentSpotlight.league}</strong>
                </span>
                <span className="spotlight-meta-item">
                  <span>Active Clubs:</span>
                  <strong>{currentSpotlight.teamsCount}</strong>
                </span>
              </div>
            </div>

            <div className="spotlight-actions">
              <Link className="spotlight-btn-primary" href={currentSpotlight.hubUrl}>
                Open Full {currentSpotlight.name} Hub <ArrowRight size={14} />
              </Link>
              <Link
                className="spotlight-btn-secondary"
                href={`/fixtures?sport=${currentSpotlight.slug}`}
              >
                All {currentSpotlight.name} Fixtures
              </Link>
              <button
                type="button"
                className="spotlight-btn-reset"
                onClick={() => handleSelectSport("all")}
                title="Reset to All Sports overview"
              >
                <X size={13} /> Show All Sports
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Fixtures & Results: Adaptively filtered to the selected sport */}
      <section className="design-band">
        <div className="container">
          <div className="design-heading">
            <div className="heading-left">
              <h2>
                {selectedSport === "all" ? "Fixtures & Results" : `${currentSportName} Fixtures`}
              </h2>
              {selectedSport !== "all" && (
                <span className="sport-filter-badge">
                  Filtered: {currentSportName}
                  <button
                    type="button"
                    onClick={() => handleSelectSport("all")}
                    title="Clear filter"
                    aria-label="Clear sport filter"
                  >
                    ✕
                  </button>
                </span>
              )}
              <DemoBadge />
              <span className="design-heading-sub">
                {selectedSport === "all"
                  ? "Upcoming and recent match action across top Malawian competitions."
                  : `Showing verified ${currentSportName} matches and tournament fixtures.`}
              </span>
            </div>

            <Link
              className="view-all-link"
              href={selectedSport === "all" ? "/fixtures" : `/fixtures?sport=${selectedSport}`}
            >
              View all {selectedSport === "all" ? "fixtures" : `${currentSportName} fixtures`}{" "}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="design-fixtures">
            {activeFixtures.map((fixture) => (
              <article className="fixture-card" key={fixture.id}>
                <header className="fixture-card-header">
                  <div className="fixture-sport-badge">
                    <span>
                      <SportIcon sport={fixture.sport} size={15} />
                    </span>
                    <b>{fixture.sport}</b>
                    <small>• {fixture.category}</small>
                  </div>
                  <time className="fixture-datetime">
                    <span>{fixture.date}</span>
                    <b>{fixture.time}</b>
                  </time>
                </header>

                <div className="fixture-matchup">
                  <div className="fixture-team home">
                    <span className="team-logo-avatar">
                      <TeamLogo
                        slug={fixture.homeSlug || fixture.home}
                        name={fixture.home}
                        size={32}
                      />
                    </span>
                    <span className="team-name">{fixture.home}</span>
                  </div>

                  <div className="fixture-score-wrap">
                    {fixture.status === "LIVE" ? (
                      <>
                        <span className="fixture-live-pill">
                          <span className="fixture-live-dot" /> DEMO LIVE
                        </span>
                        <span className="fixture-score-numbers">
                          {fixture.homeScore} – {fixture.awayScore}
                        </span>
                      </>
                    ) : fixture.status === "FINAL" ? (
                      <>
                        <span className="fixture-final-pill">FINAL</span>
                        <span className="fixture-score-numbers">
                          {fixture.homeScore} – {fixture.awayScore}
                        </span>
                      </>
                    ) : (
                      <i className="vs-badge">VS</i>
                    )}
                  </div>

                  <div className="fixture-team away">
                    <span className="team-logo-avatar">
                      <TeamLogo
                        slug={fixture.awaySlug || fixture.away}
                        name={fixture.away}
                        size={32}
                      />
                    </span>
                    <span className="team-name">{fixture.away}</span>
                  </div>
                </div>

                <footer className="fixture-card-footer">
                  <span className="fixture-venue" title={fixture.venue}>
                    <MapPin size={13} /> {fixture.venue}
                  </span>
                  <Link className="fixture-preview-btn" href={fixture.link}>
                    Match Preview <ArrowRight size={12} />
                  </Link>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Malawi National Teams / Featured Selections: Adaptively filtered to the selected sport */}
      <section className="container design-section">
        <div className="design-heading">
          <div>
            <h2>
              {selectedSport === "all"
                ? "Malawi National Teams"
                : `${currentSportName} Selections`}
            </h2>
            <p>Pride. Opportunity. A Brighter Tomorrow.</p>
          </div>
          <Link className="view-all-link" href="/national-teams">
            Explore all national teams <ArrowRight size={14} />
          </Link>
        </div>

        <div className="design-national-grid">
          {activeNationalTeams.map((team) => (
            <Link className="national-card" href={team.link} key={team.slug}>
              <div className="national-card-media">
                <Image
                  src={team.image}
                  width={600}
                  height={380}
                  sizes="(max-width: 720px) 100vw, 33vw"
                  alt={team.title}
                  className="national-card-img"
                />
                <span className="design-card-shade" />
              </div>
              <div className="national-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div className="national-badge-logo">
                    <TeamLogo slug={team.slug} name={team.name} size={32} />
                  </div>
                  <span className="national-badge-pill">{team.sport}</span>
                </div>
                <h3>{team.name}</h3>
                <p>{team.title}</p>
                <b>
                  Explore team <ArrowRight size={13} />
                </b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Split Section: Latest News & Explore Malawi */}
      <section className="container design-split">
        {/* Latest News */}
        <div className="split-column">
          <div className="design-heading">
            <div className="heading-left">
              <h2>
                {selectedSport === "all" ? "Latest News" : `${currentSportName} News`}
              </h2>
              <DemoBadge />
            </div>
            <Link className="view-all-link" href="/news">
              View all news <ArrowRight size={14} />
            </Link>
          </div>

          <div className="design-news-grid">
            {activeNews.map((article) => (
              <Link className="news-photo-card" href={`/news/${article.slug}`} key={article.slug}>
                <div className="news-card-media">
                  <Image
                    src={article.image}
                    width={400}
                    height={220}
                    sizes="(max-width: 720px) 100vw, 20vw"
                    alt={article.title}
                    className="news-card-img"
                  />
                  <span className={`news-sport-tag ${article.sport.toLowerCase().replace(/[\s_]+/g, "-")}`}>
                    {article.sport}
                  </span>
                </div>
                <div className="news-card-body">
                  <h3>{article.title}</h3>
                  <div className="news-card-footer">
                    <time>{article.date}</time>
                    <ArrowRight size={14} className="news-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Explore Malawi */}
        <div className="split-column">
          <div className="design-heading">
            <div>
              <h2>Explore Malawi</h2>
              <p>Find sport in your region. Stronger communities through sport.</p>
            </div>
          </div>

          <div className="design-region-grid">
            {regions.map((reg) => (
              <Link className="region-photo-card" href={`/explore-malawi?region=${reg.query}`} key={reg.name}>
                <div className="region-card-media">
                  <Image
                    src={reg.image}
                    width={400}
                    height={220}
                    sizes="(max-width: 720px) 100vw, 15vw"
                    alt={`${reg.name} landscapes and communities`}
                    className="region-card-img"
                  />
                </div>
                <div className="region-card-body">
                  <h3>{reg.name}</h3>
                  <p>{reg.tagline}</p>
                  <b>
                    Browse sport near you <ArrowRight size={11} />
                  </b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Sports Hubs Directory */}
      <section className="container design-section design-all-sports">
        <div className="design-heading">
          <div>
            <h2>All Sports Directory</h2>
            <p>Every sport. Every community. Explore dedicated sport platforms.</p>
          </div>
          <Link className="view-all-link" href="/sports">
            View all 14 sports hubs <ArrowRight size={14} />
          </Link>
        </div>

        <div className="sports-tiles-grid">
          {allSportsTiles.map((sport) => (
            <Link
              className="sport-image-tile"
              href={`/sports/${sport.slug}`}
              key={sport.slug}
              title={`Enter ${sport.name} Platform`}
            >
              <Image
                src={sport.image}
                width={400}
                height={220}
                sizes="(max-width: 720px) 50vw, (max-width: 1024px) 33vw, 25vw"
                alt={`${sport.name} in Malawi`}
                className="sport-tile-img"
              />
              <span className="sport-tile-overlay" />
              <div className="sport-tile-content">
                <div className="sport-tile-header">
                  <span className="sport-tile-badge" style={{ borderColor: sport.color }}>
                    <SportIcon sport={sport.slug} size={13} />
                    <span>{sport.badge}</span>
                  </span>
                </div>
                <div className="sport-tile-body">
                  <b className="sport-tile-title">{sport.name}</b>
                  <p className="sport-tile-sub">{sport.subtitle}</p>
                  <span className="sport-tile-cta">
                    Enter Platform <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
