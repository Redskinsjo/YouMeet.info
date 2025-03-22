import {
  Avatar,
  BetaCandidate,
  BetaCompany,
  BetaDetails,
  BetaProfile,
  BetaUser,
  InterviewOffer,
  Job,
  Offer,
  Video,
} from "@youmeet/gql/generated";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  phone: string;
  // admin: Company | undefined;
  candidate: BetaCandidate | undefined;
  profile: BetaProfile | undefined;
  details: BetaDetails | undefined;
  interviews: InterviewOffer[] | undefined;
  description: string;
  age: number | undefined;
  fullname: string;
  extension: string;
  lastname: string;
  firstname: string;
  picture: string;
  credit: number;
  customerId: string;
  scrapped: boolean;
  trial: boolean;
  roles: Job[] | undefined;
  unlimited: boolean;
  role: string;
  consent: boolean;
  isPublic: boolean;
  cvFile: Avatar | null;
  user: boolean;
  pro: boolean;
  company: BetaCompany | undefined;
  hiddenFields: string[];
  professionalEmail: boolean;
  uniqueName: string;
  videos: Video[];
  myOffers: Offer[];
}

const initialState: UserState = {
  id: "",
  email: "",
  phone: "",
  description: "",
  age: undefined,
  // admin: false,
  candidate: undefined,
  profile: undefined,
  details: undefined,
  fullname: "",
  extension: "",
  lastname: "",
  firstname: "",
  picture: "",
  credit: 0,
  cvFile: null,
  customerId: "",
  scrapped: false,
  trial: false,
  roles: undefined,
  unlimited: false,
  role: "",
  interviews: [],
  consent: false,
  isPublic: false,
  user: false,
  pro: false,
  company: undefined,
  hiddenFields: [],
  professionalEmail: false,
  uniqueName: "",
  videos: [],
  myOffers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state: UserState, action: PayloadAction<Partial<BetaUser>>) => {
      const email = action.payload?.email;
      const candidate = action.payload.candidate;
      const profile = action.payload.profile;
      const details = action.payload.details;
      const id = action.payload?.id;
      const description = action.payload?.description;
      const age = action.payload?.age;
      const fullname = action.payload?.fullname;
      const extension = action.payload?.extension;
      const lastname = action.payload?.lastname;
      const firstname = action.payload?.firstname;
      const picture = action.payload?.picture;
      const unlimited = action.payload?.unlimited;
      const credit = action.payload?.credit;
      const scrapped = action.payload?.scrapped;
      const role = action.payload?.role;
      const interviews = action.payload?.interviews;
      const consent = action.payload.consent;
      const isPublic = action.payload.isPublic;
      const user = action.payload.user;
      const pro = action.payload.pro;
      const company = action.payload.company;
      const hiddenFields = action.payload.hiddenFields;
      const professionalEmail = action.payload.professionalEmail;
      const uniqueName = action.payload.uniqueName;
      const videos = action.payload.videos;
      const cvFile = action.payload.cvFile;
      const myOffers = action.payload.myOffers;

      // remember when you wanted to get a customerId for activating a candidate feedbacks
      const customerId = action.payload?.customerId;
      const trial = action.payload?.trial;
      const roles = action.payload?.roles as Job[];

      if (videos) state.videos = videos as Video[];
      if (id) state.id = id;
      if (email) state.email = email;
      if (description) state.description = description;
      if (age) state.age = age;
      if (candidate) state.candidate = candidate;
      if (details) state.details = details;
      if (profile) state.profile = profile;
      if (fullname) state.fullname = fullname;
      if (extension) state.extension = extension;
      if (lastname) state.lastname = lastname;
      if (firstname) state.firstname = firstname;
      if (picture) state.picture = picture;
      if (scrapped !== undefined) state.scrapped = scrapped as boolean;
      if (role) state.role = role;
      if (unlimited !== undefined) state.unlimited = unlimited as boolean;
      state.credit = credit ?? 0;
      if (customerId) state.customerId = customerId;
      if (trial !== undefined) state.trial = trial as boolean;
      if (roles) state.roles = roles;
      if (interviews) state.interviews = interviews as InterviewOffer[];
      if (consent !== undefined) state.consent = consent as boolean;
      if (isPublic !== undefined) state.isPublic = isPublic as boolean;
      if (user !== undefined) state.user = user as boolean;
      if (pro !== undefined) state.pro = pro as boolean;
      if (company) state.company = company;
      if (hiddenFields) state.hiddenFields = hiddenFields as string[];
      if (professionalEmail !== undefined)
        state.professionalEmail = professionalEmail as boolean;
      if (uniqueName) state.uniqueName = uniqueName as string;
      if (myOffers) state.myOffers = myOffers as Offer[];
      state.cvFile = cvFile || null;
    },
    setCredit: (state: UserState, action: PayloadAction<number>) => {
      state.credit = action.payload;
    },
    removeUser: (state: UserState, action: PayloadAction<string>) => {
      state.videos = [];
      state.id = "";
      state.email = "";
      state.phone = "";
      // state.admin = false;
      state.candidate = undefined;
      state.profile = undefined;
      state.details = undefined;
      state.fullname = "";
      state.extension = "";
      state.lastname = "";
      state.firstname = "";
      state.picture = "";
      state.credit = 0;
      state.customerId = "";
      state.trial = false;
      state.scrapped = false;
      state.unlimited = false;
      state.consent = false;
      state.isPublic = false;
      state.interviews = [];
      state.user = false;
      state.pro = false;
      state.company = undefined;
      state.hiddenFields = [];
      state.professionalEmail = false;
      state.uniqueName = "";
      state.cvFile = null;
      state.myOffers = [];
    },
    setCustomerId: (state: UserState, action: PayloadAction<string>) => {
      state.customerId = action.payload;
    },
    setCvFile: (state: UserState, action: PayloadAction<Avatar | null>) => {
      state.cvFile = action.payload;
    },
    setUnlimited: (state: UserState, action: PayloadAction<boolean>) => {
      state.unlimited = action.payload;
    },
    setCompany: (state: UserState, action: PayloadAction<BetaCompany>) => {
      state.company = action.payload;
    },
    setHiddenFields: (state: UserState, action: PayloadAction<string[]>) => {
      state.hiddenFields = action.payload;
    },
    addVideo: (state: UserState, action: PayloadAction<Video>) => {
      state.videos = [...state.videos, action.payload];
    },
    removeVideo: (state: UserState, action: PayloadAction<Video>) => {
      state.videos = state.videos.filter(
        (video) => video.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  storeUser,
  setCredit,
  removeUser,
  setCustomerId,
  setUnlimited,
  setCompany,
  setHiddenFields,
  removeVideo,
  addVideo,
  setCvFile,
} = userSlice.actions;

export default userSlice.reducer;
