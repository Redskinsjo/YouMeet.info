"use client";
import { Box, useMediaQuery } from "@mui/material";
import { deepPurple, purple } from "@mui/material/colors";
import React, { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { AiFillCloseCircle } from "react-icons/ai";

export type StylesAttr = { [att: string]: string | number };

const RawValue = ({
  field,
  setValue,
  setAdded,
  list,
  newStyles,
}: {
  field: string;
  setValue?: UseFormSetValue<FieldValues>;
  setAdded?: Dispatch<SetStateAction<string[]>>;
  list?: string[];
  newStyles?: { [attr: string]: string | number | StylesAttr };
}) => {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const containerStyles = newStyles && newStyles.container;
  const getBodyStyles = (styles: StylesAttr) => {
    const copy = { ...styles };
    delete copy.container;
    return copy;
  };
  return (
    <div
      key={field}
      className="dark:darkBg lightBg dark:text-white text-purple900"
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
        marginRight: "8px",
        position: "relative",
        zIndex: 100,
        ...(containerStyles as StylesAttr),
      }}
    >
      <Box
        style={{
          marginRight: "2px",
          padding: xs || sm ? "4px 8px" : "10px 18px",
          borderRadius: xs || sm ? 10 : 30,
          backgroundColor: purple[900],
          color: "white",
          position: "relative",
          display: "inline",
          ...getBodyStyles(newStyles as StylesAttr),
        }}
      >
        {field}
      </Box>
      {setValue && setAdded && list && (
        <Box
          className="text-black flex items-center justify-center cursor-pointer"
          style={{
            color: "white",
            backgroundColor: purple[900],
            width: 18,
            height: 18,
            borderRadius: "100%",
          }}
          sx={{
            "&:hover svg": {
              color: deepPurple[50],
            },
          }}
          onClick={(e) => {
            e.stopPropagation();

            setAdded(list.filter((l) => l !== field));
            setValue(
              "languages",
              list.filter((l) => l !== field),
            );
          }}
        >
          <AiFillCloseCircle />
        </Box>
      )}
    </div>
  );
};

export default RawValue;
