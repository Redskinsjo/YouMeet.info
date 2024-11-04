import { getVideo, getVideos } from "@youmeet/functions/request";
import CustomModal from "@youmeet/ui/CustomModal";
import { Video } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const videos = (await getVideos<Video[]>()) as Video[];

  return videos?.map((video: Video) => ({ id: video.id as string }));
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = decodeURIComponent((await params).id);
  await verifyTokenServer(undefined, "dashboard");
  const video = (await getVideo({
    id,
  })) as Video;

  if (video) return <CustomModal type="video" video={video} />;
  return notFound();
}
