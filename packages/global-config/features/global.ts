import { AppSubscription } from "@youmeet/types/app";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type GlobalError =
  | "fileTooLarge"
  | "creditTooLow"
  | "requestNotCompleted"
  | "fileTooLarge"
  | "not-completed"
  | "request-feedback";

export interface GlobalState {
  locale: string;
  background: number;
  lastModification: number;
  upload: "a-cv" | "r-cv" | "a-video" | string | null;
  error: GlobalError | null;
  login: boolean;
  subscription: AppSubscription | undefined | false;
}

const initialState: GlobalState = {
  locale: "fr",
  background: 0,
  lastModification: new Date().getTime(),
  upload: null,
  error: null,
  login: false,
  subscription: undefined,
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
      action: PayloadAction<"a-cv" | "r-cv" | "a-video" | string | null>
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
} = globalSlice.actions;

export default globalSlice.reducer;
