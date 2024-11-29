"use client";

import OneLineSkeleton from "../OneLineSkeleton";
import dynamic from "next/dynamic";
import { ReducedArticle } from "@youmeet/types/ReducedArticle";

const BlogMenuLi = dynamic(() => import("./BlogMenuLi"), {
  ssr: false,
  loading: () => <OneLineSkeleton />,
});

export default function fnc({ article }: { article: ReducedArticle }) {
  return <BlogMenuLi article={article} />;
}
