import { Article } from "@youmeet/gql/generated";
import React from "react";
import PublicPageContainer from "@youmeet/components/PublicPage/PublicPageContainer";
import Footer from "@youmeet/components/Footer";
import MediaContent from "@youmeet/app/medias/[media]/mediaComponents/MediaContent";
import OtherArticles from "@youmeet/app/medias/[media]/mediaComponents/OtherArticles";
import BigHeaderSection from "@youmeet/app/_sections/BigHeaderSection";

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
