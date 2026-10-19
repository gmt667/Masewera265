import { redirect } from "@/src/platform/navigation";
export const metadata = { title: "Malawi Netball Competitions | Masewera265" };
export default function NetballCompetitionsPage() { redirect("/competitions?sport=netball"); }
