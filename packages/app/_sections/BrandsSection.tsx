"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";

const brands = [
  {
    name: "Nanotera",
    url: "https://nanotera.eu/",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1718747490/agfclvdzbd9ajurcex19.webp",
  },
  {
    name: "Société Générale",
    url: "https://www.societegenerale.com/fr",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1718747476/jsri7niolhqa4f3tytpr.webp",
  },
  {
    name: "Serotel",
    url: "https://hotellutece.com/",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1718747610/epaa9fzkdlyasm9sczkp.webp",
  },
];

export default function BrandsSection() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <section className="flex xs:flex-col sm:flex-col md:flex-col">
        <div className="flex-1 flex-center flex-col gap-[24px] p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] homeLightning dark:darkHomeSectionBg text-white">
          <h2 role="heading" className="text-center text-[18px]">
            {t("connecting-you-with-recruiters")}
          </h2>
          <div className="w-[300px] overflow-hidden h-[200px] rounded-[14px]">
            <div className="flex w-full h-full gap-[72px] infinite-slide infinite-slide-container">
              {brands.map((brand) => {
                return (
                  <Link role="link" href={brand.url} key={brand.name}>
                    <Image
                      role="img"
                      width={200}
                      height={150}
                      style={{ objectFit: "contain" }}
                      src={brand.logo}
                      alt={`logo de l'entreprise ${brand.name} qui est un partenaire de mise en relation de candidats`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    )
  );
}
