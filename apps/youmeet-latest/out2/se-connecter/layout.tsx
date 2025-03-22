import { logoUrl, uri } from "@youmeet/functions/imports";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="h-full">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/se-connecter`} />
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
            name: "Se Connecter - Plateforme de Recrutement",
            description:
              "Connectez-vous à notre plateforme de recrutement et explorez des opportunités passionnantes. Rencontrez des talents exceptionnels et trouvez le candidat idéal.",
            url: `${uri}/se-connecter`,
            image: logoUrl,
            inLanguage: "fr-FR",
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: `${uri}/se-connecter`,
            },
            potentialAction: [
              {
                "@type": "Action",
                name: "Connexion Candidat",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/se-connecter`,
                },
              },
              {
                "@type": "Action",
                name: "Inscription Candidat",
                target: `${uri}/se-connecter`,
              },
            ],
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
