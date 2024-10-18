import dynamic from "next/dynamic";

const HomeWhatsapp = dynamic(() => import("./HomeWhatsapp"), { ssr: false });

export default function HomePicture2() {
  return (
    <div className="w-screen border-t-[1px] border-0 border-solid border-black dark:lightDarkBg homeLightning">
      <HomeWhatsapp />
    </div>
  );
}
