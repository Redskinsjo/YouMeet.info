import {
  getAccountInfos,
  getUserExperiences,
} from "@youmeet/functions/request";
import { BetaCompany, BetaExperience, BetaUser } from "@youmeet/gql/generated";
import {
  FormDefaultValues,
  OfferDefaultValues,
  ProfileFormDefaultValues,
} from "@youmeet/types/form/useFormDefaultValues";
import { isUser } from "@youmeet/types/TypeGuards";
import setFileUrl from "@youmeet/utils/setFileUrl";

export default async function useFormDefaultValues(
  category: "profile" | "organisation" | "offer",
  userId: string
) {
  if (!userId) return { defaultValues: undefined };
  const infos = (await getAccountInfos<BetaUser>({ userId })) as BetaUser;
  const user = infos;
  const details = infos?.details;

  let defaultValues = undefined;

  if (user && isUser(user)) {
    if (category === "profile") {
      const userExperiences = (await getUserExperiences<BetaExperience[]>({
        userId,
      })) as BetaExperience[];

      defaultValues = {
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        description: user?.description || "",
        avatars: user?.candidate?.avatars?.every(
          (avatar) => avatar?.url || avatar?.secure_url
        )
          ? user?.candidate?.avatars
          : [],
        salaryExpected: user?.candidate?.salaryExpected || "",
        phone: (details?.phone?.number as string) || "",
        phonecode: details?.phone?.code || "+33",
        languages: user?.languages || [],
        age: user?.age ? String(user?.age) : "",
        experiences:
          userExperiences && userExperiences.length > 0
            ? userExperiences.map((exp) => {
                return {
                  id: exp?.id || "",
                  sector: (exp?.job?.topSector?.id as string) || "",
                  job: (exp?.job?.id as string) || "",
                  company: exp?.company?.id
                    ? {
                        id: (exp?.company?.id as string) || "",
                        name: exp?.company?.name || "",
                        input: false,
                      }
                    : { id: "", name: "", input: false },
                  ending: exp?.ending || "",
                  starting: exp?.starting || "",
                  duration: exp?.duration ? String(exp?.duration) : "",
                  isLiveJob: exp?.isLiveJob || false,
                };
              })
            : [],
        linkedinProfileId: user?.linkedinProfileId || "",
      } as ProfileFormDefaultValues;
    } else if (category === "organisation") {
      const c = user?.company;
      defaultValues = {
        linkedinProfilePage: c?.linkedinProfilePage || "",
        location: c?.location || "",
        name: c?.name || "",
        resume: c?.resume || "",
        logo: !!setFileUrl(c?.logo) ? c?.logo : undefined,
        video: !!setFileUrl(c?.video) ? c?.video : undefined,
      } as FormDefaultValues;
    } else if (category === "offer") {
      defaultValues = {
        sector: "",
        job: "",
        content: "",
        profileSearched: "",
        requirements: [],
        jobDescriptionLink: "",
        revenue: "",
        contractType: "",
        location: "",
        limitDate: "",
        remote: "",
        companyName: "",
      } as OfferDefaultValues;
    } else {
      defaultValues = {
        linkedinProfilePage: user?.company?.linkedinProfilePage || "",
        location: user?.company?.location || "",
        name: user?.company?.name || "",
        resume: user?.company?.resume || "",
        logo: [user?.company?.logo] || null,
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        linkedinProfileId: user?.linkedinProfileId || "",
        email: user?.email || "",
        description: user?.description || "",
        avatars: user?.candidate?.avatars || [],
      } as BetaCompany;
    }
  }
  return { defaultValues };
}
