import { FixtureBrowser } from "@/components/directory-pages"; import { PageHero } from "@/components/ui";
export const metadata={title:"Live Events"}; export default function Page(){return <><PageHero eyebrow="Ongoing now" title="Live events" intro="Follow events currently marked live in the available records."/><div className="container page-content"><FixtureBrowser liveOnly/></div></>}
