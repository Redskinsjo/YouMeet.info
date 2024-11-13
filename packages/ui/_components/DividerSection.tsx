export default function DividerSection({
  height = "6px",
  bg = "homeImgBg",
}: {
  height?: string;
  bg?: string;
}) {
  const className = `border-[0.5px] border-dotted border-grey300 m-0 py-[${height}] ${
    bg === "homeImgBg" ? "homeImgBg" : `bg-${bg}`
  }`;
  return <hr className={className} />;
}
