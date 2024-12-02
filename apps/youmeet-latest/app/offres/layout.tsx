import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import BigHeaderSection from "@youmeet/ui/_sections/BigHeaderSection";
import Footer from "@youmeet/ui/Footer";
import ViewChild from "@youmeet/ui/offresComponent/ViewChild";
import { uri } from "@youmeet/functions/imports";

export default function Layout({
  children,
  view,
}: {
  children: ReactNode;
  view: ReactNode;
}) {
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/offres`} />
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
            name: "Offres d'Emploi - Plateforme de Recrutement",
            description:
              "Explorez les offres d'emplois sur notre plateforme de recrutement. Trouvez l'emploi qui vous correspond parmis de nombreux choix.",
            url: `${uri}/offres`,
            potentialAction: [
              {
                "@type": "SearchAction",
                name: "Rechercher parmis les Candidats",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${uri}/offres`,
                },
                "query-input": "recherche d'emploi",
              },
              {
                "@type": "ViewAction",
                name: "Visualiser les Offres d'Emploi",
                target: `${uri}/offres`,
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
      <BigHeaderSection />
      <div className="flex xs:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse afterHeader">
        {children}
        <ViewChild view={view} />
      </div>
      <Footer />
    </div>
  );
}
