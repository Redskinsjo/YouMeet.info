"use client";
import {
  BetaUser,
  Favorite,
  GetMyUnlockedUsersDocument,
} from "@youmeet/gql/generated";
import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import FrontFavoriteCard from "../../mes-favoris/myFavoritesComponents/FrontFavoriteCard";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { SearchState } from "@youmeet/global-config/features/search";
import { useQuery } from "@apollo/client";
import { GlobalState } from "@youmeet/global-config/features/global";
import { chatbotProduct, premiumProduct } from "@youmeet/functions/imports";
import { setUsers } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { getMyFavorites, getUsers } from "@youmeet/functions/request";
import { isUser } from "@youmeet/types/TypeGuards";
import MeetsLoading from "./MeetsLoading";
import NoData from "../../NoData";
import React from "react";

const defaultValues = { sectors: [], jobs: [] };

const useLocalSectorAndJob = () => {
  const [sectors, setSectors] = useState<string[]>([]);
  const [jobs, setJobs] = useState<string[]>([]);

  useEffect(() => {
    if (localStorage.getItem("sectors"))
      setSectors(JSON.parse(localStorage.getItem("sectors") as string));
    if (localStorage.getItem("jobs"))
      setJobs(JSON.parse(localStorage.getItem("jobs") as string));
  }, []);
  return { sectors, jobs };
};

export default function CardsComponent({
  dataType,
  profil,
}: {
  dataType: "candidates" | "favorites";
  profil: BetaUser;
}) {
  const search = useSelector((state: RootState) => state.search as SearchState);

  const local = useLocalSectorAndJob();
  const { watch } = useForm<FieldValues>({
    defaultValues,
    values: { sectors: local.sectors, jobs: local.jobs },
  });
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [data, setData] = useState<Favorite[] | BetaUser[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    data: unlockedUsers,
    loading: unlockedLoading,
    refetch: refetchUnlocked,
  } = useQuery(GetMyUnlockedUsersDocument, {
    variables: { originId: profil.id },
  });
  const subscription = useSelector(
    (state: RootState) => (state.global as GlobalState).subscription
  );

  const unlocked = unlockedUsers?.myUnlockedUsers
    ?.map((unlocked) => unlocked?.target?.id)
    .filter((d) => d) as string[];

  const isSubscribedPro = subscription
    ? !!subscription?.subscriptions.find(
        (sub) =>
          (sub.plan.id === chatbotProduct && (sub.plan as any).active) ||
          (sub.plan.id === premiumProduct && (sub.plan as any).active)
      )
    : false;

  const getData = useCallback(async () => {
    setLoading(true);
    let dispatched: BetaUser[] = [];

    if (dataType === "candidates") {
      const users = (await getUsers<BetaUser[]>({
        first: { search: search.search, take: 50 },
        data: {
          user: true,
          jobs,
          sectors,
          isVideo: search.video ? true : undefined,
          isLinkedin: search.linkedin ? true : undefined,
          isPhone: search.phone ? true : undefined,
        },
      })) as BetaUser[];
      setData(users);
      dispatched = users as BetaUser[];
    }
    if (dataType === "favorites") {
      const favorites = (await getMyFavorites<Favorite[]>({
        first: { search: search.search, take: 50 },
        data: {
          originId: profil.id,
          jobs,
          sectors,
          isVideo: search.video ? true : undefined,
          isLinkedin: search.linkedin ? true : undefined,
          isPhone: search.phone ? true : undefined,
        },
      })) as Favorite[];
      setData(favorites);
      dispatched = favorites
        .filter((d) => isUser((d as Favorite).target as BetaUser))
        .map((d) => (d as Favorite).target as BetaUser);
    }
    if (unlocked) {
      const modalUsers = dispatched
        .filter((user) => !!user?.videos && user?.videos?.length > 0)
        .map((user) => ({
          id: user?.id,
          videos: user?.videos,
          candidate: user?.candidate,
        }))
        .filter((user) =>
          !isSubscribedPro ? unlocked.includes(user?.id as string) : true
        );
      dispatch(setUsers(modalUsers) as UnknownAction);
    }
    setLoading(false);
  }, [
    search.search,
    search.video,
    search.linkedin,
    search.phone,
    jobs,
    sectors,
    unlocked,
  ]);

  useEffect(() => {
    getData();
  }, [
    search.search,
    search.video,
    search.linkedin,
    search.phone,
    jobs,
    sectors,
  ]);

  useEffect(() => {
    const jobs = JSON.parse((localStorage.getItem("jobs") as string) || "[]");
    setJobs(jobs);
    const sectors = JSON.parse(
      (localStorage.getItem("sectors") as string) || "[]"
    );
    setSectors(sectors);
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(watch("jobs")));
    if (setJobs) setJobs(watch("jobs"));
    localStorage.setItem("sectors", JSON.stringify(watch("sectors")));
    if (setSectors) setSectors(watch("sectors"));
  }, [watch("sectors"), watch("jobs")]);

  if (loading || unlockedLoading) return <MeetsLoading />;
  if (data.length === 0) return <NoData />;

  return data?.map((d) =>
    d && dataType === "candidates" ? (
      <Card
        key={d.id}
        d={d}
        type={dataType}
        isSubscribedPro={isSubscribedPro}
        refetch={() => refetchUnlocked()}
        unlocked={unlocked}
      />
    ) : d && dataType === "favorites" ? (
      <div className="relative w-full h-full text-center">
        <FrontFavoriteCard favorite={d as Favorite} />
      </div>
    ) : undefined
  );
}
