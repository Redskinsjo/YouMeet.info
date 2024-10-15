import { outfit } from "@youmeet/functions/fonts";
import dynamic from "next/dynamic";

const SectionTitle = dynamic(() => import("../_components/SectionTitle"), {
  ssr: false,
});
const BoldText = dynamic(() => import("../BoldText"), {
  ssr: false,
});
const SimpleText = dynamic(() => import("./SimpleText"), {
  ssr: false,
});

export default function HomeVideo() {
  return (
    <div className="homeImgBg p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] flex-1 dark:darkHomeSectionBg">
      <div className="flex-center flex-col">
        <SectionTitle
          component="h3"
          className="text-right dark:text-white"
          translation="some-explanations-on-making-video"
        />
        <ul
          role="list"
          className="flex-1 flex-center flex-col w-full xs:w-full sm:w-full max-w-[400px] flex-center mx-[24px] box-border"
        >
          <BoldText
            text={"make-a-short-video"}
            component="li"
            fontSizeClass="bg-grey200 dark:lightDarkBg hover:bg-deepPurple50 dark:hover:extraLightDarkBg cursor-none p-[14px] rounded-[14px]"
            containerStyle={{
              listStyle: "decimal-leading-zero",
            }}
          />
          <BoldText
            text={"make-a-sympathic-video"}
            component="li"
            fontSizeClass="bg-grey200 dark:lightDarkBg hover:bg-deepPurple50 dark:hover:extraLightDarkBg cursor-none p-[14px] rounded-[14px]"
            containerStyle={{
              listStyle: "decimal-leading-zero",
            }}
          />
        </ul>
      </div>
      <div
        className="flex-center flex-col my-[24px] px-[12px] font-extralight dark:text-grey200"
        style={{ ...outfit.style }}
      >
        <SimpleText text="then" />
        <BoldText
          text={"insert-in-cv"}
          containerStyle={{
            fontWeight: "bold",
            margin: "0px",
            fontSize: "20px",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
}
