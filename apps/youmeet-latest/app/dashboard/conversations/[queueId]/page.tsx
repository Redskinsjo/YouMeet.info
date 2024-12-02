import { getOneQueue, ownQueuesParams } from "@youmeet/functions/request";
import { BetaQueue } from "@youmeet/gql/generated";
import { setName } from "@youmeet/utils/basics/setName";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import ConversationChild from "@youmeet/ui/conversationComponents/conversationChild";
import { githubUrl, linkedinUrl, NAME, uri } from "@youmeet/functions/imports";

type Props = {
  params: Promise<{ queueId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const queues = (await ownQueuesParams<BetaQueue[]>({
    data: {
      status: ["pending", "in-progress"],
    },
  })) as BetaQueue[];
  return queues?.map((queue: BetaQueue) => ({ queueId: queue.id }));
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const prms = await params;
  const queueId = decodeURIComponent(prms.queueId);

  const queue = (await getOneQueue<BetaQueue>(
    {
      id: queueId,
    },
    10
  )) as BetaQueue;

  const name = setName(queue.target);
  if (name) {
    return {
      title: `YouMeet - ${name}`,
      description: `Découvrez les questions de l'entreprise ${queue.origin?.company?.name} et répondez-y pour avancer dans le processus de candidature`,
      openGraph: {
        url: `${uri}/dashboard/conversations/${queueId}`,
        title: `YouMeet - ${name}`,
        type: "website",
        locale: "fr_FR",
        description: `Découvrez les questions de l'entreprise ${queue.origin?.company?.name} et répondez-y pour avancer dans le processus de candidature`,
      },
      keywords: [
        name,
        "conversation de recrutement",
        "IA générative",
        "entretiens",
      ],
      authors: [
        { name: NAME, url: githubUrl },
        {
          name: NAME,
          url: linkedinUrl,
        },
      ],
      category: "webpage",
      creator: NAME,
    };
  }

  return {
    title: `Conversation avec un recruteur`,
    description:
      "Découvrez les questions du recruteur et répondez-y pour avancer dans le processus de candidature.",
    openGraph: {
      title: `Conversation avec un recruteur`,
      type: "website",
      locale: "fr_FR",
      description:
        "Découvrez les questions du recruteur et répondez-y pour avancer dans le processus de candidature.",
    },
    authors: [
      { name: NAME, url: githubUrl },
      {
        name: NAME,
        url: linkedinUrl,
      },
    ],
    category: "webpage",
    creator: NAME,
  };
}

export default async function Conversation({
  params,
}: {
  params: Promise<{ queueId: string }>;
}) {
  const prms = await params;
  const queue = (await getOneQueue<BetaQueue>(
    {
      id: decodeURIComponent(prms.queueId),
    },
    10
  )) as BetaQueue;

  if (queue) return <ConversationChild queue={queue} />;
  redirect("/dashboard");
}
