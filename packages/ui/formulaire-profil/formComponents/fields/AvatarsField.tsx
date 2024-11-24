import React, { useEffect, useId, useState } from "react";
import Image from "next/image";
import { MdUpload } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { red } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";
import BoldText from "../../../BoldText";
import { useTranslation } from "react-i18next";
import { dev } from "@youmeet/functions/imports";
import { Avatar } from "@youmeet/gql/generated";
import { GenericFieldProps } from "@youmeet/types/form/fields/SelectFieldProps";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";

export default function AvatarsField({
  name,
  type,
  value,
  errors,
  setError,
  clearErrors,
  setValue,
  required,
  dataType = "image",
}: GenericFieldProps & NewFieldProps) {
  const id = useId();
  const [src, setSrc] = useState("");
  const [fieldVal, setFieldVal] = useState<
    File | Partial<Avatar> | undefined
  >();
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (value && value[0]) {
      const file = setFileUrl(value[0]) || "";
      setFieldVal(value);
      if (file) setSrc(file);
    }
  }, [value]);

  return (
    <div
      className="appear_slowly col-span-2 flex-center"
      style={{ display: type === "hidden" ? "none" : "block" }}
    >
      <div className="flex flex-col">
        <div className="flex">
          <div className="relative">
            {!!required && (
              <div className="absolute top-[-3px] right-[-12px] text-purple900 dark:text-white">
                *
              </div>
            )}
            <span className="text-purple900 dark:text-white">
              {name[0].toUpperCase() + name.slice(1)}
            </span>
          </div>
        </div>
        {name === "logo" || dataType === "image" ? (
          <BoldText
            text={`${t("image-max-size-text")}+`}
            fontSizeClass="dark:text-grey700"
            align="justify"
          />
        ) : name === "video" ? (
          <BoldText
            text={`${t("video-max-size-text")}+`}
            fontSizeClass="dark:text-grey700"
            align="justify"
          />
        ) : undefined}
        <div className="flex-center flex-wrap gap-[12px] flex-col">
          <div
            className="border-[1px] border-solid mb-[6px] flex-center dark:border-white border-purple300 border-[1px] bg-white dark:lightDarkBg"
            style={{
              borderColor: errors && errors[name] ? red[600] : "revert-layer",
              position: "relative",
              width: xs ? 120 : "11vw",
              height: xs ? 120 : "11vw",
            }}
          >
            {!!src && (
              <TiDelete
                className="absolute top-[-14px] right-[-14px] text-[28px] cursor-pointer text-deepPurple900 dark:text-grey300"
                onMouseOver={(e) =>
                  (e.target as HTMLElement).setAttribute(
                    "style",
                    "color:#f98282"
                  )
                }
                onMouseOut={(e) =>
                  (e.target as HTMLElement).setAttribute(
                    "style",
                    "color:#a98282"
                  )
                }
                onClick={() => {
                  if (clearErrors) clearErrors();

                  setSrc("");
                  if (setValue) setValue(name, undefined);
                  setFieldVal(undefined);
                }}
              />
            )}
            {!!src && name !== "video" && (
              <div
                className="w-full h-full absolute z-20"
                style={{
                  width: xs ? 120 : "11vw",
                  height: xs ? 120 : "11vw",
                }}
              >
                <Image
                  src={src}
                  alt={"avatar"}
                  width={0}
                  height={0}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}
            {!!src && name === "video" && (
              <div className="italic text-[12px] font-bold text-center w-full box-border overflow-hidden dark:text-white">
                {(fieldVal as Partial<Avatar>)?.original_filename ??
                  (fieldVal as File)?.name}
              </div>
            )}

            {!src && (
              <label htmlFor={String(id)} className="cursor-pointer">
                <MdUpload className="xs:text-[28px] sm:text-[28px] text-[40px] dark:text-grey300" />
              </label>
            )}

            <input
              name={name}
              required={required}
              id={String(id)}
              className="hidden"
              type={"file"}
              onChange={(e) => {
                const files = (e.target as HTMLInputElement).files as FileList;
                if (typeof files[0] === "object") {
                  setSrc(URL.createObjectURL(files[0]));
                  if (name === "video") {
                    if (files[0].size >= 100000000)
                      if (setError)
                        setError(name, {
                          message: "La taille de la vidéo est trop élevée.",
                        });
                    setFieldVal(files[0]);
                  }
                  if (setValue) setValue(name, files[0]);
                }
              }}
              accept={
                name === "logo" || name === "avatars"
                  ? ".png,.jpg,.jpeg,.webp"
                  : ".mov,.mp4,.webm"
              }
            />
          </div>
        </div>
        {!!errors && !!errors[name] && type !== "hidden" && (
          <div className="w-full my-[6px] text-red600 text-[15px]">
            {errors[name]?.message as string}
          </div>
        )}
      </div>
    </div>
  );
}
