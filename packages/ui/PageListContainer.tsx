import BoldText from "./TextChild";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";
import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import SuggestedMeets from "./SuggestedMeets";

export default function PageListContainer({
  data,
  dataType,
  type,
}: {
  data: BetaUser[] | BetaCompany[] | Offer[] | undefined | any[];
  dataType: "candidates" | "recruiters" | "offers";
  type?: SuggestedMeetsType;
}) {
  return (
    <div className="w-full flex flex-col gap-[12px] box-border">
      <div className="w-full">
        {data && data.length > 0 ? (
          <div className="p-[12px]">
            <BoldText
              text={`${dataType}-announcement`}
              fontSizeClass="text-black"
            />
          </div>
        ) : undefined}

        <SuggestedMeets
          data={data as (BetaUser | BetaCompany | Offer)[]}
          dataType={dataType}
          type={type}
        />
      </div>
    </div>
  );
}
