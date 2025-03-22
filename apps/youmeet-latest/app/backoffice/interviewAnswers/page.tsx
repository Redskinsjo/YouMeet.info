import { EMAIL_PERSO } from "@youmeet/functions/imports";
import InterviewAnswersChild from "./interviewAnswersChild";
import { getLeadFormResponses } from "@youmeet/functions/request";
import { FormResponse } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeRemarks() {
  const verified = await verifyTokenServer();
  if (verified && verified.email.toLowerCase() === EMAIL_PERSO) {
    const formResponses = (await getLeadFormResponses<
      FormResponse[]
    >()) as FormResponse[];
    if (formResponses)
      return <InterviewAnswersChild formResponses={formResponses} />;
  }
  return notFound();
}
