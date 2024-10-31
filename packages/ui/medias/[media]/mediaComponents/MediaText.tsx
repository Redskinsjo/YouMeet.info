import { Article, Translated } from "@youmeet/gql/generated";
import OneLineSkeleton from "../../../OneLineSkeleton";
import dynamic from "next/dynamic";

const BoldText = dynamic(() => import("@youmeet/ui/BoldText"), {
  ssr: false,
  loading: () => <OneLineSkeleton height="300px" width="100%" count={1} />,
});

export default function MediaText({
  media,
  type,
}: {
  media: Article;
  type: "introduction" | "conclusion";
}) {
  let text;
  if (type === "introduction")
    text = media.introduction as { [key: string]: string };
  if (type === "conclusion")
    text = media.conclusion as { [key: string]: string };
  return (
    <div className="flex-center w-full p-[12px] box-border">
      <BoldText
        formatDisplay
        links
        align="justify"
        text={text as Translated}
        lang
        containerStyle={{
          textIndent: "24px",
          fontSize: "18px",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}
