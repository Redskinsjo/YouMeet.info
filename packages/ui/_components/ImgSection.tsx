"use client";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

type Type = "offer" | "competency" | "square1" | "square2";
type Size = { sm: number; lg: number };
type Params = {
  src: string;
  width: Size;
  height: Size;
  alt: string;
};

const types = {
  offer: {
    src: "https://res.cloudinary.com/de822mdsy/image/upload/v1716140596/rfboyaw3wyrfuhjdxegy.webp",
    width: { sm: 350, lg: 500 },
    height: { sm: 350 * (563 / 1000), lg: 500 * (563 / 1000) },
    alt: "un bureau autour duquel des recruteurs et DRH d'entreprises en croissance discutent de recrutement et proposent des offres d'emplois à des candidats qualifiés par vidéo",
  },
  competency: {
    src: "https://res.cloudinary.com/de822mdsy/image/upload/v1706294048/szo6gbz8rk5r2j94kwao.webp",
    width: { sm: 350, lg: 500 },
    height: { sm: 350 * (900 / 1600), lg: 500 * (900 / 1600) },
    alt: "des chaînes d'ADN représentant les compétences des candidats qualifiés par vidéo que YouMeet met en avant pour les recruteurs et DRH d'entreprises en croissance",
  },
  square1: {
    src: "https://res.cloudinary.com/de822mdsy/image/upload/v1705961695/yzyabw7pdqgywio6txs4.webp",
    width: { sm: 375, lg: 500 },
    height: { sm: 375 * (334 / 500), lg: 500 * (334 / 500) },
    alt: "Une caméra prête à prendre une vidéo professionnelle et un microphone disponible à l'utilisation posé sur une table",
  },
  square2: {
    src: "https://res.cloudinary.com/de822mdsy/image/upload/v1705961688/pczwh1obajieursjhmz2.webp",
    width: { sm: 375, lg: 500 },
    height: { sm: 375 * (519 / 1000), lg: 500 * (519 / 1000) },
    alt: "Un bouton de diffusion de voix sur les ondes et un doigt très près d'appuyer sur le bouton et d'enclencher la diffusion",
  },
} as {
  [keyof in Type]: Params;
};

export default function ImgSection({ type }: { type: Type }) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");

  const width = types[type].width;
  const height = types[type].height;
  const src = types[type].src;
  const alt = types[type].alt;

  return (
    <div className="flex-1 flex-center homeImgBg p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] dark:darkHomeSectionBg">
      <Image
        role="img"
        title={alt}
        width={xs || sm ? width.sm : width.lg}
        height={xs || sm ? height.sm : height.lg}
        alt={alt}
        src={src}
      />
    </div>
  );
}
