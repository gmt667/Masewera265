import { redirect } from "next/navigation";
export const metadata = { title: "Malawi Basketball Competitions | Masewera265" };
export default function BasketballCompetitionsPage() { redirect("/competitions?sport=basketball"); }
