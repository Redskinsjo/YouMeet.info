"use client";
import { Competency, Offer } from "@youmeet/gql/generated";
import { isCompetency } from "@youmeet/types/TypeGuards";
import AOS from "aos";
import "aos/dist/aos.css";
import MainInfos from "./MainInfos";
import SeeMore from "./SeeMore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Card({ el }: { el: Offer | Competency }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  let className =
    "w-[400px] xs:w-full sm:w-full rounded-[7px] border-[2px] shadow-md shadow-blueGrey100 border-solid border-grey400 dark:border-grey900 bg-white dark:lightDarkBg box-border cursor-pointer";
  let aos = "fade-left";
  let href = `/offres/${el.slug}`;

  if (el.__typename === "Competency" && isCompetency(el)) {
    className =
      "w-[400px] xs:w-[350px] sm:w-[350px] h-full xs:h-full sm:h-full rounded-[7px] border-[3px] shadow-xl shadow-grey300 border-solid border-grey400 dark:border-grey900 bg-white dark:lightDarkBg box-border cursor-pointer";
    aos = "fade-right";
    href = `/competences/${el.slug}`;
  }

  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div
        key={el.id}
        className={className}
        data-aos={aos}
        onClick={() => {
          router.push(href);
        }}
      >
        <MainInfos el={el} />
        <SeeMore el={el} />
      </div>
    )
  );
}
