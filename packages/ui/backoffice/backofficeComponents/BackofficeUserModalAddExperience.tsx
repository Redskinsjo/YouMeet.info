import React, { useEffect } from "react";
import { Button } from "@mui/material";
import ExperienceField from "../../formulaire-profil/formComponents/fields/ExperienceField";
import { FieldValues, useForm } from "react-hook-form";
import { client } from "@youmeet/gql/index";
import { BetaUser, CreateExperienceDocument } from "@youmeet/gql/generated";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setModal, resetModal } from "@youmeet/global-config/features/modal";
import { useRouter } from "next/navigation";

const BackofficeUserModalAddExperience = ({ data }: { data: BetaUser }) => {
  const {
    watch,
    setValue,
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
    setError,
    reset,
  } = useForm<FieldValues>({
    values: {
      sector: "",
      job: "",
      company: "",
      companyName: "",
      ending: "",
      isLiveJob: false,
      starting: "",
      duration: null,
    },
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (formData: FieldValues) => {
    const companyInput = {} as { company?: string; companyName?: string };

    const response = await client.mutate({
      mutation: CreateExperienceDocument,
      variables: {
        data: {
          ...formData,
          userId: data.id as string,
          ...companyInput,
        },
      },
    });
    const created = response.data?.createExperience;
    if (created) {
      reset();
      dispatch(resetModal("ok") as UnknownAction);
      dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
      router.push("/message");
    }
  };

  useEffect(() => {
    router.prefetch("/message");
  }, []);

  return (
    <form
      className="flex flex-col gap-[12px] w-full h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>Ajouter une expérience à la mano</div>
      <ExperienceField
        watch={watch}
        setValue={setValue}
        register={register}
        clearErrors={clearErrors}
        locations={{
          sector: "sector",
          job: "job",
          company: "company",
          companyName: "companyName",
          isLiveJob: "isLiveJob",
          starting: "starting",
          ending: "ending",
        }}
        array={[]}
        setError={setError}
        errors={errors}
        index={0}
      />
      <Button type="submit">Ajouter</Button>
    </form>
  );
};

export default BackofficeUserModalAddExperience;
