import { PageHero, DataNotice } from "@/components/ui";
import { FootballCorrectionForm } from "@/components/football-correction-form";
export const metadata={title:"Football Correction Draft"};
export default function Page(){return <><PageHero eyebrow="SOURCE-AWARE CONTRIBUTION" title="Correction or Missing Record" intro="Prepare a documented football correction for future review."/><main className="container page-content"><DataNotice title="Device-local demonstration" body="This form validates a draft but does not transmit, publish or alter any authoritative record. A submission and review API is required."/><FootballCorrectionForm/></main></>}
