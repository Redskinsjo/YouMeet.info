"use client";
import { setModal } from "@youmeet/global-config/features/modal";
import SubLayout from "@youmeet/components/SubLayout";
import { client } from "@youmeet/gql/index";
import {
  BetaCompany,
  BetaUser,
  GetCompaniesDocument,
  GetUsersDocument,
} from "@youmeet/gql/generated";
import { TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { UnknownAction } from "@reduxjs/toolkit";
import { getCompany, getUser } from "@youmeet/functions/request";

export default function MoreFeaturesLeads() {
  const [searchedCompany, setSearchedCompany] = useState("");
  const [companies, setCompanies] = useState<
    (BetaCompany | undefined | null)[] | undefined
  >();
  const [searchedDbUser, setSearchedDbUser] = useState("");
  const [dbUsers, setDbUsers] = useState<
    (BetaUser | undefined | null)[] | undefined
  >();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  const getCompanies = useCallback(async () => {
    if (searchedCompany) {
      if (timer) {
        setLoading(true);
        const response = await client.query({
          query: GetCompaniesDocument,
          fetchPolicy: "no-cache",
          variables: { filters: { name: searchedCompany } },
        });
        const companies = response.data?.companies;
        if (companies) setCompanies(companies);
        setLoading(false);
      }
    }
  }, [searchedCompany]);
  const getDbUsers = useCallback(async () => {
    if (timer) {
      setLoading(true);
      const response = await client.query({
        query: GetUsersDocument,
        fetchPolicy: "no-cache",
        variables: { first: { search: searchedDbUser } },
      });
      const dbUsers = response.data?.users;
      if (dbUsers) setDbUsers(dbUsers);
      setLoading(false);
    }
  }, [searchedDbUser]);
  return (
    <div className="flex flex-col w-full gap-[24px]">
      <SubLayout>
        <div className="flex flex-col gap-[6px]">
          <span className="subItem text-blueGrey700 font-bold">
            Gérer une demande à la main
          </span>
        </div>
      </SubLayout>
      <div>Utilisateur</div>
      <TextField
        value={searchedDbUser}
        onChange={(e) => {
          if (timer) clearTimeout(timer);
          setSearchedDbUser(e.target.value);

          const timerId = setTimeout(() => {
            getDbUsers();
            setTimer(undefined);
          }, 500);

          setTimer(timerId);
        }}
      />
      {loading ? (
        <ImSpinner2 className="hover:text-purple700 cursor-pointer animate-spin subItem" />
      ) : (
        searchedDbUser &&
        dbUsers &&
        dbUsers.map((dbUser: BetaUser | null | undefined) => (
          <div
            key={dbUser?.id}
            className="w-full h-[50px] box-border p-[24px] flex items-center justify-between gap-[24px] hover:bg-white cursor-pointer"
            onClick={async () => {
              const result = (await getUser({
                userId: dbUser?.id,
              })) as BetaUser;
              dispatch(
                setModal({
                  display: "backoffice",
                  user: result,
                }) as UnknownAction
              );
            }}
          >
            <span className="subItem">{dbUser?.fullname}</span>
            <span className="subItem inline">{dbUser?.linkedinProfileId}</span>
          </div>
        ))
      )}
      <div>Entreprise</div>
      <TextField
        value={searchedCompany}
        onChange={(e) => {
          if (timer) clearTimeout(timer);
          setSearchedCompany(e.target.value);

          const timerId = setTimeout(() => {
            getCompanies();
            setTimer(undefined);
          }, 500);

          setTimer(timerId);
        }}
      />
      {loading ? (
        <ImSpinner2 className="hover:text-purple700 cursor-pointer animate-spin subItem" />
      ) : (
        searchedCompany &&
        companies &&
        companies.map((company: BetaCompany | null | undefined) => (
          <div
            key={company?.id}
            className="w-full h-[50px] box-border p-[24px] flex items-center justify-between gap-[24px] hover:bg-white cursor-pointer"
            onClick={async () => {
              if (company?.id) {
                const result = (await getCompany<BetaCompany>({
                  id: company.id,
                })) as BetaCompany;
                dispatch(
                  setModal({
                    display: "backoffice",
                    company: result,
                  }) as UnknownAction
                );
              }
            }}
          >
            <span className="subItem">{company?.name}</span>
            <span className="subItem inline">{company?.location}</span>
          </div>
        ))
      )}
    </div>
  );
}
