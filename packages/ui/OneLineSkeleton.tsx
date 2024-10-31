import { Skeleton } from "@mui/material";
import { blueGrey, yellow } from "@mui/material/colors";

export default function OneLineSkeleton({
  width = "100%",
  count = 1,
  height = "10px",
}: {
  count?: number;
  width?: string;
  height?: string;
}) {
  const array = Array.from(new Array(count));

  return array.map((line, i, arr) => (
    <Skeleton
      key={i}
      className="fadeIn"
      animation="wave"
      variant="rounded"
      width={arr.length > 1 && i === arr.length - 1 ? "45%" : width}
      height={height}
      style={{
        margin: "0px 8px",
        backgroundColor: blueGrey[50],
      }}
    />
  ));
}
