import { FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailComponent from "@youmeet/ui/DetailComponent";
import BoldText from "@youmeet/ui/BoldText";
import { client } from "@youmeet/gql/index";
import {
  FormQuestion,
  GetOneFormResponseDocument,
  Lead,
  UpdateFormResponseDocument,
} from "@youmeet/gql/generated";
import { useQuery } from "@apollo/client";

const QuestionAnswer = ({
  question,
  lead,
}: {
  question: FormQuestion;
  lead: Lead;
}) => {
  const [isTrue, setIsTrue] = useState(false);
  const [content, setContent] = useState("");
  const { data, loading, refetch } = useQuery(GetOneFormResponseDocument, {
    variables: { leadId: lead.id, questionId: question.id as string },
  });
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const res = data?.oneFormResponse;
    if (!loading && res) {
      setIsTrue(res.isTrue as boolean);
      setContent(res.content as string);
    }
  }, [loading]);

  return question.type === "check" ? (
    <DetailComponent
      type="modal2"
      noLabelColon
      conversation
      label={
        <BoldText
          text={`${question.title as string}+`}
          fontSizeClass=""
          align="justify"
          containerStyle={{
            margin: "0px",
          }}
        />
      }
      value={
        <FormControlLabel
          control={
            <Switch
              value={isTrue}
              checked={isTrue}
              onChange={async (e) => {
                if (timerId) clearTimeout(timerId);

                setIsTrue(!isTrue);
                const timer = setTimeout(async () => {
                  await client.mutate({
                    mutation: UpdateFormResponseDocument,
                    variables: {
                      data: {
                        isTrue: !isTrue,
                        leadId: lead.id,
                        questionId: question.id,
                        responseId: data?.oneFormResponse?.id,
                        type: question.type,
                      },
                    },
                  });
                  refetch();
                }, 1500);

                setTimerId(timer);
              }}
            />
          }
          label={isTrue ? "oui" : "non"}
          labelPlacement="start"
        />
      }
    />
  ) : (
    <DetailComponent
      type="modal2"
      noLabelColon
      conversation
      fullWidth
      label={
        <BoldText
          text={`${question.title as string}+`}
          fontSizeClass=""
          align="justify"
          containerStyle={{
            margin: "0px",
          }}
        />
      }
      value={
        <TextField
          sx={{ width: "100%" }}
          multiline
          rows={2}
          value={content}
          onChange={(e) => {
            if (timerId) clearTimeout(timerId);

            setContent(e.target.value);

            const timer = setTimeout(async () => {
              await client.mutate({
                mutation: UpdateFormResponseDocument,
                variables: {
                  data: {
                    content: e.target.value || "",
                    leadId: lead.id,
                    questionId: question.id,
                    responseId: data?.oneFormResponse?.id,
                    type: question.type,
                  },
                },
              });
              refetch();
            }, 2000);

            setTimerId(timer);
          }}
        />
      }
    />
  );
};

export default QuestionAnswer;
