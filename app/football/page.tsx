import { redirect } from "next/navigation";

export const metadata = {
  title: "Malawian Football | Masewera265",
  description: "Malawi's digital home for football: The Flames, The Scorchers, TNM Super League, FDH Bank Cup, clubs, grassroots, and historical archives.",
};

export default function FootballPage() {
  redirect("/sports/football");
}
