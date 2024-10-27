"use client";
import SimpleField from "../../formulaire-profil/formComponents/fields/SimpleField";
import { onCreateMeet, onSendEmail } from "@youmeet/functions/actions";
import Layout from "../../Layout";
import SubLayout from "../../SubLayout";
import { resetModal, setModal } from "@youmeet/global-config/features/modal";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { Button, MenuItem } from "@mui/material";
import { UnknownAction } from "@reduxjs/toolkit";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AvatarsField from "../../formulaire-profil/formComponents/fields/AvatarsField";
import PhoneField from "../../formulaire-profil/formComponents/fields/PhoneField";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import { BetaUser, Meet, MeetCandidate, Video } from "@youmeet/gql/generated";
import { useEffect, useState } from "react";
import {
  createError,
  getMeetCandidate,
  getMeetCandidates,
  getSimpleUser,
  submitVideo,
} from "@youmeet/functions/request";
import { setName } from "@youmeet/utils/basics/setName";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { submitFile } from "@youmeet/utils/basics/submitFile";
import { dev, uri, uriPro } from "@youmeet/functions/imports";
import VideoComponent from "../../dashboard/dashboardComponents/VideoComponent";
import SelectField from "../../formulaire-profil/formComponents/fields/SelectField";
import React from "react";

