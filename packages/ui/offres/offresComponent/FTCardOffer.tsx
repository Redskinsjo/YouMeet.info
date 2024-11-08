import SeeMore from "@/_components/SeeMore";
import { OffreEmploiFT } from "@youmeet/types/api/OffreEmploiFT";
import Image from "next/image";

export default function FTCardOffer({ el }: { el: OffreEmploiFT }) {
  const logo = el.entreprise.logo;

  return (
    <div className="flex flex-col gap-[24px] w-[350px] h-[280px]">
      <div className="flex-bet gap-[3px]">
        {logo && <Image src={logo} alt="logo" width={55} height={55} />}
        <div className="font-semibold subItem">{el.romeLibelle}</div>
      </div>
      <div>
        <div className="text-grey700 subItem">{el.lieuTravail.libelle}</div>
        <div className="text-grey700 font-light subItem">
          {el.typeContratLibelle}
        </div>
      </div>

      <div className="text-grey900 font-semilight subItem">
        Exp: {el.experienceLibelle}
      </div>
    </div>
  );
}
