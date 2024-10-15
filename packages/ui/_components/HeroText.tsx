import dynamic from "next/dynamic";

const HeroTitles = dynamic(() => import("./HeroTitles"));
const HeroStyledText = dynamic(() => import("./HeroStyledText"));

export default function HeroText() {
  return (
    <div className="flex-[2] p-[48px] pr-[24px] py-[72px] xs:p-[24px] sm:p-[24px] md:p-[48px] flex flex-col items-start justify-between gap-[48px] xs:flex-center sm:flex-center">
      <HeroTitles />
      <HeroStyledText />
    </div>
  );
}
