import Footer from "@youmeet/ui/Footer";
import dynamic from "next/dynamic";
import Layout from "@youmeet/ui/Layout";

const BoldText = dynamic(() => import("@youmeet/ui/BoldText"));
const Hero = dynamic(() => import("./productComponents/Hero"));
const ProductPunchlineCta = dynamic(
  () => import("@youmeet/ui/_homeComponents/ProductPunchlineCta")
);
const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSection")
);

const punchlines = [
  {
    text: "punchline1",
    cta: "optimize-recruit",
  },
  {
    text: "punchline2",
    cta: "gain-time",
  },
  {
    text: "punchline3",
    cta: "reverse-data",
  },
  {
    text: "punchline4",
    cta: "give-feedback",
  },
  {
    text: "punchline5",
    cta: "trust-profiles",
  },
  {
    text: "punchline6",
    cta: "differentiate-profiles",
  },
  {
    text: "punchline7",
    cta: "reliable",
  },
  {
    text: "punchline8",
    cta: "give-transparency",
  },
];

export default function ProductChild() {
  return (
    <div>
      <BigHeaderSection />

      <div>
        <Hero />
        <div className="flex flex-col mediumBg dark:darkBg">
          <Layout newStyles={{ maxWidth: "1100px", boxShadow: "unset" }}>
            <div className="product-grid my-[48px] xs:my-0 sm:my-0 md:my-0 box-border">
              {punchlines.map((punchline, i) => {
                return (
                  <div
                    key={punchline.cta}
                    className={
                      i === 0 || i === 3 || i === 4 || i === 7 || i === 8
                        ? "w-full min-h-[240px] bg-deepPurple50 dark:extraLightDarkBg flex-center flex-col group shadow-2xl gap-[24px] p-[24px] box-border border-[0.5px] border-solid border-grey300"
                        : "w-full min-h-[240px] bg-white dark:mediumDarkBg flex-center flex-col group shadow-2xl gap-[24px] p-[24px] box-border border-[0.5px] border-solid border-grey900"
                    }
                  >
                    <div className="flex-1 flex flex-col gap-[12px] flex-center m-0 p-0">
                      <ProductPunchlineCta cta={punchline.cta} />
                      <span className="w-[25%] h-[2px] group-hover:bg-blueGrey900 dark:group-hover:bg-white" />
                    </div>
                    <div
                      className={
                        i === 0 || i === 3 || i === 4 || i === 7 || i === 8
                          ? "text-blueGrey900 text-justify indent-8 xss:indent-2 xs:indent-2 sm:indent-4 px-[48px] xs:px-[12px] sm:px-[12px] md:px-[12px] max-w-[65%] xs:max-w-full sm:max-w-full md:max-w-[90%] flex-[2] overflow-scroll"
                          : "text-blueGrey900 text-justify indent-8 xss:indent-2 xs:indent-2 sm:indent-4 px-[48px] xs:px-[12px] sm:px-[12px] md:px-[12px] max-w-[65%] xs:max-w-full sm:max-w-full md:max-w-full flex-[2] overflow-scroll"
                      }
                    >
                      <BoldText
                        text={punchline.text}
                        fontSizeClass="dark:text-black"
                        align="justify"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Layout>
        </div>
      </div>

      <Footer />
    </div>
  );
}
