import { uri } from "@youmeet/functions/imports";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ queueId: string }>;
}) {
  const prms = await params;
  return (
    <div className="p-[6px]">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link
        rel="canonical"
        href={`${uri}/dashboard/converations/${prms.queueId}`}
      />
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
            "@type": "WebPage",
            name: "Conversation Candidat-Recruteur - Plateforme de Recrutement",
            description:
              "Le recruteur a démarré une converation avec vous. Répondez aux questions pour faire suite à votre candidature.",
            url: `${uri}/dashboard/converations/${prms.queueId}`,
            potentialAction: [
              {
                "@type": "ViewAction",
                name: "Voir les Questions du Recruteur",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/dashboard/converations/${prms.queueId}`,
                },
              },
              {
                "@type": "TypeAction",
                name: "Répondre aux Questions du Recruteur",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/dashboard/converations/${prms.queueId}`,
                },
              },
            ],
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: uri,
            },
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
