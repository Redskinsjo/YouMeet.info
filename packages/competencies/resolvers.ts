import {
  QueryCompetenciesArgs,
  QueryOneCompetencyArgs,
  Resolvers,
} from "./types/generated";
import prisma from "@youmeet/prisma-config/prisma";
import { Prisma } from "@prisma/client";

const resolvers: Resolvers = {
  Query: {
    oneCompetency: async (_: unknown, args: QueryOneCompetencyArgs) => {
      const where = {} as Prisma.competenciesWhereInput;

      if (args.slug) where.slug = args.slug;
      if (args.id) where.id = args.id;
      if (args.title) {
        where.OR = [
          { title: { mode: "insensitive", equals: args.title } },
          { appelations: { hasSome: [args.title.toLowerCase()] } },
        ];
      }

      const competency = await prisma.competencies.findFirst({
        where,
      });
      return competency;
    },
    competencies: async (_: unknown, args: QueryCompetenciesArgs) => {
      const where = {} as Prisma.competenciesWhereInput;
      const params = {} as { take?: number; skip?: number };
      if (!args.data) return null;
      if (args.data.title)
        where.OR = [
          { keywords: { hasSome: [args.data.title.toLowerCase()] } },
          { title: { mode: "insensitive", equals: args.data.title } },
        ];
      if (args.data.id) where.id = args.data.id;
      if (args.params?.skip !== undefined)
        params.skip = args.params.skip as number;
      if (args.params?.take !== undefined)
        params.take = args.params.take as number;

      console.log("where", where);
      return await prisma.competencies.findMany({ where, ...params });
    },
  },
};

export default resolvers;
