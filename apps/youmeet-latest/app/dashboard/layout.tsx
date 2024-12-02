import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { logoUrl, uri } from "@youmeet/functions/imports";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-[6px]">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/dashboard`} />
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
            name: "Espace Personnel Candidat - Plateforme de Recrutement",
            description:
              "Gérez vos informations personnelles et professionnelles, votre vidéo de présentation, souscrivez à un abonnement, consultez vos notifications. Optimisez votre expérience sur la plateforme.",
            url: `${uri}/dashboard`,
            image: logoUrl,
            potentialAction: [
              {
                "@type": "SubscribeAction",
                name: "Souscrire à un Abonnement",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/dashboard`,
                },
              },
              {
                "@type": "ViewAction",
                name: "Voir les Informations Personnelles et Professionnelles",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/dashboard`,
                },
              },
              {
                "@type": "WatchAction",
                name: "Visionner votre Vidéo de Présentation",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/dashboard`,
                },
              },
              {
                "@type": "ViewAction",
                name: "Consulter les Notifications",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/dashboard`,
                },
              },
            ],
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: `${uri}`,
            },
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
