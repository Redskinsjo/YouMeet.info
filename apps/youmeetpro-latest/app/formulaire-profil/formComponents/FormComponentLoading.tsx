import Logo from "@youmeet/components/Logo";
import RightPartFormComponentLoading from "./RightPartFormComponentLoading";

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
