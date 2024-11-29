import React from "react";
import { BetaCompany, Video } from "@youmeet/gql/generated";
import { setUpCase } from "@youmeet/utils/resolvers/resolveFullname";
import SubPartContainer from "../SubPartContainer";
import ProfileImage from "./ProfileImage";
import NewVideoComponent from "../NewVideoComponent";
import PrincipalCompanyInfos from "./PrincipalCompanyInfos";
import CompanyDescription from "./CompanyDescription";
import HandleSubscription from "./HandleSubscription";
import LinkToVideos from "./LinkToVideos";

export default function CompanyProfileComponent({
  company,
}: {
  company: BetaCompany | null | undefined;
}) {
  return (
    <div className="flex flex-col gap-[24px] w-[50%] my-[15%]">
      <LinkToVideos />
      <ProfileImage company={company} />
      {company?.name && (
        <h1 className="w-full flex-center titles my-0 dark:text-white">
          {setUpCase(company?.name)}
        </h1>
      )}

      <SubPartContainer radius="14px">
        <PrincipalCompanyInfos company={company} />
      </SubPartContainer>
      {company?.resume && (
        <SubPartContainer radius="14px">
          <CompanyDescription company={company} />
        </SubPartContainer>
      )}
      {company?.video && (
        <NewVideoComponent
          principalVideo={{ file: company.video } as Partial<Video>}
        />
      )}
      <HandleSubscription />
    </div>
  );
}
