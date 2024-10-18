import NewAddVideoComponent from "../../NewAddVideoComponent";
import VideoComponent from "./VideoComponent";
import { BetaUser } from "@youmeet/gql/generated";
import { useMediaQuery } from "@mui/material";

export default function NewVideoComponent({ profil }: { profil: BetaUser }) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");

  return (
    <div>
      {profil.videos && profil.videos.length > 0 ? (
        <div className="w-full border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
          {profil.videos &&
            profil.videos.map(
              (video, index) =>
                !!video && (
                  <VideoComponent
                    key={video?.id}
                    video={video}
                    profil={profil}
                    videoHeight={xs || sm || md ? "100%" : "250px"}
                    videoWidth={xs || sm || md ? "100%" : "375px"}
                  />
                )
            )}

          <NewAddVideoComponent profil={profil} />
        </div>
      ) : (
        <div className="w-full border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
          <VideoComponent profil={profil} />
          <NewAddVideoComponent profil={profil} />
        </div>
      )}
    </div>
  );
}
