import { Box } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { client } from "@youmeet/gql/index";
import {
  BetaExperience,
  BetaUser,
  CreateReferenceDocument,
  GetMyReferenceContactsDocument,
  GetOneUserExperiencesDocument,
  ReferenceContact,
  UpdateExperienceDocument,
} from "@youmeet/gql/generated";
import RawExperience from "../../RawExperience";
import { Checkbox } from "@mui/material";
import { outfit } from "@youmeet/functions/fonts";
import { grey } from "@mui/material/colors";
import { getUniversalFromCodeAndNumber } from "@youmeet/utils/basics/formatPhone";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { ModalState } from "@youmeet/global-config/features/modal";

const AddReferenceComponent = ({ data }: { data: BetaUser }) => {
  const [experiences, setExperiences] = useState<
    undefined | (BetaExperience & { contacts: ReferenceContact[] })[]
  >();
  const { t } = useTranslation();
  const modalUserExperiences = useSelector(
    (state: RootState) => (state.modal as ModalState).user?.experiences
  );
  const [selectedExperienceId, setSelectedExperienceId] = useState("");

  const fetchContacts = useCallback(async () => {
    if (experiences && selectedExperienceId) {
      const resp = await client.query({
        query: GetMyReferenceContactsDocument,
        variables: {
          experienceId: selectedExperienceId as string,
          userId: data.id as string,
        },
      });

      const contacts = resp.data.myReferenceContacts;
      if (contacts) {
        const copy = [...experiences];
        const mapped = copy.map((exp) =>
          exp.id === selectedExperienceId ? { ...exp, contacts } : exp
        );

        setExperiences(
          mapped as (BetaExperience & { contacts: ReferenceContact[] })[]
        );
      }
    }
  }, [experiences, selectedExperienceId]);

  const fetchExperiences = useCallback(async () => {
    const response = await client.query({
      query: GetOneUserExperiencesDocument,
      variables: { userId: data.id as string },
      fetchPolicy: "no-cache",
    });
    const exps = response.data?.oneUserExperiences;
    if (exps) {
      setExperiences(
        exps as (BetaExperience & { contacts: ReferenceContact[] })[]
      );
    }
  }, [modalUserExperiences]);

  const exps = useMemo(
    () =>
      experiences && experiences?.length > 0 ? (
        experiences?.map((exp, index, array) =>
          exp ? (
            <div className="flex-bet gap-[6px]" key={exp.id}>
              {exp.contacts?.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <RawExperience
                    key={exp.id}
                    exp={exp as BetaExperience}
                    index={index}
                    array={array as BetaExperience[]}
                  />
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "12px",
                      borderRadius: "14px",
                    }}
                  >
                    {exp.contacts.map((con) => (
                      <div
                        style={{ display: "flex", gap: "12px" }}
                        key={con.id}
                      >
                        <span>{con.name}</span>
                        <span>
                          {getUniversalFromCodeAndNumber(
                            con.phone?.code as string,
                            con.phone?.number as string
                          )}
                        </span>
                        <span>{con.position}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Box sx={{ width: "100%" }}>
                  <RawExperience
                    key={exp.id}
                    exp={exp as BetaExperience}
                    index={index}
                    array={array as BetaExperience[]}
                  />
                  {!exp.contacts ? (
                    <Box
                      sx={{
                        width: "100%",
                        background: grey[200],
                        ...outfit.style,
                        fontSize: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedExperienceId(exp.id as string)}
                    >
                      Voir contacts
                    </Box>
                  ) : undefined}
                </Box>
              )}
              <Checkbox
                checked={exp.referenced as boolean}
                onClick={async () => {
                  const response = await client.mutate({
                    mutation: UpdateExperienceDocument,
                    variables: {
                      data: { id: exp.id, referenced: !exp.referenced },
                    },
                    // fetchPolicy: "no-cache",
                  });
                  const updated = response.data?.updateExperience;
                  if (updated) {
                    const response2 = await client.mutate({
                      mutation: CreateReferenceDocument,
                      variables: {
                        data: {
                          userId: data.id as string,
                          experienceId: exp.id as string,
                          valid: !exp.referenced,
                          type: "professional",
                        },
                      },
                    });
                    const created = response2.data?.createReference;
                    if (created) fetchExperiences();
                  }
                }}
              />
            </div>
          ) : undefined
        )
      ) : (
        <Box
          sx={{
            ...outfit.style,
            fontStyle: "italic",
            fontSize: "14px",
            color: grey[500],
          }}
        >
          {t("no-data")}
        </Box>
      ),
    [experiences]
  );

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [selectedExperienceId]);

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <h3 className="font-bold">{t("user-experiences")}</h3>
      {exps}
    </div>
  );
};

export default AddReferenceComponent;
