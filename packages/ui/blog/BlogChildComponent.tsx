import dynamic from "next/dynamic";
import { Article, Video } from "@youmeet/gql/generated";
import Footer from "@youmeet/ui/Footer";
import HomeMedia from "@youmeet/ui/_homeComponents/HomeMedia";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSectionChild")
);

export default function BlogChildComponent({
  articles,
  videos,
}: {
  articles?: Article[];
  videos?: Video[];
}) {
  return (
    <div className="flex-1 flex flex-col min-h-screen home-squares-bg overflow-hidden">
      <BigHeaderSection />

      <HomeMedia articles={articles} videos={videos} />
      <Footer />
    </div>
  );
}
