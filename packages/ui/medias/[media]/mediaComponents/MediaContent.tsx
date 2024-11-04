import { Article } from "@youmeet/gql/generated";
import { Suspense } from "react";
import MediaImg from "./MediaImg";
import dynamic from "next/dynamic";
import MediaTitle from "./MediaTitle";
import MediaText from "./MediaText";
import MediaParagraphs from "./MediaParagraphs";

const MediaLinks = dynamic(() => import("./MediaLinksChild"));

export default function MediaContent({ media }: { media: Article }) {
  return (
    <div className="flex min-h-screen w-full bg-grey200 flex-col items-center xs:p-0 sm:p-0 md:p-0 p-[24px] box-border gap-[12px] mt-[12px] dark:lightDarkBg rounded-[14px] h-full shadow-custom">
      <MediaImg media={media} />
      <MediaTitle media={media} />
      <MediaText media={media} type="introduction" />

      <MediaParagraphs media={media} />
      <MediaText media={media} type="conclusion" />
      <Suspense>
        <MediaLinks media={media} />
      </Suspense>
    </div>
  );
}
