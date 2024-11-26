"use client";
import { Article } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
const OtherArticleImg = dynamic(() => import("./OtherArticleImg"), {
  ssr: false,
});

export default function fnc({ article }: { article: Article }) {
  return <OtherArticleImg article={article} />;
}
