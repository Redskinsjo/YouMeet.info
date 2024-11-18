import { setName } from "../basics/setName";
import {
  formatForUrl,
  inFormatForUrl,
} from "../resolvers/formatCompetencyTitle";
import uid2 from "uid2";
import prisma from "@youmeet/prisma-config/prisma";

export const setUniqueNameAndExtension = async (
  firstname: string,
  lastname: string,
  forCount: number
) => {
  let uniqueName = setName({ firstname, lastname } as any);
  let extension = "";

  // si le prénom ou le nom est manquant
  if (!firstname.trim() || !lastname.trim()) extension = uid2(6);

  const userWithSameFullname = await prisma.betausers.findMany({
    where: { fullname: uniqueName },
  });

  uniqueName = formatForUrl(uniqueName);
  if (userWithSameFullname && userWithSameFullname.length > forCount) {
    // is not unique
    extension = uid2(6);
    uniqueName = `${uniqueName} ${extension}`;
  }

  return { uniqueName: inFormatForUrl(uniqueName), extension };
};

export const setUniqueSlugAndExtension = async (title: string) => {
  title = formatForUrl(title);

  const extension = uid2(7);
  title = `${title} ${extension}`;

  return { slug: inFormatForUrl(title), extension };
};

export default { setUniqueNameAndExtension, setUniqueSlugAndExtension };
