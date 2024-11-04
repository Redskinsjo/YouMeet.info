"use client";
import { Suspense } from "react";
import { BetaUser } from "@youmeet/gql/generated";
import OneLineSkeleton from "./OneLineSkeleton";
import dynamic from "next/dynamic";
import { Attr } from "@youmeet/types/attributes";

const DetailComponent = dynamic(() => import("./DetailComponentContent"), {
  ssr: false,
  loading: () => <OneLineSkeleton />,
});

export default function DetailComponentWrapper(params: {
  label: string | (string | React.JSX.Element)[] | React.JSX.Element;
  value: string | (string | React.JSX.Element)[] | React.JSX.Element;
  type?: "modal" | "modal2";
  conversation?: boolean;
  user?: BetaUser | null;
  name?: string;
  newClasses?: string;
  onClick?: () => void;
  newStyles?: Attr | {};
  fontSize?: string;
  noLabelColon?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
  labelFullWidth?: boolean;
  labelNoWrap?: boolean;
  labelUnderline?: boolean;
  account?: boolean;
  noGap?: boolean;
  profil?: BetaUser;
  valueInBold?: boolean;
  reversePlacement?: boolean;
  labelInBold?: boolean;
  labelComponent?: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  valueColor?: string;
}) {
  return (
    <Suspense>
      <DetailComponent {...params} />;
    </Suspense>
  );
}
