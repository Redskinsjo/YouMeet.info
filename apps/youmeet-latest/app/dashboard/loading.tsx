import dynamic from "next/dynamic";

const Logo = dynamic(() => import("@youmeet/ui/LogoChild"));

export default function Loading() {
  return (
    <div className="min-h-screen flex-center flex-col pb-[24px]">
      <Logo gif png />
    </div>
  );
}
