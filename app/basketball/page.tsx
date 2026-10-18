import { redirect } from "next/navigation";

export const metadata = {
  title: "Malawian Basketball | Masewera265",
  description:
    "Malawi's digital hub for basketball: BASMAL national championships, Bravehearts BC, Central Knights, Cougars, and regional basketball leagues.",
};

export default function BasketballPage() {
  redirect("/sports/basketball");
}
