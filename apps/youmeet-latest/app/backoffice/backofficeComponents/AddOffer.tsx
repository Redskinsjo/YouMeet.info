"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import SubLayoutField from "@youmeet/ui/SubLayoutField";
import { Button, MenuItem, TextField } from "@mui/material";
import { client } from "@youmeet/gql/index";
import {
  CreateOfferDocument,
  GetOneJobDocument,
  Offer,
} from "@youmeet/gql/generated";
import { useRouter } from "next/navigation";
import SelectField from "@youmeet/ui/formulaire-profil/formComponents/fields/SelectField";
import CompanyField from "@youmeet/ui/formulaire-profil/formComponents/fields/CompanyField";
import { purple } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import DateField from "@youmeet/ui/formulaire-profil/formComponents/fields/DateField";
import { DataGrid } from "@mui/x-data-grid";
import { onDeleteOffer } from "@youmeet/functions/actions";

const AddOffer = ({ offers }: { offers: Offer[] }) => {
  const {
    clearErrors,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    register,
  } = useForm<FieldValues>({
    defaultValues: {
      requirements: [],
      sector: "",
      job: "",
      content: "",
      authorName: "",
      authorEmail: "",
      authorInterviewLink: "",
      jobDescriptionLink: "",
      revenue: "",
      company: "",
      contractType: "",
      limitDate: "",
    },
  });
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = async (formData: FieldValues) => {
    setDisabled(true);
    let sector = "";
    if (formData.job) {
      const response = await client.query({
        query: GetOneJobDocument,
        variables: { id: formData.job as string },
      });
      const thisJob = response.data.oneJob;
      if (thisJob) {
        sector = thisJob.topSector?.id as string;
      }
    }
    const companyId = formData.company.id;
    delete formData.company;
    const response = await client.mutate({
      mutation: CreateOfferDocument,
      variables: {
        data: {
          ...formData,
          sector,
          companyId,
          revenue: Number(formData.revenue),
        },
      },
    });
    const created = response?.data?.createOffer;
    if (created) {
      reset();
      setDisabled(false);
    }
  };
  const customOnDeleteOffer = async (id: string) => {
    await onDeleteOffer(id);
  };

  useEffect(() => {
    if (offers) {
      offers?.map((offer) => {
        router.prefetch(`/offres/${offer?.id}`);
      });
    }
  }, [offers]);

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-center flex-col max-w-screen"
        >
          <SelectField
            type="text"
            multiple
            value={watch("requirements")}
            location="requirements"
            name="requirements"
            errors={errors}
            clearErrors={clearErrors}
            setValue={setValue}
            label="Compétences"
          />
          <SelectField
            type="text"
            location="sector"
            value={watch("sector")}
            name="sector"
            errors={errors}
            clearErrors={clearErrors}
            required
            setValue={setValue}
            label="Secteur"
            watch={watch}
          />
          {watch("sector") ? (
            <SelectField
              type="text"
              location="job"
              name="job"
              value={watch("job")}
              errors={errors}
              clearErrors={clearErrors}
              required
              setValue={setValue}
              label="Job"
              watch={watch}
            />
          ) : undefined}

          <SubLayoutField
            type="search"
            rows={6}
            required={false}
            className="col-start-1 w-full fadeIn"
            errors={errors}
            fieldName="content"
            value={watch("content")}
            onChange={(e) => {
              clearErrors("content");
              setValue("content", e.target.value);
            }}
            label="Description de poste"
          />
          <SubLayoutField
            type="search"
            className="col-start-1 w-full fadeIn"
            errors={errors}
            fieldName="authorName"
            value={watch("authorName")}
            onChange={(e) => {
              clearErrors("authorName");
              setValue("authorName", e.target.value);
            }}
            label="Nom de l'auteur"
          />
          <SubLayoutField
            type="search"
            className="col-start-1 w-full fadeIn"
            errors={errors}
            fieldName="authorEmail"
            value={watch("authorEmail")}
            onChange={(e) => {
              clearErrors("authorEmail");
              setValue("authorEmail", e.target.value);
            }}
            label="Email de l'auteur"
          />
          <SubLayoutField
            type="search"
            className="col-start-1 w-full fadeIn"
            errors={errors}
            fieldName="jobDescriptionLink"
            value={watch("jobDescriptionLink")}
            onChange={(e) => {
              clearErrors("jobDescriptionLink");
              setValue("jobDescriptionLink", e.target.value);
            }}
            label="Lien vers fiche de poste"
          />
          <SubLayoutField
            type="search"
            className="col-start-1 w-full fadeIn"
            errors={errors}
            fieldName="revenue"
            value={watch("revenue")}
            onChange={(e) => {
              clearErrors("revenue");
              setValue("revenue", e.target.value);
            }}
            label="Revenue"
          />
          <CompanyField
            location={`company`}
            name={`company`}
            watch={watch}
            setValue={setValue}
            clearErrors={clearErrors}
          />
          <div className="xs:fadeIn sm:fadeIn flex flex-col col-span-2 sm:col-span-2 w-full">
            <TextField
              select
              sx={{
                "& fieldset": {
                  border: `${`0.5px solid ${purple[500]}`} !important`,
                },
              }}
              {...register("contractType")}
              required={true}
              label={t("contractType")}
              className="xs:fadeIn sm:fadeIn sm:col-span-2 subItem w-full"
              autoComplete={"off"}
              InputProps={{
                className: `subItem min-h-[60px] flex flex-wrap`,
              }}
              placeholder={t("what-contractType")}
            >
              <MenuItem value={"CDI"}>CDI</MenuItem>
              <MenuItem value={"Interim"}>Interim</MenuItem>
              <MenuItem value={"Stage"}>Stage</MenuItem>
              <MenuItem value={"CDD"}>CDD</MenuItem>
              <MenuItem value={"Alternance"}>Alternance</MenuItem>
              <MenuItem value={"Freelance"}>Freelance</MenuItem>
              <MenuItem value={"Autre"}>Autre</MenuItem>
            </TextField>
            {errors && errors["contractType"] ? (
              <span style={{ color: "#f96666" }}>
                {errors["contractType"]?.message as string}
              </span>
            ) : undefined}
          </div>

          <DateField
            register={register}
            errors={errors}
            type="month"
            value={watch("limitDate")}
            label={t("limitDate")}
            placeholder={t("what-limitDate")}
            border={`0.5px solid ${purple[500]}`}
            name="limitDate"
            location="limitDate"
          />
          <SubLayoutField
            type="search"
            className="col-start-1 w-full fadeIn"
            errors={errors}
            required={false}
            fieldName="authorInterviewLink"
            value={watch("authorInterviewLink")}
            onChange={(e) => {
              clearErrors("authorInterviewLink");
              setValue("authorInterviewLink", e.target.value);
            }}
            label="Lien vers l'entretien de l'auteur"
          />
          <Button disabled={disabled} type="submit">
            Enregistrer
          </Button>
        </form>
        <div className="overflow-x-scroll w-full">
          <DataGrid
            className="flex-1 max-w-screen max-h-[700px]"
            rows={
              offers?.map((offer) => ({
                id: offer?.id,
                authorName: offer?.authorName,
                authorEmail: offer?.authorEmail,
                authorInterviewLink: offer?.authorInterviewLink,
              })) || []
            }
            columns={[
              {
                type: "string",
                field: "id",
                headerName: "Id offre",
                flex: 1,
              },
              {
                type: "string",
                field: "authorName",
                headerName: "Nom de l'auteur",
                flex: 1,
              },
              {
                type: "string",
                field: "authorEmail",
                headerName: "Email de l'auteur",
                flex: 1,
              },
              {
                type: "string",
                field: "authorInterviewLink",
                headerName: "Lien l'entretien avec l'auteur",
                flex: 1,
              },
              {
                field: "actions",
                headerName: "Actions",
                minWidth: 100,
                renderCell: (row: any) => {
                  return (
                    <div className="flex-center">
                      <form action={() => customOnDeleteOffer(row.id)}>
                        <Button type="submit">Supprimer</Button>
                      </form>
                    </div>
                  );
                },
              },
            ]}
            rowHeight={70}
            onRowClick={(row) => {
              router.push(`/offres/${row.id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddOffer;
