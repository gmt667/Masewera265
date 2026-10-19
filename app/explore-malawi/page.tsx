import Link from "@/src/platform/link";
import { ArrowRight, MapPin } from "lucide-react";
import { DataStatePanel } from "@/components/data-state";
import { DemoBadge, PageHero } from "@/components/ui";
import { publicData } from "@/lib/data-service";

export const metadata = { title: "Explore Malawi" };

export default async function ExploreMalawiPage() {
  const result = await publicData.places();
  return <><PageHero eyebrow="Sport + place + participation" title="Explore Malawi" intro="Discover available sport by region, district and locality using Malawi's geographic classifications."/>
    <div className="container page-content">
      {result.data.length ? <><div className="map-intro"><div className="malawi-map" aria-label="Stylized outline representing Malawi"><span className="pin pin-1"/><span className="pin pin-2"/><span className="pin pin-3"/><strong>MW</strong></div><div>{result.isDemo && <DemoBadge/>}<h2>From Karonga to Nsanje</h2><p>Masewera265 connects national events with regional, district and community sports across all three regions.</p><div className="participation-tags"><span>School sport</span><span>University sport</span><span>Disability sport</span><span>Community sport</span></div></div></div><div className="explore-regions">{result.data.map((group,index)=><section key={group.region}><div className="region-number">0{index+1}</div><div className="region-title"><p>{group.region} Region</p><strong>{group.count} sporting hubs</strong></div><div className="district-list">{group.places.map(place=><Link href={`/search?q=${place}`} key={place}><MapPin/>{place}<ArrowRight/></Link>)}</div></section>)}</div></> : <DataStatePanel state={result.state === "ready" ? "empty" : result.state} message={result.message}/>} 
    </div></>;
}
