import dynamic from "next/dynamic";
import RightPartFormComponentLoading from "./RightPartFormComponentLoading";

const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));
export default function FormComponentLoading() {
  return (
    <div className="flex h-screen">
      <div
        className="xs:hidden sm:hidden md:hidden bg-grey100 dark:extraLightDarkBg flex-center"
        style={{
          width: "50vw",
          height: "auto",
        }}
      >
        <Logo size={80} link={false} />
      </div>
      <RightPartFormComponentLoading />
    </div>
  );
}
