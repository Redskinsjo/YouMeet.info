import dynamic from "next/dynamic";

const HomeExplanationsOnReferences = dynamic(
  () => import("../_homeComponents/HomeExplanationsOnReferences"),
  { ssr: false }
);

export default function BandSection() {
  return (
    <section>
      <HomeExplanationsOnReferences />
    </section>
  );
}
