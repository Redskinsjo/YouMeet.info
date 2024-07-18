import { CookieListItem } from "next/dist/compiled/@edge-runtime/cookies";
import { BetaCandidate, Translated, Video } from "@youmeet/gql/generated";
import setFileUrl from "@/utils/setFileUrl";
import { v1 as VideoIntelligence } from "@google-cloud/video-intelligence";
import OpenAI from "openai";
import { generateChat } from "@/utils/generateChat";
import { getCandidate, updateVideo } from "@/app/_functions/request";
import { submitFile } from "@/utils/submitFile";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { BackendError } from "@/utils/BackendErrorClass";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";

const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
};

const client = new VideoIntelligence.VideoIntelligenceServiceClient({
  credentials,
});

const openai = new OpenAI();

export const analyseVideo = async (
  video: Video,
  cookies: CookieListItem[],
): Promise<{ message: string; error?: true; success?: true }> => {
  try {
    const transcript = video.transcript;

    const url = setFileUrl(video.file);

    if (url && transcript) {
      const candidate = (await getCandidate<BetaCandidate>({
        userId: video.userId,
      })) as BetaCandidate;
      const chat = await generateChat(
        0.8,
        400,
        1.2,
        1.2,
        1,
        [
          {
            role: "system",
            content: `Tu es un expert en recrutement et tu expliques à un membre de ton équipe, comme un analyste financier analyserait un rapport financier, quel est le potentiel du candidat selon sa vidéo de présentation. Ta réponse ne doit pas dépasser 350 mots.`,
          },
          {
            role: "user",
            content: `Le candidat est-il compétent pour le poste de ${
              candidate.targetJob?.title as Translated["fr"]
            }?`,
          },
          {
            role: "assistant",
            content: `Le contenu de la vidéo a été transcrite comme ceci: ${transcript}`,
          },
          {
            role: "user",
            content:
              "Est-ce que le candidat qui se présente est compétent techniquement? Fais un compte-rendu de sa présentation vidéo.",
          },
        ],
        "gpt-3.5-turbo",
      );
      const message = chat?.choices[0].message.content;
      if (message && video.id) {
        const result1 = (await updateVideo<Video>(
          {
            data: { id: video.id, report: message },
          },
          0,
          true,
        )) as withData<Video> | PayloadBackendError;

        if (result1 && isPayloadError(result1)) {
          throw new BackendError(result1.type, result1.message);
        } else if (!result1.data) {
          throw new BackendError(
            BACKEND_ERRORS.PROCESSING,
            BACKEND_MESSAGES.PROCESSING,
          );
        } else {
          // const speechFile = path.resolve("./speech.mp3");
          const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "onyx",
            input: message,
          });

          const buffer = Buffer.from(await mp3.arrayBuffer());
          // await fs.promises.writeFile(speechFile, buffer);

          const formData = new FormData();
          const blob = new Blob([buffer], { type: "audio/mpeg" });

          formData.append("file", blob);
          const result2 = await submitFile(
            formData,
            video.id,
            "audio",
            cookies,
          );
          if (result2 && isPayloadError(result2)) {
            throw new BackendError(result2.type, result2.message);
          } else {
            const result3 = (await updateVideo<Video>(
              {
                data: { id: video.id, audio: result2 },
              },
              0,
              true,
            )) as withData<Video> | PayloadBackendError;
            if (result3 && isPayloadError(result3)) {
              throw new BackendError(result3.type, result3.message);
            } else if (!result3.data) {
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING,
              );
            } else {
              return { message: "L'analyse a été faite.", success: true };
            }
          }
        }
      }
      return { message: "Pas de message", error: true };
    }

    return { message: "Pas d'URL", error: true };
  } catch (err: any) {
    return { message: err.message, error: true };
  }
};
