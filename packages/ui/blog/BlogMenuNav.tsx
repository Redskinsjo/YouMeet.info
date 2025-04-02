import { Translated } from "@youmeet/gql/generated";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { ReducedArticle, ReducedVideo } from "@youmeet/types/ReducedArticle";

const BlogMenuLi = dynamic(() => import("./BlogMenuLiChild"));

export default function BlogMenuNav({
  articles,
  videos,
}: {
  articles?: ReducedArticle[];
  videos?: ReducedVideo[];
}) {
  const {
    i18n: { language },
  } = useTranslation();
  const router = useRouter();

  const articleEls = (articles || videos || []).map((article) => {
    let slug = `${article.slug}`;
    if (articles) {
      slug = `/medias/${(article as ReducedArticle).slug}`;
      router.prefetch(`${slug}`);
    } else if (videos) {
      router.prefetch(`${slug}`);
    }
    return (
      <BlogMenuLi article={Object.assign(article, { slug })} key={article.id} />
    );
  });

  const updateBlur = (scrollContainer: any, listItems: HTMLLIElement[]) => {
    const containerHeight = scrollContainer.offsetHeight;
    const scrollTop = scrollContainer.scrollTop;

    listItems.forEach((item) => {
      const itemTop = item.offsetTop;
      const itemHeight = item.offsetHeight;
      const itemBottom = itemTop + itemHeight;

      if (itemBottom > scrollTop && itemBottom < scrollTop + containerHeight) {
        item.classList.remove("low-opacity");
      } else {
        item.classList.add("low-opacity");
      }
    });
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container");
    const listItems = [...document.querySelectorAll(".article")];

    if (scrollContainer && listItems.length > 0)
      scrollContainer.addEventListener("scroll", () =>
        updateBlur(scrollContainer, listItems as HTMLLIElement[])
      );
  }, [articleEls]);

  return (
    <nav className="scroll-container h-[270px] overflow-hidden overflow-y-scroll box-border py-[6px] border-t-[0.5px] border-0 border-solid border-grey500">
      <ul className="flex flex-col gap-[6px] m-0 p-0 dark:text-white">
        {articleEls}
      </ul>
    </nav>
  );
}
