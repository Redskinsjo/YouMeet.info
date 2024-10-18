import { Competency } from "@youmeet/gql/generated";
import { outfit } from "@youmeet/functions/fonts";
import Link from "next/link";
import React from "react";

const CompetencyLink = ({ requirement }: { requirement: Competency }) => {
  return requirement?.title ? (
    <Link
      href={`/competences/${requirement.slug}`}
      className="no-underline px-[12px] py-[6px] bg-deepPurple50 text-deepPurple900 rounded-[14px] w-auto"
      style={{
        ...outfit.style,
      }}
    >
      {requirement?.title[0].toUpperCase() + requirement?.title.slice(1)}
    </Link>
  ) : undefined;
};

export default CompetencyLink;
