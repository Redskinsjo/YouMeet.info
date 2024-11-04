import OneLineSkeleton from "../../../OneLineSkeleton";
import { Article } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const SectionTitle = dynamic(
  () => import("../../../_components/SectionTitleChild")
);

export default function MediaTitle({ media }: { media: Article }) {
  return (
    <div className="flex-center w-full p-[12px] box-border">
      <SectionTitle
        component="h1"
        translation={media?.title}
        className="m-[24px] text-[24px] font-bold dark:text-white"
        lang
      />
    </div>
  );
}
