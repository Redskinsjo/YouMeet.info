import { getVideo, getVideos } from "@youmeet/functions/request";
import Custom404 from "@/app/not-found";
import CandidateVideoComponent from "@youmeet/components/CandidateVideoComponent";
import { Video } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import { redirect } from "next/navigation";

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
    console.log(video, "video");
    if (video) return <CandidateVideoComponent type="video" video={video} />;
    return <Custom404 />;
  }
  redirect(`/se-connecter?redirect=videos/${params.id}`);
}
