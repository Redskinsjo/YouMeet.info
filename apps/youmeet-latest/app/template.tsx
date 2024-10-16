import dynamic from "next/dynamic";

const AuthUpdate = dynamic(() => import("./authUpdate"), { ssr: false });

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthUpdate />

      {children}
    </div>
  );
}
