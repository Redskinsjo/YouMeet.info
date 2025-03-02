"use client";
import { Competency, Offer, Video } from "@youmeet/gql/generated";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function SeeMore({ el }: { el: Offer | Competency | Video }) {
  const [click, setClick] = useState(false);

  if (el.__typename === "Video") {
    return null;
  } else if (!(el as Offer).slug) return null;

  const component = useMemo(() => {
    let attributes = {
      href: `/competences/${(el as Offer).slug}`,
      cta: "Voir plus",
      title: "Voir plus sur cette compétence",
    };
    if (el.__typename === "Offer") {
      attributes = {
        href: `${el.slug}`,
        cta: "Postuler",
        title: "Postuler à cette offre",
      };
    }

    return (
      <div className="flex-bet w-full">
        <Link
          role="link"
          title={attributes.title}
          href={attributes.href}
          onClick={() => setClick(true)}
          className={click ? "fadeToRight seeMoreJob" : "seeMoreJob"}
        >
          <span>{attributes.cta}</span>
        </Link>
        <div />
      </div>
    );
  }, [click]);

  return component;
}
