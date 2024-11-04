"use client";
import { Article } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
const OtherArticleLink = dynamic(() => import("./OtherArticleLink"), {
  ssr: false,
});

export default function fnc({ article }: { article: Article }) {
  return <OtherArticleLink article={article} />;
}
