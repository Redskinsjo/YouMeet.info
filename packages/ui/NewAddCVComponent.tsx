import { Avatar, BetaUser } from "@youmeet/gql/generated";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { onAddCV } from "@youmeet/functions/actions";
import { setError, setUpload } from "@youmeet/global-config/features/global";
import { setCvFile } from "@youmeet/global-config/features/user";
import { withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { submitFile } from "@youmeet/utils/basics/submitFile";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));

export default function NewAddCVComponent({ profil }: { profil?: BetaUser }) {
  const cvRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  const customOnAddCV = async (userId: string, formData: FormData) => {
    dispatch(setUpload("upload"));
    router.push("/message");
    console.log("routing to message ");
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

  useEffect(() => {
    router.prefetch("/message");
  }, []);

  return profil?.cvFile ? undefined : (
    <div className="w-full flex justify-end p-[6px] h-[39px]">
      <form
        ref={cvRef}
        action={customOnAddCV.bind(null, profil?.id as string)}
        className="rounded-xl flex items-center justify-end min-w-[80px] cursor-pointer relative"
      >
        <label
          htmlFor="cv"
          className="h-full cursor-pointer absolute left-0 dark:text-deepPurple200 text-deepPurple700 font-bold flex-center"
        >
          {t("add-cv")}
        </label>
        <input
          className="invisible left-0 absolute"
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
