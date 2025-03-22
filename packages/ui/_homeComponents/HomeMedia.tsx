import { Suspense } from "react";
import Layout from "../Layout";
import { Article } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const SectionTitle = dynamic(() => import("../_components/SectionTitleChild"));
const BoldText = dynamic(() => import("../TextChild"));
const HomeMediaCard = dynamic(() => import("./MediaCardChild"));

export default function HomeMedia({ articles }: { articles: Article[] }) {
  return (
    <Layout
      newStyles={{
        maxWidth: "100vw",
      }}
    >
      <div className="py-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px]">
        <div className="mb-[24px] flex flex-col gap-[24px]">
          <div className="w-full flex justify-end">
            <SectionTitle
              component="h1"
              translation="some-articles-to-read"
              className="dark:text-white text-right"
            />
          </div>
          <div className="flex justify-end">
            <BoldText
              text={"read-some-articles"}
              containerStyle={{ fontSize: "18px" }}
              align="right"
            />
          </div>
        </div>
        <div className="flex-center flex-wrap gap-[24px] xs:flex-col sm:flex-col">
          {articles.length > 0
            ? articles.map((article) =>
                article ? (
                  <Suspense key={article.id}>
                    <HomeMediaCard article={article} />
                  </Suspense>
                ) : undefined
              )
            : undefined}
        </div>
      </div>
    </Layout>
  );
}
