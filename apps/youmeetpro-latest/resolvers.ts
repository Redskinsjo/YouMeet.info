import prisma from "@youmeet/prisma-config/prisma";
import {
  Resolvers,
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
  MutationDeleteQueueArgs,
  PhoneInput,
  QueryOneQueueArgs,
  QueryOneCandidateArgs,
  MutationCreateLeadArgs,
  QueryOneLeadArgs,
  MutationUpdateUserArgs,
  MutationDeleteLeadArgs,
  MutationDeleteUserArgs,
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
  MutationSubmitVideoArgs,
  MutationCreateOfferArgs,
  QueryOneOfferArgs,
  MutationDeleteOfferArgs,
  QueryOneFavoriteArgs,
  QueryMyFavoritesArgs,
  MutationCreateFavoriteArgs,
  Favorite,
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
  CreateUserRemarkMutationVariables,
  QueryOneUserInterviewsArgs,
  QueryAccountInfosArgs,
  MutationUnlockArgs,
  QueryMyUnlockedUsersArgs,
  MutationCreateUserArgs,
  UnlockedUser,
  MutationUpdateVideoArgs,
  MutationCreateConversationArgs,
  Translated,
  BetaQueue,
  MutationUpdateQueueArgs,
  MutationCreateCustomisationArgs,
  MutationCreateQuestionArgs,
  MutationCreateQueueArgs,
  QueryRecruiterQueuesFromProfileArgs,
  MutationCreateErrorArgs,
  MutationCreateSharingRefusalArgs,
  QueryOneMeetArgs,
  Meet,
  QueryMeetsArgs,
  MutationCreateFeedbackArgs,
  QuerySendEmailArgs,
  QueryOneThreadArgs,
  BetaWhatsappThread,
  MeetCandidate,
} from "@youmeet/gql/generated";
import { v2 as cloudinary } from "cloudinary";
import { getExperienceDuration } from "@youmeet/utils/resolvers/getExperienceDuration";
import { s } from "@youmeet/utils/basics/jwt";
import * as SendinBlue from "@sendinblue/client";
import CryptoJS from "crypto-js";
import { formatForDb } from "@youmeet/utils/resolvers/formatCompetencyTitle";
import { uri, uriCandidates } from "@youmeet/functions/imports";
import { FilterText } from "@youmeet/types/api/WhereArgs";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import {
  generateChat,
  getSystemCxt,
  questionCtx,
} from "@youmeet/utils/basics/generateChat";
import { setName } from "@youmeet/utils/basics/setName";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";
import {
  getCompanyName,
  getJobTitle,
} from "@youmeet/utils/basics/formatForEmails";
import { ContextRequest } from "@youmeet/types/ContextRequest";
import { noCorsMiddleware } from "@youmeet/utils/basics/noCorsMiddleware";
import { isValidObjectId } from "mongoose";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import {
  setDetailPayload,
  setUserPayload,
} from "@youmeet/utils/basics/setPayload";
import {
  createDetailsResolver,
  createUserResolver,
} from "@youmeet/utils/resolvers/creates";
import { Prisma } from "@prisma/client";

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
          recruiterName: data?.recruiterName,
        },
        templateId: data?.templateId as number,
      });
      if (res.response.statusCode === 201) {
        return { success: true };
      }
      return { error: true };
    },
    meets: async (
      _: unknown,
      args: QueryMeetsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const data = args.data;
      const filters = {} as Prisma.meetsWhereInput;

      if (data?.expired !== undefined)
        filters.expired = data.expired as boolean;
      if (data?.meetRecruiterId) filters.meetRecruiterId = data.meetRecruiterId;
      if (data?.meetCandidateId) filters.meetCandidateId = data.meetCandidateId;

      const params = {} as { where?: Prisma.meetsWhereInput };
      if (Object.keys(filters).length > 0) params.where = filters;
      return await prisma.meets.findMany(params);
    },
    oneMeet: async (
      _: unknown,
      args: QueryOneMeetArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const id = args.id;

      if (id && isValidObjectId(id)) {
        return await prisma.meets.findUnique({
          where: { id },
          include: {
            meetRecruiter: true,
            meetCandidate: { include: { videos: true, job: true } },
          },
        });
      }
      return null;
    },
    videos: async (_: unknown, args: any, context: ContextRequest) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      return await prisma.videos.findMany({ include: { user: true } });
    },
    recruiterQueuesFromProfile: async (
      _: unknown,
      args: QueryRecruiterQueuesFromProfileArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const originId = args.originId;
      const targetId = args.targetId;
      if (originId && targetId) {
        return await prisma.betaqueues.findMany({
          where: { originId, targetId },
          include: {
            customisation: true,
            target: true,
          },
        });
      }
      return [];
    },
    myUnlockedUsers: async (
      _: unknown,
      args: QueryMyUnlockedUsersArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      if (args.originId) {
        return await prisma.unlockedUsers.findMany({
          where: { originId: args.originId },
          include: { origin: true, target: true },
        });
      }
      return [];
    },
    oneUserInterviews: async (
      _: unknown,
      args: QueryOneUserInterviewsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
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
      return (await prisma.betausers.findUnique({
        where: { id: userId as string },
        include: {
          company: true,
          candidate: true,
          details: true,
          videos: true,
          experiences: true,
          unvolonteerInterviewOffer: true,
        },
      })) as BetaUser;
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
      if (args.id) {
        return await prisma.articles.findUnique({
          where: { id: args.id as string },
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
        async (prisma: any) => {
          const leads = [];
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
    oneThread: async (
      _: unknown,
      args: QueryOneThreadArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const id = args.id;
      const queueId = args.queueId;
      const filters = {} as Prisma.betawhatsappthreadsWhereInput;
      if (id) filters.id = id;
      if (queueId) filters.queueId = queueId;

      if (id || queueId) {
        const thread = await prisma.betawhatsappthreads.findFirst({
          where: filters,
          include: { queue: true, responses: true },
        });
        return thread;
      }
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
      const responses = await prisma.formResponses.findMany({
        where: { leadId: args.leadId as string },
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
      const companyId = args.data?.companyId;
      if (companyId) {
        return await prisma.offers.findMany({
          where: { companyId },
        });
      }
      return null;
    },
    oneProfileSharing: async (
      _: unknown,
      args: QueryOneProfileSharingArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const where = {} as Prisma.profileSharingsWhereInput;
      if (args.data?.id) where.id = args.data?.id;
      if (args.data?.originId) where.originId = args.data?.originId;
      if (args.data?.targetId) where.targetId = args.data?.targetId;
      if (args.data?.offerTargetId)
        where.offerTargetId = args.data?.offerTargetId;
      const sharing = await prisma.profileSharings.findFirst({
        where,
        include: { target: true, origin: true, offerTarget: true },
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
      if (args.timePeriod) {
        where.createdAt = {
          gte: new Date(now - 1000 * 3600 * args.timePeriod),
        };
      }

      return await prisma.notifications.findMany({ where });
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
      if (!args.targetId || !args.originId) return null;
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
    myFavorites: async (
      _: unknown,
      args: QueryMyFavoritesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const d = args.data;
      const whereOr = [] as Prisma.favoritesWhereInput[];
      const where = {} as Prisma.favoritesWhereInput;
      if (!d?.originId) return null;
      if (args.first?.search) {
        where.target = {
          fullname: {
            contains: args.first?.search as string,
            mode: "insensitive",
          },
        };
      }
      if (d?.isVideo !== undefined || d?.isCustomerId !== undefined) {
        if (d.isVideo)
          where.target = { videos: { some: { id: { not: undefined } } } };
        if (d.isCustomerId)
          where.target = { customerId: { isSet: d.isCustomerId } };
      }
      if (d?.isLinkedin !== undefined) {
        where.target = d?.isLinkedin
          ? {
              AND: [
                { linkedinProfileId: { not: undefined } },
                { linkedinProfileId: { not: "" } },
              ],
            }
          : {
              OR: [
                { linkedinProfileId: { isSet: false } },
                { linkedinProfileId: "" },
              ],
            };
      }
      if (d?.isPhone !== undefined) {
        where.target = {
          details: {
            phone: d?.isPhone
              ? {
                  is: {
                    AND: [
                      { code: { not: undefined } },
                      { code: { not: "" } },
                      { number: { not: undefined } },
                      { number: { not: "" } },
                    ],
                  },
                }
              : { isSet: false },
          },
        };
      }
      let take = {} as { take?: number };
      if (args.first?.take) take = { take: args.first.take };
      let skip = {} as { skip?: number };
      if (args.first?.skip) skip = { skip: args.first.skip };

      if (d?.isLogo !== undefined)
        where.target = {
          candidate: { avatars: { isEmpty: !d.isLogo } },
        };
      if (d?.jobs && d.jobs.length > 0)
        where.target = {
          experiences: {
            some: { job: { id: { in: d.jobs as string[] } } },
          },
        };
      if (d?.sectors && d.sectors.length > 0) {
        whereOr.push({
          target: {
            candidate: { targetJobId: { in: d.sectors as string[] } },
          },
        });
        whereOr.push({
          target: {
            experiences: {
              some: {
                job: { topSectorId: { in: d.sectors as string[] } },
              },
            },
          },
        });
      }
      if (args.first?.search) {
        whereOr.push({
          target: {
            fullname: {
              contains: args.first.search as string,
              mode: "insensitive",
            },
          },
        });
        whereOr.push({
          target: {
            experiences: {
              some: {
                job: {
                  title: {
                    is: {
                      fr: {
                        contains: args.first.search as string,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            },
          },
        });
        whereOr.push({
          target: {
            experiences: {
              some: {
                job: {
                  title: {
                    is: {
                      en: {
                        contains: args.first.search as string,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }
      where.originId = d?.originId;

      if (whereOr && whereOr.length > 0) where.OR = whereOr;

      return await prisma.favorites.findMany({
        where,
        ...take,
        ...skip,
        include: {
          origin: true,
          target: {
            include: {
              experiences: { include: { company: true, job: true } },
              candidate: {
                include: { targetJob: { include: { topSector: true } } },
              },
              videos: { include: { job: true } },
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

      const OR = [] as Prisma.offersWhereInput[];
      const where = {} as Prisma.offersWhereInput;

      const data = args.data;
      const jobs = data?.jobs as string[];
      const sectors = data?.sectors as string[];
      const title = data?.title as string;

      if (jobs && jobs.length > 0) where.jobId = { in: jobs };
      if (sectors && sectors.length > 0) where.sectorId = { in: sectors };
      if (title) {
        let translated = {} as { is: { fr: FilterText } | { en: FilterText } };
        if (data?.language === "fr")
          translated.is = { fr: { contains: title, mode: "insensitive" } };
        if (data?.language === "en")
          translated.is = { en: { contains: title, mode: "insensitive" } };

        where.OR = [
          { job: { title: translated } },
          { intitule: { contains: title, mode: "insensitive" } },
        ];
      }

      if (args.params?.search) {
        OR.push({
          company: {
            name: { mode: "insensitive", contains: args.params.search },
          },
        });
        OR.push({
          job: {
            title: {
              is: { fr: { mode: "insensitive", contains: args.params.search } },
            },
          },
        });
      }
      if (data?.targetSectorId) {
        where.sectorId = { in: [data.targetSectorId] };
      }
      let take = {} as { take?: number };
      if (args.params?.take) take = { take: args.params.take };
      let skip = {} as { skip?: number };
      if (args.params?.skip) skip = { skip: args.params.skip };

      if (OR?.length > 0) where.OR = OR;

      return await prisma.offers.findMany({
        where,
        ...skip,
        ...take,
        include: {
          requirements: true,
          job: true,
          sector: true,
          author: true,
          company: true,
        },
      });
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
    },
    oneCompetency: async (
      _: unknown,
      args: QueryOneCompetencyArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      if (args.id) {
        return await prisma.competencies.findUnique({
          where: { id: args.id as string },
        });
      }
      if (formatForDb(args.title as string)) {
        const competency = await prisma.competencies.findFirst({
          where: { title: formatForDb(args.title as string) },
        });
        return competency;
      }
      return null;
    },
    competencies: async (
      _: unknown,
      args: QueryCompetenciesArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const where = {} as { id: { in: string[] } };
      if (args.data?.in) where.id = { in: (args.data.in as string[]) || [] };
      return await prisma.competencies.findMany({ where });
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

        console.log(user, "user");

        if (!user) return null;
        if (!user.pro) return null;

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
      let where = {} as {
        id?: string;
        name?: { equals?: string; contains?: string; mode?: "insensitive" };
        isPublic?: boolean;
        scrapped?: boolean;
        pro?: boolean;
      };
      if (args.id) where.id = args.id;
      if (args.filters?.name)
        where.name = args.filters.exact
          ? { equals: formatForDb(args.filters.name), mode: "insensitive" }
          : { contains: args.filters.name };
      if (args.filters?.isPublic !== undefined)
        where.isPublic = args.filters.isPublic as boolean;
      if (args.filters?.scrapped !== undefined)
        where.scrapped = args.filters.scrapped as boolean;
      if (args.filters?.pro !== undefined)
        where.pro = args.filters.pro as boolean;

      const company = await prisma.betacompanies.findFirst({
        where,
        include: {
          offers: true,
          videos: true,
          experiences: {
            include: {
              references: { include: { user: true } },
              user: true,
              details: true,
            },
          },
        },
      });
      return company;
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
        return await prisma.jobs.findFirst({
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
      const whereOr = [] as Prisma.jobsWhereInput[];

      where.type = { isSet: false };

      if (d?.title) {
        const filter = { mode: "insensitive" } as FilterText;
        if (d.contains) filter.contains = d.title;
        else filter.startsWith = d.title;
        where.title = { is: { fr: filter } };
      }
      if (d?.topSectorIds && d.topSectorIds.length > 0)
        whereOr.push({
          topSectorId: { in: (d?.topSectorIds as string[]) || [] },
        });
      if (d?.in) whereOr.push({ id: { in: d.in as string[] } });

      if (whereOr && whereOr.length > 0) where.OR = whereOr;
      return await prisma.jobs.findMany({
        where,
      });
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
          let templateId = lead.type === "candidate" ? 17 : 7;
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
      if (args.id) {
        const lead = await prisma.leads.findFirst({
          where: { id: args.id as string },
        });
        return lead;
      }
      return null;
    },
    leads: async (_: unknown, args: any, context: ContextRequest) => {
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
        return (await prisma.betacandidates.findUnique({
          where: { userId: args.userId as string },
          include: {
            targetJob: {
              include: { topSector: true },
            },
          },
        })) as BetaCandidate;
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
      return candidate as BetaCandidate;
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
      const originId = args.originId;
      const targetId = args.targetId;
      if (originId) {
        const where = {} as { originId: string; targetId: string };
        if (originId) where.originId = originId;
        if (targetId) where.targetId = targetId;
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
      // if (args.details?.pro) where.pro = args.details?.pro;
      // if (args.details?.user) where.user = args.details?.user;

      return await prisma.betausers.findUnique({
        where,
        include: {
          company: true,
        },
      });
    },
    users: async (
      parent: unknown,
      args: QueryUsersArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return [];
      const d = args.data;
      const where = {} as Prisma.betausersWhereInput;
      const whereOr = [] as Prisma.betausersWhereInput[];

      if (d?.isVideo !== undefined || d?.isCustomerId !== undefined) {
        if (d.isVideo) where.videos = { some: { id: { not: undefined } } };
        if (d.isCustomerId) where.customerId = { isSet: d.isCustomerId };
      }
      if (d?.isLinkedin !== undefined) {
        if (d.isLinkedin)
          where.AND = [
            { linkedinProfileId: { not: undefined } },
            { linkedinProfileId: { not: "" } },
          ];
        if (!d.isLinkedin) {
          whereOr.push({ linkedinProfileId: { isSet: false } });
          whereOr.push({ linkedinProfileId: "" });
        }
      }
      if (d?.isPhone !== undefined) {
        where.details = {
          phone: d?.isPhone
            ? {
                is: {
                  AND: [
                    { code: { not: undefined } },
                    { code: { not: "" } },
                    { number: { not: undefined } },
                    { number: { not: "" } },
                  ],
                },
              }
            : { isSet: false },
        };
      }

      if (d?.user! == undefined && d?.pro !== undefined) {
        whereOr.push({ user: d?.user as unknown as boolean });
        whereOr.push({ pro: d?.pro as boolean });
      } else if (d?.user !== undefined) {
        where.user = d.user as boolean;
      } else if (d?.pro !== undefined) where.pro = d.pro as boolean;

      if (d?.jobs && d?.jobs.length > 0) {
        where.experiences = {
          some: { job: { id: { in: d.jobs as string[] } } },
        };
      }

      if (d?.sectors && d.sectors.length > 0) {
        whereOr.push({
          experiences: {
            some: {
              job: { topSectorId: { in: d.sectors as string[] } },
            },
          },
        });
        whereOr.push({
          candidate: {
            targetJobId: { in: d.sectors as string[] },
          },
        });
      }

      let take = {} as { take?: number };

      if (args.first?.take) take = { take: args.first.take };
      let skip = {} as { skip?: number };
      if (args.first?.skip) skip = { skip: args.first.skip };
      if (args.first?.search) {
        whereOr.push({
          fullname: {
            contains: args.first.search as string,
            mode: "insensitive",
          },
        });
        whereOr.push({
          experiences: {
            some: {
              job: {
                title: {
                  is: {
                    fr: {
                      contains: args.first.search as string,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          },
        });
        whereOr.push({
          experiences: {
            some: {
              job: {
                title: {
                  is: {
                    en: {
                      contains: args.first.search as string,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          },
        });
      }
      if (whereOr.length > 0) where.OR = whereOr;

      const users = await prisma.betausers.findMany({
        where,
        ...take,
        ...skip,
        include: {
          unvolonteerFavorites: true,
          experiences: {
            include: {
              job: { select: { id: true, title: true } },
              company: { select: { id: true, name: true } },
            },
          },
          candidate: {
            select: {
              id: true,
              avatars: true,
              targetJob: true,
              targetContractType: true,
            },
          },
          details: {
            select: {
              id: true,
              phone: true,
            },
          },
          videos: true,
        },
      });

      return users;
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

      if (args.uniqueName) where.uniqueName = args.uniqueName as string;
      if (args.userId) where.id = args.userId as string;
      if (args.email) where.email = args.email.toLowerCase();
      if (args.originId && args.userId) {
        const unlocked = await prisma.unlockedUsers.findFirst({
          where: { targetId: args.userId, originId: args.originId },
        });
        if (!unlocked) return null;
      }
      return (await prisma.betausers.findUnique({
        where,
        include: {
          candidate: true,
          company: true,
          myOffers: true,
          videos: true,
        },
      })) as BetaUser;
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
        name: { contains: string; mode: "insensitive" | "default" | undefined };
        video?: { isSet: boolean };
        logo?: { isSet: boolean };
      };

      if (filters?.isLogo !== undefined)
        where.logo = { isSet: filters.isLogo as boolean };
      if (filters?.isVideo !== undefined)
        where.video = { isSet: filters.isVideo as boolean };

      if (name) where.name = { mode: "insensitive", contains: name };
      const companies = await prisma.betacompanies.findMany({
        where,
        ...take,
        ...skip,
      });
      return companies;
    },
  },
  Mutation: {
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
    updateQueue: async (
      _: unknown,
      args: MutationUpdateQueueArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const id = args.id;
      const data = args.data;
      if (id) {
        const updates = {} as Prisma.betaqueuesUpdateInput;
        if (data?.status) updates.status = data.status;
        const queue = await prisma.betaqueues.update({
          where: { id },
          data: { ...updates, updatedAt: new Date() },
        });

        return queue;
      }
      return null;
    },
    createCustomisation: async (
      _: unknown,
      args: MutationCreateCustomisationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const jobId = args.jobId;
      const originId = args.originId;
      if (jobId && originId) {
        const job = await prisma.jobs.findUnique({
          where: { id: jobId as string },
        });

        const jobTitle = (job?.title as Translated)["fr"] || "";

        const customisation = await prisma.customisations.create({
          data: {
            origin: { connect: { id: originId as string } },
            name: jobTitle || "Default",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        return customisation;
      }
      return null;
    },
    createQuestion: async (
      _: unknown,
      args: MutationCreateQuestionArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;

      if (data?.jobId) {
        const job = await prisma.jobs.findUnique({
          where: { id: data.jobId as string },
        });
        if (data.question) {
          const question = data.question;
          if (
            data.companyName &&
            data.candidateName &&
            data.customisationId &&
            data.originId
          ) {
            if (question) {
              const systemCtx = getSystemCxt(
                questionCtx(
                  question?.type as string,
                  question?.prefix as string,
                  question?.text as string,
                  data.companyName as string,
                  data.candidateName as string,
                  `${job?.title?.fr}/${job?.title?.en}`
                )
              );
              let chat;
              try {
                chat = await generateChat(
                  1,
                  100,
                  1,
                  1,
                  1,
                  [systemCtx],
                  "gpt-3.5-turbo"
                );
              } catch (err: any) {
                throw new BackendError(err.type, err.message);
              }
              const message = chat?.choices[0].message.content;

              return await prisma.questions.create({
                data: {
                  type: question?.type,
                  prefix: question?.prefix,
                  generated: message,
                  text: question?.text,
                  job: { connect: { id: data.jobId as string } },
                  customisation: {
                    connect: { id: data.customisationId as string },
                  },
                  origin: { connect: { id: data.originId as string } },
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            }
          }
        }
      }

      return null;
    },
    createQueue: async (
      _: unknown,
      args: MutationCreateQueueArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;

      if (data?.jobId) {
        const job = await prisma.jobs.findUnique({
          where: { id: data.jobId as string },
        });
        if (
          data?.originId &&
          data.targetId &&
          data.customisationId &&
          data.offerTargetId
        ) {
          const queue = await prisma.betaqueues.create({
            data: {
              origin: { connect: { id: data.originId as string } },
              target: { connect: { id: data.targetId as string } },
              customisation: {
                connect: { id: data.customisationId as string },
              },
              offerTarget: { connect: { id: data.offerTargetId as string } },
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            include: { target: { include: { company: true } }, origin: true },
          });

          if (queue) {
            if (queue.origin?.companyId) {
              const company = await prisma.betacompanies.findUnique({
                where: { id: queue.origin?.companyId },
              });
              const res = await apiInstance.sendTransacEmail({
                to: [
                  {
                    email: queue.target?.email as string,
                    name: setName(queue.target) as string,
                  },
                ],
                params: {
                  origin: company?.name,
                  target: setName(queue.target),
                  jobTitle: `${(job?.title as Translated).fr}/${
                    (job?.title as Translated).en
                  }`,
                  uri: uriCandidates,
                },
                templateId: 27,
              });
              if (res.response.statusCode !== 201) {
                return null;
              }
              // pas d'erreur, continue
            } else {
              return null;
            }
          }
          return queue;
        }
      }

      return null;
    },
    createConversation: async (
      _: unknown,
      args: MutationCreateConversationArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data?.jobId && data.originId && data.targetId) {
        const job = await prisma.jobs.findUnique({
          where: { id: data.jobId as string },
        });

        const jobTitle = (job?.title as Translated)["fr"] || "";

        const customisation = await prisma.customisations.create({
          data: {
            origin: { connect: { id: data.originId as string } },
            name: jobTitle || "Default",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        if (data.questions) {
          await Promise.all(
            data.questions.map(async (question) => {
              const systemCtx = getSystemCxt(
                questionCtx(
                  question?.type as string,
                  question?.prefix as string,
                  question?.text as string,
                  data.companyName as string,
                  data.candidateName as string,
                  `${job?.title?.fr}/${job?.title?.en}`
                )
              );
              let chat;
              try {
                chat = await generateChat(
                  1,
                  500,
                  1,
                  1,
                  1,
                  [systemCtx],
                  "gpt-4o"
                );
              } catch (err: any) {
                throw new BackendError(err.type, err.message);
              }
              const message = chat?.choices[0].message.content;

              return await prisma.questions.create({
                data: {
                  type: question?.type,
                  prefix: question?.prefix,
                  generated: message,
                  text: question?.text,
                  job: { connect: { id: data.jobId as string } },
                  customisation: {
                    connect: { id: customisation.id as string },
                  },
                  origin: { connect: { id: data.originId as string } },
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
            })
          ).catch((err: any) => {
            throw new BackendError(err.type, err.message);
          });
        }

        const queue = await prisma.betaqueues.create({
          data: {
            origin: { connect: { id: data.originId as string } },
            target: { connect: { id: data.targetId as string } },
            customisation: { connect: { id: customisation.id as string } },
            offerTarget: { connect: { id: data.offerTargetId as string } },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          include: { target: { include: { company: true } }, origin: true },
        });

        if (queue) {
          if (queue.origin?.companyId) {
            const company = await prisma.betacompanies.findUnique({
              where: { id: queue.origin?.companyId },
            });
            const res = await apiInstance.sendTransacEmail({
              to: [
                {
                  email: queue.target?.email as string,
                  name: setName(queue.target) as string,
                },
              ],
              params: {
                origin: company?.name,
                target: setName(queue.target),
                jobTitle: `${(job?.title as Translated).fr}/${
                  (job?.title as Translated).en
                }`,
                uri,
              },
              templateId: 27,
            });
            if (res.response.statusCode !== 201) {
              return null;
            }
            // pas d'erreur, continue
          } else {
            return null;
          }
        }
        return queue;
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
      if (data?.content && (data.userId || data.candidateId)) {
        const creates = {} as Prisma.feedbackCreateInput;
        const feedback = prisma.$transaction(async (prisma: any) => {
          if (data.content) creates.content = data.content;
          if (data.userId) creates.user = { connect: { id: data.userId } };
          if (data.authorId)
            creates.author = { connect: { id: data.authorId } };
          if (data.candidateId)
            creates.candidate = { connect: { id: data.candidateId } };
          if (data.recruiterId)
            creates.recruiter = { connect: { id: data.recruiterId } };
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
        const updates = { updatedAt: new Date() } as Prisma.videosUpdateInput;

        if (data.transcript) updates.transcript = data.transcript;
        if (data.confidence !== undefined) updates.confidence = data.confidence;
        if (data.audio !== undefined) updates.audio = data.audio as AvatarInput;
        if (data.report) updates.report = data.report;

        if (data?.likes !== undefined && typeof data.likes === "number") {
          updates.likes = { increment: data.likes };
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
        }

        const video = await prisma.videos.update({
          where: { id: data?.id as string },
          data: updates,
        });
        return video;
      }
      return null;
    },
    unlock: async (
      _: unknown,
      args: MutationUnlockArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data?.credit !== undefined && data.originId && data.targetId) {
        const updatedUser = await prisma.$transaction(
          async (prisma: any) => {
            const unlockedUser = await prisma.unlockedUsers.findFirst({
              where: { originId: data.originId, targetId: data.targetId },
            });
            if (!unlockedUser) {
              const created = await prisma.unlockedUsers.create({
                data: {
                  origin: { connect: { id: data.originId as string } },
                  target: { connect: { id: data.targetId as string } },
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              });
              if (created) {
                const updated = await prisma.betausers.update({
                  where: { id: data.originId as string },
                  data: { credit: { decrement: data.credit } },
                });

                if (updated) return updated;
              }
            }
            return undefined;
          },
          { timeout: 15000 }
        );
        if (updatedUser) return updatedUser;
      }
      return null;
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
          "create",
          d
        );

        const created = await prisma.$transaction(async (prisma: any) => {
          const user = await createUserResolver(creates, prisma);
          if (user) {
            const details = setDetailPayload<Prisma.betadetailsCreateInput>(
              "create",
              {
                email: d.email,
                phone: d.phone,
                userId: user.id ? user.id : undefined,
              }
            );
            await createDetailsResolver(details, prisma);

            return user;
          }
          throw new BackendError(
            BACKEND_ERRORS.PROCESSING,
            BACKEND_MESSAGES.PROCESSING
          );
        });

        if (created) return created;
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
          if (response?.deleted[public_id as string] === "deleted") {
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
        return candidate as BetaCandidate;
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
      };

      if (d?.company)
        companyInput.company = { connect: { id: d.company as string } };
      else {
        const createdCompany = await prisma.betacompanies.create({
          data: {
            name: d?.companyName as string,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        if (createdCompany)
          companyInput.company = {
            connect: { id: createdCompany.id as string },
          };
      }
      if (d) {
        const experience = await prisma.betaexperiences.create({
          data: {
            ...companyInput,
            duration: getExperienceDuration(d),
            isLiveJob: d?.isLiveJob,
            job: { connect: { id: d?.job as string } },
            ending: d?.ending,
            starting: d?.starting,
            user: { connect: { id: d?.userId as string } },
            candidate: { connect: { userId: d?.userId as string } },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          select: { id: true },
        });
        return experience;
      }
      return null;
    },
    createSharingRefusal: async (
      _: unknown,
      args: MutationCreateSharingRefusalArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data?.originId && data.targetId && data.sharingId && data.type) {
        const refusal = await prisma.$transaction(
          async (prisma: any) => {
            const payload = {} as { type?: string; reason?: string };
            if (data.reason) payload.reason = data.reason;

            const created = await prisma.sharingRefusals.create({
              data: {
                ...payload,
                type: data.type as string,
                origin: { connect: { id: data.originId as string } },
                target: { connect: { id: data.targetId as string } },
                sharing: { connect: { id: data.sharingId as string } },
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              include: { origin: true, target: true },
            });

            if (!created)
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );

            const notification = await prisma.notifications.create({
              data: {
                type: "refusal",
                concernedId: created.id,
                refusal: { connect: { id: created.id as string } },
                content: `${created.origin?.name} a décliné votre candidature`,
                origin: { connect: { id: data?.originUserId as string } },
                target: { connect: { id: data.targetId as string } },
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
            if (!notification)
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );

            const chat = await generateChat(
              1.2,
              90,
              2,
              2,
              1,
              [
                {
                  role: "system",
                  content: `Tu es un chargé de recrutement qui décline une candidature. Tu ne dis pas bonjour, tu ne te présentes pas, tu ne mentionnes ni le nom du candidat, ni de l'entreprise. Tu ne fais que expliquer et donner des axes d'amélioration. ${
                    created.reason
                      ? `La raison du refus est la suivante: ${created.reason}.`
                      : ""
                  } Le refus concerne un aspect ${
                    created.type === "general"
                      ? "général"
                      : created.type === "technical"
                      ? "technique"
                      : "comportemental"
                  } chez le candidat. Ta réponse ne doit pas dépasser 60 mots.`,
                },
                {
                  role: "user",
                  content:
                    "Pouvez-vous développer des explications ou expliquer les potentielles raisons du refus à ma candidature ?",
                },
              ],
              "gpt-4o"
            );
            const message = chat?.choices[0].message.content;

            const offer = await prisma.offers.findUnique({
              where: { id: data.offerId as string },
              include: { company: true, job: true },
            });
            if (!offer)
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );

            const companyName = getCompanyName(offer);
            const jobTitle = getJobTitle(offer.job);

            const res = await apiInstance.sendTransacEmail({
              to: [
                {
                  email: created?.target?.email as string,
                  name: setName(created.target) as string,
                },
              ],
              params: {
                name: setName(created.target) as string,
                message,
                companyName,
                jobTitle,
              },
              templateId: 29,
            });
            if (res.response.statusCode === 201) {
              return created;
            }
            throw new BackendError(
              BACKEND_ERRORS.PROCESSING,
              BACKEND_MESSAGES.PROCESSING
            );
          },
          { timeout: 15000 }
        );
        if (refusal) return refusal;
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
      const id = args.id;
      if (id) {
        return await prisma.profileSharings.delete({
          where: { id: args.id as string },
        });
      }
      return null;
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
    createProfileSharing: async (
      _: unknown,
      args: MutationCreateProfileSharingArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data && data.originId && data.offerTargetId && data.videoId) {
        const sharing = await prisma.$transaction(
          async (prisma: any) => {
            const creates = {} as {
              origin: { connect: { id: string } };
              target?: { connect: { id: string } };
              offerTarget: { connect: { id: string } };
              video: { connect: { id: string } };
            };
            creates.origin = { connect: { id: data?.originId as string } };
            if (data?.targetId)
              creates.target = { connect: { id: data.targetId as string } };

            creates.offerTarget = {
              connect: { id: data?.offerTargetId as string },
            };
            creates.video = { connect: { id: data?.videoId as string } };
            const created = await prisma.profileSharings.create({
              data: {
                ...creates,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });
            const targetUsers = await prisma.betausers.findMany({
              where: { companyId: data?.targetId as string },
            });
            if (targetUsers) {
              for (let i = 0; i < targetUsers.length; i++) {
                const user = targetUsers[i];

                await prisma.notifications.create({
                  data: {
                    type: "sharing",
                    concernedId: created.id,
                    content:
                      "Quelqu'un vient de partager son profil avec vous.",
                    origin: { connect: { id: data?.originId as string } },
                    target: { connect: { id: user.id as string } },
                    status: "pending",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                });
              }
            }
            return created;
          },
          { timeout: 15000 }
        );
        if (sharing) return sharing;
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
          concernedId: args.data?.concernedId as string,
          origin: { connect: { id: args.data?.originId as string } },
          status: "pending",
          target: { connect: { id: args.data?.targetId as string } },
          createdAt: new Date(),
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
        async (prisma: any) => {
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
              origin: { connect: { id: args.data?.originId as string } },
              target: { connect: { id: args.data?.targetId as string } },
              status: "pending",
              createdAt: new Date(),
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
            createdAt: new Date(),
            updatedAt: new Date(),
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
      const id = args.id;
      if (id) {
        const deleted = await prisma.$transaction(
          async (prisma: any) => {
            const result = await prisma.offers.delete({
              where: { id: args.id as string },
              include: {
                sharings: { include: { origin: true } },
                job: true,
                company: true,
              },
            });
            if (result) {
              for (let i = 0; i < result.sharings.length; i++) {
                const sharing = result.sharings[i];
                const user = sharing.origin;
                const jobTitle = getJobTitle(result.job as Job);
                const companyName = getCompanyName(result);
                const res = await apiInstance.sendTransacEmail({
                  to: [
                    {
                      email: user?.email as string,
                      name: setName(user) as string,
                    },
                  ],
                  params: {
                    name: setName(user) as string,
                    jobTitle,
                    companyName,
                  },
                  templateId: 30,
                });
                if (res.response.statusCode === 201) {
                }
              }
            } else {
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );
            }
            return result;
          },
          { timeout: 15000 }
        );
        if (deleted) return deleted;
      }
      return null;
    },
    createOffer: async (
      _: unknown,
      args: MutationCreateOfferArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      const creates = {} as Prisma.offersCreateInput;
      if (data?.content) creates.content = data.content;
      if (data?.profileSearched) creates.profileSearched = data.profileSearched;
      if (data?.authorName) creates.authorName = data.authorName;
      if (data?.authorEmail) creates.authorEmail = data.authorEmail;
      if (data?.jobDescriptionLink)
        creates.jobDescriptionLink = data.jobDescriptionLink;
      if (data?.revenue) creates.revenue = data.revenue;
      if (data?.requirements && data.requirements.length > 0)
        creates.requirements = {
          connect: data.requirements.map((req) => ({
            id: req as string,
          })),
        };
      if (data?.contractType) creates.contractType = data.contractType;
      if (data?.remote) creates.remote = data.remote;
      if (data?.location) creates.location = data.location;
      if (data?.limitDate) creates.limitDate = new Date(data.limitDate);
      if (data?.authorInterviewLink)
        creates.authorInterviewLink = data.authorInterviewLink;
      if (data?.job) creates.job = { connect: { id: data.job } };
      if (data?.sector) creates.sector = { connect: { id: data.sector } };
      if (data?.companyId)
        creates.company = { connect: { id: data.companyId } };

      const rebroadcasting = {} as { companyName: string; rebroadcast: true };
      if (data?.companyName) {
        rebroadcasting.companyName = data.companyName;
        rebroadcasting.rebroadcast = true;
      }

      const author = {} as { author?: { connect: { id: string } } };
      if (data?.userId) author.author = { connect: { id: data.userId } };

      if (data?.job) {
        const resultingJob = await prisma.jobs.findUnique({
          where: { id: data?.job as string },
        });
        if (resultingJob) {
          const res = await setUniqueSlugAndExtension(
            resultingJob?.title?.fr as string
          );

          if (res.extension) creates.extension = res.extension;
          if (res.slug) creates.slug = res.slug;

          if (res) {
            const offer = await prisma.offers.create({
              data: {
                ...creates,
                ...rebroadcasting,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            });

            return offer;
          }
        }
      }

      return null;
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
        const creates = {} as {
          file: AvatarInput;
          principal?: boolean;
          user?: { connect: { id: string } };
          company?: { connect: { id: string } };
          job?: { connect: { id: string } };
        };
        creates.file = data.file;
        if (data?.principal !== undefined)
          creates.principal = data.principal as boolean;
        if (data?.companyId)
          creates.company = { connect: { id: data.companyId } };
        if (data?.userId) creates.user = { connect: { id: data.userId } };
        if (data?.jobId) creates.job = { connect: { id: data.jobId } };
        const created = await prisma.videos.create({
          data: { ...creates, createdAt: new Date(), updatedAt: new Date() },
        });
        return created;
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

      const d = args.data;
      const token = await s({
        name: d?.name as string,
        email: d?.email as string,
      });
      const lead = await prisma.leads.create({
        data: {
          name: d?.name as string,
          email: d?.email as string,
          type: d?.type as string,
          phone: d?.phone as PhoneInput,
          token,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return lead;
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
        return updatedCandidate as BetaCandidate;
      }
      const newCandidate = await prisma.betacandidates.create({
        data: {
          confirmed: true,
          user: { connect: { id: args.data?.userId as string } },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      await prisma.betadetails.updateMany({
        where: { userId: args.data?.userId as string },
        data: {
          candidateId: newCandidate.id,
        },
      });
      return newCandidate as BetaCandidate;
    },
    createDetails: async (
      _: unknown,
      args: MutationCreateDetailsArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const data = args.data;
      if (data) {
        const payload = setDetailPayload<Prisma.betadetailsCreateInput>(
          "create",
          data
        );
        const details = await prisma.betadetails.create({
          data: {
            ...payload,
          },
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
      const d = args.data;
      const user = await prisma.betausers.findFirst({
        where: { id: d?.userId as string },
        include: { company: true },
      });
      if (user) {
        const payload = {
          name: d?.name,
          location: d?.location,
          resume: d?.resume,
          linkedinProfilePage: d?.linkedinProfilePage,
          logo: !!setFileUrl(d?.logo) ? d?.logo : undefined,
          video: !!setFileUrl(d?.video) ? d?.video : undefined,
        } as Prisma.betacompaniesUpdateInput | Prisma.betacompaniesCreateInput;

        let company;
        if (user?.company) {
          company = await prisma.betacompanies.update({
            where: { id: user.company.id },
            data: {
              ...payload,
              updatedAt: new Date(),
            },
          });
        } else {
          company = await prisma.betacompanies.create({
            data: {
              ...(payload as Prisma.betacompaniesCreateInput),
              scrapped: false,
              pro: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }
        if (company) {
          await prisma.betausers.update({
            where: { id: user.id as string },
            data: { company: { connect: { id: company.id as string } } },
          });
          return company;
        }
      }

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
      if (args.data?.isPublic !== undefined)
        updates.isPublic = args.data.isPublic as boolean;
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

      const data = args.data;

      if (data) {
        const updates = setUserPayload<Prisma.betausersUpdateInput>(
          "update",
          data
        );

        const user = await prisma.betausers.update({
          where,
          data: updates,
        });
        return user;
      }
      return null;
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
        data: {
          name: data?.name as string,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return newCompany;
    },
    deleteUser: async (
      _: unknown,
      args: MutationDeleteUserArgs,
      context: ContextRequest
    ) => {
      const noCors = await noCorsMiddleware(context);
      if (!noCors) return null;
      const user = await prisma.betausers.findFirst({
        where: { id: args.userId as string },
      });
      if (user) {
        await prisma.betausers.delete({
          where: { id: args.userId as string },
        });
      }
      return user;
    },
  },
  BetaCompany: {
    experiences: async (company: BetaCompany) =>
      company.experiences
        ? company.experiences
        : await prisma.betaexperiences.findMany({
            where: { companyId: company.id as string },
          }),
    sharings: async (company: BetaCompany) =>
      company.sharings
        ? company.sharings
        : await prisma.profileSharings.findMany({
            where: { targetId: company.id as string },
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
  },
  BetaExperience: {
    job: async (experience: BetaExperience) =>
      experience.job
        ? experience.job
        : experience.jobId
        ? await prisma.jobs.findFirst({
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
    company: async (experience: BetaExperience) => {
      return experience.company
        ? experience.company
        : experience.companyId
        ? await prisma.betacompanies.findUnique({
            where: { id: experience.companyId },
          })
        : null;
    },
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
  Meet: {
    meetCandidate: async (meet: Meet) =>
      meet.meetCandidate
        ? meet.meetCandidate
        : meet.meetCandidateId
        ? await prisma.meetcandidates.findUnique({
            where: { id: meet.meetCandidateId },
          })
        : null,
    meetRecruiter: async (meet: Meet) =>
      meet.meetRecruiter
        ? meet.meetRecruiter
        : meet.meetRecruiterId
        ? await prisma.meetrecruiters.findUnique({
            where: { id: meet.meetRecruiterId },
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
    job: async (candidate: MeetCandidate) =>
      candidate.job
        ? candidate.job
        : candidate.jobId
        ? await prisma.jobs.findUnique({ where: { id: candidate.jobId } })
        : null,
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
        ? (details.candidate as BetaCandidate)
        : details.candidateId
        ? ((await prisma.betacandidates.findFirst({
            where: { id: details.candidateId },
          })) as BetaCandidate)
        : null;
    },
  },
  BetaUser: {
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
        ? (user.candidate as BetaCandidate)
        : ((await prisma.betacandidates.findUnique({
            where: { userId: user.id as string },
          })) as BetaCandidate),
    company: async (user: BetaUser) =>
      user.company
        ? user.company
        : user.companyId
        ? await prisma.betacompanies.findFirst({
            where: { id: user.companyId },
          })
        : null,
    myOffers: async (user: BetaUser) =>
      user.companyId
        ? await prisma.offers.findMany({
            where: { companyId: user.companyId },
          })
        : user.myOffers
        ? user.myOffers
        : await prisma.offers.findMany({
            where: { authorId: user.id },
          }),
    sharings: async (user: BetaUser) =>
      user.sharings
        ? user.sharings
        : user.company?.id
        ? await prisma.profileSharings.findMany({
            where: { targetId: user.company?.id },
          })
        : [],
    unvolonteerFavorites: async (user: BetaUser) =>
      user.unvolonteerFavorites
        ? user.unvolonteerFavorites
        : user.id
        ? await prisma.favorites.findMany({
            where: { targetId: user.id },
          })
        : [],
  },
  BetaWhatsappThread: {
    queue: async (thread: BetaWhatsappThread) =>
      thread.queue
        ? thread.queue
        : thread.queueId
        ? await prisma.betaqueues.findUnique({
            where: { id: thread.queueId },
          })
        : null,
    responses: async (thread: BetaWhatsappThread) =>
      thread.responses
        ? thread.responses
        : await prisma.betawhatsappresponses.findMany({
            where: { threadId: thread.id as string },
          }),
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
    sharings: async (offer: Offer) => {
      return offer.sharings
        ? offer.sharings
        : await prisma.profileSharings.findMany({
            where: {
              offerTargetId: offer.id as string,
            },
          });
    },
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
        ? await prisma.references.findFirst({
            where: {
              experienceId: reference.experienceId,
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
  UnlockedUser: {
    origin: async (unlockedUser: UnlockedUser) =>
      unlockedUser.origin
        ? unlockedUser.origin
        : unlockedUser.originId
        ? await prisma.betausers.findUnique({
            where: { id: unlockedUser.originId },
          })
        : null,
    target: async (unlockedUser: UnlockedUser) =>
      unlockedUser.target
        ? unlockedUser.target
        : unlockedUser.targetId
        ? await prisma.betausers.findUnique({
            where: { id: unlockedUser.targetId },
          })
        : null,
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
    origin: async (queue: BetaQueue) =>
      queue.origin
        ? queue.origin
        : queue.originId
        ? await prisma.betausers.findUnique({
            where: { id: queue.originId },
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
  },
};

export default resolvers;
