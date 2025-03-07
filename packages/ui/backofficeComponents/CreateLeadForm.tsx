"use client";
import { onCreateLead } from "@youmeet/functions/actions";
import PhoneField from "../formComponents/fields/PhoneField";
import SimpleField from "../formComponents/fields/SimpleField";
import { setError } from "@youmeet/global-config/features/global";
import { setModal } from "@youmeet/global-config/features/modal";
import { BetaUser } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { setName } from "@youmeet/utils/basics/setName";
import { Button, Checkbox, MenuItem } from "@mui/material";
import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function CreateLeadForm({ users }: { users: BetaUser[] }) {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const customOnCreateLead = async (formData: FormData) => {
    const result = await onCreateLead(formData);

    if (result && isPayloadError(result)) {
      dispatch(setError("not-completed"));
    } else if (!result?.data) {
      dispatch(setError("not-completed"));
    } else {
      dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
      formRef.current?.reset();
    }
  };

  return (
    <form
      ref={formRef}
      action={customOnCreateLead}
      className="w-full flex-center flex-col gap-[24px]"
    >
      <SimpleField required name="name" label="Nom complet" type="text" />
      <SimpleField required name="email" label="Email" type="text" />
      <PhoneField name="phone" type="text" label="Phone" />
      <SimpleField
        required
        name="type"
        label="Type recruiter - candidate - newsletter"
        type="text"
      />
      <SimpleField name="linkedin" label="Linkedin" type="text" />
      <SimpleField name="parentId" type="text" label="Choisir parent" select>
        {users
          .concat([{ id: "", firstname: "Choisir", lastname: "candidat" }])
          .map((user) => (
            <MenuItem key={user.id} value={user.id as string}>
              {(setName(user as BetaUser) as string) || "Nom inconnu"}
            </MenuItem>
          ))}
      </SimpleField>
      <div className="flex-center">
        <Checkbox id="french" name="fr" />
        <label htmlFor="french">Langue française</label>
      </div>
      <Button type="submit" className="w-[440px]">
        Créer
      </Button>
    </form>
  );
}
