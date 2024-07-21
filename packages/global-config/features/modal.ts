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
  Meet,
  Notification,
  Offer,
  ProfileSharing,
} from "@youmeet/gql/generated";
import { CustomModalType } from "@youmeet/types/CustomModal";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import { OfferDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  display: CustomModalType | false;
  position:
    | { [key in "top" | "left" | "bottom" | "right"]: number }
    | undefined;
  user?: BetaUser | undefined;
  users?: BetaUser[] | undefined;
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
  offer: Offer | OfferDefaultValues | undefined;
  publicOffer: Offer | undefined;
  offerPreview: OfferContentValues | undefined;
  type?: "fileTooLarge" | "unauthorized" | undefined;
  message: string | undefined;
  meet: Meet | undefined;
}

const initialState: ModalState = {
  display: false,
  position: undefined,
  user: undefined,
  users: [],
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
  offerPreview: undefined,
  type: undefined,
  message: undefined,
  meet: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state: ModalState, action: PayloadAction<ModalState>) => {
      state.display = action.payload.display;
      if (action.payload.position) state.position = action.payload.position;
      if (action.payload.user) state.user = action.payload.user;
      if (action.payload.users) state.users = action.payload.users;
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
      if (action.payload.offerPreview)
        state.offerPreview = action.payload.offerPreview;
      if (action.payload.type) state.type = action.payload.type;
      if (action.payload.message) state.message = action.payload.message;
      if (action.payload.meet) state.meet = action.payload.meet;
    },
    resetModal: (state: ModalState) => {
      state.display = false;
      state.position = undefined;
      state.user = undefined;
      state.users = [];
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
      state.offerPreview = undefined;
      state.type = undefined;
      state.message = undefined;
      state.meet = undefined;
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
    setUsers: (state: ModalState, action: PayloadAction<BetaUser[]>) => {
      state.users = action.payload;
    },
  },
}) as Slice<ModalState>;

// Action creators are generated for each case reducer function
export const { setModal, resetModal, setModalUserExperiences, setUsers } =
  modalSlice.actions;

export default modalSlice.reducer;
