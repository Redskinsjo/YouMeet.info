import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import SuggestedMeets from "./SuggestedMeets";
import BoldText from "./BoldText";
import Layout from "./Layout";
import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import PageFilters from "./PageFilters";

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

const PageListContainer = ({
  data,
  dataType,
  setSearch,
  search,
  setJobs,
  setSectors,
  type,
}: {
  data: BetaUser[] | BetaCompany[] | Offer[] | undefined | any[];
  dataType: "candidates" | "recruiters" | "offers";
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  setJobs: Dispatch<SetStateAction<string[]>>;
  setSectors: Dispatch<SetStateAction<string[]>>;
  type?: "suggested" | "favorite";
}) => {
  const user = useSelector((state: RootState) => state.user as UserState);
  const local = useLocalSectorAndJob();
  const { watch } = useForm<FieldValues>({
    defaultValues,
    values: { sectors: local.sectors, jobs: local.jobs },
  });

  const shouldSee = (user.user && user.id) || dataType === "offers";

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(watch("jobs")));
    if (setJobs) setJobs(watch("jobs"));
    localStorage.setItem("sectors", JSON.stringify(watch("sectors")));
    if (setSectors) setSectors(watch("sectors"));
  }, [watch("sectors"), watch("jobs")]);

  return (
    <div className="w-full p-[6px] box-border">
      <PageFilters search={search} setSearch={setSearch} />
      {shouldSee && (
        <Layout
          newStyles={{ maxWidth: "100%", width: "100%", minHeight: "100%" }}
        >
          <div className="w-full">
            {data && data.length > 0 ? (
              <div className="px-[12px]">
                <BoldText
                  text={`${dataType}-announcement`}
                  fontSizeClass="text-black"
                />
              </div>
            ) : undefined}

            <SuggestedMeets
              data={data as (BetaUser | BetaCompany | Offer)[]}
              dataType={dataType}
              type={type}
            />
          </div>
        </Layout>
      )}
    </div>
  );
};

export default PageListContainer;
