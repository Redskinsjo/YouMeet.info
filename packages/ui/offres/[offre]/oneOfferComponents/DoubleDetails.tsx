import dynamic from "next/dynamic";

const DetailComponent = dynamic(() => import("../../../DetailComponent"));

export default function DoubleDetails({
  value1,
  value2,
  label1,
  label2,
}: {
  value1: any;
  value2?: any;
  label1: string;
  label2?: string;
}) {
  return (
    <div className="flex-bet w-full flex-wrap">
      {value1 && label1 && (
        <DetailComponent
          noPadding
          labelComponent="h3"
          newStyles={{ minWidth: "unset" }}
          newClasses="text-[16px] xs:text-[13px] sm:text-[13px]"
          valueInBold
          noLabelColon
          type="modal"
          label={label1}
          value={value1}
        />
      )}
      {value2 && label2 && (
        <DetailComponent
          noPadding
          labelComponent="h3"
          newStyles={{ minWidth: "unset" }}
          newClasses="text-[16px] xs:text-[13px] sm:text-[13px]"
          valueInBold
          noLabelColon
          type="modal"
          label={label2}
          value={value2}
        />
      )}
    </div>
  );
}
