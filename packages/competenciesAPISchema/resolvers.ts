import {
  QueryCompetenciesArgs,
  QueryOneCompetencyArgs,
} from "@youmeet/competencies/generated";
import prisma from "@youmeet/prisma-config/prisma";
import { Prisma } from "@prisma/client";
import { getWhereTitle } from "@youmeet/utils/resolvers/competenciesApi";

const resolvers = {
  Query: {
    oneCompetency: async (_: unknown, args: QueryOneCompetencyArgs) => {
      const where = {} as Prisma.competenciesWhereInput;

      if (!args.data || typeof args.data.title !== "string") return null;
      where.OR = getWhereTitle(args.data.title as string);

      const competency = await prisma.competencies.findFirst({
        where,
      });
      if (!competency)
        return await prisma.competencies.findFirst({
          where: {
            title: { mode: "insensitive", contains: args.data.title as string },
          },
        });
      return competency;
    },
    competencies: async (_: unknown, args: QueryCompetenciesArgs) => {
      const where = {} as Prisma.competenciesWhereInput;
      const params = {} as { take?: number; skip?: number };

      if (!args.data) return null;
      if (!args.data.title || typeof args.data.title !== "string") return null;
      if (args.data.title) where.OR = getWhereTitle(args.data.title as string);
      if (args.params?.skip !== undefined)
        params.skip = args.params.skip as number;
      if (args.params?.take !== undefined)
        params.take = args.params.take as number;

      const competencies = await prisma.competencies.findMany({
        where,
        ...params,
      });
      if (!competencies)
        return await prisma.competencies.findFirst({
          where: {
            title: { mode: "insensitive", contains: args.data.title as string },
          },
        });
      return competencies;
    },
  },
};

export default resolvers;
