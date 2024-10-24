"use client";
import { onCreateAffiliation } from "@youmeet/functions/actions";
import { getSimpleUser, getUsers } from "@youmeet/functions/request";
import SimpleField from "../../formulaire-profil/formComponents/fields/SimpleField";
import SubLayout from "../../SubLayout";
import { setError } from "@youmeet/global-config/features/global";
import { setModal } from "@youmeet/global-config/features/modal";
import { BetaUser } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { setName } from "@youmeet/utils/setName";
import { Button, MenuItem } from "@mui/material";
import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";

export default function CreateAffiliation() {
  const [chosen, setChosen] = useState<BetaUser | null>(null);
  const [users, setUsers] = useState<BetaUser[]>([]);
  const dispatch = useDispatch();

  const getParents = async () => {
    const users = (await getUsers<BetaUser[]>({
      data: { user: true },
    })) as BetaUser[];
    if (users) {
      setUsers(users);
    }
  };

  const customOnCreateAffilitation = async (formData: FormData) => {
    try {
      const result = await onCreateAffiliation(formData);
      if (result && isPayloadError(result)) {
        dispatch(setError("not-completed"));
      } else if (!result?.data) {
        dispatch(setError("not-completed"));
      } else {
        dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
      }
    } catch (err: any) {
      dispatch(setModal({ display: "not-completed" }) as UnknownAction);
    }
  };

  useEffect(() => {
    getParents();
  }, []);

  return (
    <form
      action={customOnCreateAffilitation}
      className="w-full h-[500px] flex-center flex-col"
    >
      <SubLayout>
        <div className="flex flex-col gap-[6px]">
          <span className="subItem text-blueGrey700 font-bold">Parent</span>
        </div>
      </SubLayout>
      <SimpleField
        name="parentId"
        type="text"
        label="Choisir candidat"
        value={setName(chosen as BetaUser) as string}
        select
        onChange={async (value: string) => {
          const meetCandidate = (await getSimpleUser<BetaUser>({
            userId: value,
          })) as BetaUser;
          setChosen(meetCandidate);
        }}
      >
        {users
          .concat([{ id: "", firstname: "Choisir", lastname: "candidat" }])
          .map((user) => (
            <MenuItem key={user.id} value={user.id as string}>
              {(setName(user as BetaUser) as string) || "Nom inconnu"}
            </MenuItem>
          ))}
      </SimpleField>
      <Button type="submit">Créer Affiliation</Button>
    </form>
  );
}
