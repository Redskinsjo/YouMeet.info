import { Competency, Offer, Video } from "@youmeet/gql/generated";
import { isCompetency } from "@youmeet/types/TypeGuards";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Card = dynamic(() => import("./Card"));
const SectionTitle = dynamic(() => import("./SectionTitleChild"));
const BoldText = dynamic(() => import("@youmeet/ui/TextChild"));

export default function DataSection({
  data,
}: {
  data: (Offer | Competency | Video)[];
}) {
  let attributes: {
    translation: string;
    text: string;
    containerStyle: { [key in string]: string };
    className: string;
  } = {
    translation: "jobs-to-be-filled",
    text: "Proposez votre profil à +une des opportunités= suivantes+",
    containerStyle: { textAlign: "right" },
    className: "text-right dark:text-white",
  };

  if (data[0]?.__typename === "Competency" && isCompetency(data[0])) {
    attributes = {
      translation: "skills-to-be-valued",
      text: "Découvrez des exemples de +compétences à valoriser= sur votre CV.+",
      className: "dark:text-white",
      containerStyle: {},
    };
  }
  if (data[0]?.__typename === "Video") {
    attributes = {
      translation: "see-videos",
      text: "Découvrez des exemples de vidéos de présentation de candidats.",
      containerStyle: { textAlign: "left" },
      className: "",
    };
  }

  return (
    !!data.length && (
      <div className="flex-1 p-[48px] w-full box-border xs:p-[12px] sm:p-[12px] md:p-[24px] homeSectionBg dark:darkHomeSectionBg">
        <SectionTitle
          component="h2"
          translation={attributes.translation}
          className={attributes.className}
        />

        <BoldText
          text={attributes.text}
          containerStyle={attributes.containerStyle}
        />

        <div className="flex-center xs:flex-col sm:flex-col md:flex-col flex-wrap gap-[12px] w-fit p-[12px] xs:p-0 w-full">
          {data.map((el) => (
            <Suspense key={el?.id}>
              <Card el={el} />
            </Suspense>
          ))}
        </div>
      </div>
    )
  );
}
