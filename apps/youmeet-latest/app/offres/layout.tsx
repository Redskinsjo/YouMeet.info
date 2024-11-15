"use client";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import BigHeaderSection from "@youmeet/ui/_sections/BigHeaderSection";
import Footer from "@youmeet/ui/Footer";

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
      <link rel="canonical" href="https://www.youmeet.info/offres" />
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
            url: "https://www.youmeet.info/offres",
            potentialAction: [
              {
                "@type": "SearchAction",
                name: "Rechercher parmis les Candidats",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.youmeet.info/offres",
                },
                "query-input": "recherche d'emploi",
              },
              {
                "@type": "ViewAction",
                name: "Visualiser les Offres d'Emploi",
                target: "https://www.youmeet.info/offres",
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
      <BigHeaderSection />
      <div className="flex xs:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse">
        {children}
        {view}
      </div>
      <Footer />
    </div>
  );
}
