import { SportsDirectory } from "@/components/directory-pages";
import { DataStatePanel } from "@/components/data-state";
import { PageHero } from "@/components/ui";
import { publicData } from "@/lib/data-service";

export const metadata = { title: "Sports" };

export default async function SportsPage() {
  const result = await publicData.sports();
  return <>
    <PageHero eyebrow="Independent sport platforms" title="Every sport has a complete home" intro="Each discipline has its own teams, national representation, competitions, events, athletes and records within one Malawi-wide platform." />
    <div className="container page-content">
      {result.data.length ? <SportsDirectory sportsData={result.data} /> : <DataStatePanel state={result.state === "ready" ? "empty" : result.state} message={result.message} />}
    </div>
  </>;
}
