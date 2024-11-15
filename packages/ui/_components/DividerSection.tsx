export default function DividerSection({
  height = "6px",
  width = "0px",
  bg = "homeImgBg",
}: {
  height?: string;
  bg?: string;
  width?: string;
}) {
  const className = `border-[0.5px] border-dotted border-grey300 m-0 py-[${height}] px-[${width}] ${
    bg === "homeImgBg" ? "homeImgBg" : `bg-${bg}`
  }`;
  return <hr className={className} />;
}
