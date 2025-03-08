"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const brands = [
  {
    name: "Nanotera",
    url: "https://nanotera.eu/",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1718747490/agfclvdzbd9ajurcex19.webp",
  },
  {
    name: "Société Générale",
    url: "https://www.societegenerale.com/fr",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1740263690/youmeet-official/logo/zcpgrjupugbx7zpyciox.webp",
  },
  {
    name: "Serotel",
    url: "https://hotellutece.com/",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1740262690/youmeet-official/logo/ya4ggtnlp28cnbudyj7a.webp",
  },
  {
    name: "Pelico",
    url: "https://fr.pelico.ai/",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1740263541/youmeet-official/logo/stqql6a0sy2mmc5isizc.webp",
  },
  {
    name: "Scalian",
    url: "https://www.scalian.com/",
    logo: "https://res.cloudinary.com/de822mdsy/image/upload/v1740263325/youmeet-official/logo/zkmngds2p4srwzbw4wds.webp",
  },
];

export default function BrandsSection() {
  const { t } = useTranslation();

  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col">
      <div className="flex-1 flex flex-col gap-[24px] p-[48px] max-w-screen xs:p-[12px] sm:p-[12px] md:p-[24px] dark:darkHomeSectionBg text-white">
        <h2 role="heading" className="text-center text-[18px]">
          {t("connecting-you-with-recruiters")}
        </h2>
        <div className="overflow-hidden w-full h-[400px] rounded-[14px] bg-black opacity-60">
          <div className="flex h-full flex-center gap-[72px] flex-wrap">
            {brands.map((brand) => {
              return (
                <div className="w-[15%]" key={brand.name + brand.url}>
                  <Link
                    role="link"
                    href={brand.url}
                    key={brand.name}
                    className="flex-center"
                  >
                    <Image
                      className="animate-pulse"
                      role="img"
                      width={160}
                      height={120}
                      style={{ objectFit: "contain" }}
                      src={brand.logo}
                      alt={`logo de l'entreprise ${brand.name} qui est un partenaire de mise en relation de candidats`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
