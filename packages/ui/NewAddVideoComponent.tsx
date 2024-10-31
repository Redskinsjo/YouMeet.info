import { UserState, addVideo } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { BetaUser, Video } from "@youmeet/gql/generated";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  GlobalState,
  setError,
  setUpload,
} from "@youmeet/global-config/features/global";
import { onAddVideo } from "@youmeet/functions/actions";
import Logo from "./Logo";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { submitFile } from "@youmeet/utils/basics/submitFile";
import Link from "next/link";
import { getPublicIdFirstPart } from "@youmeet/utils/basics/getPublicId";
import { Button } from "@mui/material";

export default function NewAddVideoComponent({
  profil,
  setChosenVideo,
  jobId,
  exchangeId,
  setVideoId,
}: {
  profil: BetaUser;
  setChosenVideo?: Dispatch<SetStateAction<Video | undefined>>;
  jobId?: string;
  exchangeId?: string;
  setVideoId?: (videoId: string) => void;
}) {
  const addVideoRef = useRef<HTMLFormElement | null>(null);
  const submitVideoRef = useRef<HTMLButtonElement | null>(null);
  const user = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const upload = useSelector(
    (state: RootState) => (state.global as GlobalState).upload
  );

  const customOnAddVideo = async (
    extras: {
      publicId: string;
      jobId?: string;
    },
    formData: FormData
  ) => {
    dispatch(setUpload("a-video"));

    const videoFile = formData.get("video") as File;

    const fileFormData = new FormData();
    fileFormData.append("file", videoFile);
    const result1 = await submitFile(fileFormData, extras.publicId, "video");

    if (result1 && isPayloadError(result1)) {
      if (result1.type === 15) dispatch(setError("request-feedback"));
      else if (result1.type === 8) dispatch(setError("fileTooLarge"));
      else dispatch(setError("not-completed"));
    } else {
      const result = (await onAddVideo(
        extras.publicId,
        extras.jobId,
        result1,
        exchangeId
      )) as PayloadBackendError | withData<Video>;

      if (result && isPayloadError(result)) {
        dispatch(setError("not-completed"));
      } else if (!result?.data) {
        dispatch(setError("not-completed"));
      } else {
        dispatch(addVideo((result as withData<Video>).data));
        if (setChosenVideo) setChosenVideo((result as withData<Video>).data);
        if (setVideoId) setVideoId(result.data.id as string);
      }
    }
    dispatch(setUpload(null));
  };

  const inputElement = useMemo(
    () => (
      <input
        className="invisible w-full h-full absolute"
        id={`video_${user.videos.length + 1}`}
        type="file"
        name="video"
        accept=".mp4,.mov,.webm"
        onChange={(e) => {
          (submitVideoRef.current as HTMLButtonElement).click();
        }}
      />
    ),
    [upload]
  );

  const publicId = getPublicIdFirstPart(
    profil?.id as string,
    user.videos.length
  );

  return (
    <div className="w-full p-[6px] box-border flex-bet h-[39px]">
      {upload === "a-video" ? <Logo gif png /> : undefined}

      <div className="w-full flex justify-end items-center gap-[24px] xs:gap-[12px] sm:gap-[6px] md:gap-[6px]">
        <Link href={"/enregistrer"} className="no-underline">
          <div className="h-full cursor-pointer dark:text-deepPurple200 text-deepPurple700 font-bold">
            {t("record-video")}
          </div>
        </Link>
        <div className="w-[1px] bg-grey300" style={{ height: "18px" }} />
        <form
          ref={addVideoRef}
          action={customOnAddVideo.bind(null, {
            publicId,
            jobId,
          })}
          className="flex-center rounded-xl cursor-pointer relative"
        >
          <label
            htmlFor={`video_${user.videos.length + 1}`}
            className="h-full cursor-pointer dark:text-deepPurple200 text-deepPurple700 font-bold"
          >
            {t("add-video")}
          </label>
          {inputElement}
          <Button
            hidden
            type="submit"
            className="hidden"
            ref={submitVideoRef}
          />
        </form>
      </div>
    </div>
  );
}
