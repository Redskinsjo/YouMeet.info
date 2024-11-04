import dynamic from "next/dynamic";
import Layout from "./Layout";

const FooterList = dynamic(() => import("./footer/FooterListChild"));
const FooterList2 = dynamic(() => import("./footer/FooterList2Child"));
const FooterProposedBy = dynamic(
  () => import("./footer/FooterProposedByChild")
);

export default function Footer() {
  return (
    <div className="flex flex-col relative z-50 border-t-[1px] border-0 border-solid border-grey500 dark:darkBg lightBg">
      <div className="py-[48px]">
        <Layout newStyles={{ boxShadow: "none", background: "unset" }}>
          <div className="flex xs:flex-col gap-[96px]">
            <FooterList />
            <FooterList2 />
            {/* <FooterProposedBy /> */}
          </div>
        </Layout>
      </div>
    </div>
  );
}
