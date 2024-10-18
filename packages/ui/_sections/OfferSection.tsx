import { Offer } from "@youmeet/gql/generated";
import DataSection from "../_components/DataSection";
import dynamic from "next/dynamic";

const ImgSection = dynamic(() => import("../_components/ImgSection"), {
  ssr: false,
});

export default function OfferSection({ offers }: { offers: Offer[] }) {
  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col dark:darkHomeSectionBg">
      <ImgSection type="offer" />
      <DataSection data={offers} />
    </section>
  );
}
