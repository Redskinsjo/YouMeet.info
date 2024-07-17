import {
  AvatarInput,
  BetaCompanyInput,
  CandidateInput,
} from "@youmeet/gql/generated";
import { FieldValues } from "react-hook-form";

export type saveFormDataType = (
  handleStepSubmit: (
    avatars: AvatarInput[] | File[],
    payload: BetaCompanyInput & CandidateInput,
    type?: "organisation" | "profile"
  ) => Promise<void>,
  data: CandidateInput | BetaCompanyInput | FieldValues,
  step: 1 | 2 | 3,
  pro?: boolean
) => Promise<void>;
