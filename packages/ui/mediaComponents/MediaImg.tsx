import { Article } from "@youmeet/gql/generated";
import Image from "next/image";

export default function MediaImg({ media }: { media: Article }) {
  return (
    !!media.bgImage && (
      <Image
        width={0}
        height={0}
        src={media.bgImage}
        alt={media.alt ?? "image représentant l'article de blog"}
        title={`${media.alt ?? "image représentant l'article de blog"}`}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
    )
  );
}
