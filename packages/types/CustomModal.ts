import { Video } from "@youmeet/gql/generated";
import { Dispatch, ReactElement, SetStateAction } from "react";

export type CustomModalType =
  | "consent3"
  | "consent2"
  | "consent"
  | "form"
  | "search"
  | "account"
  | "retrieval"
  | "login"
  | "loginPage"
  | "upload"
  | "video"
  | "accountCandidate"
  | "fileTooLarge"
  | "offerConfirm"
  | "backofficeConfirm"
  | "videoAdding"
  | "unauthorized"
  | "feedback"
  | "notifications"
  | "backoffice"
  | "not-completed"
  | "request-feedback"
  | "remark"
  | "record"
  | "fulfill"
  | "custom"
  | "home"
  | "offer"
  | "publicOffer"
  | "sharing"
  | "profils"
  | "creditTooLow"
  | "interviewOffer"
  | "shareProfile"
  | "requestNotCompleted";

export type SignupCookiePayload = {
  email: string;
  name: string;
  true: boolean;
  returnTo: string;
};

export type CustomModalProps = {
  video?: Video;
  children?: ReactElement;
  type: CustomModalType;
  setDisplayModal?: Dispatch<SetStateAction<any>>;
  setIsSubscribing?: Dispatch<SetStateAction<boolean>>;
  setIsForgotten?: Dispatch<SetStateAction<boolean>>;
} & ModalContentProps;

export type trads = { [key: string | "en" | "fr"]: string };

export type ModalContentProps = {
  title?: string | trads;
  content?: string | trads;
  cta?: string | trads;
};
