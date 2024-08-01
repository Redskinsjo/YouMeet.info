import React from "react";
import Layout from "./Layout";
import FooterList from "./_homeComponents/FooterList";
import FooterList2 from "./_homeComponents/FooterList2";
import FooterProposedBy from "./_homeComponents/FooterProposedBy";

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
