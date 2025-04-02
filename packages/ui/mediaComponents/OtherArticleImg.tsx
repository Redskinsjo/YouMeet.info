"use client";
import { useMediaQuery } from "@mui/material";
import { Article } from "@youmeet/gql/generated";
import Image from "next/image";

export default function OtherArticleImg({ article }: { article: Article }) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  return (
    !!article.bgImage && (
      <Image
        width={0}
        height={0}
        style={{
          width: xs || sm || md ? "100%" : "180px",
          height: "200px",
          objectFit: "cover",
        }}
        alt={article.alt ?? "image représentant la biographie"}
        title={`${article.alt ?? "image représentant la biographie"}"}`}
        src={article.bgImage}
      />
    )
  );
}
