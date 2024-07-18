import { StripeParams } from "@youmeet/types/api/StripeParams";

export const parsePrms = (params: string | undefined): StripeParams =>
  params
    ? Object.fromEntries(
        params
          .split("&")
          .map((param) => param.split("="))
          .filter((entry) => entry[0]),
      )
    : {};
