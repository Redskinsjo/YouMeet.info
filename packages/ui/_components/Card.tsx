"use client";
import { Competency, Offer, Video } from "@youmeet/gql/generated";
import { isCompetency } from "@youmeet/types/TypeGuards";
import AOS from "aos";
import MainInfos from "./MainInfos";
import SeeMore from "./SeeMore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Card({ el }: { el: Offer | Competency | Video }) {
  const router = useRouter();

  let attributes = {
    className:
      "w-[400px] xs:w-full sm:w-full rounded-[7px] border-[2px] shadow-md shadow-blueGrey100 border-solid border-grey400 dark:border-grey900 bg-white dark:lightDarkBg box-border cursor-pointer",
    aos: "fade-left",
    href: `/offres/${(el as Offer).slug}`,
  };

  if (el.__typename === "Competency" && isCompetency(el)) {
    attributes = {
      className:
        "w-[400px] xs:w-[350px] sm:w-[350px] h-full xs:h-full sm:h-full rounded-[7px] border-[3px] shadow-xl shadow-grey300 border-solid border-grey400 dark:border-grey900 bg-white dark:lightDarkBg box-border cursor-pointer",
      aos: "fade-right",
      href: `/competences/${el.slug}`,
    };
  }

  if (el.__typename === "Video") {
    attributes = {
      className:
        "w-[400px] xs:w-[300px] sm:w-[300px] h-full xs:h-full sm:h-full rounded-[7px] border-[3px] shadow-xl shadow-grey300 border-solid border-grey400 dark:border-grey900 bg-white dark:lightDarkBg box-border cursor-pointer",
      aos: "fade-up",
      href: ``,
    };
  }

  useEffect(() => {
    AOS.init();
  });

  return (
    <div
      key={el.id}
      className={attributes.className}
      data-aos={attributes.aos}
      onClick={() => {
        router.push(attributes.href);
      }}
    >
      <MainInfos el={el} />
      <SeeMore el={el} />
    </div>
  );
}
