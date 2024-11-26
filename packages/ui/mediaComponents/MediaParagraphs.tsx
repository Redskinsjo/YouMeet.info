import OneLineSkeleton from "../OneLineSkeleton";
import { Article, Translated } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const SectionTitle = dynamic(() => import("../_components/SectionTitleChild"));

const BoldText = dynamic(() => import("@youmeet/ui/TextChild"), {
  loading: () => <OneLineSkeleton height="300px" width="100%" count={1} />,
});

export default function MediaParagraphs({ media }: { media: Article }) {
  return (
    <div className="flex-center flex-col w-full p-[12px] box-border">
      {media.paragraphs?.map((par, i) => {
        const title = par?.title;
        const content = par?.content;

        return (
          <div
            className="w-full m-[24px] flex flex-col gap-[24px]"
            key={`${title?.fr}` + i}
          >
            <SectionTitle
              component="h2"
              className="dark:text-white font-bold my-[24px]"
              translation={title as Translated}
              lang
            />
            <BoldText
              formatDisplay
              links
              align="justify"
              lang
              text={content as Translated}
              containerStyle={{
                textIndent: "24px",
                fontSize: "18px",
                lineHeight: 1.6,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
