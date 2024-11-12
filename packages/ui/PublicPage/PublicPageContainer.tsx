import Layout from "../Layout";
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
  return (
    <div
      className="flex-center w-full box-border h-full"
      style={{ ...newStyles }}
    >
      <Layout
        newClasses="xs:my-0 sm:my-0 md:my-0 mx-auto mt-0 mb-[24px] w-screen h-full"
        newStyles={{
          height: "100%",
          boxSizing: "border-box",
          borderRadius: "14px",
          padding: "3px",
          ...newStyles,
        }}
      >
        <div className="flex flex-col w-full gap-[6px] box-border h-full">
          {!noReturnHeader && (
            <div className="mediumBg dark:mediumDarkBg flex-bet w-full p-[3px] rounded-[14px] box-border">
              <Suspense>
                <BackButton />
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
          <div
            className="flex flex-col gap-[48px] box-border h-full"
            style={{
              overflow: view ? "hidden" : "initial",
            }}
          >
            {children}
          </div>
        </div>
      </Layout>
    </div>
  );
}
