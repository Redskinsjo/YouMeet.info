"use client";
import { Article } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
const MediaLinks = dynamic(() => import("./MediaLinks"), { ssr: false });

export default function fnc({ media }: { media: Article }) {
  return <MediaLinks media={media} />;
}
