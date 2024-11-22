import {
  BackofficeModalData,
  BackofficeModalDataType,
} from "@youmeet/types/modal";
import { fromNames } from "@youmeet/utils/resolvers/resolveFullname";
import { Box, Button, Typography } from "@mui/material";
import { deepPurple, green, red } from "@mui/material/colors";
import React, { useCallback, useEffect, useState } from "react";
import DetailComponent from "../../DetailComponent";
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
import { useDispatch, useSelector } from "react-redux";
import {
  ModalState,
  resetModal,
  setModalUserExperiences,
} from "@youmeet/global-config/features/modal";
import Image from "next/image";
import {
  formatToDatetime,
  giveTimeAgo,
} from "@youmeet/utils/basics/formatToDatetime";
import { HiPencil } from "react-icons/hi";
import { AiFillSave } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { getUniversalFromCodeAndNumber } from "@youmeet/utils/basics/formatPhone";
import UserInfos from "../../UserInfos";
import { ImSpinner2 } from "react-icons/im";
import { useTranslation } from "react-i18next";
import AddReferenceComponent from "./AddReferenceComponent";
import Link from "next/link";
import LeadForm from "./LeadForm";
import { uri } from "@youmeet/functions/imports";
import BackofficeUserModalAddExperience from "./BackofficeUserModalAddExperience";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import AddTargetJobComponent from "./AddTargetJobComponent";
import { UnknownAction } from "@reduxjs/toolkit";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import { setName } from "@youmeet/utils/basics/setName";
import { setError, setUpload } from "@youmeet/global-config/features/global";
import { removeVideo } from "@youmeet/global-config/features/user";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { onDeleteVideo } from "@youmeet/functions/actions";
import ModalWrapper from "../../modals/ModalWrapper";
import SectionTitle from "../../_components/SectionTitle";
import VideoComponent from "../../dashboard/dashboardComponents/VideoComponent";
import { RootState } from "@youmeet/global-config/store";

