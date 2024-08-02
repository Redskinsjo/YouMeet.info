import { BetaUser, Reference } from "@youmeet/gql/generated";
import CandidateChild from "./candidateChild";
import { Metadata } from "next";
import {
  getMyReferences,
  getUserCandidate,
  getUsersParams,
} from "@youmeet/functions/request";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { isUser } from "@youmeet/types/TypeGuards";
import { redirect } from "next/navigation";

type Props = {
  params: { candidateName: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
  params: { candidateName: string };
}) {
  const verified = await verifyTokenServer(
    undefined,
    `profils/${params.candidateName}`
  );
  const user = (await getUserCandidate(
    {
      uniqueName: decodeURIComponent(params.candidateName),
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
