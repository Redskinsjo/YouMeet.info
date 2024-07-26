import { Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function MeetsLoading() {
  return (
    <div className="w-main border-box flex-center hide-scrollbar h-full w-full overflow flex-wrap gap-[24px]">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((card) => (
        <div
          key={card}
          className="lockedCard xs:max-w-screen sm:max-w-screen w-[297px] appear-fastly bg-white relative border-solid border-deepPurple900 border-[2px] rounded-lg box-border"
        >
          <div className="h-[400px] w-[297px] shadow-lg text-center bg-transparent">
            <div className="h-full flex justify-around items-center flex-col">
              <div className="w-full flex justify-start">
                <Skeleton
                  className="fadeIn"
                  animation="wave"
                  variant="rounded"
                  width="40%"
                  height="10px"
                  style={{
                    margin: "6px 12px",
                    gap: "4px",
                    backgroundColor: grey[300],
                  }}
                />
              </div>
              <Skeleton
                className="fadeIn"
                animation="wave"
                variant="rounded"
                width="120px"
                height="120px"
                style={{
                  margin: "24px",
                  gap: "4px",
                  backgroundColor: grey[300],
                }}
              />
              <Skeleton
                className="fadeIn"
                animation="wave"
                variant="rounded"
                width="40%"
                height="10px"
                style={{
                  gap: "4px",
                  backgroundColor: grey[300],
                }}
              />
              {[0, 1, 2, 3, 4].map((line) => (
                <Skeleton
                  key={line}
                  className="fadeIn"
                  animation="wave"
                  variant="rounded"
                  width="90%"
                  height="10px"
                  style={{
                    margin: "0px 4px",
                    gap: "4px",
                    backgroundColor: grey[300],
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
