import dynamic from "next/dynamic";
import BigHeaderSection from "@youmeet/app/_sections/BigHeaderSection";
import { Article } from "@youmeet/gql/generated";
import Footer from "@youmeet/components/Footer";

const HomeMedia = dynamic(
  () => import("@youmeet/app/_homeComponents/HomeMedia")
);

export default function BlogChild({ articles }: { articles: Article[] }) {
  return (
    <div className="flex-1 flex flex-col home-squares-bg overflow-hidden">
      <BigHeaderSection />

      <HomeMedia articles={articles} />
      <Footer />
    </div>
  );
}
