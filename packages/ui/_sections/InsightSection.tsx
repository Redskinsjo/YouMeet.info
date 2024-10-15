import dynamic from "next/dynamic";
import InsightText from "../_components/InsightText";

const InsightImg = dynamic(() => import("../_homeComponents/InsightImg"), {
  ssr: false,
});

export default function InsightSection() {
  return (
    <section className="flex-center xs:flex-col sm:flex-col md:flex-col homeLightning dark:darkHomeSectionBg">
      <InsightText />
      <InsightImg />
    </section>
  );
}
