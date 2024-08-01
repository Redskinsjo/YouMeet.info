import SectionTitle from "../../../_components/SectionTitle";
import OtherArticle from "../../../OtherArticle";
import { Article } from "@youmeet/gql/generated";
import React from "react";

export default function OtherArticles({
  articles,
  media,
}: {
  articles: Article[];
  media: Article;
}) {
  return (
    <div className="bg-grey200 dark:lightDarkBg rounded-xl shadow-xl p-[24px]">
      <SectionTitle
        translation="some-articles-could-interest"
        component="h2"
        className="dark:text-white"
      />
      {articles
        ?.filter((article) => article && article.id !== media.id)
        .map((article, index) =>
          article ? (
            <OtherArticle key={article.id} article={article} index={index} />
          ) : undefined
        )}
    </div>
  );
}
