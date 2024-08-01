"use client";
import { Skeleton } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import { useState, useEffect } from "react";

export default function OneLineSkeleton({
  width = "100%",
  count = 1,
}: {
  count?: number;
  width?: string;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    !loading && (
      <div className="flex flex-col gap-[6px]">
        {Array.from(new Array(count)).map((line, i, arr) => (
          <Skeleton
            key={i}
            className="fadeIn"
            animation="wave"
            variant="rounded"
            width={i === arr.length - 1 ? "45%" : width}
            height="10px"
            style={{
              margin: "0px 4px",
              gap: "4px",
              backgroundColor: deepPurple[50],
            }}
          />
        ))}
      </div>
    )
  );
}
