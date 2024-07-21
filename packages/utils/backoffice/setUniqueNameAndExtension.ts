import BetaUser from "@youmeet/models/betaUsers";
import { setName } from "../setName";
import {
  formatForUrl,
  inFormatForUrl,
} from "../resolvers/formatGptCompetencyTitle";
import uid2 from "uid2";

const setUniqueNameAndExtension = async (
  firstname: string,
  lastname: string,
  forCount: number
) => {
  let uniqueName = setName({ firstname, lastname } as any);
  let extension = "";

  // si le prénom ou le nom est manquant
  if (!firstname.trim() || !lastname.trim()) extension = uid2(6);

  const userWithSameFullname = await BetaUser.find({
    fullname: uniqueName,
  });

  uniqueName = formatForUrl(uniqueName);
  if (userWithSameFullname && userWithSameFullname.length > forCount) {
    // is not unique
    extension = uid2(6);
    uniqueName = `${uniqueName} ${extension}`;
  }

  return { uniqueName: inFormatForUrl(uniqueName), extension };
};

export const setUniqueSlugAndExtension = (
  title: string,
  forCount: number,
  type: "offers" | "articles" | "competencies",
  list: any[]
) => {
  let extension = "";

  // si le prénom ou le nom est manquant
  if (!title.trim()) extension = uid2(6);

  let found = [];
  if (type === "offers") {
    found = list.filter(
      (offer) => offer.job.title.fr.toLowerCase() === title.toLowerCase()
    );
  } else if (type === "articles") {
    found = list.filter(
      (offer) => offer.title.fr.toLowerCase() === title.toLowerCase()
    );
  } else if (type === "competencies") {
    found = list.filter(
      (offer) => offer.title.toLowerCase() === title.toLowerCase()
    );
  }
  title = formatForUrl(title);
  if (found.length > forCount) {
    // is not unique
    extension = uid2(6);
    title = `${title} ${extension}`;
  }

  return { slug: inFormatForUrl(title), extension };
};

export default setUniqueNameAndExtension;
