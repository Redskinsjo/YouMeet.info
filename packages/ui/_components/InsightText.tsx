import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import dynamic from "next/dynamic";

const SectionTitle = dynamic(() => import("./SectionTitleChild"));
const BoldText = dynamic(() => import("@youmeet/ui/TextChild"));
const TryOut = dynamic(() => import("../_homeComponents/TryOutChild"));

export default function InsightText() {
  return (
    <div className="flex-1 flex flex-col gap-[24px] p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] text-white">
      <SectionTitle
        component="h2"
        translation="insight-title"
        className="text-left relative"
      />
      <BoldText
        text={"improve-your-applications"}
        containerStyle={{ textAlign: "left" }}
      />
      <div className="w-full flex-center">
        <HiChevronDoubleRight className="emphasizeVisualLeft text-yellow200" />
        <TryOut />
        <HiChevronDoubleLeft className="emphasizeVisualRight text-yellow200" />
      </div>
    </div>
  );
}
