import { Dispatch, SetStateAction } from "react";

export type HiddenFieldsTypes = { [key in 1 | 2 | 3]: string[] };

export type FormContextTypes = {
  hiddenFields: HiddenFieldsTypes;
  setHiddenFields: Dispatch<SetStateAction<HiddenFieldsTypes>>;
  handleHiddenFields: {
    stockBrowserHiddenFields: (field: string) => {};
    unstockBrowserHiddenFields: (field: string, step: 1 | 2 | 3) => {};
  };
  validateExperience: false | string[];
  setValidateExperience: Dispatch<SetStateAction<false | string[]>>;
};
