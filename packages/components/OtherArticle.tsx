"use client";
import { Article, Translated } from "@youmeet/gql/generated";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import BoldText from "./BoldText";
import Link from "next/link";
import { PiBinocularsFill } from "react-icons/pi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { nunito } from "@youmeet/functions/fonts";
import { useEffect, useState } from "react";

const OtherArticle = ({
  article,
  index,
}: {
  index: number;
  article: Article;
}) => {
  const {
    i18n: { language },
  } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div
        className="w-full flex xs:flex-col sm:flex-col md:flex-col xs:flex-center sm:flex-center md:flex-center justify-normal items-normal xs:max-h-full sm:max-h-full md:max-h-full max-h-[200px] border-[0.5px] border-solid border-grey500"
        key={article?.id}
      >
        {!!article.bgImage && (
          <Image
            width={0}
            height={0}
            style={{
              width: xs || sm || md ? "100%" : "25%",
              height: xs || sm || md ? "200px" : "auto",
              objectFit: "cover",
            }}
            alt={article.alt ?? "image représentant l'article de blog"}
            title={`${article.alt ?? "image représentant l'article de blog"}`}
            src={article.bgImage}
          />
        )}
        <div className="dark:darkBg flex flex-row-reverse xs:flex-col sm:flex-col md:flex-col gap-[12px]">
          <div className="flex-1 bg-cyan50 p-[12px] font-bold relative hover:bg-cyan300 group cursor-pointer">
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
              <h3>{(article?.title as Translated)[language as "fr" | "en"]}</h3>
            </Link>
          </div>
          <div className="flex-1 font-[100] p-[24px] text-justify overflow-hidden overflow-y-scroll">
            <BoldText
              text={
                (article.description as Translated)[
                  language as "fr" | "en"
                ] as string
              }
              fontSizeClass="leading-[1.3] font-normal text-cyan900"
              align="justify"
              containerStyle={{ ...nunito.style }}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default OtherArticle;
