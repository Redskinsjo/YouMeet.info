import { dev } from "@youmeet/functions/imports";
import Script from "next/script";
import React from "react";

export default function GoogleTagAndHotjarComponent() {
  return !dev ? (
    <>
      <Script
        strategy="afterInteractive"
        id="gtm"
        src="https://www.googletagmanager.com/gtag/js?id=G-FBRC41X2CM"
      ></Script>
      <Script strategy="afterInteractive" id="analytics">
        {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-FBRC41X2CM');`}
      </Script>
      <Script strategy="lazyOnload" id="hotjar" suppressHydrationWarning>
        {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3860697,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </Script>
    </>
  ) : undefined;
}
