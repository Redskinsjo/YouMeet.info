import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import BoldText from "./TextChild";
import dynamic from "next/dynamic";

const SectionTitle = dynamic(() => import("./_components/SectionTitleChild"));
const Card = dynamic(() => import("./Card"));

export default function SuggestedMeets({
  data,
  type,
  dataType,
}: {
  data: (BetaUser | BetaCompany | Offer)[];
  type?: "suggested" | "favorite";
  dataType: "candidates" | "recruiters" | "offers";
}) {
  return data ? (
    <div className="flex flex-col items-center pb-8 box-border w-full">
      <div className="flex justify-start items-center w-full">
        <div className="flex ml-[38px] items-center">
          <SectionTitle
            component="h2"
            translation={
              type === "suggested"
                ? "suggested-" + dataType
                : type === "favorite"
                ? "all-favorites"
                : "all-" + dataType
            }
          />
        </div>
      </div>

      {data.length > 0 ? (
        <div className="flex-center xs:flex-bet sm:flex-bet flex-wrap gap-[12px] xs:gap-[6px] sm:gap-[6px]">
          {data?.map((d: BetaUser | BetaCompany | Offer) => (
            <Card key={d.id} d={d} type={dataType} length={data.length} />
          ))}
        </div>
      ) : (
        <div className="dark:text-white text-[14px] italic px-[12px] h-full">
          <BoldText text={"no-offer-for-the-moment"} align="center" />
        </div>
      )}
    </div>
  ) : undefined;
}
