"use client";
import Link from "next/link";
import { PiBinocularsFill } from "react-icons/pi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Article, Translated } from "@youmeet/gql/generated";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function OtherArticleLink({ article }: { article: Article }) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div className="bg-cyan50 w-1/2 font-bold relative hover:bg-cyan300 rounded-xl group cursor-pointer">
      <div className="group-hover:text-cyan50 absolute bottom-0 left-0 px-[12px]">
        <FaLongArrowAltRight className="titles" />
      </div>
      <Link
        href={`/medias/${article.slug}`}
        className={
          xs || sm || md
            ? "no-underline group-hover:text-white text-black w-full h-full flex-center justify-between"
            : "no-underline group-hover:text-white text-black w-full h-full flex-center justify-end"
        }
      >
        {(xs || sm || md) && <PiBinocularsFill className="subItem" />}
        <h3 className="item">
          {(article?.title as Translated)[language as "fr" | "en"]}
        </h3>
      </Link>
    </div>
  );
}
