import ThemeTypeField from "@youmeet/app/formulaire-profil/formComponents/fields/ThemeTypeField";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import ThemePrefixField from "@youmeet/app/formulaire-profil/formComponents/fields/ThemePrefixField";
import ThemeTextField from "@youmeet/app/formulaire-profil/formComponents/fields/ThemeTextField";
import { useTranslation } from "react-i18next";
import { ConversationTheme } from "./ConversationComponent";
import React from "react";

export default function ConversationThemesComponent({
  themes,
  errors,
  setValue,
}: {
  themes: ConversationTheme[];
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-[6px] w-full">
      {themes?.length > 0 ? (
        themes.map((th, i) => {
          return (
            <div key={th.type + i} className="p-[12px] rounded-[14px]">
              <div className="w-full">
                <div
                  className="w-fit p-[12px] text-[14px] underline cursor-pointer"
                  onClick={() => {
                    const substractedThemes = themes.filter(
                      (th, index) => i !== index
                    );
                    localStorage.setItem(
                      "themes",
                      JSON.stringify(substractedThemes)
                    );
                    setValue("themes", substractedThemes);
                  }}
                >
                  {t("cancel-theme")}
                </div>
              </div>
              <div className="border-l-[1px] border-0 border-dashed border-grey500 py-[6px] px-[12px] flex flex-col gap-[12px] relative">
                <div className="absolute h-full left-[-18px] flex-center w-[12px] text-[14px] font-extralight italic">
                  {i + 1}
                </div>
                <div className="flex gap-[12px] ">
                  <ThemeTypeField
                    errors={errors}
                    setValue={setValue}
                    value={th.type}
                    mandatory
                    i={i}
                  />
                  <ThemePrefixField
                    errors={errors}
                    setValue={setValue}
                    value={th.prefix}
                    i={i}
                  />
                </div>

                <ThemeTextField
                  errors={errors}
                  setValue={setValue}
                  value={th.text}
                  mandatory
                  i={i}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full h-[120px] flex-center bg-grey50 dark:lightDarkBg text-[14px] italic font-extralight">
          {t("no-data")}
        </div>
      )}
    </div>
  );
}
