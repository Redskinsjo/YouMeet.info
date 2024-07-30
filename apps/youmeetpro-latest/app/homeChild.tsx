import dynamic from "next/dynamic";
import Layout from "@youmeet/ui/Layout";
import HeroSection from "@youmeet/ui/_sections/HeroSection";
import Footer from "@youmeet/ui/Footer";
import HomeWhatsapp from "@youmeet/ui/_homeComponents/HomeWhatsapp";
import HomeSquares from "@youmeet/ui/_homeComponents/HomeSquares";
import TextsSection from "@youmeet/ui/_sections/TextsSection";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSection")
);

export default function HomeChild() {
  return (
    <div className="overflow-hidden max-w-screen mediumBg">
      <BigHeaderSection />

      <Layout
        newStyles={{
          maxWidth: "100vw",
          padding: "0px",
        }}
      >
        <div className="flex flex-col w-full gap-[96px] xs:gap-0 sm:gap-0 md:gap-[12px] md2:gap-[24px] lg:gap-[24px] lg2:gap-[24px] pb-[24px]">
          <div className="flex flex-col w-full gap-[96px] xs:gap-0 sm:gap-0 md:gap-0 md2:gap-0 lg:gap-0 lg2:gap-0">
            <HeroSection />
            <Layout
              newStyles={{ maxWidth: "1200px", width: "100%" }}
              newClasses="bg-grey100"
            >
              <div className="flex-center flex-col gap-[48px] pb-[48px]">
                <TextsSection />
                <HomeSquares />
              </div>
            </Layout>
          </div>
          <HomeWhatsapp />
        </div>
      </Layout>
      <Footer />
    </div>
  );
}
