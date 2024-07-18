import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
} from "@youmeet/types/api/backend";
import { BackendError } from "./BackendErrorClass";
import { AvatarInput, BetaUser, Lead } from "@youmeet/gql/generated";
import { dev, uri } from "@/app/_functions/imports";
import { createError, getLead, getSimpleUser } from "@/app/_functions/request";
import { getPublicIdFull, getUserIdFromPublicId } from "./getPublicId";

const setSearchAndFormData = (
  label: string,
  value: string,
  search: URLSearchParams,
  formData: FormData,
) => {
  formData.append(label, value);
  search.append(label, value);
};

export const submitFile = async (
  fileFormData: FormData,
  userId: string,
  type: "cv" | "avatar" | "video",
): Promise<AvatarInput | PayloadBackendError> => {
  try {
    const file = fileFormData.get("file");
    if (!file)
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.UNKNOWN,
      );
    const folder = "youmeet-official";
    const unique_filename = false;
    const use_filename = false;
    const overwrite = true;
    const eager = "w_400,h_300,c_crop";

    const avatar = type === "avatar";
    const cv = type === "cv";
    const id = userId;
    const public_id = getPublicIdFull(id, type);

    const search = new URLSearchParams();
    const form = new FormData();
    setSearchAndFormData("public_id", public_id, search, form);
    setSearchAndFormData("folder", folder, search, form);
    setSearchAndFormData("unique_filename", `${unique_filename}`, search, form);
    setSearchAndFormData("use_filename", `${use_filename}`, search, form);
    setSearchAndFormData("overwrite", `${overwrite}`, search, form);
    setSearchAndFormData("eager", eager, search, form);
    if (!avatar && !cv) {
      const realUserId = getUserIdFromPublicId(public_id);
      const user = (await getSimpleUser<BetaUser>({
        userId: realUserId,
      })) as BetaUser;
      const lead = (await getLead<Lead>({ email: user.email })) as Lead;
      const lang = lead?.fr === false ? "en-US" : "fr-FR";
      setSearchAndFormData(
        "raw_convert",
        `google_speech:vtt:${lang}`,
        search,
        form,
      );
    }

    const response1 = await fetch(`${uri}/api/sign?${search.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { signature, timestamp } = await response1.json();

    // Ajoutez le fichier à l'objet FormData
    form.append("file", file);
    form.append("signature", signature);
    form.append("api_key", `${process.env.CLOUDINARY_API_KEY}`);
    form.append("timestamp", timestamp);

    const response2 = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${
        avatar || cv ? "image" : "video"
      }/upload`,
      {
        method: "POST",
        body: form,
      },
    );

    const result = await response2.json();
    if (response2.status === 200 && result) {
      const durationPayload = {} as { duration?: number };
      if (result.duration) durationPayload.duration = result.duration;

      return {
        asset_id: result.asset_id,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        created_at: result.created_at,
        url: result.url,
        secure_url: result.secure_url,
        folder: result.folder,
        original_filename: result.original_filename,
        eager: result.eager ?? [],
        ...durationPayload,
      };
    } else {
      throw new BackendError(
        BACKEND_ERRORS.UPLOAD_FAIL,
        result.error.message,
        response2.status,
      );
    }
  } catch (err: any) {
    await createError({
      data: {
        environment: dev ? "development" : "production",
        message: err.message,
        pro: false,
        query: "unknown",
        status: err.status,
        statusText: err.statusText ?? "",
        type: err.type,
      },
    });
    return {
      error: true,
      type: err.type,
      message: err.message,
      status: err.status,
    };
  }
};
