import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  profileStep: 1 | 2 | 3;
  organisationStep: 1 | 2 | 3;
  offerStep: 1 | 2 | 3;
  userEmail: string | null;
  loading: boolean;
}

const initialState: FormState = {
  profileStep: 1,
  organisationStep: 1,
  offerStep: 1,
  userEmail: null,
  loading: false,
};

export const givenInfosSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setProfileStep: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.profileStep = action.payload;
    },
    setOrganisationStep: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.organisationStep = action.payload;
    },
    setOfferStep: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.offerStep = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProfileStep, setOrganisationStep, setLoading, setOfferStep } =
  givenInfosSlice.actions;

export default givenInfosSlice.reducer;
