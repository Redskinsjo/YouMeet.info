import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type OffresSearch = {
  search?: string;
  departments?: string[];
  "all-skip"?: number;
  "paris-skip"?: number;
  "marseille-skip"?: number;
  "lyon-skip"?: number;
  "bordeaux-skip"?: number;
};
export interface SearchState {
  search: string;
  video: boolean;
  phone: boolean;
  linkedin: boolean;
  offres: OffresSearch;
}

const initialState: SearchState = {
  search: "",
  video: true,
  phone: false,
  linkedin: false,
  offres: {
    search: "",
    departments: [],
    "all-skip": 0,
    "paris-skip": 0,
    "marseille-skip": 0,
    "lyon-skip": 0,
    "bordeaux-skip": 0,
  },
};

export const globalSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInput: (state: SearchState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setVideoFilter: (state: SearchState, action: PayloadAction<boolean>) => {
      state.video = action.payload;
    },
    setPhoneFilter: (state: SearchState, action: PayloadAction<boolean>) => {
      state.phone = action.payload;
    },
    setLinkedinFilter: (state: SearchState, action: PayloadAction<boolean>) => {
      state.linkedin = action.payload;
    },
    resetSearchInput: (state) => {
      state.search = "";
    },
    setOffresSearch: (
      state: SearchState,
      action: PayloadAction<OffresSearch>
    ) => {
      state.offres = { ...state, ...action.payload };
    },
    resetOffresSearch: (state) => {
      state.offres = { search: "", departments: [] };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchInput,
  resetSearchInput,
  setVideoFilter,
  setPhoneFilter,
  setLinkedinFilter,
  setOffresSearch,
  resetOffresSearch,
} = globalSlice.actions;

export default globalSlice.reducer;
