import dynamic from "next/dynamic";
const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));
export default function RootLoading() {
  return (
    <div className="w-screen h-screen flex-center">
      <Logo gif png />
    </div>
  );
}
