import { BetaDetails, BetaUser } from "@youmeet/gql/generated";
import { Prisma, PrismaClient } from "@prisma/client";

export const createDetailsResolver = async (
  payload: Prisma.betadetailsCreateInput,
  prisma: PrismaClient,
): Promise<BetaDetails> => {
  let details;
  if (payload.user?.connect?.id) {
    details = await prisma.betadetails.findUnique({
      where: {
        userId: payload.user.connect.id,
      },
    });
  }
  if (!details) {
    details = await prisma.betadetails.create({
      data: payload,
    });
  }
  return details;
};

export const createUserResolver = async (
  payload: Prisma.betausersCreateInput,
  prisma: PrismaClient,
): Promise<BetaUser> => {
  let user;
  if (payload.email) {
    user = await prisma.betausers.findUnique({
      where: { email: payload.email },
    });
  }
  if (!user) {
    user = await prisma.betausers.create({
      data: payload,
    });
  }
  return user;
};
