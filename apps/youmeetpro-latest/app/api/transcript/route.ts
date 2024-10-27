import { Video } from "@youmeet/gql/generated";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import { NextRequest } from "next/server";
import { v1 as VideoIntelligence } from "@google-cloud/video-intelligence";
import { updateVideo } from "@youmeet/functions/request";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";

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

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const video = body.video as Video;
    const uri = setFileUrl(video.file);
    const videoContext = {
      speechTranscriptionConfig: {
        languageCode: "fr-FR",
        enableAutomaticPunctuation: true,
      },
    };

    if (uri) {
      const response = await fetch(uri);

      const arrayBuffer = await response.arrayBuffer();

      const videoBuffer = Buffer.from(arrayBuffer as any, "binary");

      // Convertir la vidéo en base64
      const inputContent = videoBuffer.toString("base64");

      const request = {
        inputContent: inputContent,
        features: ["SPEECH_TRANSCRIPTION"],
        videoContext: videoContext,
      };

      const [operation] = await client.annotateVideo(request as any);
      console.log("Waiting for operation to complete...");
      const [operationResult] = await operation.promise();
      // --------
      // There is only one annotation_result since only
      // one video is processed.
      // --------
      if (operationResult?.annotationResults) {
        const annotationResults = operationResult.annotationResults[0];

        if (annotationResults?.speechTranscriptions) {
          for (const speechTranscription of annotationResults.speechTranscriptions) {
            // The number of alternatives for each transcription is limited by
            // SpeechTranscriptionConfig.max_alternatives.
            // Each alternative is a different possible transcription
            // and has its own confidence score.
            if (speechTranscription?.alternatives) {
              let transcript = "";
              let confidence = 0;
              for (const alternative of speechTranscription.alternatives) {
                console.log("Alternative level information:");
                console.log(`Transcript: ${alternative.transcript}`);
                console.log(`Confidence: ${alternative.confidence}`);

                transcript = `${transcript} ${alternative.transcript}`;
                if (
                  alternative?.confidence &&
                  typeof alternative?.confidence === "number" &&
                  alternative?.confidence > confidence
                ) {
                  confidence = alternative.confidence;
                }

                // console.log("Word level information:");
                // if (alternative?.words) {
                //   for (const wordInfo of alternative.words) {
                //     const word = wordInfo.word;
                //     if (
                //       typeof wordInfo?.startTime?.seconds === "number" &&
                //       typeof wordInfo?.startTime?.nanos === "number" &&
                //       typeof wordInfo?.endTime?.seconds === "number" &&
                //       typeof wordInfo?.endTime?.nanos === "number"
                //     ) {
                //       const start_time =
                //         wordInfo.startTime.seconds +
                //         wordInfo.startTime.nanos * 1e-9;
                //       const end_time =
                //         wordInfo.endTime.seconds + wordInfo.endTime.nanos * 1e-9;
                //       console.log(
                //         "\t" + start_time + "s - " + end_time + "s: " + word
                //       );
                //     } else {
                //       return Response.json(
                //         { message: "Pas d'info sur le mot", error: true },
                //         { status: 400 }
                //       );
                //     }
                //   }
                // } else {
                //   return Response.json(
                //     { message: "Pas de mots", error: true },
                //     { status: 400 }
                //   );
                // }
              }

              if (transcript) {
                const result = (await updateVideo<Video>(
                  {
                    data: { transcript, confidence, id: video.id },
                  },
                  0,
                  true
                )) as withData<Video> | PayloadBackendError;

                if (result && isPayloadError(result)) {
                  throw new BackendError(result.type, result.message);
                } else if (!result?.data) {
                  throw new BackendError(
                    BACKEND_ERRORS.PROCESSING,
                    BACKEND_MESSAGES.PROCESSING
                  );
                } else
                  return Response.json(
                    {
                      message: "La vidéo a bien été transcrite",
                      success: true,
                    },
                    { status: 200 }
                  );
              }
            } else {
              return Response.json(
                { message: "Pas d'alternatives", error: true },
                { status: 400 }
              );
            }
          }
        } else {
          return Response.json(
            { message: "Pas de transcriptions", error: true },
            { status: 400 }
          );
        }
      } else {
        return Response.json(
          { message: "Pas d'annotation", error: true },
          { status: 400 }
        );
      }
    } else {
      return Response.json(
        { message: "Pas d'URI", error: true },
        { status: 400 }
      );
    }

    return Response.json(
      { message: "Un problème est survenu", error: true },
      { status: 400 }
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message, error: true },
      { status: 400 }
    );
  }
}
