import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactElement } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactElement;
  params: { meetId: string };
}) {
  return (
    <div className="p-[6px]">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link
        rel="canonical"
        href={`https://pro.youmeet.info/${params.meetId}`}
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
            name: "Espace Entreprise - Consulter un profil partagé",
            description:
              "Découvrez un nouveau profil partagé avec votre entreprise.",
            url: `https://pro.youmeet.info/${params.meetId}`,
            potentialAction: [
              {
                "@type": "ViewAction",
                name: "Consulter un Profil Partagé avec votre Entreprise",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `https://pro.youmeet.info/${params.meetId}`,
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
      {children}
    </div>
  );
}
