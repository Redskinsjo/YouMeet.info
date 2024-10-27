import {
  BetaCompany,
  BetaUser,
  MeetCandidate,
  MeetRecruiter,
} from "@youmeet/gql/generated";
import { Subscription } from "@youmeet/types/app";

export const setName = (
  d: BetaUser | BetaCompany | MeetCandidate | MeetRecruiter | undefined | null,
) => {
  if ((d as BetaUser)?.fullname) return (d as BetaUser).fullname as string;
  if (d && "firstname" in d) {
    if (d.firstname && d.lastname) return `${d.firstname} ${d.lastname}`;
    else if (d.firstname && !d.lastname) return `${d.firstname}`;
    else if (!d.firstname && d.lastname) return `${d.lastname}`;
  } else if (d && "name" in d) {
    return `${d.name}`;
  }
  return "";
};

export const setHiddenName = (d: BetaUser | BetaCompany | undefined | null) => {
  if (d && "fullname" in d) {
    if (d.firstname && d.lastname)
      return `${d.firstname} ${d.lastname[0].toUpperCase()}.`;
    else if (d.fullname && d.fullname.split(" ")[1]) {
      return `${d.fullname.split(" ")[0]} ${d.fullname
        .split(" ")[1][0]
        .toUpperCase()}.`;
    } else if (d.firstname) return `${d.firstname}`;
  } else if (d && "name" in d) {
    return `${d.name}`;
  }
  return "";
};

export const getName = (
  d: BetaUser | undefined | null,
  isSubscribed: Subscription | boolean | undefined,
) => {
  return d?.hiddenFields?.includes("firstname") &&
    d?.hiddenFields?.includes("lastname")
    ? ""
    : d?.hiddenFields?.includes("firstname") &&
        !d?.hiddenFields?.includes("lastname")
      ? d.lastname
      : !d?.hiddenFields?.includes("firstname") &&
          d?.hiddenFields?.includes("lastname")
        ? d.firstname
        : isSubscribed
          ? setName(d)
          : setHiddenName(d);
};

export const getFirstname = (name: string) => name.split(" ")[0];
export const getLastname = (name: string) => name.split(" ")[1];
