import prisma from "@youmeet/prisma-config/prisma";

import {
  MutationCreateCandidateArgs,
  Resolvers,
  CandidateInput,
  QueryUserArgs,
  QueryOneExperienceArgs,
  BetaUser,
  BetaExperience,
  BetaExperienceReferencesArgs,
  BetaCandidate,
  BetaProfile,
  QueryUsersArgs,
  BetaDetails,
  QueryAccountCandidateArgs,
  QueryAccountDetailsArgs,
  QueryAccountProfileArgs,
  QueryAccountUserArgs,
  QueryProfilesArgs,
  QueryOneDetailsArgs,
  MutationUpdateDetailsArgs,
  QueryOneUserExperiencesArgs,
  MutationCreateDetailsArgs,
  MutationCreateAccountArgs,
  QueryOwnQueuesArgs,
  BetaQueue,
  MutationDeleteQueueArgs,
  PhoneInput,
  QueryOneQueueArgs,
  QueryOneCandidateArgs,
  MutationCreateLeadArgs,
  QueryOneLeadArgs,
  BetaWhatsappThread,
  MutationUpdateUserArgs,
  MutationDeleteLeadArgs,
  MutationDeleteUserArgs,
  MutationUpdateQueueArgs,
  QueryOneCustomisationArgs,
  QuerySendEmailToLeadArgs,
  QueryJobsArgs,
  Job,
  Customisation,
  QueryOneJobArgs,
  QueryQuestionsArgs,
  QueryOneCompanyArgs,
  BetaCompany,
  QueryCompaniesArgs,
  MutationCreateCompanyArgs,
  QueryResetEmailLinkArgs,
  QueryResetPasswordArgs,
  MutationDeleteCompetencyArgs,
  QueryOneCompetencyArgs,
  MutationCreateOfferArgs,
  QueryOneOfferArgs,
  MutationDeleteOfferArgs,
  QueryOneFavoriteArgs,
  QueryMyFavoritesArgs,
  MutationCreateFavoriteArgs,
  Favorite,
  VerificationRequest,
  MutationCreateInterviewOfferArgs,
  QueryOneInterviewOfferArgs,
  QueryMyInterviewOffersArgs,
  InterviewOffer,
  QueryMyReferencesArgs,
  MutationCreateReferenceArgs,
  QueryMyNotificationsArgs,
  MutationCreateNotificationArgs,
  MutationUpdateAllMyNotificationsArgs,
  MutationUpdateOneNotificationArgs,
  QueryMyReferenceContactsArgs,
  MutationCreateReferenceContactArgs,
  Phone,
  MutationUpdateExperienceArgs,
  Reference,
  MutationUpdateCompanyArgs,
  MutationCreateCompanyProfileArgs,
  AvatarInput,
  QueryCompanyOffersArgs,
  QueryOneProfileSharingArgs,
  QueryMyCompanyProfileSharingsArgs,
  MutationCreateProfileSharingArgs,
  ProfileSharing,
  QueryMyPublishedOffersArgs,
  Offer,
  MutationUpdateFormResponseArgs,
  QueryLeadFormResponsesArgs,
  MutationCreateFormQuestionArgs,
  QueryOneFormResponseArgs,
  QueryOneTopSectorArgs,
  MutationDeleteInterviewOfferArgs,
  MutationDeleteProfileSharingArgs,
  QueryTopSectorsArgs,
  QueryOffersArgs,
  QueryCompetenciesArgs,
  ReferenceContact,
  QuerySendEmailProspectionLinkedinArgs,
  MutationCreateExperienceArgs,
  MutationUpdateCandidateArgs,
  QueryOneVideoArgs,
  DeleteVideoMutationVariables,
  Video,
  QueryOneArticleArgs,
  UpdateLeadMutationVariables,
  CreateUserRemarkMutationVariables,
  MutationCreateCandidateBasicArgs,
  QueryAccountInfosArgs,
  QueryOneUserInterviewsArgs,
  MutationUpdateVideoArgs,
  MutationCreateFeedbackArgs,
  QueryUniqueCompetencyArgs,
  QueryOneNotificationArgs,
  MutationCreateProAccountArgs,
  MutationDeleteCompanyArgs,
  MutationCreateUserArgs,
  Lead,
  MutationCreateClassicAccountArgs,
  BetaWhatsappExchange,
  MutationCreateErrorArgs,
  Notification,
  QueryProfileViewsArgs,
  MutationCreateProfileViewArgs,
  QueryMyVideosArgs,
  QuerySendEmailOfferOpportunitiesArgs,
  Translated,
  MeetCandidate,
  MutationCreateMeetArgs,
  QueryOneMeetCandidateArgs,
  MutationDeleteMeetArgs,
  QuerySendEmailArgs,
  Meet,
  BetaWhatsappResponse,
  MutationDeleteWhatsappThreadArgs,
  MutationSubmitVideoArgs,
  MutationCreateThreadArgs,
  MutationCreateResponsesArgs,
  UserRemark,
  MutationCreateAffiliationArgs,
  QueryAffiliationArgs,
  QueryVideoByPublicIdArgs,
  FormResponse,
  WorkLocationFtInput,
  QuerySharingsArgs,
} from "@youmeet/gql/generated";
import { v2 as cloudinary } from "cloudinary";
import { fromFullname, split } from "@youmeet/utils/resolvers/resolveFullname";
import { createUpdateCandidate } from "@youmeet/utils/resolvers/createCandidateForm";
import { getExperienceDuration } from "@youmeet/utils/resolvers/getExperienceDuration";
import { s } from "@youmeet/utils/basics/jwt";
import * as SendinBlue from "@getbrevo/brevo";
import CryptoJS from "crypto-js";
import { setUniqueNameAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";
import { uri, uriPro } from "@youmeet/functions/imports";
import { faker } from "@faker-js/faker";
import { AuthDetails } from "@youmeet/models/types";
import { formatForUrl } from "@youmeet/utils/resolvers/formatCompetencyTitle";
import { setName } from "@youmeet/utils/basics/setName";
import { Prisma } from "@prisma/client";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import { getCompanyName } from "@youmeet/utils/basics/formatForEmails";
import { ContextRequest } from "@youmeet/types/ContextRequest";
import { noCorsMiddleware } from "@youmeet/utils/resolvers/noCorsMiddleware";
import {
  setCandidatePayload,
  setDetailPayload,
  setUserPayload,
} from "@youmeet/utils/basics/setPayload";
import { replaceLetters } from "@youmeet/utils/resolvers/reduceAppelations";

export const apiInstance = new SendinBlue.TransactionalEmailsApi();

apiInstance.setApiKey(
  SendinBlue.TransactionalEmailsApiApiKeys.apiKey,
  `${process.env.SENDINBLUE_APIKEY}`
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const resolvers: Resolvers = {
  Query: {
    sendEmail: async (
      _: unknown,
      args: QuerySendEmailArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;

      const res = await apiInstance.sendTransacEmail({
        to: [
          {
            email: data?.email as string,
            name: data?.name as string,
          },
        ],
        params: {
          name: data?.name,
          token: data?.token,
          link: data?.link,
        },
        templateId: data?.templateId as number,
      });
      if (res.response.statusCode === 201) {
        return { success: true, data: true };
      }
      return { error: true };
    },
    oneMeetCandidate: async (
      _: unknown,
      args: QueryOneMeetCandidateArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;

      if (args.id) {
        return await prisma.meetcandidates.findUnique({
          where: { id: args.id as string },
        });
      }
      return null;
    },
    meetCandidates: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.meetcandidates.findMany();
    },
    meets: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.meets.findMany({
        include: { meetCandidate: true, meetRecruiter: true },
      });
    },
    sendEmailOfferOpportunities: async (
      _: unknown,
      args: QuerySendEmailOfferOpportunitiesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const usersIds = args.usersIds;
      if (usersIds) {
        let list = [];
        for (let i = 0; i < usersIds.length; i++) {
          const userId = usersIds[i];

          if (userId && typeof userId === "string") {
            const result = await prisma.$transaction(async (prisma) => {
              const user = await prisma.betausers.findUnique({
                where: { id: userId as string },
              });
              if (user) {
                const candidate = await prisma.betacandidates.findUnique({
                  where: { userId: user.id as string },
                  include: { targetJob: { include: { topSector: true } } },
                });

                const jobId = candidate?.targetJobId;
                const contractType = candidate?.targetContractType;
                const topSectorId = candidate?.targetJob?.topSectorId;

                const offers = (await prisma.offers.findMany({
                  include: {
                    job: { include: { topSector: true } },
                    company: true,
                    sector: true,
                  },
                })) as Offer[];
                let filters = false;
                if (jobId) filters = true;
                if (contractType) filters = true;

                const firstOffers = offers
                  .sort((offerA, offerB) => {
                    if (filters) {
                      if (jobId) {
                        if (jobId === offerA.jobId) return -1;
                        if (topSectorId === offerA.job?.topSectorId) return -1;
                        return 0;
                      } else if (contractType) {
                        if (contractType === offerA.contractType) return -1;
                        return 0;
                      }
                    }
                    return 0;
                  })
                  .slice(0, 3);
                return { user, firstOffers };
              }
              return null;
            });
            if (!!result) {
              const offer1 = result.firstOffers[0];
              const offer2 = result.firstOffers[1];
              const offer3 = result.firstOffers[2];

              const getSlug = (offer: Offer) => `${uri}/offres/${offer.slug}`;
              const getTitle = (o: Offer) => (o.job?.title as Translated)["fr"];
              const getContractType = (o: Offer) =>
                o.contractType || "à vérifier";
              const getLocation = (o: Offer) => o.location || "à vérifier";

              const offersParams = {} as { [key: string]: string };
              if (offer1 && getTitle(offer1)) {
                offersParams.link1 = getSlug(offer1);
                offersParams.title1 = getTitle(offer1) as string;
                offersParams.contractType1 = getContractType(offer1);
                offersParams.companyName1 = getCompanyName(offer1);
                offersParams.location1 = getLocation(offer1);
              }
              if (offer2 && getTitle(offer2)) {
                offersParams.link2 = getSlug(offer2);
                offersParams.title2 = getTitle(offer2) as string;
                offersParams.contractType2 = getContractType(offer2);
                offersParams.companyName2 = getCompanyName(offer2);
                offersParams.location2 = getLocation(offer2);
              }
              if (offer3 && getTitle(offer3)) {
                offersParams.link3 = getSlug(offer3);
                offersParams.title3 = getTitle(offer3) as string;
                offersParams.contractType3 = getContractType(offer3);
                offersParams.companyName3 = getCompanyName(offer3);
                offersParams.location3 = getLocation(offer3);
              }

              const res = await apiInstance.sendTransacEmail({
                to: [
                  {
                    email: result.user?.email as string,
                    name: setName(result.user) as string,
                  },
                ],
                params: {
                  name: setName(result.user) as string,
                  ...offersParams,
                },
                templateId: 28,
              });
              if (res.response.statusCode === 201) {
                list.push(result.user);
              }
            }
          }
        }

        return list;
      }
      return [];
    },
    videos: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.videos.findMany({
        include: { job: true, user: true },
      });
    },
    myVideos: async (
      _: unknown,
      args: QueryMyVideosArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const userId = args.userId;
      if (userId) {
        const videos = await prisma.videos.findMany({ where: { userId } });
        return videos;
      }
      return [];
    },
    profileViews: async (
      _: unknown,
      args: QueryProfileViewsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const userId = args.userId;
      if (userId) {
        const views = await prisma.profileviews.findMany({ where: { userId } });
      }
      return [];
    },
    errors: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.errors.findMany();
    },
    oneUserInterviews: async (
      _: unknown,
      args: QueryOneUserInterviewsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const userId = args.userId;
      if (!userId) return null;
      return await prisma.interviewOffer.findMany({
        where: { targetId: userId },
        include: { origin: true, target: true },
      });
    },
    accountInfos: async (
      _: unknown,
      args: QueryAccountInfosArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const userId = args.userId;
      if (!userId) return null;
      return await prisma.betausers.findUnique({
        where: { id: userId as string },
        include: {
          company: true,
          candidate: true,
          details: true,
          videos: true,
          experiences: true,
          unvolonteerInterviewOffer: true,
        },
      });
    },
    articles: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.articles.findMany();
    },
    oneArticle: async (
      _: unknown,
      args: QueryOneArticleArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.id || args.slug) {
        const where = {} as { id: string; slug: string };
        if (args.id) where.id = args.id;
        if (args.slug) where.slug = args.slug;
        return await prisma.articles.findUnique({
          where,
        });
      }
      return null;
    },
    oneVideo: async (
      _: unknown,
      args: QueryOneVideoArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.id) {
        return await prisma.videos.findUnique({
          where: { id: args.id as string },
        });
      }
      return null;
    },

    sendEmailProspectionLinkedin: async (
      _: unknown,
      args: QuerySendEmailProspectionLinkedinArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const transaction = await prisma.$transaction(
        async (prisma) => {
          const leads: Lead[] = [];
          if (args.leadsIds) {
            for (let i = 0; i < args.leadsIds.length; i++) {
              const id = args.leadsIds[i];
              if (id) {
                const lead = await prisma.leads.findUnique({
                  where: { id },
                });
                if (lead) {
                  if (!lead.prospected) {
                    const res = await apiInstance.sendTransacEmail({
                      to: [
                        {
                          email: lead?.email as string,
                          name: lead?.name as string,
                        },
                      ],
                      params: {
                        name: lead?.name,
                      },
                      templateId: lead.type.includes("recruiter") ? 22 : 23,
                    });
                    if (res.response.statusCode === 201) {
                      await prisma.leads.update({
                        where: { id: lead?.id as string },
                        data: { prospected: true },
                      });
                      leads.push(lead);
                      continue;
                    }
                  }
                }
              }
            }
          }
          return leads;
        },
        { timeout: 15000 }
      );
      if (transaction) return transaction;
      return null;
    },
    oneTopSector: async (
      _: unknown,
      args: QueryOneTopSectorArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.id) {
        const sector = await prisma.topsectors.findUnique({
          where: { id: args.id as string },
        });
        return sector;
      }
      return null;
    },
    oneFormResponse: async (
      _: unknown,
      args: QueryOneFormResponseArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const formResponse = await prisma.formResponses.findFirst({
        where: {
          leadId: args.leadId as string,
          questionId: args.questionId as string,
        },
      });
      return formResponse;
    },
    leadFormResponses: async (
      _: unknown,
      args: QueryLeadFormResponsesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const where = {} as { leadId?: string };
      if (args.leadId) where.leadId = args.leadId;
      const responses = await prisma.formResponses.findMany({
        where,
        include: { question: true },
      });
      return responses;
    },
    formQuestions: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.formQuestions.findMany();
    },
    myPublishedOffers: async (
      _: unknown,
      args: QueryMyPublishedOffersArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const offers = await prisma.offers.findMany({
        where: { companyId: args.data?.companyId as string },
      });
      return offers;
    },
    oneProfileSharing: async (
      _: unknown,
      args: QueryOneProfileSharingArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as Prisma.profileSharingsWhereInput;
      const d = args.data;
      if (d?.id) where.id = d?.id;
      if (d?.originId) where.originId = d?.originId;
      if (d?.targetId) where.targetId = d?.targetId;
      if (d?.offerTargetId) where.offerTargetId = d?.offerTargetId;
      const sharing = await prisma.profileSharings.findFirst({
        where,
        include: { target: true, origin: true, offerTarget: true, video: true },
      });
      return sharing;
    },
    myCompanyProfileSharings: async (
      _: unknown,
      args: QueryMyCompanyProfileSharingsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      if (args.targetId) {
        const mySharings = await prisma.profileSharings.findMany({
          where: { targetId: args.targetId as string },
          include: {
            origin: true,
            target: true,
          },
        });
        return mySharings;
      }
      return null;
    },
    companyOffers: async (
      _: unknown,
      args: QueryCompanyOffersArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const offers = await prisma.offers.findMany({
        where: { companyId: args.companyId as string },
      });

      return offers;
    },
    myReferenceContacts: async (
      _: unknown,
      args: QueryMyReferenceContactsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.referenceContacts.findMany({
        where: {
          userId: args.userId as string,
          experienceId: args.experienceId as string,
        },
      });
    },
    myNotifications: async (
      _: unknown,
      args: QueryMyNotificationsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const now = new Date().getTime();
      const tenDaysBefore = now - 1000 * 3600 * 24 * 10;
      const tenDaysBeforeDate = new Date(tenDaysBefore);
      const where = {} as {
        targetId: string;
        type?: { in: string[] };
        status?: string;
        createdAt?: { lte?: Date; gte?: Date };
      };

      if (!args.targetId) return null;

      if (args.targetId) where.targetId = args.targetId;

      if (args.status) where.status = args.status;
      if (args.type && args.type.length > 0)
        where.type = { in: args.type as string[] };
      where.createdAt = { gte: tenDaysBeforeDate };

      return await prisma.notifications.findMany({
        where,
        include: {
          origin: { include: { company: true } },
          target: true,
          feedback: true,
        },
      });
    },
    myReferences: async (
      _: unknown,
      args: QueryMyReferencesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.references.findMany({
        where: { userId: args.userId as string },
        include: {
          experience: {
            include: {
              company: true,
              job: true,
            },
          },
        },
      });
    },
    oneInterviewOffer: async (
      _: unknown,
      args: QueryOneInterviewOfferArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as {
        id?: string;
        status?: string;
      };
      if (args.id) where.id = args.id;
      if (args.status) where.status = args.status;
      return await prisma.interviewOffer.findFirst({
        where,
        include: { origin: true, target: true },
      });
    },
    myInterviewOffers: async (
      _: unknown,
      args: QueryMyInterviewOffersArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const where = {} as {
        originId?: string;
        targetId?: string;
        status?: string;
      };
      if (!args.targetId) return null;
      if (args.originId) where.originId = args.originId;
      if (args.targetId) where.targetId = args.targetId;
      if (args.status) where.status = args.status;

      return await prisma.interviewOffer.findMany({
        where,
        include: { origin: true, target: true },
      });
    },

    oneFavorite: async (
      _: unknown,
      args: QueryOneFavoriteArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { id?: string; targetId?: string; originId?: string };
      if (args.id) where.id = args.id;
      if (args.originId) where.originId = args.originId;
      if (args.targetId) where.targetId = args.targetId;
      return await prisma.favorites.findFirst({
        where,
        include: {
          origin: true,
          target: true,
        },
      });
    },
    videoByPublicId: async (
      _: unknown,
      args: QueryVideoByPublicIdArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const publicId = args.publicId;
      if (publicId) {
        const video = await prisma.videos.findFirst({
          where: { file: { is: { public_id: publicId } } },
        });
        return video;
      }
      return null;
    },
    myFavorites: async (
      _: unknown,
      args: QueryMyFavoritesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const whereOr = [] as Prisma.favoritesWhereInput[];
      const where = {} as Prisma.favoritesWhereInput;
      if (!args.data?.originId) return null;
      if (args.first?.search) {
        where.target = {
          fullname: {
            contains: args.first?.search as string,
            mode: "insensitive",
          },
        };
      }
      let take = {} as { take?: number };
      if (args.first?.take) take = { take: args.first.take };
      let skip = {} as { skip?: number };
      if (args.first?.skip) skip = { skip: args.first.skip };

      if (args.data?.isVideo !== undefined)
        where.target = { videos: { none: undefined } };
      if (args.data?.isLogo !== undefined)
        where.target = {
          candidate: { avatars: { isEmpty: !args.data.isLogo } },
        };
      if (args.data?.jobs && args.data.jobs.length > 0)
        where.target = {
          experiences: {
            some: { job: { id: { in: args.data.jobs as string[] } } },
          },
        };
      if (args.data?.sectors && args.data.sectors.length > 0) {
        whereOr.push({
          target: {
            candidate: { targetJobId: { in: args.data.sectors as string[] } },
          },
        });
        whereOr.push({
          target: {
            experiences: {
              some: {
                job: { topSectorId: { in: args.data.sectors as string[] } },
              },
            },
          },
        });
      }
      where.originId = args.data?.originId;

      where.OR = whereOr;
      return await prisma.favorites.findMany({
        where,
        ...take,
        ...skip,
        include: {
          origin: true,
          target: {
            include: {
              experiences: { include: { company: true, job: true } },
            },
          },
        },
      });
    },
    offers: async (
      _: unknown,
      args: QueryOffersArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      let where = {} as Prisma.offersWhereInput;

      const data = args.data;
      const prms = args.params;

      if (data?.lieuTravail) {
        const l = data.lieuTravail;
        const f = (value: any, type: "contains" | "startsWith" = "contains") =>
          ({
            [type]: value,
            mode: "insensitive",
          } as any);
        let is = {} as Prisma.WorkLocationFTWhereInput;

        const getOr = (l: WorkLocationFtInput, codePostal: string) => {
          let is = {} as Prisma.WorkLocationFTWhereInput;
          if (l.codePostal) is.codePostal = f(codePostal, "startsWith");
          if (l.commune) is.commune = f(l.commune);
          if (l.libelle) is.libelle = f(l.libelle);
          return is;
        };
        if (l.codePostal) {
          const ors = [] as Prisma.WorkLocationFTWhereInput[];
          for (let i = 0; i < l.codePostal.length; i++) {
            const codePostal = l.codePostal[i];
            ors.push(getOr(l, codePostal || ""));
          }
          where.lieuTravail = { is: { OR: ors } };
        }
      }

      if (data?.jobs && data.jobs.length > 0)
        where.jobId = { in: data.jobs as string[] };
      if (data?.sectors && data.sectors.length > 0)
        where.sectorId = { in: data.sectors as string[] };

      if (prms?.search || (data?.language && data.title)) {
        where.OR = [];
      }

      const search = prms?.search;

      if (search) {
        const s = replaceLetters(search);
        const mode = "insensitive";
        where.OR?.push({ intitule: { contains: search, mode } });
        where.OR?.push({
          intituleReduced: { contains: s, mode },
        });
        where.OR?.push({
          romeLibelle: { contains: search, mode },
        });
        where.OR?.push({
          romeLibelleReduced: { contains: s, mode },
        });
      }

      if (data?.targetSectorId) {
        where.sectorId = { in: [data.targetSectorId] };
      }
      let take = {} as { take?: number };
      if (prms?.take) take = { take: prms.take };
      let skip = {} as { skip?: number };
      if (prms?.skip) skip = { skip: prms.skip };

      const finalWhere = { where: {} };
      if (Object.keys(where).length > 0) finalWhere.where = where;

      return await prisma.offers.findMany({
        ...finalWhere,
        ...skip,
        ...take,
        select: {
          id: true,
          slug: true,
          contractType: true,
          intitule: true,
          job: true,
          typeContratLibelle: true,
          qualificationLibelle: true,
          companyName: true,
          entreprise: true,
          location: true,
          lieuTravail: true,
          company: true,
          outilsBureautiques: true,
          dureeTravailLibelleConverti: true,
          nombrePostes: true,
          experienceLibelle: true,
          permis: true,
        },
      });
    },
    remarks: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.userRemarks.findMany({ include: { user: true } });
    },
    oneOffer: async (
      _: unknown,
      args: QueryOneOfferArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as {
        id: string;
        slug: string;
      };

      if (args.slug) where.slug = args.slug;
      if (args.id) where.id = args.id;

      if (args.id || args.slug) {
        return await prisma.offers.findUnique({
          where,
          include: {
            requirements: true,
            job: true,
            company: true,
            sector: true,
            author: true,
          },
        });
      }
      return null;
    },
    oneCompetency: async (
      _: unknown,
      args: QueryOneCompetencyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { id?: string; title?: string; slug?: string };

      if (args.slug) where.slug = args.slug;
      if (args.id) where.id = args.id;
      if (args.title) where.title = args.title;

      const competency = await prisma.competencies.findFirst({
        where,
      });
      return competency;
    },
    uniqueCompetency: async (
      _: unknown,
      args: QueryUniqueCompetencyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { id: string } | { slug: string };
      if (args.id) (where as { id: string }).id = args.id;
      else if (args.slug) (where as { slug: string }).slug = args.slug;
      return await prisma.competencies.findUnique({ where });
    },
    competencies: async (
      _: unknown,
      args: QueryCompetenciesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const where = {} as { id: { in: string[] } };
      const params = {} as { take?: number; skip?: number };
      if (args.data?.in) where.id = { in: (args.data.in as string[]) || [] };
      if (args.params?.skip !== undefined)
        params.skip = args.params.skip as number;
      if (args.params?.take !== undefined)
        params.take = args.params.take as number;
      return await prisma.competencies.findMany({ where, ...params });
    },

    resetPassword: async (
      _: unknown,
      args: QueryResetPasswordArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const userId = args.userId;
      const password = args.password;
      if (userId && password) {
        const hash = CryptoJS.AES.encrypt(
          password,
          `${process.env.JWT_SECRET}`
        ).toString();

        const user = await prisma.betausers.update({
          where: { id: userId },
          data: { auth: { internal: { hash } } },
        });

        if (user) return user;
      }
      return null;
    },
    resetEmailLink: async (
      _: unknown,
      args: QueryResetEmailLinkArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const email = args.email?.toLowerCase();
      if (email) {
        const user = await prisma.betausers.findUnique({
          where: { email },
        });

        if (!user) return null;
        if (!user.user) return null;

        const response = await apiInstance.sendTransacEmail({
          to: [
            {
              email: user?.email as string,
              name: setName(user),
            },
          ],
          params: {
            name: setName(user),
            email: user?.email,
            userId: user?.id,
            uri,
          },
          templateId: 21,
        });

        if (!response) return null;

        return user;
      }
      return null;
    },

    oneCompany: async (
      _: unknown,
      args: QueryOneCompanyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (!args.id) return null;

      return await prisma.betacompanies.findUnique({
        where: { id: args.id },
        include: {
          offers: true,
          experiences: {
            include: {
              references: { include: { user: true } },
              user: true,
              details: true,
            },
          },
        },
      });
    },

    questions: async (
      _: unknown,
      args: QueryQuestionsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.questions.findMany({
        where: { jobId: args.jobId as string, type: args.type },
      });
    },
    oneJob: async (
      _: unknown,
      args: QueryOneJobArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.id) {
        return await prisma.jobs.findUnique({
          where: { id: args.id as string },
        });
      }
      return null;
    },
    topSectors: async (
      _: unknown,
      args: QueryTopSectorsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const where = {} as { id: { in: string[] } };
      if (args.data?.in) where.id = { in: (args.data.in as string[]) || [] };
      return await prisma.topsectors.findMany({ where });
    },
    jobs: async (_: unknown, args: QueryJobsArgs, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const d = args.data;

      const where = {} as Prisma.jobsWhereInput;
      const whereAnd = [] as Prisma.jobsWhereInput[];
      const whereOr = [] as Prisma.jobsWhereInput[];

      whereAnd.push({ type: { isSet: false } });

      let take = {} as { take?: number };
      if (args.first?.take) take = { take: args.first.take };
      let skip = {} as { skip?: number };
      if (args.first?.skip) skip = { skip: args.first.skip };

      if (d?.title && d.contains) {
        whereOr.push({
          title: { is: { fr: { startsWith: d?.title, mode: "insensitive" } } },
        });
        whereOr.push({
          title: { is: { en: { startsWith: d?.title, mode: "insensitive" } } },
        });
      }

      if (d?.topSectorIds && d.topSectorIds.length > 0)
        whereOr.push({
          topSectorId: { in: (d?.topSectorIds as string[]) || [] },
        });
      if (d?.in) whereOr.push({ id: { in: d.in as string[] } });

      if (whereAnd && whereAnd.length > 0) where.AND = whereAnd;
      if (whereOr && whereOr.length > 0) where.OR = whereOr;

      const jobs = await prisma.jobs.findMany({
        where,
        ...take,
        ...skip,
      });
      return jobs;
    },
    sendEmailToLead: async (
      _: unknown,
      args: QuerySendEmailToLeadArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const inputList = args?.leadsIds ? args.leadsIds : [args.data?.leadId];
      const returnList = [];

      for (let i = 0; i < inputList.length; i++) {
        const id = inputList[i];
        const lead = await prisma.leads.findUnique({
          where: { id: id as string },
        });
        if (lead && !lead.contacted) {
          const isCandidate = lead.type === "candidate";
          const isRecruiter = lead.type === "recruiter";
          const fr = lead.fr;
          const en = !lead.fr;
          let templateId;
          if (isCandidate && fr) templateId = 37;
          if (isCandidate && en) templateId = 34;
          if (isRecruiter && fr) templateId = 36;
          if (isRecruiter && en) templateId = 35;
          const uriTarget = lead.type === "candidate" ? uri : uriPro;
          if (args.negativeAnswerForDev) templateId = 24;
          if (args.negativeAnswerForDesign) templateId = 25;
          const res = await apiInstance.sendTransacEmail({
            to: [
              {
                email: lead?.email as string,
                name: lead?.name as string,
              },
            ],
            params: {
              id: lead?.id,
              name: lead?.name,
              token: lead?.token,
              uri: uriTarget,
            },
            templateId,
          });
          if (res.response.statusCode === 201) {
            const updated = await prisma.leads.update({
              where: { id: lead?.id as string },
              data: { contacted: true },
            });
            returnList.push(updated);
          }
        }
      }
      return returnList;
    },

    oneCustomisation: async (
      _: unknown,
      args: QueryOneCustomisationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { id: string; queueId: string };
      if (args.id) where.id = args.id;
      if (args.queueId) where.queueId = args.queueId;

      const customisation = await prisma.customisations.findFirst({
        where,
        include: { questions: true },
      });

      return customisation;
    },
    oneLead: async (
      _: unknown,
      args: QueryOneLeadArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const lead = await prisma.leads.findFirst({
        where: { id: args.id as string },
      });
      return lead;
    },
    leads: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];

      return await prisma.leads.findMany();
    },
    oneCandidate: async (
      _: unknown,
      args: QueryOneCandidateArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { user?: { email: string } };
      if (!args.userId && args.email) return null;
      if (args.userId) {
        return await prisma.betacandidates.findUnique({
          where: { userId: args.userId as string },
          include: {
            targetJob: {
              include: { topSector: true },
            },
          },
        });
      }
      if (args.email)
        where.user = {
          email: args.email,
        };

      const candidate = await prisma.betacandidates.findFirst({
        where,
        include: {
          targetJob: {
            include: { topSector: true },
          },
        },
      });
      return candidate;
    },

    oneQueue: async (
      _: unknown,
      args: QueryOneQueueArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const queue = await prisma.betaqueues.findFirst({
        where: {
          id: args.id as string,
        },
        include: {
          target: true,
          origin: true,
        },
      });

      return queue;
    },

    ownQueues: async (
      _: unknown,
      args: QueryOwnQueuesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const where = {} as {
        targetId?: string;
        originId?: string;
        status?: { in: string[] };
      };
      if (args.originId) where.originId = args.originId;
      if (args.targetId) where.targetId = args.targetId;
      if (args.status) where.status = { in: args.status as string[] };

      if (args.originId || args.targetId) {
        const queues = await prisma.betaqueues.findMany({
          where,
        });
        return queues;
      }
      return [];
    },
    oneUserExperiences: async (
      parent: unknown,
      args: QueryOneUserExperiencesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      if (args.userId) {
        return await prisma.betaexperiences.findMany({
          where: {
            userId: args.userId as string,
          },
        });
      }
      return null;
    },
    oneDetails: async (
      parent: unknown,
      args: QueryOneDetailsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      let where = {} as any;
      if (args.filter.email) where.email = args.filter.email;
      if (args.filter.phone) where.phone = args.filter.phone;
      if (args.filter.principal) where.principal = args.filter.principal;
      if (args.filter.userId) where.userId = args.filter.userId;
      if (args.filter.isPhone) where.phone = { isSet: args.filter.isPhone };
      const details = await prisma.betadetails.findFirst({
        where,
        include: { user: true },
      });
      return details;
    },
    profiles: async (
      parent: unknown,
      args: QueryProfilesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return (await prisma.betaprofiles.findMany({
        where: {
          refExperiencesIds: {
            has: args.experienceId,
          },
        },
      })) as BetaProfile[];
    },
    accountCandidate: async (
      parent: unknown,
      args: QueryAccountCandidateArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return (await prisma.betacandidates.findFirst({
        where: { userId: args.userId },
      })) as BetaCandidate;
    },
    accountDetails: async (
      parent: unknown,
      args: QueryAccountDetailsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return (await prisma.betadetails.findFirst({
        where: { userId: args.userId },
      })) as BetaDetails;
    },
    accountProfile: async (
      parent: unknown,
      args: QueryAccountProfileArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return (await prisma.betaprofiles.findFirst({
        where: { userId: args.userId },
      })) as BetaProfile;
    },
    accountUser: async (
      parent: unknown,
      args: QueryAccountUserArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { id: string; user?: boolean; pro?: boolean };
      if (args.userId) where.id = args.userId;
      // if (args.details?.pro) where.pro = args.details?.pro
      // if (args.details?.user) where.user = args.details?.user

      return await prisma.betausers.findUnique({
        where,
        include: {
          company: true,
        },
      });
    },

    oneNotification: async (
      _: unknown,
      args: QueryOneNotificationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data?.type && data.originId && data.targetId) {
        return await prisma.notifications.findFirst({
          where: {
            type: data.type,
            originId: data.originId,
            targetId: data.targetId,
          },
        });
      }
      return null;
    },
    users: async (
      parent: unknown,
      args: QueryUsersArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const data = args.data;
      const first = args.first;
      const where = {} as Prisma.betausersWhereInput;
      const whereOr = [] as Prisma.betausersWhereInput[];

      if (data?.user && data?.pro) {
        whereOr.push({ user: true });
        whereOr.push({ pro: true });
      } else if (data?.user) where.user = true;
      else if (data?.pro) where.pro = true;

      if (data?.isVideo) where.videos = { some: { id: { not: undefined } } };
      if (data?.isPublic) where.isPublic = true;
      if (data?.isScrapped !== undefined) {
        whereOr.push({ scrapped: { isSet: false } });
        whereOr.push({ scrapped: { not: true } });
      }

      let take = {} as { take?: number };
      if (first?.take) take = { take: first.take };
      let skip = {} as { skip?: number };
      if (first?.skip) skip = { skip: first.skip };

      if (whereOr?.length > 0) where.OR = whereOr;
      return await prisma.betausers.findMany({
        where,
        ...take,
        ...skip,
      });
    },
    oneExperience: async (
      _: unknown,
      args: QueryOneExperienceArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const id = args.id as string;
      const experience = await prisma.betaexperiences.findFirst({
        where: {
          id,
        },
      });
      return experience;
    },
    affiliations: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.affiliations.findMany({ include: { parent: true } });
    },
    sharings: async (
      _: unknown,
      args: QuerySharingsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const data = args.data;
      const where = {} as Prisma.profileSharingsWhereInput;
      if (data?.offerId) where.offerTarget = { id: data.offerId };
      if (data?.originId) where.origin = { id: data.originId };
      if (data?.targetId) where.target = { id: data.targetId };
      if (data?.videoId) where.video = { id: data.videoId };

      let finalWhere = {} as Prisma.profileSharingsWhereInput;
      if (Object.keys(where).length > 0) finalWhere = where;
      const sharings = await prisma.profileSharings.findMany({
        where: { ...finalWhere },
        include: { video: true, offerTarget: true, origin: true, target: true },
      });
      return sharings;
    },
    experiences: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const experiences = await prisma.betaexperiences.findMany();
      return experiences;
    },
    user: async (_: unknown, args: QueryUserArgs, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as Prisma.betausersWhereUniqueInput;

      if (args.fullname) {
        return await prisma.betausers.findFirst({
          where: {
            fullname: { equals: args.fullname, mode: "insensitive" },
            videos: { some: { id: { not: undefined } } },
          },
        });
      }

      if (args.uniqueName) where.uniqueName = args.uniqueName;
      if (args.userId) where.id = args.userId;
      if (args.email) where.email = args.email.toLowerCase();

      return (await prisma.betausers.findUnique({
        where,
        include: {
          candidate: true,
          company: true,
          myOffers: true,
          videos: { include: { sharings: true, meetCandidate: true } },
          affiliations: true,
        },
      })) as BetaUser;
    },
    affiliation: async (
      _: unknown,
      args: QueryAffiliationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;

      const where = {} as Prisma.affiliationsWhereUniqueInput;
      if (args.id) where.id = args.id;
      if (args.parentId) where.parentId = args.parentId;

      if (Object.keys(where).length > 0) {
        return await prisma.affiliations.findUnique({
          where,
          include: { parent: true },
        });
      }
      return null;
    },
    companies: async (
      _: unknown,
      args: QueryCompaniesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const filters = args.filters;
      const name = filters?.name;

      let take = {} as { take?: number };
      if (args.first?.take) take = { take: args.first.take };
      let skip = {} as { skip?: number };
      if (args.first?.skip) skip = { skip: args.first.skip };

      const where = {} as {
        name: {
          contains?: string;
          startsWith?: string;
          mode: "insensitive" | "default" | undefined;
        };
        autocompletions: { hasSome: string[] };
        videos?: { none: undefined };
        logo?: { isSet: boolean };
      };

      if (filters?.isLogo !== undefined)
        where.logo = { isSet: filters.isLogo as boolean };
      if (filters?.isVideo) where.videos = { none: undefined };

      if (name) where.name = { mode: "insensitive", startsWith: name };
      // if (name) {
      // const original = name
      // const lower = name.toLowerCase()
      // const cased = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`
      // where.autocompletions = { hasSome: [original, lower, cased] }
      // }

      const companies = await prisma.betacompanies.findMany({
        where,
        ...take,
        ...skip,
      });
      return companies;
    },
  },
  Mutation: {
    createAffiliation: async (
      _: unknown,
      args: MutationCreateAffiliationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;

      if (args.parentId) {
        const affiliation = await prisma.affiliations.create({
          data: {
            parent: { connect: { id: args.parentId } },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        return affiliation;
      }
      return null;
    },
    deleteMeet: async (
      _: unknown,
      args: MutationDeleteMeetArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;

      if (args.id) {
        return await prisma.meets.delete({ where: { id: args.id } });
      }
      return null;
    },
    createMeet: async (
      _: unknown,
      args: MutationCreateMeetArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;

      const d = args.data;
      if (!d?.emailCandidate || !d?.emailRecruiter || !d.jobId) return null;
      const meet = await prisma.meets.findFirst({
        where: {
          meetCandidate: { email: d?.emailCandidate as string },
          meetRecruiter: { email: d?.emailRecruiter as string },
        },
      });

      if (meet) return null;

      const created = await prisma.$transaction(
        async (prisma: any) => {
          try {
            const candidateCreates = {} as Prisma.meetcandidatesCreateInput;
            if (d?.firstnameCandidate)
              candidateCreates.firstname = d.firstnameCandidate;
            if (d?.lastnameCandidate)
              candidateCreates.lastname = d.lastnameCandidate;
            if (d?.emailCandidate)
              candidateCreates.email = d.emailCandidate.toLowerCase();
            if (d?.linkedinProfileIdCandidate)
              candidateCreates.linkedinProfileId = d.linkedinProfileIdCandidate;
            if (d?.phoneCandidate) candidateCreates.phone = d.phoneCandidate;
            if (d.jobId) candidateCreates.job = { connect: { id: d.jobId } };

            let candidate;

            if (d.emailCandidate?.toLowerCase()) {
              candidate = await prisma.meetcandidates.findUnique({
                where: { email: d.emailCandidate?.toLowerCase() },
              });
              if (candidate) {
                candidate = await prisma.meetcandidates.update({
                  where: { id: candidate.id },
                  data: {
                    ...candidateCreates,
                    updatedAt: new Date(),
                  },
                });
              }
            }

            if (!candidate) {
              candidate = await prisma.meetcandidates.create({
                data: {
                  ...candidateCreates,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            }

            const recruiterCreates = {} as Prisma.meetrecruitersCreateInput;
            if (d?.firstnameRecruiter)
              recruiterCreates.firstname = d.firstnameRecruiter;
            if (d?.lastnameRecruiter)
              recruiterCreates.lastname = d.lastnameRecruiter;
            if (d?.emailRecruiter)
              recruiterCreates.email = d.emailRecruiter.toLowerCase();
            if (d?.linkedinProfileIdRecruiter)
              recruiterCreates.linkedinProfileId = d.linkedinProfileIdRecruiter;
            if (d?.phoneRecruiter) recruiterCreates.phone = d.phoneRecruiter;

            let recruiter;

            if (d.emailRecruiter?.toLowerCase()) {
              recruiter = await prisma.meetrecruiters.findUnique({
                where: { email: d.emailRecruiter?.toLowerCase() },
              });
              if (recruiter) {
                recruiter = await prisma.meetrecruiters.update({
                  where: { id: recruiter.id },
                  data: {
                    ...recruiterCreates,
                    updatedAt: new Date(),
                  },
                });
              }
            }
            if (!recruiter) {
              recruiter = await prisma.meetrecruiters.create({
                data: {
                  ...recruiterCreates,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            }

            if (candidate && recruiter) {
              const token = CryptoJS.AES.encrypt(
                {
                  email: d.emailCandidate,
                  recruiter: d.emailRecruiter,
                }.toString(),
                `${process.env.JWT_SECRET}`
              ).toString();
              return await prisma.meets.create({
                data: {
                  meetCandidate: { connect: { id: candidate.id } },
                  meetRecruiter: { connect: { id: recruiter.id } },
                  expired: false,
                  token,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                include: {
                  meetCandidate: true,
                  meetRecruiter: true,
                },
              });
            }

            throw new BackendError(
              BACKEND_ERRORS.PROCESSING,
              BACKEND_MESSAGES.PROCESSING
            );
          } catch (err: any) {
            return null;
          }
        },
        { timeout: 20000 }
      );
      if (created) return created;
      return null;
    },
    createResponses: async (
      _: unknown,
      args: MutationCreateResponsesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const userId = args.userId;
      const threadId = args.threadId;
      const data = args.responses;

      if (data && threadId && userId) {
        try {
          const responses = await Promise.all(
            data?.map(async (res) => {
              if (res?.content) {
                const exchange = await prisma.betawhatsappexchanges.findUnique({
                  where: { id: res.exchangeId as string },
                });

                let videoConnect = {} as { video: { connect: { id: string } } };

                return await prisma.betawhatsappresponses.create({
                  data: {
                    content: res.content as string,
                    type: res.type,
                    exchange: { connect: { id: res.exchangeId as string } },
                    thread: { connect: { id: exchange?.threadId as string } },
                    user: { connect: { id: userId as string } },
                    ...videoConnect,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                });
              }
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );
            })
          ).catch(() => {
            throw new BackendError(
              BACKEND_ERRORS.PROCESSING,
              BACKEND_MESSAGES.PROCESSING
            );
          });

          const thread = await prisma.betawhatsappthreads.update({
            where: { id: threadId as string },
            data: { terminated: true, updatedAt: new Date() },
          });

          const queue = await prisma.betaqueues.update({
            where: { id: thread.queueId as string },
            data: { status: "valid", updatedAt: new Date() },
          });

          return responses;
        } catch (err: any) {
          return null;
        }
      }

      return null;
    },
    createError: async (
      _: unknown,
      args: MutationCreateErrorArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data) {
        return await prisma.errors.create({
          data: {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
      return null;
    },
    createThread: async (
      _: unknown,
      args: MutationCreateThreadArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const queueId = args.queueId;
      if (queueId) {
        const thread = await prisma.betawhatsappthreads.findUnique({
          where: { queueId },
        });
        if (thread) return thread;

        const queue = await prisma.betaqueues.findUnique({
          where: { id: queueId },
          include: { customisation: true },
        });

        const questions = await prisma.questions.findMany({
          where: { customisationId: queue?.customisation?.id },
        });

        if (queue) {
          const thread = await prisma.$transaction(
            async (prisma: any) => {
              try {
                const created = await prisma.betawhatsappthreads.create({
                  data: {
                    queue: { connect: { id: queueId } },
                    terminated: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                });

                const queue = await prisma.betaqueues.update({
                  where: { id: queueId as string },
                  data: {
                    seen: true,
                    status: "in-progress",
                    updatedAt: new Date(),
                  },
                });

                await Promise.all(
                  questions.map(async (question, index) => {
                    await prisma.betawhatsappexchanges.create({
                      data: {
                        question: { connect: { id: question.id } },
                        thread: { connect: { id: created.id } },
                        step: index,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    });
                  })
                ).catch(() => {
                  throw new BackendError(
                    BACKEND_ERRORS.PROCESSING,
                    BACKEND_MESSAGES.PROCESSING
                  );
                });
                return created;
              } catch (err: any) {
                return null;
              }
            },
            { timeout: 15000 }
          );
          if (thread) return thread;
        }
      }
      return null;
    },
    createClassicAccount: async (
      _: unknown,
      args: MutationCreateClassicAccountArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const d = args.data;
      if (d) {
        const userLoad = setUserPayload<Prisma.betausersCreateInput>(
          "create",
          d
        );

        const user = await prisma.betausers.create({
          data: userLoad,
        });

        const detailsLoad = setDetailPayload<Prisma.betadetailsCreateInput>(
          "create",
          Object.assign({}, d, { userId: user.id })
        );

        if (user) {
          const details = await prisma.betadetails.create({
            data: detailsLoad,
          });
          if (!details)
            await prisma.betausers.delete({ where: { id: user.id } });
          return user;
        }
      }

      return null;
    },
    createRemark: async (
      _: unknown,
      args: CreateUserRemarkMutationVariables,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.data?.content && args.data.userId) {
        return await prisma.userRemarks.create({
          data: {
            content: args.data.content,
            user: { connect: { id: args.data.userId as string } },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
      return null;
    },
    updateLead: async (
      _: unknown,
      args: UpdateLeadMutationVariables,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;

      const updates = {} as Prisma.leadsUpdateInput;

      if (data?.name) updates.name = data.name;
      if (data?.email) updates.email = data.email;
      if (data?.linkedinProfileId)
        updates.linkedinProfileId = data.linkedinProfileId;
      if (data?.phone) updates.phone = data.phone;
      if (data?.type) updates.type = data.type;
      if (data?.contacted !== undefined)
        updates.contacted = data.contacted as boolean;

      const updated = await prisma.leads.update({
        where: { id: data?.leadId as string },
        data: updates,
      });

      return updated;
    },
    deleteVideo: async (
      _: unknown,
      args: DeleteVideoMutationVariables,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.id) {
        const video = await prisma.videos.findUnique({
          where: { id: args.id as string },
        });
        if (video && video.file?.public_id) {
          const public_id = video.file.public_id;
          const response = await cloudinary.api.delete_resources([public_id], {
            resource_type: "video",
          });
          if (
            response?.deleted[public_id as string] === "deleted" ||
            response?.deleted[public_id as string] === "not_found"
          ) {
            const result = await cloudinary.api.delete_resources_by_prefix(
              `youmeet-official/${video.userId as string}`,
              {
                resource_type: "raw",
              }
            );

            return await prisma.videos.delete({
              where: { id: args.id as string },
            });
          }
        }
      }
      return null;
    },
    updateCandidate: async (
      _: unknown,
      args: MutationUpdateCandidateArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { id: string; userId?: string };
      if (args.data?.id) where.id = args.data.id as string;
      if (args.data?.userId) where.userId = args.data?.userId as string;
      if (args.data?.jobId) {
        const candidate = await prisma.betacandidates.update({
          where,
          data: { targetJob: { connect: { id: args.data?.jobId as string } } },
        });
        return candidate;
      }

      return null;
    },
    createExperience: async (
      _: unknown,
      args: MutationCreateExperienceArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const d = args.data;
      const companyInput = {} as {
        company: {
          connect?: { id: string };
        };
        companyName: string;
      };

      if (d?.company)
        companyInput.company = { connect: { id: d.company as string } };
      else if (d?.companyName) {
        companyInput.companyName = d.companyName as string;
      }
      if (d) {
        let candidate = await prisma.betacandidates.findUnique({
          where: { userId: d?.userId as string },
        });
        if (!candidate)
          candidate = await prisma.betacandidates.create({
            data: { user: { connect: { id: d?.userId as string } } },
          });

        if (!candidate) return null;

        const experience = await prisma.betaexperiences.create({
          data: {
            ...companyInput,
            duration: getExperienceDuration(d),
            isLiveJob: d?.isLiveJob,
            job: { connect: { id: d?.job as string } },
            ending: d?.ending,
            starting: d?.starting,
            user: { connect: { id: d?.userId as string } },
            candidate: { connect: { id: candidate.id as string } },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          select: { id: true },
        });
        return experience;
      }
      return null;
    },
    deleteInterviewOffer: async (
      _: unknown,
      args: MutationDeleteInterviewOfferArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.interviewOffer.delete({
        where: { id: args.id as string },
      });
    },
    deleteProfileSharing: async (
      _: unknown,
      args: MutationDeleteProfileSharingArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.profileSharings.delete({
        where: { id: args.id as string },
      });
    },
    createFormQuestion: async (
      _: unknown,
      args: MutationCreateFormQuestionArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.formQuestions.create({
        data: {
          target: args.target as string,
          title: args.title as string,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });
    },
    updateFormResponse: async (
      _: unknown,
      args: MutationUpdateFormResponseArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const d = args.data;
      if (d?.responseId) {
        const updated = await prisma.formResponses.update({
          where: { id: d?.responseId as string },
          data: {
            content: d?.content || "",
            question: { connect: { id: d?.questionId as string } },
            lead: { connect: { id: d?.leadId as string } },
            type: d?.type || "text",
            isTrue: d?.isTrue || false,
            updatedAt: new Date(),
          },
        });
        return updated;
      }
      const created = await prisma.formResponses.create({
        data: {
          content: d?.content || "",
          question: { connect: { id: d?.questionId as string } },
          lead: { connect: { id: d?.leadId as string } },
          type: d?.type || "text",
          isTrue: d?.isTrue || false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return created;
    },
    createProfileView: async (
      _: unknown,
      args: MutationCreateProfileViewArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.data?.userId) {
        const dayView = await prisma.profileviews.findFirst({
          where: {
            userId: args.data.userId as string,
            createdAt: {
              gte: new Date(new Date().getTime() - 1000 * 3600 * 24),
            },
          },
        });
        if (dayView && dayView?.userId !== args.data?.userId) {
          return await prisma.profileviews.update({
            where: { id: dayView.id as string },
            data: { count: { increment: 1 }, updatedAt: new Date() },
          });
        } else {
          return await prisma.profileviews.create({
            data: {
              count: 1,
              user: { connect: { id: args.data.userId as string } },
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }
      }

      return null;
    },
    createProfileSharing: async (
      _: unknown,
      args: MutationCreateProfileSharingArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;

      if (data?.originId && data?.offerTargetId && data?.videoId) {
        const target = {} as { target: { connect: { id: string } } };
        if (data?.targetId) target.target = { connect: { id: data.targetId } };

        const origin = await prisma.betausers.findUnique({
          where: { id: data.originId },
          select: { id: true, email: true, fullname: true },
        });

        if (origin) {
          const sharing = await prisma.$transaction(
            async (prisma) => {
              const emailPromise = new Promise(async (resolve, reject) => {
                const offer = await prisma.offers.findUnique({
                  where: { id: data.offerTargetId as string },
                  select: {
                    intitule: true,
                    entreprise: true,
                  },
                });
                if (!offer) reject(BACKEND_MESSAGES.EMAIL_FAIL);
                const res = await apiInstance.sendTransacEmail({
                  to: [
                    {
                      email: origin?.email as string,
                      name: origin?.fullname as string,
                    },
                  ],
                  params: {
                    name: origin?.fullname,
                    intitule: offer?.intitule,
                    entreprise: offer?.entreprise?.nom,
                  },
                  templateId: 39 as number,
                });
                if (res.response.statusCode !== 201) {
                  reject(BACKEND_MESSAGES.PROCESSING);
                } else {
                  resolve(res.body.messageId);
                }
              });
              try {
                const results = await Promise.all([
                  prisma.profileSharings.create({
                    data: {
                      origin: { connect: { id: data?.originId as string } },
                      ...target,
                      offerTarget: {
                        connect: { id: data?.offerTargetId as string },
                      },
                      video: { connect: { id: data?.videoId as string } },
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  }),
                  emailPromise,
                ]);

                const sharing = results[0];

                if (data?.targetId) {
                  const targetUsers = await prisma.betausers.findMany({
                    where: { companyId: data?.targetId as string },
                  });
                  if (targetUsers) {
                    for (let i = 0; i < targetUsers.length; i++) {
                      const user = targetUsers[i];

                      await prisma.notifications.create({
                        data: {
                          type: "sharing",
                          sharing: { connect: { id: sharing.id as string } },
                          content:
                            "Quelqu'un vient de partager son profil avec vous.",
                          createdAt: new Date(),
                          origin: { connect: { id: data?.originId as string } },
                          target: { connect: { id: user.id as string } },
                          status: "pending",
                          updatedAt: new Date(),
                        },
                      });
                    }
                  }
                }
                return sharing;
              } catch (err: any) {
                return null;
              }
            },
            { timeout: 15000 }
          );
          if (sharing) return sharing;
        }
      }
      return null;
    },
    updateExperience: async (
      _: unknown,
      args: MutationUpdateExperienceArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const updates = {} as Prisma.betaexperiencesUpdateInput;
      if (args.data?.referenced || args.data?.referenced === false) {
        updates.referenced = args.data.referenced;
      }
      return await prisma.betaexperiences.update({
        where: { id: args.data?.id as string },
        data: { ...updates },
      });
    },
    createReferenceContact: async (
      _: unknown,
      args: MutationCreateReferenceContactArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const d = args.data;
      if (d?.contactId) {
        const contact = await prisma.referenceContacts.findFirst({
          where: { id: d?.contactId },
        });

        const updates = {} as Prisma.referenceContactsUpdateInput;

        if (d?.name) updates.name = d.name as string;
        if (d?.email) updates.email = d.email as string;
        if (d?.phone) updates.phone = d.phone as Phone;
        if (d?.position) updates.position = d.position as string;
        if (d?.experienceId)
          updates.experience = { connect: { id: d.experienceId as string } };
        if (d?.userId) updates.user = { connect: { id: d.userId as string } };

        if (contact) {
          return await prisma.referenceContacts.update({
            where: { id: d?.contactId as string },
            data: { ...updates, updatedAt: new Date() },
          });
        }
      }

      return await prisma.referenceContacts.create({
        data: {
          name: d?.name as string,
          email: d?.email as string,
          phone: d?.phone as Phone,
          position: d?.position as string,
          user: { connect: { id: d?.userId as string } },
          experience: { connect: { id: d?.experienceId as string } },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    },
    updateAllMyNotifications: async (
      _: unknown,
      args: MutationUpdateAllMyNotificationsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const payload = await prisma.notifications.updateMany({
        where: {
          targetId: args.targetId as string,
        },
        data: {
          status: args.status as string,
        },
      });

      const notifications = await prisma.notifications.findMany({
        where: {
          targetId: args.targetId as string,
        },
      });

      return notifications;
    },
    updateOneNotification: async (
      _: unknown,
      args: MutationUpdateOneNotificationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.notifications.update({
        where: { id: args.id as string },
        data: { status: args.status as string },
      });
    },
    createNotification: async (
      _: unknown,
      args: MutationCreateNotificationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.notifications.create({
        data: {
          type: args.data?.type as string,
          content: args.data?.content,
          createdAt: new Date(),
          concernedId: args.data?.concernedId as string,
          origin: { connect: { id: args.data?.originId as string } },
          status: "pending",
          target: { connect: { id: args.data?.targetId as string } },
          updatedAt: new Date(),
        },
      });
    },
    createReference: async (
      _: unknown,
      args: MutationCreateReferenceArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const updates = {} as Prisma.referencesUpdateInput &
        Prisma.referencesCreateInput;
      if (args.data?.concerned)
        updates.concerned = args.data.concerned as string;
      if (args.data?.content) updates.content = args.data.content as string;
      if (args.data?.type) updates.type = args.data.type as string;
      if (args.data?.valid || args.data?.valid === false)
        updates.valid = args.data.valid as boolean;
      if (args.data?.experienceId)
        updates.experience = {
          connect: { id: args.data.experienceId as string },
        };
      if (args.data?.userId)
        updates.user = { connect: { id: args.data.userId as string } };

      if (args.data?.experienceId) {
        const ref = await prisma.references.findFirst({
          where: { experienceId: args.data.experienceId },
        });
        if (ref) {
          return await prisma.references.update({
            where: {
              id: ref.id as string,
            },
            data: { ...updates, updatedAt: new Date() },
          });
        }
      }

      return await prisma.references.create({
        data: {
          ...updates,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    },
    createInterviewOffer: async (
      _: unknown,
      args: MutationCreateInterviewOfferArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const offer = await prisma.$transaction(
        async (prisma) => {
          const created = await prisma.interviewOffer.create({
            data: {
              comment: args.data?.comment,
              datetime: args.data?.datetime as string,
              origin: { connect: { id: args.data?.originId as string } },
              target: { connect: { id: args.data?.targetId as string } },
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });

          await prisma.notifications.create({
            data: {
              type: "offer",
              concernedId: created.id,
              content: "Vous avez une nouvelle offre d'entretien.",
              createdAt: new Date(),
              origin: { connect: { id: args.data?.originId as string } },
              target: { connect: { id: args.data?.targetId as string } },
              status: "pending",
              updatedAt: new Date(),
            },
          });
          return created;
        },
        { timeout: 15000 }
      );
      if (offer) return offer;
      return null;
    },

    createFavorite: async (
      _: unknown,
      args: MutationCreateFavoriteArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.originId && (args.targetId || args.offerTargetId)) {
        const exists = await prisma.favorites.findFirst({
          where: {
            origin: { id: args.originId as string },
            target: { id: args.targetId as string },
          },
        });
        if (exists) return exists;

        const creates = {} as {
          origin: { connect: { id: string } };
          target?: { connect: { id: string } };
          offerTarget?: { connect: { id: string } };
        };
        creates.origin = { connect: { id: args.originId } };
        if (args.targetId) creates.target = { connect: { id: args.targetId } };
        if (args.offerTargetId)
          creates.offerTarget = { connect: { id: args.offerTargetId } };
        return await prisma.favorites.create({
          data: {
            ...creates,
          },
        });
      }
      return null;
    },
    deleteOffer: async (
      _: unknown,
      args: MutationDeleteOfferArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.offers.delete({ where: { id: args.id as string } });
    },
    createOffer: async (
      _: unknown,
      args: MutationCreateOfferArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const content = args.data?.content as string;
      const authorName = args.data?.authorName as string;
      const authorEmail = args.data?.authorEmail as string;
      const jobDescriptionLink = args.data?.jobDescriptionLink as string;
      const requirements = args.data?.requirements as string[];
      const revenue = args.data?.revenue as number;
      const contractType = args.data?.contractType as string;
      const location = args.data?.location as string;
      const limitDate = new Date(args.data?.limitDate as string).toISOString();
      const authorInterviewLink = args.data?.authorInterviewLink as string;
      const job = args.data?.job as string;
      const sector = args.data?.sector as string;
      const userId = args.data?.userId;
      const companyId = args.data?.companyId;
      const contexteTravail = args.data?.contexteTravail as any;

      const author = {} as { author?: { connect: { id: string } } };
      if (userId) author.author = { connect: { id: userId } };

      const offer = await prisma.offers.create({
        data: {
          contexteTravail,
          authorEmail,
          authorName,
          ...author,
          requirements: { connect: requirements.map((req) => ({ id: req })) },
          location,
          limitDate,
          contractType,
          revenue,
          authorInterviewLink,
          jobDescriptionLink,
          job: { connect: { id: job } },
          sector: { connect: { id: sector } },
          company: { connect: { id: companyId as string } },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return offer;
    },
    submitVideo: async (
      _: unknown,
      args: MutationSubmitVideoArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;

      if (data?.file) {
        const creates = {} as Prisma.videosCreateInput;
        creates.file = data.file;
        if (data?.principal !== undefined)
          creates.principal = data.principal as boolean;
        if (data?.companyId)
          creates.company = { connect: { id: data.companyId } };
        if (data?.userId) creates.user = { connect: { id: data.userId } };
        if (data?.jobId) creates.job = { connect: { id: data.jobId } };
        if (data?.exchangeId)
          creates.exchange = { connect: { id: data.exchangeId } };
        if (data.preview !== undefined)
          creates.preview = data.preview as boolean;
        if (data.meetCandidateId)
          creates.meetCandidate = { connect: { id: data.meetCandidateId } };

        await prisma.videos.updateMany({
          where: { userId: data.userId },
          data: { principal: false },
        });

        const created = await prisma.videos.create({
          data: { ...creates, createdAt: new Date(), updatedAt: new Date() },
        });
        return created;
      }
      return null;
    },
    createFeedback: async (
      _: unknown,
      args: MutationCreateFeedbackArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data?.content && data.userId) {
        const creates = {} as Prisma.feedbackCreateInput;
        const feedback = prisma.$transaction(async (prisma) => {
          if (data.content) creates.content = data.content;
          if (data.userId) creates.user = { connect: { id: data.userId } };
          if (data.authorId)
            creates.author = { connect: { id: data.authorId } };
          const feed = await prisma.feedback.create({
            data: {
              ...creates,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
          if (feed) {
            const notifCreates = {
              type: "feedback",
            } as Prisma.notificationsCreateInput;

            if (data.authorId)
              notifCreates.origin = { connect: { id: data.authorId } };
            if (data.userId)
              notifCreates.target = { connect: { id: data.userId } };
            if (feed.id) notifCreates.feedback = { connect: { id: feed.id } };
            const notification = await prisma.notifications.create({
              data: {
                content:
                  "Vous avez reçu un feedback pour votre vidéo de présentation",
                ...notifCreates,
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
            if (notification) {
              return feed;
            }
          }
          return null;
        });
        if (feedback) return feedback;
      }
      return null;
    },
    updateVideo: async (
      _: unknown,
      args: MutationUpdateVideoArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data?.id) {
        const updates = {} as Prisma.videosUpdateInput;
        if (data.principal !== undefined && data.userId) {
          updates.principal = data.principal as boolean;
          if (updates.principal)
            await prisma.videos.updateMany({
              where: { userId: data.userId },
              data: { principal: false },
            });
        }
        if (data?.likes) {
          if (data.targetId) {
            await prisma.notifications.create({
              data: {
                type: "like",
                content:
                  "Vous avez reçu un like pour votre vidéo de présentation",
                originId: data.originId ?? null,
                targetId: data.targetId,
                status: "pending",
                concernedId: data.id as string,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
          }
          updates.likes = { increment: data.likes };
        }
        if (data.file) updates.file = { update: data.file };

        const video = await prisma.videos.update({
          where: { id: data?.id as string },
          data: updates,
        });
        return video;
      }
      return null;
    },
    deleteCompetency: async (
      _: unknown,
      args: MutationDeleteCompetencyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.competencies.delete({
        where: { id: args.id as string },
      });
    },

    createLead: async (
      _: unknown,
      args: MutationCreateLeadArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      const token = await s({
        name: args.data?.name as string,
        email: args.data?.email as string,
      });

      const creates = {} as Prisma.leadsCreateInput;

      if (data?.name) creates.name = data.name as string;
      if (data?.email) creates.email = data.email.toLowerCase() as string;
      if (data?.type) creates.type = data.type as string;
      if (data?.phone) creates.phone = data.phone as PhoneInput;
      if (data?.parentId) creates.parent = { connect: { id: data.parentId } };
      if (data?.contacted !== undefined) creates.contacted = data.contacted;
      if (data?.linkedinProfileId)
        creates.linkedinProfileId = data.linkedinProfileId;
      if (data?.fr !== undefined) creates.fr = data.fr as boolean;

      const lead = await prisma.leads.create({
        data: {
          ...creates,
          token,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return lead;
    },

    updateQueue: async (
      _: unknown,
      args: MutationUpdateQueueArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      let data = {} as {
        seen: boolean;
        status: string;
        type: string;
      };
      if (args.data?.seen) data.seen = args.data.seen;
      if (args.data?.status) data.status = args.data.status;
      if (args.data?.type) data.type = args.data.type;

      const queue = await prisma.betaqueues.update({
        where: { id: args.data?.queueId as string },
        data,
      });
      return queue;
    },
    deleteLead: async (
      _: unknown,
      args: MutationDeleteLeadArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.leads.delete({
        where: { id: args.leadId as string },
      });
    },
    deleteWhatsappThread: async (
      _: unknown,
      args: MutationDeleteWhatsappThreadArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      return await prisma.betawhatsappthreads.delete({
        where: { id: args.threadId as string },
      });
    },

    deleteQueue: async (
      _: unknown,
      args: MutationDeleteQueueArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const queue = await prisma.betaqueues.delete({
        where: {
          id: args.queueId as string,
        },
      });
      return queue;
    },
    createAccount: async (
      _: unknown,
      args: MutationCreateAccountArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const candidate = await prisma.betacandidates.findFirst({
        where: { userId: args.data?.userId },
      });
      if (candidate) {
        const updatedCandidate = await prisma.betacandidates.update({
          where: { userId: args.data?.userId as string },
          data: { confirmed: true, updatedAt: new Date() },
        });
        await prisma.betadetails.updateMany({
          where: { userId: args.data?.userId, candidate: { is: null } },
          data: { candidateId: updatedCandidate.id },
        });
        return updatedCandidate;
      }
      const newCandidate = await prisma.betacandidates.create({
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          confirmed: true,
          user: { connect: { id: args.data?.userId as string } },
        },
      });

      await prisma.betadetails.updateMany({
        where: { userId: args.data?.userId as string },
        data: {
          candidateId: newCandidate.id,
        },
      });
      return newCandidate;
    },
    createDetails: async (
      _: unknown,
      args: MutationCreateDetailsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data?.userId) {
        const creates = setDetailPayload<Prisma.betadetailsCreateInput>(
          "create",
          data
        );

        const details = await prisma.betadetails.create({
          data: creates,
        });
        return details;
      }
      return null;
    },
    createCompanyProfile: async (
      _: unknown,
      args: MutationCreateCompanyProfileArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const company = await prisma.$transaction(
        async (prisma) => {
          const user = await prisma.betausers.findFirst({
            where: { id: args.data?.userId as string },
            include: { company: true },
          });
          if (user && user?.company) {
            // modify
            const updates = {} as Prisma.betacompaniesUpdateInput;
            if (args.data?.name) updates.name = args.data.name;
            if (args.data?.linkedinProfilePage)
              updates.linkedinProfilePage = args.data.linkedinProfilePage;
            if (args.data?.location) updates.location = args.data.location;
            if (args.data?.resume) updates.resume = args.data.resume;
            if (args.data?.logo)
              updates.logo = { set: args.data.logo as AvatarInput };
            return await prisma.betacompanies.update({
              where: { id: user.company.id },
              data: {
                updatedAt: new Date(),
                pro: true,
                ...(updates as any),
              },
            });
          } else if (user && !user.company) {
            //create
            const company = await prisma.betacompanies.create({
              data: {
                linkedinProfilePage: args.data?.linkedinProfilePage as string,
                location: args.data?.location as string,
                name: args.data?.name,
                resume: args.data?.resume,
                logo: args.data?.logo,
                pro: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
            await prisma.betausers.update({
              where: { id: user.id as string },
              data: { company: { connect: { id: company.id as string } } },
            });
            return company;
          }
        },
        { timeout: 15000 }
      );
      if (company) return company;
      return null;
    },
    updateCompany: async (
      _: unknown,
      args: MutationUpdateCompanyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const updates = {} as Prisma.betacompaniesUpdateInput;
      if (args.data?.name) updates.name = args.data.name;
      if (args.data?.linkedinProfileId)
        updates.linkedinProfilePage = args.data.linkedinProfileId;
      if (args.data?.location) updates.location = args.data.location;
      if (args.data?.resume) updates.resume = args.data.resume;
      if (args.data?.logo) updates.logo = args.data.logo;
      if (args.data?.video !== undefined) updates.video = args.data.video;
      return await prisma.betacompanies.update({
        where: { id: args.data?.companyId as string },
        data: {
          ...(updates as any),
          updatedAt: new Date(),
        },
      });
    },
    updateUser: async (
      _: unknown,
      args: MutationUpdateUserArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as { id: string; uniqueName: string };

      if (args.uniqueName) where.uniqueName = args.uniqueName;
      else if (args.userId) where.id = args.userId;
      else return null;

      const updates = {} as Prisma.betausersUpdateInput;

      if (args.data?.email) updates.email = args.data.email;
      if (args.data?.professionalEmail)
        updates.professionalEmail = args.data.professionalEmail;
      if (args.data?.fullname) {
        updates.firstname = fromFullname(
          args.data?.fullname as string
        ).firstname;
        updates.lastname = fromFullname(args.data?.fullname as string).lastname;
        updates.fullname = args.data?.fullname;
      }

      if (args.data?.linkedinProfileId)
        updates.linkedinProfileId = args.data?.linkedinProfileId;
      if (args.data?.consent !== undefined)
        updates.consent = args.data.consent as boolean;
      if (args.data?.cvFile !== undefined) {
        // cvFile is to be removed
        if (!args.data.cvFile) {
          const userWithCV = await prisma.betausers.findUnique({
            where,
          });
          if (userWithCV && userWithCV.cvFile?.public_id) {
            const public_id = userWithCV.cvFile.public_id;
            const response = await cloudinary.api.delete_resources(
              [public_id],
              {
                resource_type: "image",
              }
            );

            if (
              response?.deleted[public_id as string] === "deleted" ||
              response?.deleted[public_id as string] === "not_found"
            ) {
              updates.cvFile = null;
            }
          }
          // cvFile is to be added
        } else updates.cvFile = args.data.cvFile as AvatarInput;
      }
      if (args.data?.isPublic !== undefined)
        updates.isPublic = args.data.isPublic as boolean;
      if (args.data?.hiddenFields)
        updates.hiddenFields = args.data.hiddenFields as string[];
      if (args.data?.uniqueName)
        updates.uniqueName = args.data.uniqueName as string;
      if (args.data?.extension)
        updates.extension = args.data.extension as string;
      if (args.data?.auth) updates.auth = args.data.auth as AuthDetails;

      const user = await prisma.betausers.update({
        where,
        data: {
          ...updates,
        },
      });

      return user;
    },

    updateDetails: async (
      _: unknown,
      args: MutationUpdateDetailsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      let updates: Prisma.betadetailsUpdateInput = {};
      if (args.data?.email)
        updates = {
          email: args.data?.email as string,
        };
      if (args.data?.phone) {
        if (args.data?.email)
          updates = {
            ...updates,
            phone: args.data.phone as PhoneInput,
          };
        else
          updates = {
            phone: args.data.phone as PhoneInput,
          };
      }

      if (Object.keys(updates).length > 0) {
        return await prisma.betadetails.update({
          where: {
            id: args.data?.detailsId as string,
          },
          data: updates,
        });
      }
      return null;
    },
    createCompany: async (
      parent: unknown,
      args: MutationCreateCompanyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;

      const newCompany = await prisma.betacompanies.create({
        data: { name: data?.name as string },
      });
      return newCompany;
    },
    createCandidateBasic: async (
      _: unknown,
      args: MutationCreateCandidateBasicArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const d = args.data;
      if (!d?.userId) return null;

      let candidate = await prisma.betacandidates.findUnique({
        where: { userId: d.userId as string },
      });

      const updates = {} as Prisma.betacandidatesUpdateInput &
        Prisma.betacandidatesCreateInput;
      if (d.targetJobId) updates.targetJob = { connect: { id: d.targetJobId } };
      if (d.avatars && d.avatars.length > 0)
        updates.avatars = d.avatars as AvatarInput[];
      if (d.userId) updates.user = { connect: { id: d.userId } };
      if (d.targetContractType)
        updates.targetContractType = d.targetContractType as string;
      if (d.preferredLocation)
        updates.preferredLocation = d.preferredLocation as string;

      if (candidate) {
        candidate = await prisma.betacandidates.update({
          where: { userId: d.userId as string },
          data: {
            ...updates,
          },
        });
      } else {
        candidate = await prisma.betacandidates.create({
          data: { ...updates },
        });
      }
      return candidate;
    },
    deleteCompany: async (
      _: unknown,
      args: MutationDeleteCompanyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.id) {
        return await prisma.betacompanies.delete({ where: { id: args.id } });
      }
      return null;
    },
    createProAccount: async (
      _: unknown,
      args: MutationCreateProAccountArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      try {
        const data = args.data;
        if (data) {
          const userPayload = setUserPayload<Prisma.betausersCreateInput>(
            "create",
            data
          );

          let user;
          if (userPayload.email) {
            user = await prisma.betausers.findUnique({
              where: { email: userPayload.email as string },
            });
            if (user) return null;
          }

          const account = await prisma.$transaction(
            async (prisma) => {
              const where = {} as { name: string; id: string };
              if (data?.company) where.id = data.company;
              else if (data?.companyName) where.name = data.companyName;

              let company = await prisma.betacompanies.findFirst({
                where,
              });
              if (!company) {
                company = await prisma.betacompanies.create({
                  data: {
                    name: data?.companyName,
                    linkedinProfilePage: data?.linkedinProfilePage,
                    pro: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                });
              }
              if (!company) return null;

              const { extension, uniqueName } = await setUniqueNameAndExtension(
                userPayload.firstname || "",
                userPayload.lastname || "",
                0
              );

              user = await prisma.betausers.create({
                data: userPayload,
              });

              if (!user)
                await prisma.betacompanies.delete({
                  where: { id: company.id },
                });

              let details = await prisma.betadetails.findUnique({
                where: { userId: user.id },
              });
              if (!details) {
                const detailsPayload =
                  setDetailPayload<Prisma.betadetailsCreateInput>(
                    "create",
                    Object.assign({}, data, { userId: user.id })
                  );
                details = await prisma.betadetails.create({
                  data: detailsPayload,
                });
              }

              if (!details) {
                await prisma.betausers.delete({ where: { id: user.id } });
                await prisma.betacompanies.delete({
                  where: { id: company.id },
                });
              }

              if (company && details) {
                const password = `${formatForUrl(
                  faker.animal.cat()
                )}-${formatForUrl(faker.color.human())}`;
                const hash = CryptoJS.AES.encrypt(
                  password,
                  `${process.env.JWT_SECRET}`
                )?.toString();

                const updatedUser = await prisma.betausers.update({
                  where: { id: user.id },
                  data: {
                    auth: {
                      internal: { email: data?.email, hash },
                    },
                    company: { connect: { id: company.id } },
                  },
                });
                if (updatedUser) {
                  const res = await apiInstance.sendTransacEmail({
                    to: [
                      {
                        email: data?.email as string,
                        name: setName(userPayload),
                      },
                    ],
                    params: {
                      name: setName(userPayload),
                      password,
                      link: `${uriPro}/se-connecter`,
                    },
                    templateId: 26,
                  });
                  return company;
                }
              }

              return null;
            },
            { timeout: 15000 }
          );
          if (account) return account;
        }

        return null;
      } catch (err: any) {
        return null;
      }
    },
    createUser: async (
      _: unknown,
      args: MutationCreateUserArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const d = args.data;
      if (d) {
        const creates = setUserPayload<Prisma.betausersCreateInput>(
          "update",
          d
        );

        if (d?.childUserId) {
          let child = await prisma.betausers.findUnique({
            where: { id: d.childUserId },
          });
          if (child) {
            child = await prisma.betausers.update({
              where: { id: d.childUserId },
              data: creates,
            });
            const candidate = await prisma.betacandidates.findUnique({
              where: { userId: child.id },
            });

            if (candidate) {
              const candidatePayload =
                setCandidatePayload<Prisma.betacandidatesUpdateInput>(
                  "update",
                  {
                    jobId: d.job as string,
                    userId: d.childUserId,
                  }
                );
              await prisma.betacandidates.update({
                where: { userId: d.childUserId },
                data: candidatePayload,
              });
            } else {
              const candidatePayload =
                setCandidatePayload<Prisma.betacandidatesCreateInput>(
                  "create",
                  {
                    jobId: d.job as string,
                    userId: d.childUserId,
                  }
                );
              await prisma.betacandidates.create({ data: candidatePayload });
            }
          }
          if (child) return child;
        }

        const created = await prisma.$transaction(async (prisma: any) => {
          const userCreated = await prisma.betausers.create({
            data: creates,
          });

          if (d?.job) {
            const candidatePayload =
              setCandidatePayload<Prisma.betacandidatesCreateInput>("create", {
                jobId: d.job as string,
                userId: created.id,
              });
            const candidate = await prisma.betacandidates.create({
              data: candidatePayload,
            });
            if (!candidate)
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );
          }
          return userCreated;
        });
        if (created) return created;
      }

      return null;
    },
    createCandidate: async (
      _: unknown,
      args: MutationCreateCandidateArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const its = args.data as CandidateInput;

      const userPayload = {
        firstname: its.firstname,
        lastname: its.lastname,
        email: its.email,
        fullname: its.fullname,
        age: its.age,
        description: its.description,
        languages: its.languages,
        linkedinProfileId: its.linkedinProfileId,
      };

      const candidate = await prisma.$transaction(
        async (prisma) => {
          try {
            const thisCandidate = await createUpdateCandidate(prisma, its);

            await prisma.betausers.update({
              where: { id: its.userId },
              data: { ...userPayload },
            });

            await prisma.betadetails.update({
              where: { userId: its?.userId as string },
              data: {
                phone: { code: its.phone?.code, number: its.phone?.number },
              },
            });

            return thisCandidate;
          } catch (err: any) {
            throw new BackendError(err.type, err.message);
          }
        },
        { timeout: 15000 }
      );
      if (candidate) return candidate;
      return null;
    },
    deleteAccount: async (
      _: unknown,
      args: MutationDeleteUserArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const user = await prisma.betausers.findUnique({
        where: { id: args.userId as string },
        select: {
          id: true,
          email: true,
          fullname: true,
        },
      });
      if (user) {
        const result = await prisma.$transaction(async (prisma) => {
          try {
            const emailPromise = new Promise(async (resolve, reject) => {
              const res = await apiInstance.sendTransacEmail({
                to: [
                  {
                    email: user?.email as string,
                    name: user?.fullname as string,
                  },
                ],
                params: {
                  name: user?.fullname,
                },
                templateId: 38 as number,
              });
              if (res.response.statusCode !== 201) {
                reject(BACKEND_MESSAGES.PROCESSING);
              } else {
                resolve(res.body.messageId);
              }
            });

            const results = await Promise.all([
              prisma.betausers.delete({
                where: { id: user.id as string },
                select: {
                  id: true,
                },
              }),
              emailPromise,
            ]);
            return results[0];
          } catch (err: any) {
            console.log(err, "err");
            return null;
          }
        });
        if (result) return result;
      }
      return null;
    },
  },
  BetaCompany: {
    offers: async (company: BetaCompany) =>
      company.offers
        ? company.offers
        : await prisma.offers.findMany({ where: { companyId: company.id } }),
    experiences: async (company: BetaCompany) =>
      company.experiences
        ? company.experiences
        : await prisma.betaexperiences.findMany({
            where: { companyId: company.id as string },
          }),
  },
  BetaCandidate: {
    targetJob: async (candidate: BetaCandidate) =>
      candidate.targetJob
        ? candidate.targetJob
        : candidate.targetJobId
        ? await prisma.jobs.findUnique({
            where: { id: candidate.targetJobId as string },
          })
        : null,
    experiences: async (candidate: BetaCandidate) => {
      const experiences = await prisma.betaexperiences.findMany({
        where: {
          candidate: {
            id: candidate.id as string,
          },
        },
        include: {
          company: true,
        },
      });
      return experiences;
    },
    user: async (candidate: BetaCandidate) => {
      const user = (await prisma.betausers.findFirst({
        where: {
          candidate: {
            id: candidate?.id as string,
          },
        },
        include: {
          profile: true,
        },
      })) as BetaUser;
      return user;
    },
    details: async (candidate: BetaCandidate) => {
      const details = await prisma.betadetails.findFirst({
        where: {
          candidate: {
            id: candidate.id as string,
          },
        },
      });
      return details;
    },
    suggestedOpportunities: async (candidate: BetaCandidate) => {
      const opps = await prisma.offers.findMany({
        where: {
          suggestedCandidatesIds: { has: candidate.id },
        },
      });
      return opps;
    },
  },
  FormResponse: {
    question: async (response: FormResponse) =>
      response.question
        ? response.question
        : response.questionId
        ? await prisma.formQuestions.findUnique({
            where: { id: response.questionId },
          })
        : null,
  },
  BetaExperience: {
    job: async (experience: BetaExperience) =>
      experience.job
        ? experience.job
        : experience.jobId
        ? await prisma.jobs.findUnique({
            where: { id: experience.jobId },
          })
        : null,
    references: async (
      experience: BetaExperience,
      args: BetaExperienceReferencesArgs
    ) => {
      if (experience.referencesIds) {
        const references = await prisma.betaprofiles.findMany({
          where: { id: { in: experience.referencesIds as string[] } },
        });

        return references;
      }
      return [];
    },
    company: async (experience: BetaExperience) =>
      experience.company
        ? experience.company
        : experience.companyId
        ? await prisma.betacompanies.findFirst({
            where: { id: experience.companyId },
          })
        : null,
    user: async (experience: BetaExperience) => {
      return (await prisma.betausers.findFirst({
        where: {
          id: experience.userId as string,
        },
      })) as BetaUser;
    },
    candidate: async (experience: BetaExperience) => {
      return (await prisma.betacandidates.findFirst({
        where: { id: experience.candidateId as string },
      })) as BetaCandidate;
    },
  },
  BetaProfile: {
    details: async (profile: BetaProfile) => {
      const details = await prisma.betadetails.findFirst({
        where: {
          profile: {
            id: profile.id as string,
          },
        },
      });
      return details;
    },
    user: async (profile: BetaProfile) => {
      const user = (await prisma.betausers.findFirst({
        where: {
          profile: {
            id: profile.id as string,
          },
        },
      })) as BetaUser;
      return user;
    },
  },
  BetaDetails: {
    profile: async (details: BetaDetails) => {
      const profile = (await prisma.betaprofiles.findFirst({
        where: {
          id: details.profileId as string,
        },
        include: {
          user: true,
        },
      })) as BetaProfile;

      return profile;
    },
    user: async (details: BetaDetails) => {
      return details.user
        ? details.user
        : details.userId
        ? await prisma.betausers.findFirst({
            where: { id: details.userId },
          })
        : null;
    },
    candidate: async (details: BetaDetails) => {
      return details.candidate
        ? details.candidate
        : details.candidateId
        ? await prisma.betacandidates.findFirst({
            where: { id: details.candidateId },
          })
        : null;
    },
  },
  Meet: {
    meetCandidate: async (meet: Meet) =>
      meet.meetCandidate
        ? meet.meetCandidate
        : meet.meetCandidateId
        ? await prisma.meetcandidates.findUnique({
            where: { id: meet.meetCandidateId as string },
          })
        : null,
    meetRecruiter: async (meet: Meet) =>
      meet.meetRecruiter
        ? meet.meetRecruiter
        : meet.meetRecruiterId
        ? await prisma.meetrecruiters.findUnique({
            where: { id: meet.meetRecruiterId as string },
          })
        : null,
  },
  MeetCandidate: {
    videos: async (candidate: MeetCandidate) =>
      candidate.videos
        ? candidate.videos
        : await prisma.videos.findMany({
            where: { meetCandidateId: candidate.id },
          }),
  },
  BetaUser: {
    affiliations: async (user: BetaUser) => {
      const affiliations = await prisma.affiliations.findMany({
        where: { parentId: user.id },
        include: { children: true },
      });
      return affiliations;
    },
    details: async (user: BetaUser) => {
      const details = await prisma.betadetails.findUnique({
        where: { userId: user.id as string },
      });
      return details;
    },
    roles: async (user: BetaUser) => {
      const roles = await prisma.jobs.findMany({
        where: { usersIds: { hasSome: user.rolesIds as string[] } },
      });
      return roles;
    },
    candidate: async (user: BetaUser) =>
      user.candidate
        ? user.candidate
        : await prisma.betacandidates.findUnique({
            where: { userId: user.id as string },
          }),
    company: async (user: BetaUser) =>
      user.company
        ? user.company
        : user.companyId
        ? await prisma.betacompanies.findFirst({
            where: { id: user.companyId },
          })
        : null,
    videos: async (user: BetaUser) => {
      let videos: Video[] = [];
      if (user.videos) videos = user.videos as Video[];
      else if (user.id)
        videos = await prisma.videos.findMany({ where: { userId: user.id } });
      // return result;
      return videos;
    },
    candidateQueues: async (user: BetaUser) =>
      user.candidateQueues
        ? user.candidateQueues
        : await prisma.betaqueues.findMany({ where: { targetId: user.id } }),
    profileViews: async (user: BetaUser) =>
      user.profileViews
        ? user.profileViews
        : await prisma.profileviews.findMany({ where: { userId: user.id } }),
  },
  BetaQueue: {
    offerTarget: async (queue: BetaQueue) =>
      queue.offerTarget
        ? queue.offerTarget
        : queue.offerTargetId
        ? await prisma.offers.findUnique({
            where: { id: queue.offerTargetId },
          })
        : null,
    customisation: async (queue: BetaQueue) =>
      queue.customisation
        ? queue.customisation
        : queue.customisationId
        ? await prisma.customisations.findUnique({
            where: { id: queue.customisationId },
          })
        : null,
    target: async (queue: BetaQueue) =>
      queue.target
        ? queue.target
        : queue.targetId
        ? await prisma.betausers.findUnique({
            where: { id: queue.targetId },
          })
        : null,
    origin: async (queue: BetaQueue) =>
      queue.origin
        ? queue.origin
        : queue.originId
        ? await prisma.betausers.findUnique({
            where: { id: queue.originId },
          })
        : null,
  },
  BetaWhatsappThread: {
    responses: async (thread: BetaWhatsappThread) => {
      return thread.responses
        ? thread.responses
        : await prisma.betawhatsappresponses.findMany({
            where: { threadId: thread.id },
          });
    },
    queue: async (thread: BetaWhatsappThread) =>
      thread.queue
        ? thread.queue
        : thread.queueId
        ? await prisma.betaqueues.findFirst({
            where: {
              id: thread.queueId as string,
            },
          })
        : null,
    exchanges: async (thread: BetaWhatsappThread) =>
      thread.exchanges
        ? thread.exchanges
        : await prisma.betawhatsappexchanges.findMany({
            where: { threadId: thread.id },
          }),
  },
  BetaWhatsappResponse: {
    exchange: async (response: BetaWhatsappResponse) => {
      return response.exchange
        ? response.exchange
        : response.exchangeId
        ? await prisma.betawhatsappexchanges.findUnique({
            where: { id: response.exchangeId },
          })
        : null;
    },
  },
  Job: {
    topSector: async (job: Job) =>
      job.topSector
        ? job.topSector
        : job.topSectorId
        ? await prisma.topsectors.findUnique({
            where: { id: job.topSectorId as string },
          })
        : null,
    questions: async (job: Job) =>
      job.questions
        ? job.questions
        : await prisma.questions.findMany({
            where: { jobId: job.id as string },
          }),
  },
  Favorite: {
    origin: async (favorite: Favorite) =>
      favorite.origin
        ? favorite.origin
        : favorite.originId
        ? await prisma.betausers.findFirst({
            where: { id: favorite.originId },
          })
        : null,
    target: async (favorite: Favorite) =>
      favorite.target
        ? favorite.target
        : favorite.targetId
        ? await prisma.betausers.findFirst({
            where: { id: favorite.targetId },
          })
        : null,
  },
  VerificationRequest: {
    origin: async (request: VerificationRequest) =>
      request.origin
        ? request.origin
        : request.originId
        ? await prisma.betausers.findFirst({
            where: { id: request.originId },
          })
        : null,
    target: async (request: VerificationRequest) =>
      request.target
        ? request.target
        : request.targetId
        ? await prisma.betausers.findFirst({
            where: { id: request.targetId },
          })
        : null,
  },
  UserRemark: {
    user: async (remark: UserRemark) =>
      remark.user
        ? remark.user
        : remark.userId
        ? await prisma.betausers.findUnique({ where: { id: remark.userId } })
        : null,
  },
  InterviewOffer: {
    origin: async (interview: InterviewOffer) =>
      interview.origin
        ? interview.origin
        : interview.originId
        ? await prisma.betausers.findFirst({
            where: { id: interview.originId },
          })
        : null,
    target: async (interview: InterviewOffer) =>
      interview.target
        ? interview.target
        : interview.targetId
        ? await prisma.betausers.findFirst({
            where: { id: interview.targetId },
          })
        : null,
  },
  Customisation: {
    questions: async (customisation: Customisation) => {
      return customisation.questions
        ? customisation.questions
        : await prisma.questions.findMany({
            where: {
              customisationId: customisation.id,
            },
          });
    },
  },
  BetaWhatsappExchange: {
    question: async (exchange: BetaWhatsappExchange) =>
      exchange.question
        ? exchange.question
        : exchange.questionId
        ? await prisma.questions.findUnique({
            where: { id: exchange.questionId },
          })
        : null,
    responses: async (exchange: BetaWhatsappExchange) =>
      exchange.responses
        ? exchange.responses
        : await prisma.betawhatsappresponses.findMany({
            where: { exchangeId: exchange.id },
          }),
  },
  Offer: {
    author: async (offer: Offer) => {
      return offer.author
        ? offer.author
        : offer.authorId
        ? await prisma.betausers.findUnique({
            where: {
              id: offer.authorId as string,
            },
          })
        : null;
    },
    sector: async (offer: Offer) => {
      return offer.sector
        ? offer.sector
        : offer.sectorId
        ? await prisma.topsectors.findUnique({
            where: {
              id: offer.sectorId as string,
            },
          })
        : null;
    },
    job: async (offer: Offer) => {
      return offer.job
        ? offer.job
        : offer.jobId
        ? await prisma.jobs.findUnique({
            where: {
              id: offer.jobId as string,
            },
          })
        : null;
    },
    company: async (offer: Offer) => {
      return offer.company
        ? offer.company
        : offer.companyId
        ? await prisma.betacompanies.findUnique({
            where: {
              id: offer.companyId as string,
            },
          })
        : null;
    },
    requirements: async (offer: Offer) => {
      return offer.requirements
        ? offer.requirements
        : offer.requirementsIds
        ? await prisma.references.findMany({
            where: {
              id: { in: offer.requirementsIds as string[] },
            },
          })
        : [];
    },
    sharings: async (offer: Offer) =>
      offer.sharings
        ? offer.sharings
        : offer.id
        ? await prisma.profileSharings.findMany({
            where: { offerTargetId: offer.id },
          })
        : [],
  },
  ReferenceContact: {
    experience: async (contact: ReferenceContact) =>
      contact.experience
        ? contact.experience
        : contact.experienceId
        ? await prisma.betaexperiences.findUnique({
            where: { id: contact.experienceId as string },
          })
        : null,
  },
  Reference: {
    experience: async (reference: Reference) => {
      return reference.experience
        ? reference.experience
        : reference.experienceId
        ? await prisma.betaexperiences.findUnique({
            where: {
              id: reference.experienceId,
            },
          })
        : null;
    },
  },
  Video: {
    company: async (video: Video) =>
      video.company
        ? video.company
        : video.companyId
        ? await prisma.betacompanies.findUnique({
            where: { id: video.companyId as string },
          })
        : null,
    user: async (video: Video) =>
      video.user
        ? video.user
        : video.userId
        ? await prisma.betausers.findUnique({
            where: { id: video.userId as string },
          })
        : null,
    job: async (video: Video) =>
      video.job
        ? video.job
        : video.jobId
        ? await prisma.jobs.findUnique({
            where: { id: video.jobId as string },
          })
        : null,
    sharings: async (video: Video) =>
      video.sharings
        ? video.sharings
        : await prisma.profileSharings.findMany({
            where: { videoId: video.id as string },
          }),
    meetCandidate: async (video: Video) =>
      video.meetCandidate
        ? video.meetCandidate
        : video.meetCandidateId
        ? await prisma.meetcandidates.findUnique({
            where: { id: video.meetCandidateId as string },
          })
        : null,
  },
  Notification: {
    origin: async (notif: Notification) =>
      notif.origin
        ? notif.origin
        : notif.originId
        ? await prisma.betausers.findUnique({
            where: { id: notif.originId as string },
          })
        : null,
    target: async (notif: Notification) =>
      notif.target
        ? notif.target
        : notif.targetId
        ? await prisma.betausers.findUnique({
            where: { id: notif.targetId as string },
          })
        : null,
    feedback: async (notif: Notification) =>
      notif.feedback
        ? notif.feedback
        : notif.feedbackId
        ? await prisma.feedback.findUnique({
            where: { id: notif.feedbackId as string },
          })
        : null,
    refusal: async (notif: Notification) =>
      notif.refusal
        ? notif.refusal
        : notif.refusalId
        ? await prisma.sharingRefusals.findUnique({
            where: { id: notif.refusalId as string },
          })
        : null,
  },
  ProfileSharing: {
    origin: async (sharing: ProfileSharing) =>
      sharing.origin
        ? sharing.origin
        : sharing.originId
        ? await prisma.betausers.findUnique({
            where: { id: sharing.originId as string },
          })
        : null,
    target: async (sharing: ProfileSharing) =>
      sharing.target
        ? sharing.target
        : sharing.targetId
        ? await prisma.betacompanies.findUnique({
            where: { id: sharing.targetId as string },
          })
        : null,
    offerTarget: async (sharing: ProfileSharing) =>
      sharing.offerTarget
        ? sharing.offerTarget
        : sharing.offerTargetId
        ? await prisma.offers.findUnique({
            where: { id: sharing.offerTargetId as string },
          })
        : null,
    video: async (sharing: ProfileSharing) =>
      sharing.video
        ? sharing.video
        : sharing.videoId
        ? await prisma.videos.findUnique({
            where: { id: sharing.videoId as string },
          })
        : null,
  },
};

export default resolvers;
