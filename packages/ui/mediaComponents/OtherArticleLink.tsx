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
    <div className="bg-cyan50 font-bold hover:bg-cyan300 rounded-xl group cursor-pointer">
      <Link
        href={`/medias/${article.slug}`}
        className={
          xs || sm || md
            ? "no-underline group-hover:text-white text-black w-full h-full flex-center justify-between"
            : "no-underline group-hover:text-white text-black w-full h-full flex-center justify-end"
        }
      >
        <PiBinocularsFill className="titles px-[12px] xs:px-[6px] sm:px-[6px] md:px-[6px]" />
        <h3 className="item w-full px-[12px] xs:px-[6px] sm:px-[6px] md:px-[6px] text-center">
          {(article?.title as Translated)[language as "fr" | "en"]}
        </h3>
        <div className="flex items-end h-full">
          <div className="group-hover:text-cyan50 px-[12px]">
            <FaLongArrowAltRight className="titles" />
          </div>
        </div>
      </Link>
    </div>
  );
}
