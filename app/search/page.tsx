import { SearchExperience } from "@/components/search-page"; import { PageHero } from "@/components/ui";
export const metadata={title:"Search"}; export default function Page(){return <><PageHero eyebrow="Connected discovery" title="Search Masewera265" intro="Find sports, clubs, athletes, venues and competitions across Malawi."/><div className="container page-content"><SearchExperience/></div></>}
