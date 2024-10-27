import { BaseSyntheticEvent, Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const handlePasswordEntry = (
  value: string,
  storedValue: string,
  setValue: UseFormSetValue<FieldValues>,
  setDisplayedPassword: Dispatch<SetStateAction<string>>,
  e: (BaseSyntheticEvent & { nativeEvent: { inputType: string } }) | InputEvent,
  fieldName: string,
) => {
  if (value.length > storedValue.length) {
    const val = storedValue + Array.from(value).pop();
    setValue(fieldName, val);
  } else {
    if (value.length === 1) setValue(fieldName, value);
    else {
      const val = storedValue.slice(0, value.length);
      setValue(fieldName, val);
    }
  }

  if (value) {
    const displayedValue =
      Array.from(value.slice(0, -1))
        .map(() => "*")
        .join("") + value[value.length - 1];
    setDisplayedPassword(displayedValue);
  } else {
    setDisplayedPassword("");
  }
};

export default handlePasswordEntry;
