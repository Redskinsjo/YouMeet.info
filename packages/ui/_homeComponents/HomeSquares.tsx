import dynamic from "next/dynamic";

const BoldText = dynamic(() => import("../BoldText"), {
  ssr: false,
});
const SectionTitle = dynamic(() => import("../_components/SectionTitle"), {
  ssr: false,
});
const ImgSection = dynamic(() => import("../_components/ImgSection"), {
  ssr: false,
});

export default function HomeSquares() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-start w-full p-[48px] xs:p-[12px] sm:p-[24px] md:p-[24px] box-border">
        <SectionTitle component="h3" translation="one-video-to-convince" />
        <div className="flex gap-[24px] w-full flex items-center justify-around xs:flex-col sm:flex-col md:flex-col xs:h-full sm:h-full md:h-full lg:h-full h-none">
          <ImgSection type="square1" />
          <div className="p-[24px] xs:p-[12px] dark:darkBg bg-blueGrey50 sm:p-[12px] md:p-[12px] m-[12px] box-border flex-center h-fit flex-1 box-border max-w-[790px] border-[0.5px] border-solid border-grey500 shadow-lg rounded-[14px] shadow-deepPurple300">
            <BoldText
              containerStyle={{ margin: "0px", fontSize: "18px" }}
              text={"we-highlight"}
              fontSizeClass="xs:text-[14px] sm:text-[14px] md:text-[14px] font-extralight fadeIn h-full overflow-hidden overflow-y-scroll"
              align="left"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end w-full p-[48px] xs:p-[12px] sm:p-[24px] md:p-[24px] box-border">
        <SectionTitle component="h3" translation="some-official-references" />
        <div className="flex gap-[24px] w-full flex items-center justify-around xs:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse xs:h-full sm:h-full md:h-full lg:h-full h-none">
          <div className="p-[24px] xs:p-[12px] m-[12px] box-border dark:darkBg bg-blueGrey50 sm:p-[12px] md:p-[12px] flex-center h-fit flex-1 box-border max-w-[790px] border-[0.5px] border-solid border-grey500 shadow-lg rounded-[14px] shadow-blueGrey200">
            <BoldText
              containerStyle={{ margin: "0px", fontSize: "18px" }}
              text={"we-highlight2"}
              fontSizeClass="xs:text-[14px] sm:text-[14px] md:text-[14px] font-extralight fadeIn h-full overflow-hidden overflow-y-scroll"
              align="left"
            />
          </div>
          <ImgSection type="square2" />
        </div>
      </div>
    </div>
  );
}
