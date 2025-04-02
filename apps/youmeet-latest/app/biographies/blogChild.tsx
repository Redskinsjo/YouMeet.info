import { Article, Video } from "@youmeet/gql/generated";
import BlogChildComponent from "@youmeet/ui/blog/BlogChildComponent";

export default function BlogChild({
  articles,
  videos,
}: {
  articles?: Article[];
  videos?: Video[];
}) {
  return <BlogChildComponent videos={videos} articles={articles} />;
}
