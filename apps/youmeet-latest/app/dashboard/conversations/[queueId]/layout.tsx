import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { queueId: string };
}) {
  return (
    <div className="p-[6px]">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link
        rel="canonical"
        href={`https://www.youmeet.info/dashboard/converations/${params.queueId}`}
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
            url: `https://www.youmeet.info/dashboard/converations/${params.queueId}`,
            potentialAction: [
              {
                "@type": "ViewAction",
                name: "Voir les Questions du Recruteur",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `https://www.youmeet.info/dashboard/converations/${params.queueId}`,
                },
              },
              {
                "@type": "TypeAction",
                name: "Répondre aux Questions du Recruteur",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `https://www.youmeet.info/dashboard/converations/${params.queueId}`,
                },
              },
            ],
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: "https://www.youmeet.info",
            },
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
