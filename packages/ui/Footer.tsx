import dynamic from "next/dynamic";
import Layout from "./Layout";

const FooterList = dynamic(() => import("./_homeComponents/FooterList"), {
  ssr: false,
});
const FooterList2 = dynamic(() => import("./_homeComponents/FooterList2"), {
  ssr: false,
});
const FooterProposedBy = dynamic(
  () => import("./_homeComponents/FooterProposedBy"),
  {
    ssr: false,
  }
);

export default function Footer() {
  return (
    <div className="flex flex-col relative z-50 border-t-[1px] border-0 border-solid border-black dark:darkBg">
      <div className="py-[48px]">
        <Layout newStyles={{ boxShadow: "none", background: "unset" }}>
          <div className="flex xs:flex-col gap-[96px]">
            <FooterList />
            <FooterList2 />
            <FooterProposedBy />
          </div>
        </Layout>
      </div>
    </div>
  );
}
