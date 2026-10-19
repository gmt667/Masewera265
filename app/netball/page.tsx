import { redirect } from "@/src/platform/navigation";

export const metadata = {
  title: "Malawian Netball | Masewera265",
  description:
    "Home of the world-renowned Malawi Queens, Rainbow Paints Blantyre League, FCB Diamonds, Tigresses, and grassroots netball.",
};

export default function NetballPage() {
  redirect("/sports/netball");
}
