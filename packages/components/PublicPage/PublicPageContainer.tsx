import Layout from "../../Layout";
import { Offer } from "@youmeet/gql/generated";
import type { Attr } from "@youmeet/types/attributes";
import BackButton from "./BackButton";
import Switches from "./Switches";
import ApplyBtn from "./ApplyBtn";
import EdgeMsg from "./EdgeMsg";
import React from "react";

export default function PublicPageContainer({
  children,
  noReturnHeader,
  apply,
  offre,
  newStyles,
}: {
  children: React.ReactElement;
  noReturnHeader?: boolean;
  apply?: boolean;
  offre?: Offer;
  newStyles?: Attr;
}) {
  return (
    <div className="flex-center w-full">
      <Layout
        newClasses="xs:my-0 sm:my-0 md:my-0 mx-auto mt-0 mb-[24px] w-screen"
        newStyles={{
          maxWidth: "900px",
          height: "100%",
          flex: 1,
          boxSizing: "border-box",
          borderRadius: "14px",
          padding: "6px",
          ...newStyles,
        }}
      >
        <div className="flex flex-col w-full gap-[6px]">
          {!noReturnHeader && (
            <div className="mediumBg dark:mediumDarkBg flex-bet w-full p-[3px] rounded-[14px] box-border">
              <BackButton />
              {apply && (
                <div className="flex items-center xs:items-end sm:items-end md:items-end xs:flex-col sm:flex-col md:flex-col gap-[12px] xs:gap-[3px] sm:gap-[3px] md:gap-[3px]">
                  <EdgeMsg />
                  <Switches />
                  <ApplyBtn offre={offre} />
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-[48px]">{children}</div>
        </div>
      </Layout>
    </div>
  );
}
