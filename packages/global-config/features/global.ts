import { AppSubscription } from "@youmeet/types/app";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GlobalError } from "@youmeet/types/CustomModal";

export interface GlobalState {
  locale: string;
  background: number;
  lastModification: number;
  upload: "upload" | "upload-50" | "delete" | null;
  error: GlobalError | null;
  login: boolean;
  subscription: AppSubscription | undefined | false;
  redirect: string;
  tab: number;
  applying: boolean;
}

const initialState: GlobalState = {
  locale: "fr",
  background: 0,
  lastModification: new Date().getTime(),
  upload: null,
  error: null,
  login: false,
  subscription: undefined,
  redirect: "dashboard",
  tab: 0,
  applying: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setBackground: (
      state,
      action: PayloadAction<{ background: number; lastModification: number }>
    ) => {
      state.background = action.payload.background;
      state.lastModification = action.payload.lastModification;
    },
    setUpload: (
      state,
      action: PayloadAction<"upload" | "upload-50" | "delete" | null>
    ) => {
      state.upload = action.payload;
    },
    setError: (state, action: PayloadAction<GlobalError | null>) => {
      state.error = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
    setSubscription: (
      state,
      action: PayloadAction<AppSubscription | undefined | false>
    ) => {
      state.subscription = action.payload;
    },
    setRedirect: (state, action: PayloadAction<string>) => {
      state.redirect = action.payload;
    },
    setTab: (state, action: PayloadAction<number>) => {
      state.tab = action.payload;
    },
    setApplying: (state, action: PayloadAction<boolean>) => {
      state.applying = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLocale,
  setBackground,
  setUpload,
  setError,
  setLogin,
  setSubscription,
  setRedirect,
  setTab,
  setApplying,
} = globalSlice.actions;

export default globalSlice.reducer;
