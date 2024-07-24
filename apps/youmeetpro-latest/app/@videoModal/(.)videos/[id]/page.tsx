import { getVideo, getVideos } from "@youmeet/functions/request";
import Custom404 from "@/app/not-found";
import CustomModal from "@youmeet/components/CustomModal";
import { Video } from "@youmeet/gql/generated";

export async function generateStaticParams() {
  const videos = (await getVideos<Video[]>()) as Video[];

  return videos?.map((video: Video) => ({ id: video.id as string }));
}

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURIComponent(params.id);
  const video = (await getVideo({
    id,
  })) as Video;

  if (video) return <CustomModal type="video" video={video} />;
  return <Custom404 />;
}
