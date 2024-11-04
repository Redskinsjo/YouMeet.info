import dynamic from "next/dynamic";

const HeroTitles = dynamic(() => import("./HeroTitlesChild"));
const HeroStyledText = dynamic(() => import("./HeroTextChild"));

export default function HeroText() {
  return (
    <div className="w-full box-border flex-[2] p-[48px] pr-[24px] py-[72px] xs:p-[24px] sm:p-[24px] md:p-[48px] flex flex-col items-start justify-between gap-[48px] xs:flex-center sm:flex-center">
      <HeroTitles />
      <HeroStyledText />
    </div>
  );
}
