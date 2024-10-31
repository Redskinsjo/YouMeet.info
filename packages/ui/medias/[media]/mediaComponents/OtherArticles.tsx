import dynamic from "next/dynamic";
import { Article } from "@youmeet/gql/generated";
import OneLineSkeleton from "../../../OneLineSkeleton";
import OtherArticle from "../../../OtherArticle";

const SectionTitle = dynamic(
  () => import("../../../_components/SectionTitle"),
  {
    ssr: false,
    loading: () => <OneLineSkeleton height="20px" width="200px" count={1} />,
  }
);
export default function OtherArticles({
  articles,
  media,
}: {
  articles: Article[];
  media: Article;
}) {
  return (
    <div className="bg-grey200 dark:lightDarkBg rounded-xl shadow-xl p-[24px] flex flex-col gap-[24px]">
      <SectionTitle
        translation="some-articles-could-interest"
        component="h2"
        className="dark:text-white"
      />
      {articles
        ?.filter((article) => article && article.id !== media.id)
        .map((article, index) =>
          article ? (
            <OtherArticle key={article.id} article={article} />
          ) : undefined
        )}
    </div>
  );
}
