"use client";
import { Competency, Offer } from "@youmeet/gql/generated";
import Link from "next/link";
import React from "react";
import { useMemo, useState } from "react";

export default function SeeMore({ el }: { el: Offer | Competency }) {
  const [click, setClick] = useState(false);

  const component = useMemo(() => {
    let href = `/competences/${el.slug}`;
    let cta = "Voir plus";
    let title = "Voir plus sur cette compétence";
    if (el.__typename === "Offer") {
      href = `/offres/${el.slug}`;
      cta = "Postuler";
      title = "Postuler à cette offre";
    }
    return (
      <div className="flex-bet w-full">
        <Link
          role="link"
          title={title}
          href={href}
          onClick={() => setClick(true)}
          className={click ? "fadeToRight seeMoreJob" : "seeMoreJob"}
        >
          <span>{cta}</span>
        </Link>
        <div />
      </div>
    );
  }, [el, click]);

  return component;
}
