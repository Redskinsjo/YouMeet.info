import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";
import OneLineSkeleton from "./OneLineSkeleton";

const Card = dynamic(() => import("./Card"));
const SuggestedMeetsTitle = dynamic(() => import("./SuggestedMeetsTitle"));
const CardNavigation = dynamic(() => import("./CardNavigation"));
const ResetNavigation = dynamic(() => import("./ResetNavigation"));
const BoldText = dynamic(() => import("./TextChild"));

export default function SuggestedMeets({
  data,
  type,
  dataType,
  bgImage,
}: {
  data: (BetaUser | BetaCompany | Offer)[];
  type: SuggestedMeetsType;
  dataType: "candidates" | "recruiters" | "offers";
  bgImage?: string;
}) {
  return data ? (
    <section className="flex flex-col items-center pb-8 box-border w-full relative h-[409px] xs:h-full sm:h-full">
      {!!bgImage && (
        <div className="absolute flex justify-end w-full h-full top-0 left-0 z-[-1] offerBg">
          <Image
            src={bgImage}
            alt="background image of this section"
            width={0}
            height={0}
            priority
            style={{
              objectFit: "cover",
            }}
            className="w-full h-full w-auto object-cover"
          />
        </div>
      )}
      <div className="flex justify-start items-center w-full">
        <div className="flex ml-[38px] items-center">
          <SuggestedMeetsTitle type={type} dataType={dataType} />
        </div>
      </div>

      {data.length > 0 ? (
        <div className="flex w-full justify-start">
          <div className="flex xs:flex-bet sm:flex-bet flex-wrap gap-[12px] xs:gap-[6px] sm:gap-[6px] px-[12px]">
            {data?.map((d: BetaUser | BetaCompany | Offer) => (
              <Card key={d.id} d={d} type={dataType} length={data.length} />
            ))}
            {type && <CardNavigation type={type} length={data.length} />}
          </div>
        </div>
      ) : (
        <div className="dark:text-white text-[14px] italic px-[12px] h-full flex flex-col gap-[12px]">
          <BoldText text={"no-offer-for-the-moment"} align="center" />

          <ResetNavigation type={type} />
        </div>
      )}
    </section>
  ) : undefined;
}
