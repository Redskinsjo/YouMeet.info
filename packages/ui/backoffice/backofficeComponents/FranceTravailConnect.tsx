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
      data-mode="..."
      onClick={async () => {
        const client_id = `${process.env.FRANCE_TRAVAIL_CLIENT_ID}`;
        console.log("clicked", client_id);
        const params = new URLSearchParams({
          response_type: "code",
          client_id,
          scope: "",
          redirect_uri: "",
          state: "ABC",
          nonce: "DEF",
        });
        // await fetch(
        //   "https://authentification-candidat.francetravail.fr/connexion/oauth2/authorize/individu",
        //   { method: "Get" }
        // );
      }}
    ></ft-connect>
  );
}
