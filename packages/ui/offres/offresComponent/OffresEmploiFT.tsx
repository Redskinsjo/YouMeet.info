import Card from "../../_components/Card";
import { OffreEmploiFT } from "@youmeet/types/api/OffreEmploiFT";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const RoleQuestion = dynamic(() => import("./RoleQuestionChild"));

export default function OffresEmploiFT({
  offres,
}: {
  offres: OffreEmploiFT[];
}) {
  console.log(offres, "offres");
  return (
    <div className="flex-center">
      {offres?.length === 0 && (
        <Suspense>
          <RoleQuestion />
        </Suspense>
      )}
      {offres?.length > 0 && (
        <div className="flex flex-wrap">
          {offres.map((offre) => (
            <Card el={offre} key={offre.id} />
          ))}
        </div>
      )}
    </div>
  );
}
