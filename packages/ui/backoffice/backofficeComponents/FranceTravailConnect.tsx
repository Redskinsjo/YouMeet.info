"use client";

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
        const realm = "individu";
        const client_id = `${process.env.FRANCE_TRAVAIL_CLIENT_ID}`;
        const client_secret = `${process.env.FRANCE_TRAVAIL_CLIENT_SECRET}`;
        // const scope = "api_stats-perspectives-retour-emploiv1 retouremploi";
        const redirect_uri = "https://www.youmeet.info/api/auth/francetravail";

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

        const uri =
          "https://entreprise.francetravail.fr/connexion/oauth2/access_token";

        const params = new URLSearchParams({ realm: "/partenaire" });
        const grant_type = "client_credentials";
        const scope = "api_offresdemploiv2 o2dsoffre";
        // const body = `grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&scope=${scope}`;
        const body = new URLSearchParams({
          grant_type,
          client_id,
          client_secret,
          scope,
        });

        const endpoint = uri + "?" + params.toString();

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
          mode: "no-cors",
        });
        const data = await response.json();
        console.log(data, "data");
      }}
    ></ft-connect>
  );
}
