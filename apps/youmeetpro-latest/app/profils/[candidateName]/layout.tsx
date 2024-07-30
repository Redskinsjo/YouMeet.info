import { ReactElement } from "react";
import { uri } from "@youmeet/functions/imports";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import { BetaUser, Video } from "@youmeet/gql/generated";
import { setName } from "@youmeet/utils/setName";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { getUser } from "@youmeet/functions/request";

export default async function Layout({
  children,
  params,
}: {
  children: ReactElement;
  params: { candidateName: string };
}) {
  const user = (await getUser(
    { uniqueName: params.candidateName },
    30
  )) as BetaUser;
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/${params.candidateName}`} />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      ></meta>
      <GoogleTagAndHotjarComponent />
      <Script
        id="ld-json"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: `${setName(user)}`,
            image: `${
              user?.candidate &&
              user.candidate.avatars &&
              user.candidate?.avatars?.length > 0
                ? user.candidate.avatars[0]?.secure_url
                : user?.picture
            }`,
            description: `${user?.description}`,
            url: `${uri}/${params.candidateName}`,
            potentialAction: [
              {
                "@type": "WatchAction",
                name: "Regarder la Vidéo de Présentation",
                target: `${
                  user?.videos
                    ? getPrincipalVideo(user.videos as Video[])?.file
                        ?.secure_url
                    : undefined
                }`,
              },
              {
                "@type": "ViewAction",
                name: "Consulter les Références",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/${params.candidateName}`,
                },
              },
              {
                "@type": "InformAction",
                name: "Notifier d'une Proposition d'Entretien",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/${params.candidateName}`,
                },
              },
            ],
            video: {
              "@type": "VideoObject",
              name: `Vidéo de ${user?.fullname}`,
              description: "Vidéo de présentation, CV vidéo pour candidatures",
              contentUrl: user?.videos
                ? (getPrincipalVideo(user?.videos as Video[])?.file
                    ?.secure_url as string)
                : undefined,
              uploadDate: getPrincipalVideo(user?.videos as Video[])?.createdAt,
              thumbnailUrl: user?.videos
                ? getPrincipalVideo(user.videos as Video[])?.file?.secure_url
                : undefined,
              interactionCount:
                (getPrincipalVideo(user?.videos as Video[])?.likes as number) ||
                0,
            },
          }),
        }}
        key="product-jsonld"
      />

      {children}
    </div>
  );
}
