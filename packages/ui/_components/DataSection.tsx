import BoldText from "@youmeet/ui/BoldText";
import { GptCompetency, Offer } from "@youmeet/gql/generated";
import { isCompetency } from "@youmeet/types/TypeGuards";
import dynamic from "next/dynamic";
import React from "react";

const Card = dynamic(() => import("./Card"));
const SectionTitle = dynamic(() => import("./SectionTitle"));

export default function DataSection({
  data,
}: {
  data: (Offer | GptCompetency)[];
}) {
  let translation = "jobs-to-be-filled";
  let p = "Proposez votre profil à +une des opportunités= suivantes.+";

  if (data[0]?.__typename === "GptCompetency" && isCompetency(data[0])) {
    translation = "skills-to-be-valued";
    p = "Découvrez des exemples de +compétences à valoriser= sur votre CV.+";

    return (
      <div className="flex-1 p-[48px] py-[72px] xs:p-[12px] sm:p-[12px] md:p-[24px] homeSectionBg dark:darkHomeSectionBg">
        <SectionTitle
          component="h2"
          translation={translation}
          className="dark:text-white"
        />

        <BoldText text={p} />
        <div className="flex-center flex-col gap-[12px] w-full p-[12px] xs:p-0 w-full">
          {data.map((el) => (
            <Card key={el.id} el={el} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] homeSectionBg dark:darkHomeSectionBg">
      <SectionTitle
        component="h2"
        translation={translation}
        className="text-right dark:text-white"
      />

      <BoldText
        text="Proposez votre profil à +une des opportunités= suivantes+"
        containerStyle={{ textAlign: "right" }}
      />
      <div className="flex flex-col gap-[12px] w-fit p-[12px] xs:p-0 w-full">
        {data.map((el) => (
          <Card key={el.id} el={el} />
        ))}
      </div>
    </div>
  );
}
