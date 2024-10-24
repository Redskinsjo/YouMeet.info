"use client";
import { onCreateChildUser } from "@youmeet/functions/actions";
import { dev } from "@youmeet/functions/imports";
import {
  createError,
  getAffiliations,
  getUser,
  submitVideo,
} from "@youmeet/functions/request";
import VideoComponent from "../../dashboard/dashboardComponents/VideoComponent";
import AvatarsField from "../../formulaire-profil/formComponents/fields/AvatarsField";
import PhoneField from "../../formulaire-profil/formComponents/fields/PhoneField";
import SelectField from "../../formulaire-profil/formComponents/fields/SelectField";
import SimpleField from "../../formulaire-profil/formComponents/fields/SimpleField";
import { resetModal, setModal } from "@youmeet/global-config/features/modal";
import { Affiliation, BetaUser, Video } from "@youmeet/gql/generated";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { BackendError } from "@youmeet/utils/BackendErrorClass";
import { getUniversalFromCodeAndNumber } from "@youmeet/utils/formatPhone";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import { setName } from "@youmeet/utils/setName";
import { submitFile } from "@youmeet/utils/submitFile";
import { Button, MenuItem } from "@mui/material";
import { UnknownAction } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import React from "react";

export default function AffiliateForm({ users }: { users: BetaUser[] }) {
  const dispatch = useDispatch();
  const [parent, setParent] = useState<BetaUser | null>(null);
  const [child, setChild] = useState<BetaUser | null>(null);
  const [parents, setParents] = useState<BetaUser[]>([]);
  const [childs] = useState<BetaUser[]>(users.filter((user) => user.user));
  const {
    watch,
    setError,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      parentId: "",
      childId: "",
      firstname: "",
      lastname: "",
      email: "",
      linkedinProfileId: "",
      phone: "",
      job: "",
    },
  });

  const customOnCreateMeet = useCallback(
    async (formData: FormData) => {
      dispatch(setModal({ display: "upload" }) as UnknownAction);

      const main = formData.get("videoMain") as File;

      try {
        formData.delete("videoMain");
        const result = (await onCreateChildUser(
          formData,
          parent?.id as string,
          child?.id as string,
          watch("job")
        )) as withData<BetaUser> | PayloadBackendError;

        console.log(result, "result");

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
          if (result.data.id) {
            const user = result.data;
            const mainPayload = {} as { userId: string };
            if (user?.id) mainPayload.userId = user.id as string;
            if (main?.size > 0) {
              const mainFormData = new FormData();
              mainFormData.append("file", main);
              const userId = `${result.data.id as string}_1`;
              const resultMain = await submitFile(
                mainFormData,
                userId,
                "video"
              );
              if (resultMain && isPayloadError(resultMain))
                throw new BackendError(resultMain.type, resultMain.message);
              if (resultMain) {
                const videoMain = (await submitVideo<Video>(
                  {
                    data: {
                      file: resultMain,
                      preview: false,
                      principal: true,
                      jobId: watch("job"),
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
                } else {
                  dispatch(resetModal("ok") as UnknownAction);
                  dispatch(
                    setModal({ display: "backofficeConfirm" }) as UnknownAction
                  );
                }
              } else {
                throw new BackendError(
                  BACKEND_ERRORS.PROCESSING,
                  BACKEND_MESSAGES.PROCESSING
                );
              }
            } else {
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );
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
    },
    [parent, child]
  );

  const getParentAffiliation = async () => {
    const affiliations = (await getAffiliations<
      Affiliation[]
    >()) as Affiliation[];

    if (affiliations) {
      const parents = affiliations.map(
        (affiliation) => affiliation.parent as BetaUser
      );
      setParents(parents);
    }
  };

  const getThisUser = async (value: string, type: "parent" | "child") => {
    if (value) {
      const user = (await getUser<BetaUser>({
        userId: value,
      })) as BetaUser;
      if (type === "parent") setParent(user);
      else if (type === "child") setChild(user);
    } else {
      if (type === "parent") setParent(null);
      else if (type === "child") setChild(null);
    }
  };

  useEffect(() => {
    getParentAffiliation();
  }, []);

  useEffect(() => {
    getThisUser(watch("parentId"), "parent");
    getThisUser(watch("childId"), "child");
  }, [watch("parentId"), watch("childId")]);

  const childPhone = child?.details?.phone;
  const childVideo = getPrincipalVideo(child?.videos as Video[]);

  return (
    <form className="flex flex-col gap-[6px]" action={customOnCreateMeet}>
      <div className="w-full grid grid-cols-2 gap-[12px]">
        <div className="flex-bet">
          <SimpleField
            name="parentId"
            type="text"
            label="Choisir parent"
            value={setName(parent as BetaUser) as string}
            select
            setValue={setValue}
          >
            {parents
              .concat([{ id: "", firstname: "Choisir", lastname: "parent" }])
              .map((parent) => (
                <MenuItem key={parent.id} value={parent.id as string}>
                  {(setName(parent as BetaUser) as string) || "Nom inconnu"}
                </MenuItem>
              ))}
          </SimpleField>
          <SimpleField
            name="childId"
            type="text"
            label="Choisir child"
            value={setName(child as BetaUser) as string}
            select
            setValue={setValue}
          >
            {childs
              .concat([{ id: "", firstname: "Choisir", lastname: "candidat" }])
              .map((child) => (
                <MenuItem key={child.id} value={child.id as string}>
                  {(setName(child as BetaUser) as string) || "Nom inconnu"}
                </MenuItem>
              ))}
          </SimpleField>
        </div>
        <h2 className="col-start-1 col-end-3">Affilié</h2>

        <SimpleField
          setValue={setValue}
          setError={setError}
          errors={errors}
          clearErrors={clearErrors}
          name="firstnameChild"
          type="text"
          label="Prénom"
          required
          value={child?.firstname || watch("firstname")}
        />
        <SimpleField
          setValue={setValue}
          setError={setError}
          errors={errors}
          clearErrors={clearErrors}
          name="lastnameChild"
          type="text"
          label="Nom de famille"
          required
          value={child?.lastname || watch("lastname")}
        />
        <SimpleField
          setValue={setValue}
          setError={setError}
          errors={errors}
          clearErrors={clearErrors}
          name="emailChild"
          type="text"
          label="Email"
          required
          value={child?.email || watch("email")}
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
          value={child?.candidate?.targetJob?.id || watch("job")}
          location="job"
        />

        <SimpleField
          setValue={setValue}
          setError={setError}
          errors={errors}
          clearErrors={clearErrors}
          name="linkedinProfileIdChild"
          type="text"
          label="Page Linkedin"
          value={child?.linkedinProfileId || watch("linkedinProfileId")}
        />
        <PhoneField
          setValue={setValue}
          setError={setError}
          errors={errors}
          clearErrors={clearErrors}
          name="phoneChild"
          type="text"
          label="Téléphone"
          phonecode="+33"
          value={
            childPhone?.code && childPhone?.number
              ? getUniversalFromCodeAndNumber(
                  childPhone?.code,
                  childPhone?.number
                )
              : watch("phone")
          }
        />
        <h3 className="col-start-1 col-end-3">Vidéo Principale</h3>

        {!!child && !!childVideo ? (
          <div className="col-span-2">
            <VideoComponent video={childVideo} profil={child} />
          </div>
        ) : (
          <div className="col-span-2">
            <AvatarsField
              dataType="video"
              type="file"
              label="Vidéo Principale"
              name="videoMain"
              location="video"
            />
          </div>
        )}
      </div>
      <Button type="submit" className="row-start-2 col-start-4">
        Créer
      </Button>
    </form>
  );
}
