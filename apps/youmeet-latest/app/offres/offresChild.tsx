import { Offer } from "@youmeet/gql/generated";
import React from "react";
import Footer from "@youmeet/ui/Footer";
import BigHeaderSection from "@youmeet/ui/_sections/BigHeaderSection";
import OffresComponent from "@youmeet/ui/offres/offresComponent/OffresComponent";
import OffresEmploiFT from "@youmeet/ui/offres/offresComponent/OffresEmploiFT";
import { OffreEmploiFT } from "@youmeet/types/api/OffreEmploiFT";

export default function OffresChild({ offres }: { offres: OffreEmploiFT[] }) {
  // export default function OffresChild({ offres }: { offres: Offer[] }) {
  // const { data: suggestedData, loading: suggestedLoading } = useQuery(
  //   GetOffersDocument,
  //   {
  //     variables: {
  //       params: { take: 3 },
  //       data: {
  //         sectors,
  //         jobs,
  //         targetSectorId: user.candidate?.targetJob?.topSector?.id || undefined,
  //       },
  //     },
  //   }
  // );

  // useEffect(() => {
  //   const hasAvatars = (curr: Offer) => {};

  //   const filtered = (suggestedData?.offers as Offer[])?.reduce((acc, curr) => {
  //     acc.push(curr);
  //     return acc;
  //   }, [] as Offer[]);

  //   setSuggested(filtered);
  // }, [suggestedLoading]);

  return (
    <div className="min-h-screen">
      <div className="relative flex-1 flex flex-col h-full min-h-screen dark:darkBg mediumBg">
        <BigHeaderSection />
        {/* <OffresComponent offres={offres} /> */}
        <OffresEmploiFT offres={offres} />
      </div>
      <Footer />
    </div>
  );
}
