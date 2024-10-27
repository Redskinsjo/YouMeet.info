import { getOneQueue, ownQueuesParams } from "@youmeet/functions/request";
import { BetaQueue } from "@youmeet/gql/generated";
import { setName } from "@youmeet/utils/basics/setName";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import ConversationChild from "./conversationChild";

type Props = {
  params: { queueId: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
  const queueId = decodeURIComponent(params.queueId);

  const queue = (await getOneQueue<BetaQueue>(
    {
      id: params.queueId,
    },
    10
  )) as BetaQueue;

  const name = setName(queue.target);
  if (name) {
    return {
      title: `YouMeet - ${name}`,
      description: `Découvrez les questions de l'entreprise ${queue.origin?.company?.name} et répondez-y pour avancer dans le processus de candidature`,
      openGraph: {
        url: `https://www.youmeet.info/dashboard/converations/${params.queueId}`,
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
        { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
        {
          name: "Jonathan Carnos",
          url: "https://www.linkedin.com/in/jonathancarnos123/",
        },
      ],
      category: "webpage",
      creator: "Jonathan Carnos",
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
      { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
      {
        name: "Jonathan Carnos",
        url: "https://www.linkedin.com/in/jonathancarnos123/",
      },
    ],
    category: "webpage",
    creator: "Jonathan Carnos",
  };
}

export default async function Conversation({
  params,
}: {
  params: { queueId: string };
}) {
  const queue = (await getOneQueue<BetaQueue>(
    {
      id: decodeURIComponent(params.queueId),
    },
    10
  )) as BetaQueue;

  if (queue) return <ConversationChild queue={queue} />;
  redirect("/dashboard");
}
