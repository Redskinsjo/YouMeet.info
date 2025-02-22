import { createCandidateBasic } from "@youmeet/functions/request";
import { BetaCandidate } from "@youmeet/gql/generated";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { handleActionError } from "@youmeet/utils/basics/handleActionError";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let schema, obj, data;

  if (body.dataType === "job") {
    schema = z.object({
      userId: z.string().min(1),
      jobId: z.string().min(1),
    });

    obj = { userId: body.userId, jobId: body.jobId };
    data = { userId: body.userId, targetJobId: body.jobId };
  } else {
    schema = z.object({
      userId: z.string().min(1),
      contractType: z.string().min(1),
    });
    obj = { userId: body.userId, contractType: body.contractType };
    data = { userId: body.userId, targetContractType: body.contractType };
  }

  try {
    const valid = schema.parse(obj);
    if (valid) {
      const result = (await createCandidateBasic<BetaCandidate>(
        {
          data,
        },
        0,
        true
      )) as PayloadBackendError | withData<BetaCandidate>;
      if (result && isPayloadError(result)) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else if (!result?.data) {
        throw new BackendError(
          BACKEND_ERRORS.PROCESSING,
          BACKEND_MESSAGES.PROCESSING
        );
      } else {
        revalidatePath("/dashboard");

        const body = { data: result.data };
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      throw new BackendError(
        BACKEND_ERRORS.MISSING_ARGUMENT,
        BACKEND_MESSAGES.MISSING_ARGUMENT
      );
    }
  } catch (err: any) {
    const body = await handleActionError(err);
    return new Response(JSON.stringify(body), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
