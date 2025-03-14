import { BetaUser, Reference } from "@youmeet/gql/generated";
import CandidateChild from "./candidateChild";
import { Metadata } from "next";
import {
  getMyReferences,
  getUserCandidate,
  getUsersParams,
} from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { isUser } from "@youmeet/types/TypeGuards";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ candidateName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const users = (await getUsersParams<BetaUser[]>({
    data: {
      user: true,
    },
  })) as BetaUser[];

  return users?.map((user: BetaUser) => ({ candidateName: user.uniqueName }));
}

export const metadata: Metadata = { robots: { index: false } };

export const maxDuration = 60;

export default async function Profil({
  params,
}: {
  params: Promise<{ candidateName: string }>;
}) {
  const prms = await params;
  const verified = await verifyTokenServer(
    undefined,
    `profils/${prms.candidateName}`
  );
  const user = (await getUserCandidate(
    {
      uniqueName: decodeURIComponent(prms.candidateName),
      originId: (verified as LoginCookiePayload).userId,
    },
    0
  )) as BetaUser;

  if (user && isUser(user)) {
    const references = (await getMyReferences<Reference[]>({
      userId: user.id,
    })) as Reference[];
    return <CandidateChild profil={user} references={references} />;
  }
  return redirect(`/`);
}
