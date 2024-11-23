import { Offer } from "@youmeet/gql/generated";

export const replaceLetters = (str: string) =>
  str
    .replaceAll("é", "e")
    .replaceAll("è", "e")
    .replaceAll("ê", "e")
    .replaceAll("à", "a")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("ï", "i")
    .replaceAll("ô", "o")
    .replaceAll("ö", "o")
    .replaceAll("ù", "u")
    .replaceAll("û", "u")
    .replaceAll("ü", "u")
    .replaceAll("ç", "c");

export default function reduceAppelations(offer: Offer): string[] {
  const intitule = offer.intitule || "";
  const romeLibelle = offer.romeLibelle || "";
  const s1 = replaceLetters(intitule);
  const s2 = replaceLetters(romeLibelle);
  return [s1, s2];
}
