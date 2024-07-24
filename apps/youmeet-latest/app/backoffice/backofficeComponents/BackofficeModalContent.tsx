import {
  BackofficeModalData,
  BackofficeModalDataType,
} from "@youmeet/types/modal";
import { fromNames } from "@youmeet/utils/resolvers/resolveFullname";
import { Box, Button, Typography } from "@mui/material";
import { deepPurple, green, red } from "@mui/material/colors";
import React, { useCallback, useEffect, useState } from "react";
import DetailComponent from "@youmeet/components/DetailComponent";
import {
  BetaCompany,
  BetaProfile,
  BetaQueue,
  BetaUser,
  BetaWhatsappThread,
  GetOneUserExperiencesDocument,
  GetQuestionsDocument,
  Job,
  Lead,
  SendEmailToLeadDocument,
  Translated,
  Video,
} from "@youmeet/gql/generated";
import { client } from "@youmeet/gql/index";
import { useDispatch } from "react-redux";
import {
  resetModal,
  setModalUserExperiences,
} from "@youmeet/global-config/features/modal";
import Image from "next/image";
import { formatToDatetime, giveTimeAgo } from "@youmeet/utils/formatToDatetime";
import { HiPencil } from "react-icons/hi";
import { AiFillSave } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { getUniversalFromCodeAndNumber } from "@youmeet/utils/formatPhone";
import UserInfos from "@youmeet/components/UserInfos";
import { ImSpinner2 } from "react-icons/im";
import { useTranslation } from "react-i18next";
import AddReferenceComponent from "./AddReferenceComponent";
import Link from "next/link";
import LeadForm from "./LeadForm";
import { uri } from "@youmeet/functions/imports";
import BackofficeUserModalAddExperience from "./BackofficeUserModalAddExperience";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import AddTargetJobComponent from "./AddTargetJobComponent";
import { UnknownAction } from "@reduxjs/toolkit";
import setFileUrl from "@youmeet/utils/setFileUrl";
import { setName } from "@youmeet/utils/setName";
import { setError, setUpload } from "@youmeet/global-config/features/global";
import { removeVideo } from "@youmeet/global-config/features/user";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { onDeleteVideo } from "@youmeet/functions/actions";

