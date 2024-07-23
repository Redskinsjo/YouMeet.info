import React from "react";
import Layout from "@youmeet/components/Layout";
import { Article } from "@youmeet/gql/generated";
import BoldText from "@youmeet/components/BoldText";
import SectionTitle from "../_components/SectionTitle";
import HomeMediaCard from "./HomeMediaCard";

export default function HomeMedia({ articles }: { articles: Article[] }) {
  return (
    <Layout
      newStyles={{
        maxWidth: "100vw",
      }}
    >
      <div className="py-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px]">
        <div className="mb-[24px]">
          <div className="w-full flex justify-end">
            <SectionTitle
              component="h1"
              translation="some-articles-to-read"
              className="dark:text-white text-right"
            />
          </div>
          <BoldText
            text={"read-some-articles"}
            containerStyle={{ fontSize: "18px" }}
            align="right"
          />
        </div>
        <div className="flex-center flex-wrap gap-[24px] xs:flex-col sm:flex-col">
          {articles.length > 0
            ? articles.map((article) =>
                article ? <HomeMediaCard article={article} /> : undefined
              )
            : undefined}
        </div>
      </div>
    </Layout>
  );
}