export default function CreateProUser() {
  const dispatch = useDispatch();
  const [chosen, setChosen] = useState<MeetCandidate | null>(null);

  const mainVideo = chosen?.videos?.find((video) => !video?.preview);
  const previewsVideos = chosen?.videos?.filter((video) => video?.preview);
  const [candidates, setCandidates] = useState<MeetCandidate[]>([]);
  const {
    watch,
    setError,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      meetCandidate: {
        firstname: "",
        lastname: "",
        email: "",
        linkedinProfilePage: "",
        phone: "",
        job: "",
      },
      meetRecruiter: {
        firstname: "",
        lastname: "",
        email: "",
        linkedinProfilePage: "",
        phone: "",
      },
    },
  });

  const customeOnCreateMeet = async (formData: FormData) => {
    dispatch(setModal({ display: "upload" }) as UnknownAction);

    const emailCandidate = formData.get("emailCandidate") as string;
    const main = formData.get("videoMain") as File;
    const preview1 = formData.get("videoPreview1") as File;
    const preview2 = formData.get("videoPreview2") as File;

    try {
      formData.delete("videoMain");
      formData.delete("videoPreview1");
      formData.delete("videoPreview2");
      const result = (await onCreateMeet(
        formData,
        watch("meetCandidate.job")
      )) as withData<Meet> | PayloadBackendError;

      if (result && isPayloadError(result)) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        // main
        if (result.data.meetCandidate?.id) {
          const user = (await getSimpleUser<BetaUser>({
            email: emailCandidate,
          })) as BetaUser;

          const mainPayload = {} as { userId: string };
          if (user?.id) mainPayload.userId = user.id as string;

          if (main?.size > 0) {
            const mainFormData = new FormData();
            mainFormData.append("file", main);
            const userId = `${result.data.meetCandidate?.id as string}_1`;
            const resultMain = await submitFile(mainFormData, userId, "video");

            if (resultMain && isPayloadError(resultMain))
              throw new BackendError(resultMain.type, resultMain.message);

            if (resultMain) {
              const videoMain = (await submitVideo<Video>(
                {
                  data: {
                    file: resultMain,
                    preview: false,
                    meetCandidateId: result.data.meetCandidate?.id as string,
                    principal: true,
                    ...mainPayload,
                  },
                },
                0,
                true
              )) as withData<Video> | PayloadBackendError;

              if (videoMain && isPayloadError(videoMain)) {
                throw new BackendError(videoMain.type, videoMain.message);
              } else if (!videoMain?.data) {
                throw new BackendError(
                  BACKEND_ERRORS.PROCESSING,
                  BACKEND_MESSAGES.PROCESSING
                );
              }
            }
          }

          // previews
          const previews: any[] = [];
          if (preview1?.size > 0) previews.push(preview1);
          if (preview2?.size > 0) previews.push(preview2);

          for (let i = 0; i < previews.length; i++) {
            const userId = `${result.data.meetCandidate?.id as string}_${
              i + 2
            }`;
            const formData = new FormData();
            formData.append("file", previews[i]);
            const resultPreview = await submitFile(formData, userId, "video");

            if (resultPreview && isPayloadError(resultPreview)) {
              throw new BackendError(resultPreview.type, resultPreview.message);
            } else {
              const videoPreview = (await submitVideo<Video>(
                {
                  data: {
                    file: resultPreview,
                    preview: true,
                    meetCandidateId: result.data.meetCandidate?.id as string,
                    ...mainPayload,
                    principal: false,
                  },
                },
                0,
                true
              )) as withData<Video> | PayloadBackendError;
              if (videoPreview && isPayloadError(videoPreview)) {
                throw new BackendError(videoPreview.type, videoPreview.message);
              } else if (!videoPreview.data) {
                throw new BackendError(
                  BACKEND_ERRORS.PROCESSING,
                  BACKEND_MESSAGES.PROCESSING
                );
              }
            }
          }

          const result3 = await onSendEmail({
            email: result.data.meetRecruiter?.email,
            link: `${uriPro}/api/meet?email=${result.data.meetRecruiter?.email?.toLowerCase()}&token=${encodeURIComponent(
              result.data.token || ""
            )}`,
            name: setName(result.data.meetRecruiter as MeetCandidate),
            templateId: 31,
          });

          if (result3 && isPayloadError(result3)) {
            throw new BackendError(result3.type, result3.message);
          } else if (!result3?.data) {
            throw new BackendError(
              BACKEND_ERRORS.EMAIL_FAIL,
              BACKEND_MESSAGES.EMAIL_FAIL
            );
          } else {
            const result4 = await onSendEmail({
              email: result.data.meetCandidate?.email,
              link: `${uri}/dashboard`,
              name: setName(result.data.meetCandidate as MeetCandidate),
              templateId: 32,
            });

            if (result4 && isPayloadError(result4)) {
              throw new BackendError(result4.type, result4.message);
            } else if (!result4?.data) {
              throw new BackendError(
                BACKEND_ERRORS.EMAIL_FAIL,
                BACKEND_MESSAGES.EMAIL_FAIL
              );
            } else {
              dispatch(resetModal("ok") as UnknownAction);
              dispatch(
                setModal({ display: "backofficeConfirm" }) as UnknownAction
              );
            }
          }
        } else {
          throw new BackendError(
            BACKEND_ERRORS.PROCESSING,
            BACKEND_MESSAGES.PROCESSING
          );
        }
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
      dispatch(resetModal("ok") as UnknownAction);
      dispatch(setModal({ display: "not-completed" }) as UnknownAction);
    }
  };

  const getCandidates = async () => {
    const candidates = (await getMeetCandidates<
      MeetCandidate[]
    >()) as MeetCandidate[];

    if (candidates) {
      setCandidates(candidates);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <SubLayout>
          <div className="flex flex-col gap-[6px]">
            <span className="subItem text-blueGrey700 font-bold">
              Créer une rencontre
            </span>
          </div>
        </SubLayout>

        <SimpleField
          name="chosen"
          type="text"
          label="Choisir candidat"
          value={setName(chosen as BetaUser) as string}
          select
          onChange={async (value: string) => {
            const meetCandidate = (await getMeetCandidate<MeetCandidate>({
              id: value,
            })) as MeetCandidate;
            setChosen(meetCandidate);
          }}
        >
          {candidates
            .concat([{ id: "", firstname: "Choisir", lastname: "candidat" }])
            .map((candidate) => (
              <MenuItem key={candidate.id} value={candidate.id as string}>
                {(setName(candidate as BetaUser) as string) || "Nom inconnu"}
              </MenuItem>
            ))}
        </SimpleField>
        <div className="overflow-x-scroll w-full p-[6px]">
          <form
            className="flex flex-col gap-[6px]"
            action={customeOnCreateMeet}
          >
            <div className="w-full grid grid-cols-2 gap-[12px]">
              <h2 className="col-start-1 col-end-3">Candidat</h2>

              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="firstnameCandidate"
                type="text"
                label="Prénom"
                required
                value={chosen?.firstname ?? watch("meetCandidate.firstname")}
              />
              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="lastnameCandidate"
                type="text"
                label="Nom de famille"
                required
                value={chosen?.lastname ?? watch("meetCandidate.lastname")}
              />
              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="emailCandidate"
                type="text"
                label="Email"
                required
                value={chosen?.email ?? watch("meetCandidate.email")}
              />
              <SelectField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="job"
                type="text"
                label="Job Title"
                required
                value={watch("meetCandidate.job")}
                location="meetCandidate.job"
              />

              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="linkedinProfileIdCandidate"
                type="text"
                label="Page Linkedin"
                value={
                  chosen?.linkedinProfileId ??
                  watch("meetCandidate.linkedinProfileId")
                }
              />
              <PhoneField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="phoneCandidate"
                type="text"
                label="Téléphone"
                phonecode="+33"
                value={chosen?.phone?.number ?? ""}
              />
              <h3 className="col-start-1 col-end-3">Vidéo Principale</h3>
              {mainVideo && chosen ? (
                <div className="col-span-2">
                  <VideoComponent video={mainVideo} profil={chosen} />
                </div>
              ) : (
                <div className="col-span-2">
                  <AvatarsField
                    dataType="video"
                    type="file"
                    label="Vidéo Principale"
                    name="videoMain"
                    location="videoMain"
                  />
                </div>
              )}
              <h3>Vidéo Previews</h3>
              {chosen && previewsVideos && previewsVideos?.length > 0 ? (
                <div className="col-span-2">
                  {previewsVideos?.map((video) => (
                    <VideoComponent
                      key={video?.id}
                      profil={chosen}
                      video={video as Video}
                    />
                  ))}
                </div>
              ) : (
                <div className="col-span-2">
                  <AvatarsField
                    dataType="video"
                    type="file"
                    label="Vidéo Preview 1"
                    name="videoPreview1"
                    location="videoPreview1"
                  />
                  <AvatarsField
                    dataType="video"
                    type="file"
                    label="Vidéo Preview 2"
                    name="videoPreview2"
                    location="videoPreview2"
                  />
                </div>
              )}
            </div>

            <div className="w-full grid grid-cols-2  gap-[12px]">
              <h2 className="col-start-1 col-end-3">Recruteur</h2>

              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="firstnameRecruiter"
                type="text"
                label="Prénom"
                required
                value={watch("meetCandidate.firstname")}
              />
              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="lastnameRecruiter"
                type="text"
                label="Nom de famille"
                required
                value={watch("meetCandidate.lastname")}
              />
              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="emailRecruiter"
                type="text"
                label="Email"
                required
                value={watch("meetCandidate.email")}
              />

              <SimpleField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="linkedinProfileIdRecruiter"
                type="text"
                label="Page Linkedin"
                value={watch("meetCandidate.linkedinProfileId")}
              />
              <PhoneField
                setValue={setValue}
                setError={setError}
                errors={errors}
                clearErrors={clearErrors}
                name="phoneRecruiter"
                type="text"
                label="Téléphone"
                phonecode="+33"
              />
            </div>

            <Button type="submit" className="row-start-2 col-start-4">
              Créer
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
