import {
  QueryCompetenciesArgs,
  QueryOneCompetencyArgs,
  Resolvers,
} from "./types/generated";
import { ContextRequest } from "@youmeet/types/ContextRequest";
import { noCorsMiddleware } from "@youmeet/utils/resolvers/noCorsMiddleware";
import prisma from "@youmeet/prisma-config/prisma";
import { Prisma } from "@prisma/client";

const resolvers: Resolvers = {
  Query: {
    oneCompetency: async (
      _: unknown,
      args: QueryOneCompetencyArgs,
      context: ContextRequest
    ) => {
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
    competencies: async (
      _: unknown,
      args: QueryCompetenciesArgs,
      context: ContextRequest
    ) => {
      const where = {} as { id: { in: string[] } };
      const params = {} as { take?: number; skip?: number };
      if (args.data?.in) where.id = { in: (args.data.in as string[]) || [] };
      if (args.params?.skip !== undefined)
        params.skip = args.params.skip as number;
      if (args.params?.take !== undefined)
        params.take = args.params.take as number;
      return await prisma.competencies.findMany({ where, ...params });
    },
  },
};

export default resolvers;
