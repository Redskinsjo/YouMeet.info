import dynamic from "next/dynamic";
const BoldText = dynamic(() => import("../TextChild"));

export default function EdgeMsg() {
  return (
    <BoldText
      text={"edge-apply"}
      align="right"
      containerStyle={{
        margin: "0px 6px",
        fontSize: "13px",
        fontWeight: "300",
        lineHeight: 1.1,
      }}
    />
  );
}
