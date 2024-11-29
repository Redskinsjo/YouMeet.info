import { Article } from "@youmeet/gql/generated";
import PublicPageContainer from "../publicPagesComponents/PublicPageContainer";
import Footer from "@youmeet/ui/Footer";
import OtherArticles from "@youmeet/ui/mediaComponents/OtherArticles";
import dynamic from "next/dynamic";
import MediaContent from "@youmeet/ui/mediaComponents/MediaContent";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSectionChild")
);

export default function MediaChild({
  media,
  articles,
}: {
  media: Article;
  articles: Article[];
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <BigHeaderSection />
      <PublicPageContainer>
        <MediaContent media={media} />
      </PublicPageContainer>
      <PublicPageContainer noReturnHeader>
        <OtherArticles articles={articles} media={media} />
      </PublicPageContainer>
      <Footer />
    </div>
  );
}
