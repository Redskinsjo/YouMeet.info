import {
  FormQuestion,
  GetFormQuestionsDocument,
  Lead,
} from "@youmeet/gql/generated";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import React from "react";
import LeadQuestionAnswer from "./LeadQuestionAnswer";

const LeadForm = ({ lead }: { lead: Lead }) => {
  const { data } = useQuery(GetFormQuestionsDocument);

  return (
    <Box>
      {data?.formQuestions
        ?.filter(
          (q) =>
            (q?.target === "candidate" && lead.type === "candidate") ||
            (q?.target !== "candidate" && lead.type !== "candidate"),
        )
        .map((question) => (
          <LeadQuestionAnswer
            key={question?.id}
            lead={lead}
            question={question as FormQuestion}
          />
        ))}
    </Box>
  );
};

export default LeadForm;
