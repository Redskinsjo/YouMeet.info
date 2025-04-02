"use client";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReducedArticle, ReducedVideo } from "@youmeet/types/ReducedArticle";

export default function BlogMenuLi({
  article,
}: {
  article: ReducedArticle | ReducedVideo;
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <li
      key={article.id}
      className="darkLi article list-none cursor-pointer text-[16px] font-light hover:font-medium hover:opacity-100"
    >
      <Link href={`${article.slug}`} className="no-underline text-black">
        <span className="dark:text-white">
          {((article as ReducedArticle).title &&
            (article as ReducedArticle).title[language as "fr" | "en"]) ||
            (article as ReducedVideo).name}
        </span>
      </Link>
    </li>
  );
}
