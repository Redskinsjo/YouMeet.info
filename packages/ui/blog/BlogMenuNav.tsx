import { useRouter } from "next/navigation";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ReducedArticle, ReducedVideo } from "@youmeet/types/ReducedArticle";
import { useTranslation } from "react-i18next";
import { indie_flower } from "@youmeet/functions/fonts";

const BlogMenuLi = dynamic(() => import("./BlogMenuLiChild"));

export default function BlogMenuNav({
  articles,
  videos,
}: {
  articles?: ReducedArticle[];
  videos?: ReducedVideo[];
}) {
  const router = useRouter();
  const { t } = useTranslation();

  const articleEls = useMemo(() => {
    const arts = (articles || videos || []).map((article) => {
      let slug = `${article.slug}`;
      if (articles) {
        slug = `/medias/${(article as ReducedArticle).slug}`;
        router.prefetch(`${slug}`);
      } else if (videos) {
        router.prefetch(`${slug}`);
      }
      return <BlogMenuLi article={{ ...article, slug }} key={article.id} />;
    });
    return arts;
  }, [articles, videos]);

  return (
    <nav className="scroll-container h-[270px] overflow-hidden overflow-y-scroll box-border py-[6px] border-t-[0.5px] border-0 border-solid border-grey500 relative">
      <ul className="flex flex-col gap-[6px] m-0 p-0 dark:text-white">
        {articleEls}
        {!!videos && (
          <li
            className={`h-[22px] opacity-80 text-deepPurple700 ${indie_flower.className} underline underline-offset-2 decoration-1`}
          >
            {t("and-279-others")}
          </li>
        )}
      </ul>
      <div className="absolute b-0 w-full h-[22px] opacity-50" />
    </nav>
  );
}
