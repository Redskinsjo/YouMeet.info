import { Article } from "@youmeet/gql/generated";
import BlogChildComponent from "@youmeet/ui/blog/BlogChildComponent";

export default function BlogChild({ articles }: { articles: Article[] }) {
  return <BlogChildComponent articles={articles} />;
}