export default function BackofficeModalContent({
  data: data1,
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
  const [data, setData] = useState(data1?.data);
  const modal = useSelector((state: RootState) => state.modal as ModalState);

  const getQuestions = useCallback(async () => {
    const response = await client.query({
      query: GetQuestionsDocument,
      variables: { jobId: (data as Job).id as string },
      // fetchPolicy: "no-cache",
    });
    const questions = response?.data?.questions;
    if (response?.data && questions)
      setActualQuestions([
        ...new Set(
          questions.filter((q) => q).map((question) => question?.text as string)
        ),
      ]);
  }, [(data as Job).id]);

  const customOnDeleteVideo = async (videoId: string) => {
    dispatch(setUpload(`upload`));
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
    const videos = data?.videos as Video[];
    if (videos && videos.length > 0) {
      const video = videos
        ? getPrincipalVideo(videos.filter((d) => d) as Video[])
        : undefined;
      setVideo(video);
    }
  }, [data]);

  return modal.queue ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll flex flex-col items-center border-solid border-blueGrey500 border-[2px] lightBg gap-[24px] outline-0">
        <div>
          {fromNames(
            (data as Partial<BetaQueue>)?.target?.firstname as string,
            data?.target?.lastname as string
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
          {data?.id && (
            <DetailComponent
              noPadding
              label="Queue id"
              value={data?.id as string}
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
          <UserInfos user={data?.target} />
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
          {data?.origin?.picture && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.origin?.picture}
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
          <UserInfos user={data?.origin} />
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
  ) : modal.lead ? (
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
          {data?.id && (
            <DetailComponent
              noPadding
              label="lead id"
              value={data?.id as string}
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
          {(data as Lead).email && (
            <DetailComponent
              noPadding
              label="Email"
              value={(data as Lead).email as string}
              type="modal2"
            />
          )}
          {(data as Lead).type && (
            <DetailComponent
              noPadding
              label="Type"
              value={(data as Lead).type as string}
              type="modal2"
            />
          )}
          {(data as Lead).updatedAt && (
            <DetailComponent
              noPadding
              label="Modifié"
              value={giveTimeAgo((data as Lead).updatedAt)}
              type="modal2"
            />
          )}
          {(data as Lead).createdAt && (
            <DetailComponent
              noPadding
              label="Créé"
              value={giveTimeAgo((data as Lead).createdAt)}
              type="modal2"
            />
          )}
        </Box>
        <LeadForm lead={data as Lead} />
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
                    leadId: (data as Lead).id,
                  },
                },
              });
              if (response.data?.sendEmailToLead)
                dispatch(resetModal("ok") as UnknownAction);
              else
                setSpecialErr({
                  sendEmailToLead: "L'email n'a pas été envoyé",
                });
            }}
          >
            {(data as Lead).type === "recruiter"
              ? "Offrir Essai Illimité 2 Semaines"
              : "Proposer Connexion Automatiqe"}
          </Button>
          {(data as Lead).type === "candidate" ? (
            <Button
              sx={{ backgroundColor: green[500], color: "white" }}
              type="submit"
              onClick={async () => {
                setSpecialErr({});
                const response = await client.query({
                  query: SendEmailToLeadDocument,
                  variables: {
                    data: {
                      leadId: (data as Lead).id,
                    },
                    negativeAnswerForDev: true,
                  },
                });
                if (response.data?.sendEmailToLead)
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
          {(data as Lead).type === "candidate" ? (
            <Button
              sx={{ backgroundColor: green[500], color: "white" }}
              type="submit"
              onClick={async () => {
                setSpecialErr({});
                const response = await client.query({
                  query: SendEmailToLeadDocument,
                  variables: {
                    data: {
                      leadId: (data as Lead).id,
                    },
                    negativeAnswerForDesign: true,
                  },
                });
                if (response.data?.sendEmailToLead)
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
  ) : modal.thread ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll flex flex-col items-center border-solid border-blueGrey500 border-[2px] lightBg gap-[24px] outline-0">
        <div>
          {
            (data as Partial<BetaWhatsappThread>).queue?.origin
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
          {data?.id && (
            <DetailComponent
              noPadding
              label="thread id"
              value={data?.id as string}
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

          {data?.terminated && (
            <DetailComponent
              noPadding
              label="Terminé"
              value={data?.terminated ? "Oui" : "Non"}
              type="modal2"
            />
          )}
          {data?.chatId && (
            <DetailComponent
              noPadding
              label="ChatId"
              value={data?.chatId as string}
              type="modal2"
            />
          )}
          {data?.updatedAt && (
            <DetailComponent
              noPadding
              label="Modifié"
              value={giveTimeAgo(data?.updatedAt)}
              type="modal2"
            />
          )}
          {data?.createdAt && (
            <DetailComponent
              noPadding
              label="Créé"
              value={giveTimeAgo(data?.createdAt)}
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
          {data?.queue?.id && (
            <DetailComponent
              noPadding
              label="Id"
              value={data?.queue?.id as string}
              type="modal2"
            />
          )}
          {data?.queue?.status && (
            <DetailComponent
              noPadding
              label="Statut"
              value={data?.queue?.status as string}
              type="modal2"
            />
          )}

          {data?.queue?.origin?.picture && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.queue?.origin?.picture}
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
          <UserInfos user={data?.queue?.origin} />

          {data?.queue?.target?.picture && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={data?.queue?.target?.picture}
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
          <UserInfos user={data?.queue?.target} />
        </Box>
      </div>
    </div>
  ) : modal.job ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll flex flex-col items-center border-solid border-blueGrey500 border-[2px] lightBg gap-[24px] outline-0">
        <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
          Rôle
        </Typography>
        {data?.id && (
          <DetailComponent
            noPadding
            label="Id"
            value={data?.id as string}
            type="modal2"
          />
        )}
        {data?.title && (
          <DetailComponent
            noPadding
            label="Titre du rôle"
            value={data?.title as string}
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
  ) : modal?.company ? (
    <div className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll min-w-[600px] h-auto flex flex-col items-center border-[2px] border-solid border-blueGrey500 lightBg outline-0 gap-[24px]">
      <div className="font-bold text-[14px]">Entreprise</div>
      {data?.id && (
        <DetailComponent
          noPadding
          label="Id"
          value={data?.id as string}
          type="modal2"
        />
      )}
      {data?.name && (
        <DetailComponent
          noPadding
          label="Nom"
          value={data?.name as string}
          type="modal2"
        />
      )}
      {data?.location && (
        <DetailComponent
          noPadding
          label="Localité"
          value={data?.location as string}
          type="modal2"
        />
      )}
      {(data as BetaCompany)?.resume && (
        <DetailComponent
          noPadding
          label="Résumé"
          value={data?.resume as string}
          type="modal2"
        />
      )}
      <div className="font-bold text-[14px]">
        Potentielles références ({(data as BetaCompany)?.experiences?.length})
      </div>
      <div className="flex flex-col gap-[12px] w-full border-[0.5px] border-solid border-grey300">
        {(data as BetaCompany)?.experiences?.map((experience, index) => {
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
        Offres ({(data as BetaCompany)?.offers?.length})
      </div>
      <div className="flex flex-col gap-[12px] w-full border-[0.5px] border-solid border-grey300">
        {(data as BetaCompany)?.offers?.map((offer, index) => {
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
  ) : modal.sharing ? (
    <ModalWrapper>
      <>
        <div className="flex flex-col gap-[24px] h-full">
          <div className="flex flex-col gap-[12px]">
            <div className="underline">Utilisateur</div>
            <SectionTitle component="h2" translation={setName(data?.origin)} />
            <DetailComponent
              noPadding
              label="Email"
              value={data?.origin?.email as string}
              type="modal2"
            />
            {data?.origin?.details?.phone?.code &&
              data?.origin?.details?.phone.number && (
                <DetailComponent
                  noPadding
                  label="Telephone"
                  value={
                    getUniversalFromCodeAndNumber(
                      data?.origin?.details?.phone?.code,
                      data?.origin?.details?.phone?.number
                    ) as string
                  }
                />
              )}
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="underline">Offre</div>
            <DetailComponent
              noPadding
              label="Intitulé de l'offre"
              value={data?.offerTarget?.intitule as string}
            />
            <DetailComponent
              noPadding
              label="Lien vers l'offre"
              value={
                <Link
                  href={`/${data?.offerTarget?.slug as string}`}
                  target="_blank"
                >
                  Lien
                </Link>
              }
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex gap-[12px]">
              <div className="underline">Entreprise</div>
              {(setFileUrl(data?.target?.company?.logo) ||
                (data?.offerTarget?.entreprise?.logo as string)) && (
                <Image
                  src={
                    setFileUrl(data?.target?.company?.logo) ||
                    (data?.offerTarget?.entreprise?.logo as string)
                  }
                  alt="logo de l'entreprise"
                  width={40}
                  height={40}
                />
              )}
            </div>

            <DetailComponent
              noPadding
              label="Nom"
              value={
                data?.target?.name ||
                (data?.offerTarget?.entreprise?.nom as string)
              }
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="underline">Video</div>
            <VideoComponent
              video={data?.video as Video}
              profil={data?.origin as BetaUser}
            />
          </div>
        </div>
      </>
    </ModalWrapper>
  ) : (
    <div
      className="p-[24px] max-w-[720px] max-h-[92vh] overflow-hidden overflow-y-scroll min-w-[600px] h-auto flex flex-col items-center border-[2px] border-solid border-blueGrey500 lightBg gap-[24px] outline-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-bold text-[14px]">Utilisateur</div>
      {data?.candidate?.avatars &&
        data?.candidate?.avatars.length > 0 &&
        setFileUrl(data?.candidate?.avatars[0]) && (
          <Image
            width={0}
            height={0}
            src={setFileUrl(data?.candidate?.avatars[0]) as string}
            alt={`ìmage de profil de ${setName(data)}`}
            style={{
              width: "110px",
              height: "auto",
            }}
          />
        )}
      <DetailComponent
        noPadding
        label="Id"
        value={(data?.id as string) || "-"}
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
        value={data?.isPublic ? "Oui" : "Non"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Target job"
        value={
          (data?.candidate?.targetJob?.title as Translated)
            ? ((data?.candidate?.targetJob?.title as Translated)[
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
          data?.candidate?.targetContractType
            ? data?.candidate?.targetContractType
            : "-"
        }
        type="modal2"
      />
      {!(data?.candidate?.targetJob?.title as Translated) ? (
        <AddTargetJobComponent profil={data as BetaUser} />
      ) : undefined}
      <DetailComponent
        noPadding
        label="Nom unique"
        value={data?.uniqueName || "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Nom complet"
        value={(data?.fullname as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Linkedin"
        value={(data?.linkedinProfileId as string) || "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Email"
        value={(data?.email as string) || "-"}
        type="modal2"
      />

      <DetailComponent
        noPadding
        label="Téléphone"
        value={
          data?.details?.phone?.code && data?.details?.phone?.number
            ? getUniversalFromCodeAndNumber(
                data?.details.phone.code,
                data?.details.phone.number
              )
            : "-"
        }
        type="modal2"
      />

      <DetailComponent
        noPadding
        label="Consenti"
        value={data?.consent ? "oui" : "non"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="CV"
        value={
          data?.cvFile && setFileUrl(data?.cvFile) ? (
            <Link href={setFileUrl(data?.cvFile) as string} target="_blank">
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
        value={data?.age ? String(data?.age) : "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Description"
        value={data?.description ? data?.description : "-"}
        type="modal2"
      />
      <DetailComponent
        noPadding
        label="Langues"
        value={
          data?.languages && data?.languages.length > 0
            ? data?.languages.join(", ")
            : "-"
        }
        type="modal2"
      />
      <AddReferenceComponent data={data as BetaUser} />

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
              variables: { userId: data?.id as string },
              fetchPolicy: "no-cache",
            });
            const exps = response.data?.oneUserExperiences;
            if (exps) dispatch(setModalUserExperiences(exps) as UnknownAction);
          }}
        >
          Mettre à jour les expériences
        </Button>
      </div>
      {shouldAddExperience ? (
        <div className="flex items-center gap-[12px]">
          <BackofficeUserModalAddExperience data={data as BetaUser} />
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
      <Link href={`${uri}/on/${data?.uniqueName}`} target="_blank">
        <Button>Voir profil</Button>
      </Link>
    </div>
  );
}
