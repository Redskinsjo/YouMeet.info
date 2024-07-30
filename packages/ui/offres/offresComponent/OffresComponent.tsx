"use client";
import { getOffers } from "@youmeet/functions/request";
import PageListContainer from "../../PageListContainer";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { Offer } from "@youmeet/gql/generated";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OffresComponent({ offres }: { offres: Offer[] }) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const [search, setSearch] = useState("");
  const [suggested, setSuggested] = useState<Offer[]>([]);
  const [offers, setOffers] = useState(offres);
  const [jobs, setJobs] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  const refetchOffers = useCallback(async () => {
    const fetched = (await getOffers<Offer[]>(
      {
        params: { take: 50, search },
        data: { jobs, sectors },
      },
      0
    )) as Offer[];
    const suggested = (await getOffers<Offer[]>(
      {
        params: { take: 3, search },
        data: {
          jobs,
          sectors,
          targetSectorId: user.candidate?.targetJob?.topSector?.id || undefined,
        },
      },
      0
    )) as Offer[];
    setOffers(fetched);
    setSuggested(suggested);
  }, [search, jobs, sectors]);

  useEffect(() => {
    if (timer) clearTimeout(timer);
    const timerId = setTimeout(() => {
      refetchOffers();
    }, 100);
    setTimer(timerId);
  }, [search, jobs, search]);

  useEffect(() => {
    const jobs = JSON.parse((localStorage.getItem("jobs") as string) || "[]");
    setJobs(jobs);
    const sectors = JSON.parse(
      (localStorage.getItem("sectors") as string) || "[]"
    );
    setSectors(sectors);
  }, []);

  return (
    <>
      <PageListContainer
        data={offers ? (offers?.filter((offre) => offre) as Offer[]) : []}
        dataType="offers"
        search={search}
        setSearch={setSearch}
        setJobs={setJobs}
        setSectors={setSectors}
      />
    </>
  );
}
