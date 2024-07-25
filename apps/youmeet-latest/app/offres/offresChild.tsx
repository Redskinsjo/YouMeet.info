"use client";
import { Offer } from "@youmeet/gql/generated";
import React from "react";
import Footer from "@youmeet/components/Footer";
import BigHeaderSection from "@youmeet/app/_sections/BigHeaderSection";
import OffresComponent from "@youmeet/app/offres/offresComponent/OffresComponent";

export default function OffresChild({ offres }: { offres: Offer[] }) {
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
        <OffresComponent offres={offres} />
      </div>
      <Footer />
    </div>
  );
}