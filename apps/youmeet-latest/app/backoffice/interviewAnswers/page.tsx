import InterviewAnswersChild from "./interviewAnswersChild";
import { getLeadFormResponses } from "@youmeet/functions/request";
import { FormResponse } from "@youmeet/gql/generated";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

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
  return <Custom404 />;
}
