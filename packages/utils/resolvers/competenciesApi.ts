import { Prisma } from "@prisma/client";

export const getWhereTitle = (
  title: string
): Prisma.competenciesWhereInput[] => {
  const OR: Prisma.competenciesWhereInput[] = [];
  if (title) {
    const lower = title.toLowerCase();
    OR.push({ title: { mode: "insensitive", contains: title } });
    OR.push({ appelations: { has: title } });
    OR.push({ appelations: { has: lower } });
  }
  return OR;
};
