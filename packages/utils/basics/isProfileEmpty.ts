import { BetaUser } from "@youmeet/gql/generated";

const isProfileEmpty = (profil: BetaUser) => {
  const hidden = (profil.hiddenFields as string[]) || [];
  const isIn = (hidden: string[], name: string) => hidden.includes(name);
  if (
    (isIn(hidden, "firstname") || !profil.firstname) &&
    (isIn(hidden, "lastname") || !profil.lastname) &&
    (isIn(hidden, "email") || !profil.email) &&
    (isIn(hidden, "languages") || !profil.languages) &&
    (isIn(hidden, "linkedin") || !profil.linkedinProfileId) &&
    (isIn(hidden, "phone") ||
      (!profil.details?.phone?.code && !profil.details?.phone?.number)) &&
    (isIn(hidden, "age") || !profil.age)
  ) {
    return true;
  }
  return false;
};

export default isProfileEmpty;
