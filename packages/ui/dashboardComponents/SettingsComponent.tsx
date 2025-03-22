import { Button } from "@mui/material";
import DetailComponent from "../DetailComponent";
import { useTranslation } from "react-i18next";

export default function SettingsComponent() {
  const { t } = useTranslation();

  return (
    <form action={"/api/auth/deleteAccount"}>
      <DetailComponent
        label="delete-account"
        conversation
        noLabelColon
        value={
          <Button className="buttonMui" type="submit">
            {t("delete")}
          </Button>
        }
      />
    </form>
  );
}
