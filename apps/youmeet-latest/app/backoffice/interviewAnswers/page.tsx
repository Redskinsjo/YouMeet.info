import InterviewAnswersChild from "./interviewAnswersChild";
import { getLeadFormResponses } from "@youmeet/functions/request";
import { FormResponse } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeRemarks() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const formResponses = (await getLeadFormResponses<
      FormResponse[]
    >()) as FormResponse[];
    if (formResponses)
      return <InterviewAnswersChild formResponses={formResponses} />;
  }
  return notFound();
}
