import { DynamicData } from "@youmeet/types/cgu";
import dynamic from "next/dynamic";

const BoldText = dynamic(() => import("../TextChild"));

export default function Paragraph({
  paragraph,
}: {
  paragraph: DynamicData | string | undefined;
}) {
  return (
    <>
      {!!paragraph && !(paragraph as DynamicData).variable && (
        <div className="legend">
          <BoldText
            text={`${paragraph}+`}
            align="left"
            skeleton={{ count: 2, height: "100px" }}
          />
        </div>
      )}
      {!!paragraph && (paragraph as DynamicData).variable && (
        <div className="legend">
          <BoldText
            text={`${(paragraph as DynamicData).content(
              (paragraph as DynamicData).variable
            )}+`}
            align="left"
            skeleton={{ count: 2, height: "100px" }}
          />
        </div>
      )}
    </>
  );
}
