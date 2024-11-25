"use client";
import SelectField from "../../formulaire-profil/formComponents/fields/SelectField";
import SimpleField from "../../formulaire-profil/formComponents/fields/SimpleField";
import { onCreateProAccount } from "@youmeet/functions/actions";
import Layout from "../../Layout";
import SubLayout from "../../SubLayout";
import { setModal } from "@youmeet/global-config/features/modal";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { Button } from "@mui/material";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import PhoneField from "../../formulaire-profil/formComponents/fields/PhoneField";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateProUser() {
  const dispatch = useDispatch();
  const router = useRouter();

  const customeOnCreateProAccount = async (formData: FormData) => {
    const result = (await onCreateProAccount(formData)) as {
      success?: boolean;
    };

    if (result && isPayloadError(result))
      dispatch(setModal({ display: "not-completed" }) as UnknownAction);
    else dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
    router.push("/message");
  };

  useEffect(() => {
    router.prefetch("/message");
  }, []);

  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <SubLayout>
          <div className="flex flex-col gap-[6px]">
            <span className="subItem text-blueGrey700 font-bold">
              Créer un utilisateur professionnel
            </span>
          </div>
        </SubLayout>
        <div className="overflow-x-scroll w-full p-[6px]">
          <form
            className="grid grid-cols-4 grid-rows-2 gap-[6px]"
            action={customeOnCreateProAccount}
          >
            <SimpleField name="firstname" type="text" label="Prénom" required />
            <SimpleField
              name="lastname"
              type="text"
              label="Nom de famille"
              required
            />
            <SimpleField name="email" type="text" label="Email" required />
            <SimpleField
              name="companyName"
              type="text"
              label="Nom de l'entreprise"
            />
            <SimpleField
              name="linkedinProfilePage"
              type="text"
              label="Page Linkedin de l'entreprise"
            />
            <PhoneField name="phone" label="Téléphone" type="text" required />
            <SelectField
              label="Entreprises existantes"
              name="company"
              type="text"
              location="company"
            />

            <Button type="submit" className="row-start-2 col-start-4">
              Créer
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