export default function BackofficeModalContent({
  data,
}: {
  data:
    | {
        data: BackofficeModalData;
        type: BackofficeModalDataType;
      }
    | undefined;
}) {
  const [companies, setCompanies] = useState<
    undefined | (null | undefined | BetaCompany)[]
  >([]);
  const [companyValue, setCompanyValue] = useState<string | undefined>();
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [removedMsgs, setRemovedMsgs] = useState<number[]>([]);
  const {
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: { questions: [{ prefix: "", text: "", jobId: "", type: "" }] },
  });
  const [actualQuestions, setActualQuestions] = useState<
    string[] | undefined
  >();
  const [compatibleProfiles, setCompatibleProfiles] = useState<
    undefined | (BetaProfile | undefined | null)[]
  >();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [video, setVideo] = useState<Video | undefined>(undefined);
  const [shouldAddExperience, setShouldAddExperience] = useState(false);
  const [specialErr, setSpecialErr] = useState<any>(undefined);

  const getQuestions = useCallback(async () => {
    const response = await client.query({
      query: GetQuestionsDocument,
      variables: { jobId: (data?.data as Job).id as string },
      // fetchPolicy: "no-cache",
    });
    const questions = response?.data?.questions;
    if (response?.data && questions)
      setActualQuestions([
        ...new Set(
          questions.filter((q) => q).map((question) => question?.text as string)
        ),
      ]);
  }, [(data?.data as Job).id]);

  const customOnDeleteVideo = async (videoId: string) => {
    dispatch(setUpload(`r-video/${videoId}`));
    const result = (await onDeleteVideo(videoId)) as
      | PayloadBackendError
      | withData<Video>;

    if (!result || isPayloadError(result)) {
      dispatch(setError("not-completed"));
      // handle error
    } else if (!result?.data) {
      dispatch(setError("not-completed"));
    } else {
      dispatch(removeVideo((result as withData<Video>).data));
    }

    dispatch(setUpload(null));
  };

  useEffect(() => {
    if (data?.type === "job") {
      getQuestions();
    }
  }, []);

  useEffect(() => {
    const videos = data?.data?.videos as Video[];
    if (videos && videos.length > 0) {
      const video = videos
        ? getPrincipalVideo(videos.filter((d) => d) as Video[])
        : undefined;
      setVideo(video);
    }
  }, [data?.data]);

  return data?.type === "queue" ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll flex flex-col items-center border-solid border-blueGrey500 border-[2px] lightBg gap-[24px] outline-0">
        <div>
          {fromNames(
            (data?.data as Partial<BetaQueue>)?.target?.firstname as string,
            data?.data?.target?.lastname as string
          )}
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          {data?.data?.id && (
            <DetailComponent
              noPadding
              label="Queue id"
              value={data?.data?.id as string}
              type="modal2"
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Profil du candidat
          </Typography>
          <UserInfos user={data.data?.target} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Informations sur le requêteur
          </Typography>
          {data?.data?.origin?.picture && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.data?.origin?.picture}
                alt="user-picture"
                width={48}
                height={48}
                style={{
                  border: `1px solid ${deepPurple[500]}`,
                  borderRadius: "12px",
                }}
              />
            </Box>
          )}
          <UserInfos user={data.data?.origin} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Fichiers de référence de la queue
          </Typography>
        </Box>

        {specialErr?.abandonRequest && (
          <Typography sx={{ color: red[500] }}>
            {specialErr?.abandonRequest}
          </Typography>
        )}
      </div>
    </div>
  ) : data?.type === "lead" ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll flex flex-col items-center border-solid border-blueGrey500 border-[2px] lightBg gap-[24px] outline-0">
        <Typography>Nouveau prospect</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          {data?.data?.id && (
            <DetailComponent
              noPadding
              label="lead id"
              value={data?.data?.id as string}
              type="modal2"
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Profil
          </Typography>
          {(data?.data as Lead).email && (
            <DetailComponent
              noPadding
              label="Email"
              value={(data?.data as Lead).email as string}
              type="modal2"
            />
          )}
          {(data?.data as Lead).type && (
            <DetailComponent
              noPadding
              label="Type"
              value={(data?.data as Lead).type as string}
              type="modal2"
            />
          )}
          {(data?.data as Lead).updatedAt && (
            <DetailComponent
              noPadding
              label="Modifié"
              value={giveTimeAgo((data?.data as Lead).updatedAt)}
              type="modal2"
            />
          )}
          {(data?.data as Lead).createdAt && (
            <DetailComponent
              noPadding
              label="Créé"
              value={giveTimeAgo((data?.data as Lead).createdAt)}
              type="modal2"
            />
          )}
        </Box>
        <LeadForm lead={data?.data as Lead} />
        <Box
          sx={{
            gap: "48px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{ backgroundColor: green[500], color: "white" }}
            type="submit"
            onClick={async () => {
              setSpecialErr({});
              const response = await client.query({
                query: SendEmailToLeadDocument,
                variables: {
                  data: {
                    leadId: (data.data as Lead).id,
                  },
                },
              });
              if (response.data.sendEmailToLead)
                dispatch(resetModal("ok") as UnknownAction);
              else
                setSpecialErr({
                  sendEmailToLead: "L'email n'a pas été envoyé",
                });
            }}
          >
            {(data.data as Lead).type === "recruiter"
              ? "Offrir Essai Illimité 2 Semaines"
              : "Proposer Connexion Automatiqe"}
          </Button>
          {(data.data as Lead).type === "candidate" ? (
            <Button
              sx={{ backgroundColor: green[500], color: "white" }}
              type="submit"
              onClick={async () => {
                setSpecialErr({});
                const response = await client.query({
                  query: SendEmailToLeadDocument,
                  variables: {
                    data: {
                      leadId: (data.data as Lead).id,
                    },
                    negativeAnswerForDev: true,
                  },
                });
                if (response.data.sendEmailToLead)
                  dispatch(resetModal("ok") as UnknownAction);
                else
                  setSpecialErr({
                    sendEmailToLead: "L'email n'a pas été envoyé",
                  });
              }}
            >
              Donner réponse négative entretien Développeur
            </Button>
          ) : undefined}
          {(data.data as Lead).type === "candidate" ? (
            <Button
              sx={{ backgroundColor: green[500], color: "white" }}
              type="submit"
              onClick={async () => {
                setSpecialErr({});
                const response = await client.query({
                  query: SendEmailToLeadDocument,
                  variables: {
                    data: {
                      leadId: (data.data as Lead).id,
                    },
                    negativeAnswerForDesign: true,
                  },
                });
                if (response.data.sendEmailToLead)
                  dispatch(resetModal("ok") as UnknownAction);
                else
                  setSpecialErr({
                    sendEmailToLead: "L'email n'a pas été envoyé",
                  });
              }}
            >
              Donner réponse négative entretien Design
            </Button>
          ) : undefined}
        </Box>
        {specialErr?.sendEmailToLead && (
          <Typography sx={{ color: red[500] }}>
            {specialErr?.sendEmailToLead}
          </Typography>
        )}
      </div>
    </div>
  ) : data?.type === "thread" ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll flex flex-col items-center border-solid border-blueGrey500 border-[2px] lightBg gap-[24px] outline-0">
        <div>
          {
            (data?.data as Partial<BetaWhatsappThread>).queue?.origin
              ?.fullname as string
          }
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          {data?.data?.id && (
            <DetailComponent
              noPadding
              label="thread id"
              value={data?.data?.id as string}
              type="modal2"
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Profil du fil de discussion (BetaWhatsappThread)
          </Typography>

          {data?.data?.terminated && (
            <DetailComponent
              noPadding
              label="Terminé"
              value={data?.data?.terminated ? "Oui" : "Non"}
              type="modal2"
            />
          )}
          {data?.data?.chatId && (
            <DetailComponent
              noPadding
              label="ChatId"
              value={data?.data?.chatId as string}
              type="modal2"
            />
          )}
          {data?.data?.updatedAt && (
            <DetailComponent
              noPadding
              label="Modifié"
              value={giveTimeAgo(data?.data?.updatedAt)}
              type="modal2"
            />
          )}
          {data?.data?.createdAt && (
            <DetailComponent
              noPadding
              label="Créé"
              value={giveTimeAgo(data?.data?.createdAt)}
              type="modal2"
            />
          )}
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Conversation
          </Typography>

          <div className="absolute top-[12px] right-[12px] flex-center gap-[12px]">
            <HiPencil
              style={{
                cursor: "pointer",
                marginRight: "6px",
                fontSize: "24px",
              }}
              onClick={() => setUpdating(true)}
            />
            <AiFillSave
              style={{
                cursor: "pointer",
                marginRight: "6px",
                fontSize: "24px",
              }}
              onClick={() => setUpdating(false)}
            />
            <BiReset
              style={{
                cursor: "pointer",
                marginRight: "6px",
                fontSize: "24px",
              }}
              onClick={() => setRemovedMsgs([])}
            />
          </div>

          {specialErr?.handleThreadResponses && (
            <Typography sx={{ color: red[500] }}>
              {specialErr?.handleThreadResponses}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "white",
            padding: "24px",
            paddingTop: "12px",
            width: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Informations sur la queue (BetaQueue)
          </Typography>
          {data?.data?.queue?.id && (
            <DetailComponent
              noPadding
              label="Id"
              value={data?.data?.queue?.id as string}
              type="modal2"
            />
          )}
          {data?.data?.queue?.status && (
            <DetailComponent
              noPadding
              label="Statut"
              value={data?.data?.queue?.status as string}
              type="modal2"
            />
          )}

          {data?.data?.queue?.origin?.picture && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.data?.queue?.origin?.picture}
                alt="user-picture"
                width={48}
                height={48}
                style={{
                  border: `1px solid ${deepPurple[500]}`,
                  borderRadius: "12px",
                }}
              />
            </Box>
          )}
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Recruteur
          </Typography>
          <UserInfos user={data.data?.queue?.origin} />

          {data?.data?.queue?.target?.picture && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.data?.queue?.target?.picture}
                alt="user-picture"
                width={48}
                height={48}
                style={{
                  border: `1px solid ${deepPurple[500]}`,
                  borderRadius: "12px",
                }}
              />
            </Box>
          )}
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
            Candidat
          </Typography>
          <UserInfos user={data.data?.queue?.target} />
        </Box>
      </div>
    </div>
  ) : data?.type === "job" ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll flex flex-col items-center border-solid border-blueGrey500 border-[2px] lightBg gap-[24px] outline-0">
        <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
          Rôle
        </Typography>
        {data?.data?.id && (
          <DetailComponent
            noPadding
            label="Id"
            value={data?.data?.id as string}
            type="modal2"
          />
        )}
        {data?.data?.title && (
          <DetailComponent
            noPadding
            label="Titre du rôle"
            value={data?.data?.title as string}
            type="modal2"
          />
        )}
        <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
          Questions
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {actualQuestions?.map((question, index) => (
            <DetailComponent
              noPadding
              key={question?.slice(0, 8)}
              label={`Question n°${index}`}
              value={question as string}
              type="modal2"
            />
          ))}
        </Box>
      </div>
    </div>
  ) : data?.type === "company" ? (
    <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll min-w-[600px] h-auto flex flex-col items-center border-[2px] border-solid border-blueGrey500 lightBg outline-0 gap-[24px]">
      <div className="font-bold text-[14px]">Entreprise</div>
      {data?.data?.id && (
        <DetailComponent
          noPadding
          label="Id"
          value={data?.data?.id as string}
          type="modal2"
        />
      )}
      {data?.data?.name && (
        <DetailComponent
          noPadding
          label="Nom"
          value={data?.data?.name as string}
          type="modal2"
        />
      )}
      {data?.data?.location && (
        <DetailComponent
          noPadding
          label="Localité"
          value={data?.data?.location as string}
          type="modal2"
        />
      )}
      {(data?.data as BetaCompany)?.resume && (
        <DetailComponent
          noPadding
          label="Résumé"
          value={data?.data?.resume as string}
          type="modal2"
        />
      )}
      <div className="font-bold text-[14px]">
        Potentielles références (
        {(data?.data as BetaCompany)?.experiences?.length})
      </div>
      <div className="flex flex-col gap-[12px] w-full border-[0.5px] border-solid border-grey300">
        {(data?.data as BetaCompany)?.experiences?.map((experience, index) => {
          return (
            <div
              className="bg-white p-[24px] flex flex-col"
              key={experience?.id}
            >
              <div className="flex w-full">
                <DetailComponent
                  noPadding
                  label="Début"
                  value={formatToDatetime(
                    experience?.starting as string,
                    true,
                    false,
                    false,
                    language
                  )}
                />
                <DetailComponent
                  noPadding
                  label="Fin"
                  value={formatToDatetime(
                    experience?.ending as string,
                    true,
                    false,
                    false,
                    language
                  )}
                />
              </div>
              <div className="flex w-full gap-[12px]">
                <div className="w-1/2 p-[12px] hover:bg-grey100">
                  <div className="font-bold text-[18px]">Utilisateur</div>
                  <DetailComponent
                    noPadding
                    label="Job"
                    value={experience?.job as string}
                  />
                  <DetailComponent
                    noPadding
                    label="Id"
                    value={experience?.user?.id as string}
                  />
                  <DetailComponent
                    noPadding
                    label="Nom complet"
                    value={experience?.user?.fullname as string}
                  />
                  <DetailComponent
                    noPadding
                    label="Linkedin"
                    value={experience?.user?.linkedinProfileId as string}
                  />
                  <DetailComponent
                    noPadding
                    label="Email"
                    value={(experience?.user?.email as string) || "-"}
                  />
                  <DetailComponent
                    noPadding
                    label="Téléphone"
                    value={
                      getUniversalFromCodeAndNumber(
                        experience?.details?.phone?.code as string,
                        experience?.details?.phone?.number as string
                      ) || "-"
                    }
                  />
                </div>
                <div className="w-1/2 gap-[12px] flex flex-col overflow-hidden overflow-y-scroll border-[0.5px] border-solid border-grey300 h-full">
                  <div className="font-bold text-[18px]">
                    Références compatibles ({experience?.references?.length})
                  </div>
                  {experience?.references &&
                    experience?.references?.map(
                      (reference: BetaProfile | null | undefined) => (
                        <div
                          className="w-full bg-grey50 p-[12px] border-[0.5px] border-solid border-grey300 border-box"
                          key={reference?.id}
                        >
                          <DetailComponent
                            noPadding
                            label="Id"
                            value={(reference?.user?.id as string) || "-"}
                          />
                          <DetailComponent
                            noPadding
                            label="Nom complet"
                            value={(reference?.user?.fullname as string) || "-"}
                          />
                          <DetailComponent
                            noPadding
                            label="Linkedin"
                            value={
                              (reference?.user?.linkedinProfileId as string) ||
                              "-"
                            }
                          />
                          <DetailComponent
                            noPadding
                            label="Email"
                            value={(reference?.user?.email as string) || "-"}
                          />
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="font-bold text-[14px]">
        Offres ({(data?.data as BetaCompany)?.offers?.length})
      </div>
      <div className="flex flex-col gap-[12px] w-full border-[0.5px] border-solid border-grey300">
        {(data?.data as BetaCompany)?.offers?.map((offer, index) => {
          return (
            <div className="bg-white p-[24px] flex flex-col" key={offer?.id}>
              <div>
                <DetailComponent
                  label="id"
                  labelFullWidth
                  value={offer?.id ?? "-"}
                />
                <DetailComponent
                  label="id"
                  labelFullWidth
                  value={
                    (offer?.job?.title as Translated)[
                      language as "fr" | "en"
                    ] ?? "-"
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div
      className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll min-w-[600px] h-auto flex flex-col items-center border-[2px] border-solid border-blueGrey500 lightBg gap-[24px] outline-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-bold text-[14px]">Utilisateur</div>
      {data?.data.candidate?.avatars &&
        data?.data.candidate?.avatars.length > 0 &&
        setFileUrl(data?.data.candidate?.avatars[0]) && (
          <Image
            width={0}
            height={0}
            src={setFileUrl(data?.data.candidate?.avatars[0]) as string}
            alt={`ìmage de profil de ${setName(data.data)}`}
            style={{
              width: "110px",
              height: "auto",
            }}
          />
        )}
      <DetailComponent
        noPadding
        label="Id"
        value={(data?.data?.id as string) || "-"}
        type="modal2"
      />

      <DetailComponent
        noPadding
        label="Video"
        value={
          <form
            action={() => {
              if (video?.id) customOnDeleteVideo(video?.id as string);
            }}
          >
            {!!video && <Button type="submit">Supprimer vidéo</Button>}
            <span>{!!video ? "Oui" : "Non"}</span>
          </form>
        }
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Public"
        value={data?.data.isPublic ? "Oui" : "Non"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Target job"
        value={
          (data?.data?.candidate?.targetJob?.title as Translated)
            ? ((data?.data?.candidate?.targetJob?.title as Translated)[
                language as "fr" | "en"
              ] as string)
            : "-"
        }
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Type de contrat"
        value={
          data?.data?.candidate?.targetContractType
            ? data?.data?.candidate?.targetContractType
            : "-"
        }
        type="modal2"
      />
      {!(data?.data?.candidate?.targetJob?.title as Translated) ? (
        <AddTargetJobComponent profil={data?.data as BetaUser} />
      ) : undefined}
      <DetailComponent
        noPadding
        label="Nom unique"
        value={data?.data?.uniqueName || "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Nom complet"
        value={(data?.data?.fullname as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Linkedin"
        value={(data?.data?.linkedinProfileId as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Email"
        value={(data?.data?.email as string) || "-"}
        type="modal2"
      />

      <DetailComponent
        noPadding
        label="Téléphone"
        value={
          data?.data?.details?.phone?.code && data?.data?.details?.phone?.number
            ? getUniversalFromCodeAndNumber(
                data?.data?.details.phone.code,
                data?.data?.details.phone.number
              )
            : "-"
        }
        type="modal2"
      />

      <DetailComponent
        noPadding
        label="Consenti"
        value={data?.data?.consent ? "oui" : "non"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="CV"
        value={
          data?.data?.cvFile && setFileUrl(data.data.cvFile) ? (
            <Link href={setFileUrl(data.data.cvFile) as string} target="_blank">
              Voir
            </Link>
          ) : (
            "non"
          )
        }
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Age"
        value={data?.data?.age ? String(data.data.age) : "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Description"
        value={data?.data?.description ? data.data.description : "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Langues"
        value={
          data?.data?.languages && data.data.languages.length > 0
            ? data.data.languages.join(", ")
            : "-"
        }
        type="modal2"
      />
      <AddReferenceComponent data={data?.data as BetaUser} />

      {loading && (
        <ImSpinner2 className="hover:text-purple700 cursor-pointer animate-spin subItem" />
      )}

      <div className="flex flex-col gap-[12px] w-full overflow-hidden overflow-y-scroll h-full">
        <div className="font-bold text-[14px]">
          Références compatibles ({compatibleProfiles?.length || ""})
        </div>
        {compatibleProfiles &&
          compatibleProfiles?.length > 0 &&
          compatibleProfiles?.map((profile, index) => (
            <div
              className="bg-white dark:extraLightDrakBg p-[24pw] flex flex-col items-center max-h-[300px]"
              key={profile?.id}
            >
              <DetailComponent
                noPadding
                label="Profile Id"
                value={profile?.id as string}
              />
              <div className="w-full bg-grey100 dark:bg-grey500 p-[24px] box-border">
                <div className="font-bold text-[18px]">Utilisateur</div>

                <DetailComponent
                  noPadding
                  label="Id"
                  value={profile?.user?.id as string}
                />
                <DetailComponent
                  noPadding
                  label="Nom complet"
                  value={profile?.user?.fullname as string}
                />
                <DetailComponent
                  noPadding
                  label="Linkedin"
                  value={profile?.user?.linkedinProfileId as string}
                />
                <DetailComponent
                  noPadding
                  label="Email"
                  value={(profile?.user?.email as string) || "-"}
                />
              </div>
            </div>
          ))}
      </div>
      <div>
        <Button
          onClick={async () => {
            const response = await client.query({
              query: GetOneUserExperiencesDocument,
              variables: { userId: data?.data.id as string },
              fetchPolicy: "no-cache",
            });
            const exps = response.data.oneUserExperiences;
            if (exps) dispatch(setModalUserExperiences(exps) as UnknownAction);
          }}
        >
          Mettre à jour les expériences
        </Button>
      </div>
      {shouldAddExperience ? (
        <div className="flex items-center gap-[12px]">
          <BackofficeUserModalAddExperience data={data?.data as BetaUser} />
          <div
            className="p-[8px] bg-white dark:extraLightDarkBg dark:text-white flex-center"
            onClick={() => setShouldAddExperience(false)}
          >
            x
          </div>
        </div>
      ) : (
        <Button onClick={() => setShouldAddExperience(true)}>
          Ajouter Expérience
        </Button>
      )}
      <Link href={`${uri}/${data?.data.uniqueName}`} target="_blank">
        <Button>Voir profil</Button>
      </Link>
    </div>
  );
}
