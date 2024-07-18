import { getAccountInfos, getUserExperiences } from "@/app/_functions/request";
import { BetaExperience, BetaUser } from "@youmeet/gql/generated";

export default async function useFormDefaultValues(
  category: "profile" | "organisation",
  userId: string,
) {
  if (!userId) return { defaultValues: undefined };
  const infos = (await getAccountInfos<BetaUser>({ userId })) as BetaUser;
  const user = infos;
  const details = infos?.details;

  let defaultValues = undefined;

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
        (avatar) => avatar?.url || avatar?.secure_url,
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
    };

    const experiences = [];
    if (userExperiences) {
      for (let i = 0; i < userExperiences.length; i++) {
        const exp = userExperiences[i];
        experiences.push(
          `${exp?.job ?? ""}${exp?.company?.name ?? ""}${exp?.starting ?? ""}`,
        );
      }
    }
  } else {
    defaultValues = {
      linkedinProfilePage: user?.company?.linkedinProfilePage || "",
      location: user?.company?.location || "",
      name: user?.company?.name || "",
      resume: user?.company?.resume || "",
      logo: [user?.company?.logo] || [],
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      linkedinProfileId: user?.linkedinProfileId || "",
      email: user?.email || "",
      description: user?.description || "",
      avatars: user?.candidate?.avatars || [],
    };
  }

  return { defaultValues };
}
