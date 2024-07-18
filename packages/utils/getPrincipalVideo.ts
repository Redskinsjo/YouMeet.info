import { Video } from "@youmeet/gql/generated";
import { VideoSchema } from "@/app/api/models/videos";
import { DocumentType } from "@typegoose/typegoose";

export const getPrincipalVideo = (videos: Video[]) => {
  if (videos && videos.length > 0) {
    const principal = videos
      .filter((v) => v)
      .find((video) => (video as Video).principal);
    if (principal) return principal;
    return videos[0];
  } else return undefined;
};

export const getPrincipalVideoForScript = (
  videos: DocumentType<VideoSchema>[],
) => {
  if (videos && videos.length > 0) {
    const principal = videos
      .filter((v) => v)
      .find((video) => (video as DocumentType<VideoSchema>).principal);
    if (principal) return principal;
    return videos[0];
  } else return undefined;
};
