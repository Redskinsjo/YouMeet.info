import {
  BetaCandidate,
  BetaCompany,
  BetaExperience,
  BetaProfile,
  BetaQueue,
  BetaUser,
  BetaWhatsappThread,
  InterviewOffer,
  Job,
  Lead,
  Notification,
  Offer,
  ProfileSharing,
} from "@youmeet/gql/generated";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";

export interface ModalState {
  display:
    | "feedback"
    | "search"
    | "consent"
    | "backoffice"
    | "account"
    | "notifications"
    | "custom"
    | "offer"
    | "publicOffer"
    | false
    | "home"
    | "product"
    | "blog"
    | "record";
  position:
    | { [key in "top" | "left" | "bottom" | "right"]: number }
    | undefined;
  user?: BetaUser | undefined;

  profile?: BetaProfile | undefined;
  experience?: BetaExperience | undefined;
  authorship?: "candidate" | "profile" | undefined;
  candidate?: BetaCandidate | undefined;
  queue?: BetaQueue | undefined;
  lead?: Lead | undefined;
  thread: BetaWhatsappThread | undefined;
  job: Job | undefined;
  company: BetaCompany | undefined;
  interview: InterviewOffer | undefined;
  notifications: Notification[] | undefined;
  sharing: ProfileSharing | undefined;
  offer: Offer | undefined;
  publicOffer: Offer | undefined;
  type?: "fileTooLarge" | "unauthorized" | undefined;
  message: string | undefined;
}

const initialState: ModalState = {
  display: false,
  position: undefined,
  user: undefined,
  profile: undefined,
  experience: undefined,
  authorship: undefined,
  candidate: undefined,
  queue: undefined,
  lead: undefined,
  thread: undefined,
  job: undefined,
  company: undefined,
  interview: undefined,
  notifications: undefined,
  sharing: undefined,
  offer: undefined,
  publicOffer: undefined,
  type: undefined,
  message: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state: ModalState, action: PayloadAction<ModalState>) => {
      state.display = action.payload.display;
      if (action.payload.position) state.position = action.payload.position;
      if (action.payload.user) state.user = action.payload.user;
      if (action.payload.profile) state.profile = action.payload.profile;
      if (action.payload.candidate) state.candidate = action.payload.candidate;
      if (action.payload.experience)
        state.experience = action.payload.experience;
      if (action.payload.authorship)
        state.authorship = action.payload.authorship;
      if (action.payload.queue) state.queue = action.payload.queue;
      if (action.payload.lead) state.lead = action.payload.lead;
      if (action.payload.thread) state.thread = action.payload.thread;
      if (action.payload.job) state.job = action.payload.job;
      if (action.payload.company) state.company = action.payload.company;
      if (action.payload.interview) state.interview = action.payload.interview;
      if (action.payload.notifications)
        state.notifications = action.payload.notifications;
      if (action.payload.sharing) state.sharing = action.payload.sharing;
      if (action.payload.offer) state.offer = action.payload.offer;
      if (action.payload.publicOffer)
        state.publicOffer = action.payload.publicOffer;
      if (action.payload.type) state.type = action.payload.type;
      if (action.payload.message) state.message = action.payload.message;
    },
    resetModal: (state: ModalState) => {
      state.display = false;
      state.position = undefined;
      state.user = undefined;
      state.profile = undefined;
      state.candidate = undefined;
      state.experience = undefined;
      state.authorship = undefined;
      state.queue = undefined;
      state.lead = undefined;
      state.thread = undefined;
      state.job = undefined;
      state.company = undefined;
      state.interview = undefined;
      state.notifications = undefined;
      state.sharing = undefined;
      state.offer = undefined;
      state.publicOffer = undefined;
      state.type = undefined;
      state.message = undefined;
    },
    setModalUserExperiences: (
      state: ModalState,
      action: PayloadAction<BetaExperience[]>
    ) => {
      state.user = {
        ...state.user,
        id: state.user?.id as string,
        experiences: action.payload,
      };
    },
  },
}) as Slice<ModalState>;

// Action creators are generated for each case reducer function
export const { setModal, resetModal, setModalUserExperiences } =
  modalSlice.actions;

export default modalSlice.reducer;
