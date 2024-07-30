import React from "react";
import DetailComponent from "./DetailComponent";
import { Reference } from "@youmeet/gql/generated";
import SubPartContainer from "./SubPartContainer";
import ReferenceLabel from "./ReferenceLabel";
import ReferenceValue from "./ReferenceValue";
import ReferenceComponentTitle from "./ReferenceComponentTitle";

export default function NewReferencesComponent({
  references,
}: {
  references: Reference[];
}) {
  const refers = references;
  const pro = refers?.filter((ref) => ref?.type === "professional");
  const academic = refers?.filter((ref) => ref?.type === "academic");
  const judiciary = refers?.filter((ref) => ref?.type === "judiciary");
  const refs = { pro, academic, judiciary };

  return (
    <SubPartContainer
      radius="0px"
      newStyles={{
        padding: "0px",
      }}
    >
      <div className="relative flex flex-col p-[24px] xs:p-[12px] sm:p-[12px] md:p-[12px]">
        <ReferenceComponentTitle />
        <div className="flex flex-col w-full gap-[24px]">
          <div className="flex flex-col gap-[12px] w-full box-border">
            <div className={"relative flex flex-col gap-[6px]"}>
              {Object.entries(refs).map(([title, list]) =>
                title && list ? (
                  <SubPartContainer radius="14px" key={title}>
                    <DetailComponent
                      noPadding
                      noLabelColon={true}
                      newStyles={{ width: "100%" }}
                      fullWidth
                      label={<ReferenceLabel title={title} list={list} />}
                      value={<ReferenceValue list={list} />}
                      type="modal"
                      fontSize="16px"
                      conversation={list.length === 0 ? false : true}
                    />
                  </SubPartContainer>
                ) : undefined
              )}
            </div>
          </div>
        </div>
      </div>
    </SubPartContainer>
  );
}
