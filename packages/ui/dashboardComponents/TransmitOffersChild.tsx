import dynamic from "next/dynamic";

const TransmitOffers = dynamic(() => import("./TransmitOffers"), {
  ssr: false,
});

export default function fnc() {
  return <TransmitOffers />;
}
