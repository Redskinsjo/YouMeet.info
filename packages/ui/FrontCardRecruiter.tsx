"use client";
import { useState } from "react";
import Image from "next/image";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { FrontCardProps } from "@youmeet/types/FrontCardProps";
import { Avatar } from "@youmeet/gql/generated";
import { Box, useMediaQuery } from "@mui/material";
import { blueGrey, grey, purple } from "@mui/material/colors";
import { HiVideoCamera } from "react-icons/hi";
import { HiArrowUturnRight } from "react-icons/hi2";
import { setName } from "@youmeet/utils/basics/setName";

export default function FrontCardRecruiter({ company }: FrontCardProps) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const [shouldChangeImageAppear, setShouldChangeImageAppear] =
    useState<boolean>(false);

  return company ? (
    <div className="absolute h-full w-full backface-hidden group-hover:invisible flex flex-col px-[16px] pt-[16px] box-border">
      <Box className="absolute top-[16px] right-[16px] text-[18px] cursor-pointer flex flex-col items-end">
        {company?.video && (
          <Box
            className="mt-[8px]"
            sx={{
              "&:hover svg": {
                color: purple[700],
              },
            }}
            // onClick={() => handleOpen(company)}
          >
            <HiVideoCamera className="item" />
          </Box>
        )}
        {(xs || sm) && (
          <Box
            className="mt-[8px]"
            sx={{
              "&:hover svg": {
                color: purple[700],
              },
            }}
          >
            <HiArrowUturnRight className="item" />
          </Box>
        )}
      </Box>
      <div className="flex-center box-border">
        {shouldChangeImageAppear && <IoMdArrowDropleft className="item" />}
        {!company?.logo ? (
          <div
            className="xs:w-[140px] sm:w-[140px] w-[200px] xs:h-[140px] sm:h-[140px] h-[200px] backface-hidden rounded-[10px] text-lr-dark flex-center border-[1px] border-solid border-lr-dark titles px-[6px] box-border"
            style={{
              background: `linear-gradient(#f4fcff, white)`,
              overflowWrap: "anywhere",
            }}
          >
            {company?.name}
          </div>
        ) : (
          <Image
            alt={company?.name as string}
            className="backface-hidden rounded-[10px] cursor-pointer"
            src={(company.logo as Avatar).url || ""}
            width={200}
            height={200}
            style={{
              width: xs || sm ? 140 : 200,
              height: xs || sm ? 140 : 200,
              objectFit: "cover",
            }}
            onMouseEnter={() => {
              if (company && company.logo) setShouldChangeImageAppear(true);
            }}
            onMouseLeave={() => setShouldChangeImageAppear(false)}
          />
        )}

        {shouldChangeImageAppear && <IoMdArrowDropright className="item" />}
      </div>
      {company.logo && <h3 className="my-0">{setName(company)}</h3>}
      <Box
        sx={{
          backgroundColor: "#fcfff7",
          border: `1px solid ${blueGrey[50]}`,
          "&:hover": {
            backgroundColor: grey[50],
          },
        }}
        className="px-[16px] mt-[6px] mb-[16px] mx-[16px] flex flex-col gap-[12px] items-center flex-1"
      >
        <div className="w-full flex justify-center mx-[24px] flex-1 items-end">
          <div className="flex flex-col w-full">
            <div className="flex gap-[20px] items-center justify-center mt-[2px] mb-[6px] font-bold"></div>
          </div>
        </div>
      </Box>
    </div>
  ) : undefined;
}
