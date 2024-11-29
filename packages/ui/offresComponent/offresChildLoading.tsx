import { Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function CardLoading() {
  return (
    <div className="xs:h-[300px] sm:h-[300px] h-[480px] w-[390px] shadow-custom text-center bg-white dark:darkbg transition-transform duration-300 perspective-1000">
      <div className="h-full flex justify-around items-center flex-col box-border">
        <div className="w-full flex justify-between">
          <div className="w-full">
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

          <div className="w-[30%] px-[6px] flex-bet flex-col box-border">
            <Skeleton
              className="fadeIn"
              animation="wave"
              variant="rounded"
              width="100%"
              height="10px"
              style={{
                margin: "6px 12px",
                gap: "4px",
                backgroundColor: grey[300],
              }}
            />
            <Skeleton
              className="fadeIn"
              animation="wave"
              variant="rounded"
              width="100%"
              height="10px"
              style={{
                margin: "6px 12px",
                gap: "4px",
                backgroundColor: grey[300],
              }}
            />
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-grey300" />
        <div className="flex-bet w-full flex-col">
          <Skeleton
            className="fadeIn"
            animation="wave"
            variant="rounded"
            width="20%"
            height="10px"
            style={{
              margin: "6px 12px",
              gap: "4px",
              backgroundColor: grey[300],
            }}
          />
          <Skeleton
            className="fadeIn"
            animation="wave"
            variant="rounded"
            width="20%"
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
          width="60px"
          height="60px"
          style={{
            margin: "24px",
            gap: "4px",
            backgroundColor: grey[300],
          }}
        />

        <div className="p-[6px] border-t-[0.5px] border-solid border-grey300 min-h-[160px] flex flex-col justify-end w-full box-border">
          <div className="flex flex-wrap items-end gap-[1px]">
            {[0, 1, 2, 3, 4, 5].map((line) => {
              const width = line + 30 + line * 30;
              return (
                <Skeleton
                  key={line}
                  className="fadeIn"
                  animation="wave"
                  variant="rounded"
                  width={width}
                  height="10px"
                  style={{
                    backgroundColor: grey[300],
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
