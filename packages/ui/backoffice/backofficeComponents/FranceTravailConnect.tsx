"use client";

import { uri } from "@youmeet/functions/imports";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ft-connect": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function FranceTravailConnect() {
  return (
    <ft-connect
      data-mode="light"
      onClick={async () => {
        // const uri =
        //   "https://authentification-candidat.francetravail.fr/connexion/oauth2/authorize";
        // const realm = "/individu";
        // const client_id = `${process.env.FRANCE_TRAVAIL_CLIENT_ID}`;
        // const client_secret = `${process.env.FRANCE_TRAVAIL_CLIENT_SECRET}`;
        // const scope = "api_stats-perspectives-retour-emploiv1 retouremploi";
        // const redirect_uri = "https://www.youmeet.info/api/auth/francetravail";

        // const params = new URLSearchParams({
        //   realm,
        //   response_type: "code",
        //   client_id,
        //   scope,
        //   redirect_uri,
        //   state: "ABC",
        //   nonce: "DEF",
        // });
        // console.log(params.toString(), "params");

        // const endpoint = uri + "?" + params.toString();
        // await fetch(endpoint, { method: "GET" });

        const response = await fetch(`${uri}/api/access_francetravail`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data, "data");
      }}
    ></ft-connect>
  );
}
