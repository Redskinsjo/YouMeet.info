import { Article, Translated } from "@youmeet/gql/generated";
import { nunito } from "@youmeet/functions/fonts";
import dynamic from "next/dynamic";
import OneLineSkeleton from "./OneLineSkeleton";

const OtherArticleLink = dynamic(
  () => import("./medias/[media]/mediaComponents/OtherArticleLink"),
  { ssr: false }
);
const OtherArticleImg = dynamic(
  () => import("./medias/[media]/mediaComponents/OtherArticleImg"),
  { ssr: false }
);

const BoldText = dynamic(() => import("./BoldText"), {
  ssr: false,
  loading: () => <OneLineSkeleton height="300px" width="300px" count={1} />,
});

export default function OtherArticle({ article }: { article: Article }) {
  return (
    <div
      className="w-full flex xs:flex-col sm:flex-col md:flex-col xs:flex-center sm:flex-center md:flex-center justify-normal items-normal xs:max-h-full sm:max-h-full md:max-h-full max-h-[200px] border-[0.5px] border-solid border-grey500 border-l-0 rounded-xl"
      key={article?.id}
    >
      <div className="xs:w-full sm:w-full md:w-full w-180px h-[200px]">
        <OtherArticleImg article={article} />
      </div>
      <div className="dark:darkBg flex flex-col items-end gap-[12px]">
        <div className="flex-1 font-[100] p-[24px] text-justify overflow-hidden overflow-y-scroll">
          <BoldText
            text={article.description as Translated}
            fontSizeClass="leading-[1.3] font-normal text-cyan900"
            align="justify"
            containerStyle={{ ...nunito.style }}
            lang
          />
        </div>
        <OtherArticleLink article={article} />
      </div>
    </div>
  );
}
