"use client";

import OneLineSkeleton from "../OneLineSkeleton";
import dynamic from "next/dynamic";
import { ReducedArticle, ReducedVideo } from "@youmeet/types/ReducedArticle";

const BlogMenuLi = dynamic(() => import("./BlogMenuLi"), {
  ssr: false,
  loading: () => <OneLineSkeleton />,
});

export default function fnc({
  article,
}: {
  article: ReducedArticle | ReducedVideo;
}) {
  return <BlogMenuLi article={article} />;
}
