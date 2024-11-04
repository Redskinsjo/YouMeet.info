import dynamic from "next/dynamic";

const HomeExplanationsOnReferences = dynamic(
  () => import("../_homeComponents/HomeOnReferencesChild")
);

export default function BandSection() {
  return (
    <section>
      <HomeExplanationsOnReferences />
    </section>
  );
}
