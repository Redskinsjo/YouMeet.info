import { ReactElement } from "react";
import { uri } from "@youmeet/functions/imports";
import { setName } from "@youmeet/utils/setName";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { getOneMeet } from "@youmeet/functions/request";
import { Meet } from "@youmeet/gql/generated";

export default async function Layout({
  children,
  params,
}: {
  children: ReactElement;
  params: { meetId: string };
}) {
  const id = decodeURIComponent(params.meetId);
  const meet = (await getOneMeet<Meet>({ id })) as Meet;

  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/${params.meetId}`} />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      ></meta>
      <meta name="robots" content="noindex,nofollow" />
      <GoogleTagAndHotjarComponent />
      <Script
        id="ld-json"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: `${setName(meet.meetCandidate)}`,
            // image: `${
            //   meet?.candidate &&
            //   meet.candidate.avatars &&
            //   meet.candidate?.avatars?.length > 0
            //     ? meet.candidate.avatars[0]?.secure_url
            //     : meet?.picture
            // }`,
            // description: `${meet?.description}`,
            url: `${uri}/${params.meetId}`,
            // potentialAction: [
            //   {
            //     "@type": "WatchAction",
            //     name: "Regarder la Vidéo de Présentation",
            //     target: `${
            //       meet?.videos
            //         ? getPrincipalVideo(meet.videos as Video[])?.file
            //             ?.secure_url
            //         : undefined
            //     }`,
            //   },
            //   {
            //     "@type": "ViewAction",
            //     name: "Consulter les Références",
            //     target: {
            //       "@type": "EntryPoint",
            //       urlTemplate: `${uri}/${params.meetId}`,
            //     },
            //   },
            //   {
            //     "@type": "InformAction",
            //     name: "Notifier d'une Proposition d'Entretien",
            //     target: {
            //       "@type": "EntryPoint",
            //       urlTemplate: `${uri}/${params.meetId}`,
            //     },
            //   },
            // ],
            // video: {
            //   "@type": "VideoObject",
            //   name: `Vidéo de ${meet?.fullname}`,
            //   description: "Vidéo de présentation, CV vidéo pour candidatures",
            //   contentUrl: meet?.videos
            //     ? (getPrincipalVideo(meet?.videos as Video[])?.file
            //         ?.secure_url as string)
            //     : undefined,
            //   uploadDate: getPrincipalVideo(meet?.videos as Video[])?.createdAt,
            //   thumbnailUrl: meet?.videos
            //     ? getPrincipalVideo(meet.videos as Video[])?.file?.secure_url
            //     : undefined,
            //   interactionCount:
            //     (getPrincipalVideo(meet?.videos as Video[])?.likes as number) ||
            //     0,
            // },
          }),
        }}
        key="product-jsonld"
      />

      {children}
    </div>
  );
}
