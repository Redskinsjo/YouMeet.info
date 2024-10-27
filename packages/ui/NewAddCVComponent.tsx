import { Avatar, BetaUser } from "@youmeet/gql/generated";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { onAddCV } from "@youmeet/functions/actions";
import {
  GlobalState,
  setError,
  setUpload,
} from "@youmeet/global-config/features/global";
import { RootState } from "@youmeet/global-config/store";
import Logo from "./Logo";
import { setCvFile } from "@youmeet/global-config/features/user";
import { withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { submitFile } from "@youmeet/utils/basics/submitFile";

export default function NewAddCVComponent({ profil }: { profil?: BetaUser }) {
  const cvRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const upload = useSelector(
    (state: RootState) => (state.global as GlobalState).upload
  );

  const customOnAddCV = async (userId: string, formData: FormData) => {
    dispatch(setUpload("a-cv"));
    const cvFile = formData.get("cvFile") as File;
    const fileFormData = new FormData();
    fileFormData.append("file", cvFile);
    const result1 = await submitFile(fileFormData, userId, "cv");

    if (result1 && isPayloadError(result1)) {
      if (result1.type === 15) dispatch(setError("request-feedback"));
      else if (result1?.type === 8) dispatch(setError("fileTooLarge"));
    } else {
      const result2 = await onAddCV(userId, result1);

      if (result2 && isPayloadError(result2)) {
        dispatch(setError("not-completed"));
      } else {
        dispatch(setCvFile((result2 as withData<Avatar>).data));
      }
    }
    dispatch(setUpload(null));
  };

  return profil?.cvFile ? undefined : (
    <div className="w-full flex-bet p-[6px] h-[39px]">
      {upload === "a-cv" ? <Logo gif /> : undefined}
      <form
        ref={cvRef}
        action={customOnAddCV.bind(null, profil?.id as string)}
        className="w-full min-w-[245px] flex-center rounded-xl cursor-pointer relative"
      >
        <label
          htmlFor="cv"
          className="w-full h-full cursor-pointer absolute flex justify-end items-center dark:text-deepPurple200 text-deepPurple700 font-bold"
        >
          {t("add-cv")}
        </label>
        <input
          className="invisible w-full h-full absolute"
          id="cv"
          name="cvFile"
          type="file"
          accept=".pdf,.docx,.word,.doc"
          onChange={(e) => {
            cvRef.current?.requestSubmit();
          }}
        />
      </form>
    </div>
  );
}
