"use client";
import OneLineSkeleton from "../OneLineSkeleton";
import { Article } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
const HomeMediaCard = dynamic(() => import("./HomeMediaCard"), {
  ssr: false,
  loading: () => <OneLineSkeleton count={1} height="360px" width="550px" />,
});

export default function fnc({ article }: { article: Article }) {
  return <HomeMediaCard article={article} />;
}
