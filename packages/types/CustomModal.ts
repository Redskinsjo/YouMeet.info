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
  | "video"
  | "accountCandidate"
  | "videoAdding"
  | "unauthorized"
  | "feedback"
  | "notifications"
  | "backoffice"
  | "remark"
  | "record"
  | "fulfill"
  | "custom"
  | "home"
  | "offer"
  | "publicOffer"
  | "sharing"
  | "profils"
  | "interviewOffer"
  | "shareProfile"
  | LoginPrompt
  | GlobalError
  | BackofficeMessage
  | UploadMessage
  | OfferCreationMessage;

export type SignupCookiePayload = {
  email: string;
  name: string;
  true: boolean;
  returnTo: string;
};

export type LoginPrompt = "login" | "loginPage";

export type OfferCreationMessage = "offerConfirm";

export type UploadMessage = "upload" | "upload-50" | "delete";

export type BackofficeMessage = "backofficeConfirm";

export type GlobalError =
  | "creditTooLow"
  | "requestNotCompleted"
  | "fileTooLarge"
  | "not-completed"
  | "request-feedback";

export type CustomModalProps = {
  video?: Video;
  children?: ReactElement;
  type: CustomModalType | GlobalError;
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
