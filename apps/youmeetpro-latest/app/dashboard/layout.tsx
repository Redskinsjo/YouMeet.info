import GoogleTagAndHotjarComponent from "@youmeet/components/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import DashboardFeatures from "@youmeet/components/dashboard/dashboardComponents/dashboardFeatures";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex flex-col bg-grey100 dark:darkBg afterHeader">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href="https://pro.youmeet.info/dashboard" />
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
            name: "Espace Personnel Recruteur - Plateforme de Recrutement",
            description:
              "Consultez vos notifications et ajoutez des offres d'emploi sur notre plateforme de recrutement pour recruteurs.",
            url: "https://pro.youmeet.info/dashboard",
            potentialAction: [
              {
                "@type": "ViewAction",
                name: "Consulter les Notifications",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/dashboard",
                },
              },
              {
                "@type": "AddAction",
                name: "Ajouter une Offre d'Emploi",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://pro.youmeet.info/dashboard",
                },
              },
            ],
            publisher: {
              "@type": "Organization",
              name: "YouMeet",
              url: "https://pro.youmeet.info",
            },
          }),
        }}
        key="product-jsonld"
      />
      <DashboardFeatures />
      {children}
    </div>
  );
}
