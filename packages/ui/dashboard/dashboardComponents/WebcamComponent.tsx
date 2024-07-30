import { Button } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { IoMdPlay } from "react-icons/io";
import { IoStop } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import { BsRecordCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState, addVideo } from "@youmeet/global-config/features/user";
import { submitFile } from "@youmeet/utils/submitFile";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { setError } from "@youmeet/global-config/features/global";
import { onAddVideo } from "@youmeet/functions/actions";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { Video } from "@youmeet/gql/generated";
import { resetModal, setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import React from "react";

export default function WebcamComponent({
  jobId,
  exchangeId,
}: {
  jobId?: string;
  exchangeId?: string;
}) {
  const [capturing, setCapturing] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const user = useSelector((state: RootState) => state.user as UserState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDataAvailable = useCallback(
    ({ data }: { data: any }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current?.stream) {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display:none");
      a.setAttribute("href", url);
      a.setAttribute("download", "video-capture-youmeet.webm");
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const handleAddVideo = useCallback(async () => {
    dispatch(setModal({ display: "upload" }) as UnknownAction);
    if (recordedChunks.length) {
      const file = new File(recordedChunks, "video-capture-youmeet", {
        type: "video-webm",
      });

      const userIdFollowingVideosCount = `${user.id}_${user.videos.length + 1}`;

      const fileFormData = new FormData();
      fileFormData.append("file", file);
      const result1 = await submitFile(
        fileFormData,
        userIdFollowingVideosCount,
        "video"
      );

      if (result1 && isPayloadError(result1)) {
        if (result1.type === 15) dispatch(setError("request-feedback"));
        else if (result1.type === 8) dispatch(setError("fileTooLarge"));
      } else {
        const result = (await onAddVideo(
          userIdFollowingVideosCount,
          jobId,
          result1,
          exchangeId
        )) as PayloadBackendError | withData<Video>;

        if (result && isPayloadError(result)) {
          dispatch(setError("not-completed"));
        } else if (!result?.data) {
          dispatch(setError("not-completed"));
        } else {
          dispatch(addVideo((result as withData<Video>).data));
          router.back();
        }
      }

      setRecordedChunks([]);
    }
    dispatch(resetModal("ok") as UnknownAction);
  }, [recordedChunks]);

  return (
    <div className="flex-center flex-col gap-[24px] xs:gap-[12px] sm:gap-[12px] md:gap-[12px]">
      <Webcam
        className="mt-[24px] xs:w-[92vw] sm:w-[92vw] md:w-[92vw] w-[533px] xs:h-[69vw] sm:h-[69vw] md:h-[69vw] h-[400px]"
        audio={true}
        ref={webcamRef}
        mirrored={true}
      />
      <div className="flex-center flex-col gap-[24px] w-full">
        <div className="flex-bet w-full">
          <div className="flex-1" />
          <div className="flex-1 flex-center">
            {capturing ? (
              <Button onClick={handleStopCaptureClick}>
                <IoStop />
              </Button>
            ) : (
              <Button onClick={handleStartCaptureClick}>
                <IoMdPlay />
              </Button>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            {capturing && (
              <div className="flex-center gap-[6px] item text-red500 top-[-36px]">
                REC <BsRecordCircleFill />
              </div>
            )}
          </div>
        </div>
        <div className="flex-center gap-[12px]">
          {recordedChunks.length > 0 && (
            <Button onClick={handleDownload}>
              <MdFileDownload />
            </Button>
          )}
          {recordedChunks.length > 0 && (
            <Button onClick={handleAddVideo}>
              <FaCheck className="text-green600 dark:text-green100" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
