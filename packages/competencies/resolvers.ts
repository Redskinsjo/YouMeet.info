import { QueryOneCompetencyArgs, Resolvers } from "@youmeet/gql/generated";
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
  },
};

export default resolvers;
