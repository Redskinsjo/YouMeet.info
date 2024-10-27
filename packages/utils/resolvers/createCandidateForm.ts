import { AvatarInput, CandidateInput } from "@youmeet/gql/generated";
import prisma from "@youmeet/prisma-config/prisma";
import { v2 as cloudinary } from "cloudinary";
import { BackendError } from "../basics/BackendErrorClass";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";

export const createDetails = async (its: CandidateInput) => {
  let details;
  if (its.email || its.phone) {
    details = await prisma.betadetails.findFirst({
      where: {
        OR: [
          {
            email: its.email,
          },
          {
            phone: its.phone,
          },
        ],
      },
    });
  }
  if (!details) {
    details = await prisma.betadetails.create({
      data: { email: its.email, phone: its.phone },
    });
  }
  return details;
};

export const createUser = async (its: CandidateInput) => {
  let user;
  if (its?.fullname) {
    user = await prisma.betausers.findFirst({
      where: { fullname: its.fullname },
    });
  }
  if (!user) {
    user = await prisma.betausers.create({
      data: { age: its.age, description: its.description },
    });
  }
  return user;
};

export const createUpdateCandidate = async (
  prisma: any,
  its: CandidateInput
) => {
  const avatarsPayload = {} as { avatars: { set: AvatarInput[] } };
  if (its.avatars) avatarsPayload.avatars = { set: its.avatars };

  let candidate = await prisma.betacandidates.findUnique({
    where: {
      userId: its.userId as string,
    },
  });

  const previousAvatars = candidate?.avatars;

  if (!candidate) {
    candidate = await prisma.betacandidates.create({
      data: {
        ...avatarsPayload,
        salaryExpected: its.salaryExpected,
        userId: its.userId,
        confirmed: false,
      },
    });
    return candidate;
  }

  candidate = await prisma.betacandidates.update({
    where: { id: candidate.id },
    data: {
      ...avatarsPayload,
      salaryExpected: its.salaryExpected,
      userId: its.userId,
    },
  });

  if (its.avatars?.length === 0) {
    for (let i = 0; i < previousAvatars.length; i++) {
      const avatar = previousAvatars[i];
      const public_id = avatar.public_id;
      const response = await cloudinary.api.delete_resources([public_id], {
        resource_type: "image",
      });

      if (
        response?.deleted[public_id as string] === "deleted" ||
        response?.deleted[public_id as string] === "not_found"
      ) {
        return candidate;
      } else {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      }
    }
  }
  return candidate;
};
