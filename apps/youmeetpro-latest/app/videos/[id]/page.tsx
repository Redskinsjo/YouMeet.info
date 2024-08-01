import { getVideo, getVideos } from "@youmeet/functions/request";
import CandidateVideoComponent from "@youmeet/ui/CandidateVideoComponent";
import { Video } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const videos = (await getVideos<Video[]>()) as Video[];

  return videos?.map((video: Video) => ({ id: video.id as string }));
}

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const verified = await verifyTokenServer(undefined, `videos/${params.id}`);

  if (verified && verified.pro) {
    const id = decodeURIComponent(params.id);
    const video = (await getVideo(
      {
        id,
      },
      0
    )) as Video;
    if (video) return <CandidateVideoComponent type="video" video={video} />;
  }
  return notFound();
}
