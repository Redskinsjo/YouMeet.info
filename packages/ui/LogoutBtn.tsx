import { Button } from "@mui/material";
import { forwardRef, Ref } from "react";
import { useTranslation } from "react-i18next";

function LogoutBtn(props: any, ref: Ref<HTMLButtonElement>) {
  const { t } = useTranslation();

  return (
    <Button
      {...props}
      {...ref}
      className="w-full subItem justify-start border-[1px] font-normal border-white border-solid text-deepPurple500 hover:text-deepPurple900 py-[6px] px-[16px] bg-white h-[35px] rounded-[14px] m-[3px] hover:bg-deepPurple50 dark:text-white dark:hover:text-black dark:extraLightDarkBg normal-case"
      type="submit"
    >
      {t("logout")}
    </Button>
  );
}

export default forwardRef(LogoutBtn);
