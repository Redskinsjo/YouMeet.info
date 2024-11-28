import { Offer } from "@youmeet/gql/generated";
import type { Attr } from "@youmeet/types/attributes";
import BackButton from "./BackButton";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const EdgeMsg = dynamic(() => import("./EdgeMsg"));
const Switches = dynamic(() => import("./SwitchesChild"));
const ApplyBtn = dynamic(() => import("./ApplyBtnChild"));

export default function PublicPageContainer({
  children,
  noReturnHeader,
  apply,
  offre,
  newStyles,
  view,
}: {
  children: React.ReactElement;
  noReturnHeader?: boolean;
  apply?: boolean;
  offre?: Offer;
  newStyles?: Attr;
  view?: boolean;
}) {
  const className = view
    ? "flex-center box-border h-full w-[600px] xs:w-screen sm:w-screen"
    : "flex-center box-border h-full w-[900px] xs:w-screen sm:w-screen";
  return (
    <div className={className} style={{ ...newStyles }}>
      <div className="flex flex-col w-full gap-[6px] box-border h-full overflow-hidden overflow-y-scroll">
        {!noReturnHeader && (
          <div className="mediumBg dark:mediumDarkBg flex-bet w-full p-[3px] rounded-[14px] box-border">
            <Suspense>
              <BackButton view={view} />
            </Suspense>
            {apply && (
              <div className="flex items-center xs:items-end sm:items-end md:items-end xs:flex-col sm:flex-col md:flex-col gap-[12px] xs:gap-[3px] sm:gap-[3px] md:gap-[3px]">
                <EdgeMsg />
                <Switches />
                <ApplyBtn offre={offre} />
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-[48px] box-border h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
