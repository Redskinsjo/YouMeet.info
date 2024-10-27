import { PhoneInput } from "@youmeet/gql/generated";

export const formatSavedPhone = (phone: PhoneInput, setError: any) => {
  const number = phone.number as string;

  for (let i = 0; i < number.length; i++) {
    if (Number.isNaN(Number(number[i]))) {
      setError("phone", { message: "Les chiffres sont acceptés seulement" });
      return undefined;
    }
  }

  if (number.length !== 10) {
    setError("phone", { message: "Le numéro doit contenir 10 chiffres" });
    return undefined;
  }

  // if (number[0] !== "0") {
  //   setError("phone", { message: "Format accepté: 06******19 " });
  //   return undefined;
  // }

  // if (number[1] !== "6" && number[1] !== "7") {
  //   setError("phone", { message: "Le numéro doit être un numéro de portable" });
  //   return undefined;
  // }

  return phone;
};

export const getUniversalFromCodeAndNumber = (code: string, number: string) =>
  code && number ? code.slice(1) + number.slice(1) : "";

export const getProfilePhone = (code: string, number: string) => {
  if (code && number) {
    const numberWithParenthesis =
      number[0] === "0" ? number.replace("0", "(0)") : number;
    return `${code}${numberWithParenthesis}`;
  }
  return "";
};

const mapping = {
  33: [6, 7],
};

export const getCodeAndNumberFromUniversal = (number: string) => {
  for (let key in mapping) {
    const len = key.length;
    const sliced = number.slice(0, len);
    if (sliced === key && (mapping as any)[key].includes(number[len])) {
      return {
        code: "+" + key,
        number: "0" + number.slice(len),
      };
    }
  }
};
