"use client";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReducedArticle } from "@youmeet/types/ReducedArticle";

export default function BlogMenuLi({ article }: { article: ReducedArticle }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <li
      key={article.id}
      className="darkLi article list-none cursor-pointer text-[16px] font-light hover:font-medium hover:opacity-100"
    >
      <Link
        href={`/medias/${article.slug}`}
        className="no-underline text-black"
      >
        <span className="dark:text-white">
          {article.title[language as "fr" | "en"]}
        </span>
      </Link>
    </li>
  );
}
