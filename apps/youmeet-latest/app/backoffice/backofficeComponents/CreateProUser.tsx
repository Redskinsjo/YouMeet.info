"use client";
import SelectField from "@youmeet/ui/formulaire-profil/formComponents/fields/SelectField";
import SimpleField from "@youmeet/ui/formulaire-profil/formComponents/fields/SimpleField";
import { onCreateProAccount } from "@youmeet/functions/actions";
import Layout from "@youmeet/ui/Layout";
import SubLayout from "@youmeet/ui/SubLayout";
import { setModal } from "@youmeet/global-config/features/modal";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { Button } from "@mui/material";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import PhoneField from "@youmeet/ui/formulaire-profil/formComponents/fields/PhoneField";

export default function CreateProUser() {
  const dispatch = useDispatch();

  const customeOnCreateProAccount = async (formData: FormData) => {
    const result = (await onCreateProAccount(formData)) as {
      success?: boolean;
    };

    if (result && isPayloadError(result))
      dispatch(setModal({ display: "not-completed" }) as UnknownAction);
    else dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
  };

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
            action={(formData: FormData) => {
              customeOnCreateProAccount(formData);
            }}
          >
            <SimpleField
              id={1}
              name="firstname"
              type="text"
              label="Prénom"
              required
            />
            <SimpleField
              id={2}
              name="lastname"
              type="text"
              label="Nom de famille"
              required
            />
            <SimpleField
              id={3}
              name="email"
              type="text"
              label="Email"
              required
            />
            <SimpleField
              id={4}
              name="companyName"
              type="text"
              label="Nom de l'entreprise"
            />
            <SimpleField
              id={5}
              name="linkedinProfilePage"
              type="text"
              label="Page Linkedin de l'entreprise"
            />
            <PhoneField
              name="phone"
              label="Téléphone"
              type="text"
              required
              id={6}
            />
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
