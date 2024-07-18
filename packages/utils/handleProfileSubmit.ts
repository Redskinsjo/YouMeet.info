import { FieldValues } from "react-hook-form";
import {
  ProFormHandledData,
  OfferHandledData,
} from "@youmeet/types/form/FormHandledData";
import { fromNames } from "@/utils/resolvers/resolveFullname";
import {
  FormHandledData,
  FormNonHandledData,
} from "@youmeet/types/form/FormHandledData";
import { AvatarInput } from "@youmeet/gql/generated";

export const externallyHandleData = (
  data: FormData,
  extras: FieldValues & { userId: string },
  uploadedList: AvatarInput[]
) => {
  const fromFormData = Object.fromEntries(
    data
  ) as unknown as FormNonHandledData;

  const handledData: FormHandledData = {
    firstname: fromFormData.firstname,
    lastname: fromFormData.lastname,
    email: fromFormData.email,
    linkedinProfileId: fromFormData.linkedinProfileId,
    description: fromFormData.description,
    avatars: uploadedList.length > 0 ? fromFormData.avatars : undefined,
    age: Number(fromFormData.age),
    languages: fromFormData.languages.split(","),
    salaryExpected: fromFormData.salaryExpected,
    userId: extras.userId,
    fullname: fromNames(fromFormData.firstname, fromFormData.lastname),
    phone: {
      code: fromFormData.phonecode,
      number: fromFormData.phone,
    },
  };
  //=====================
  //   ? Number(handledData.salaryExpected)
  //   : null;
  //   handledData.avatars = !avatars.startsWith("http") ? [avatars] : undefined;
  //   handledData.linkedinProfileId = handledData.linkedinProfileId;

  // handledData.avatars = await getFiles(handledData.avatars);

  // handledData.experiences = handledData.experiences.map(
  //   (
  //     experience: {
  //       sector?: string;
  //       job: Job;
  //       company: { input: boolean; name: string };
  //     } & Partial<BetaExperience>
  //   ) => {
  //     let d = {} as { company?: string; companyName?: string };
  //     if (typeof experience.company === "string") {
  //       d.company = experience.company;
  //       d.companyName = "";
  //     } else {
  //       d.company = "";
  //       d.companyName = experience.company.name;
  //     }
  //     delete experience.sector;
  //     return {
  //       ...experience,
  //       job: experience.job,
  //       duration: Number(experience.duration),
  //       ...d,
  //       input: experience.company.input,
  //     };
  //   }
  // );

  return handledData;
};

export const proExternallyHandleData = (
  data: FieldValues,
  type: "offer" | "organisation"
) => {
  let handledData;

  const typ = (d: any): FieldValues => d;

  if (type === "organisation") {
    handledData = {
      name: typ(data).name,
      linkedinProfilePage: typ(data).linkedinProfilePage,
      location: typ(data).location,
      resume: typ(data).resume,
      logo: typ(data).logo,
      video: typ(data).video,
    } as ProFormHandledData;
  } else if (type === "offer") {
    handledData = {
      sector: typ(data).sector,
      job: typ(data).job,
      content: typ(data).content,
      profileSearched: typ(data).profileSearched,
      contractType: typ(data).contractType,
      jobDescriptionLink: typ(data).jobDescriptionLink,
      location: typ(data).location,
      remote: typ(data).remote,
      requirements: typ(data).requirements,
      revenue: Math.round(Number(Number(typ(data).revenue).toFixed(0))),
      limitDate: typ(data).limitDate,
      video: typ(data).video,
      companyName: typ(data).companyName,
    } as OfferHandledData;
  }
  return handledData;
};
