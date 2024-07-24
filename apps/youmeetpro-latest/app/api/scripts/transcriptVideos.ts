import setFileUrl from "@youmeet/utils/setFileUrl";
import { v1 as VideoIntelligence } from "@google-cloud/video-intelligence";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { BackendError } from "@youmeet/utils/BackendErrorClass";
import VideoMongoDB, { VideoSchema } from "@youmeet/models/videos";
import { DocumentType } from "@typegoose/typegoose";
import process from "process";
import dotenv from "dotenv";
import { writeFileSync } from "fs";
dotenv.config();

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

(async () => {
  const videos = await VideoMongoDB.find();

  let done = false;
  for (let i = 0; i < videos.length; i++) {
    if (done) break;
    const video = videos[i] as DocumentType<VideoSchema>;
    if (video.transcript) {
      console.log("La vidéo a déjà été transcrite");
      continue;
    }

    try {
      const uri = setFileUrl(video.file);
      const videoContext = {
        speechTranscriptionConfig: {
          languageCode: "fr-FR",
          enableAutomaticPunctuation: true,
        },
      };

      if (uri) {
        const response = await fetch(uri);

        if (response.ok) {
          done = true;
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
          console.log(operationResult);
          if (operationResult?.annotationResults) {
            console.log(operationResult.annotationResults);
            const annotationResults = operationResult.annotationResults[0];

            console.log(annotationResults);
            if (annotationResults?.speechTranscriptions) {
              console.log(annotationResults.speechTranscriptions);
              for (const speechTranscription of annotationResults.speechTranscriptions) {
                // The number of alternatives for each transcription is limited by
                // SpeechTranscriptionConfig.max_alternatives.
                // Each alternative is a different possible transcription
                // and has its own confidence score.
                if (speechTranscription?.alternatives) {
                  console.log(speechTranscription.alternatives);
                  let transcript = "";
                  let confidence = 0;
                  let vttFileContent = [];
                  for (const alternative of speechTranscription.alternatives) {
                    vttFileContent.push(alternative);
                    console.log("Alternative level information:");
                    console.log(`Transcript: ${alternative.transcript}`);
                    console.log(`Confidence: ${alternative.confidence}`);
                    console.log(`Words: ${alternative.words}`);
                    if (alternative.words) {
                      for (let j = 0; j < alternative.words.length; j++) {
                        const word = alternative.words[j];
                        console.log(word, "word");
                      }
                    }

                    if (
                      alternative?.confidence &&
                      typeof alternative?.confidence === "number" &&
                      alternative?.confidence > confidence
                    ) {
                      confidence = alternative.confidence;
                    }
                    transcript = `${transcript} ${alternative.transcript}`;
                  }

                  const vttFileContentString = JSON.stringify(vttFileContent);
                  writeFileSync(
                    `./${video._id}.vtt`,
                    vttFileContentString,
                    "utf-8"
                  );

                  if (transcript) {
                    const result = await VideoMongoDB.findByIdAndUpdate(
                      video._id,
                      {
                        transcript,
                        confidence,
                      }
                    );

                    if (!result) {
                      throw new BackendError(
                        BACKEND_ERRORS.PROCESSING,
                        BACKEND_MESSAGES.PROCESSING
                      );
                    } else console.log("La vidéo a bien été transcrite");
                    // return Response.json(
                    //   {
                    //     message: "La vidéo a bien été transcrite",
                    //     success: true,
                    //   },
                    //   { status: 200 }
                    // );
                  }
                } else {
                  console.log("Pas d'alternatives");
                  // return Response.json(
                  //   { message: "Pas d'alternatives", error: true },
                  //   { status: 400 }
                  // );
                }
              }
            } else {
              console.log("Pas de transcriptions");
              // return Response.json(
              //   { message: "Pas de transcriptions", error: true },
              //   { status: 400 }
              // );
            }
          } else {
            console.log("Pas d'annotation");
            //   return Response.json(
            //     { message: "Pas d'annotation", error: true },
            //     { status: 400 }
            //   );
          }
        } else console.log("Pas de réponse");
      } else {
        console.log("Pas d'URI");
        // return Response.json(
        //   { message: "Pas d'URI", error: true },
        //   { status: 400 }
        // );
      }

      //   return Response.json(
      //     { message: "Un problème est survenu", error: true },
      //     { status: 400 }
      //   );
    } catch (err: any) {
      console.log(err.message);
      //   return Response.json(
      //     { message: err.message, error: true },
      //     { status: 400 }
      //   );
    }
  }
  process.exit();
})();
