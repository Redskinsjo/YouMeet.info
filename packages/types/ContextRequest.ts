import { NextRequest } from "next/server";

export type ContextRequest = {
  request: NextRequest;
  params: {
    query: string;
    operationName: string;
    variables: { [key: string]: any };
    extensions: any;
  };
  cookies: { [key: string]: string };
};
