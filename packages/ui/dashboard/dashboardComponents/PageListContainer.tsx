import Layout from "../../Layout";
import { BetaUser } from "@youmeet/gql/generated";
import Meets from "./Meets";
import dynamic from "next/dynamic";

const BoldText = dynamic(() => import("../../TextChild"));

export default function PageListContainer({
  profil,
  dataType,
}: {
  profil: BetaUser;
  dataType: "candidates" | "favorites";
}) {
  return (
    <div className="w-full">
      <Layout
        newStyles={{
          maxWidth: "100%",
          width: "100%",
          paddingBottom: "48px",
          boxShadow: "unset",
        }}
      >
        <div className="w-full">
          <BoldText
            text={`${dataType}-announcement`}
            fontSizeClass="text-black"
            containerStyle={{ marginTop: "48px" }}
          />

          <Meets dataType={dataType} profil={profil} />
        </div>
      </Layout>
    </div>
  );
}
