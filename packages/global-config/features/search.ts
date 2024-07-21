import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  search: string;
  video: boolean;
  phone: boolean;
  linkedin: boolean;
}

const initialState: SearchState = {
  search: "",
  video: true,
  phone: false,
  linkedin: false,
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchInput,
  resetSearchInput,
  setVideoFilter,
  setPhoneFilter,
  setLinkedinFilter,
} = globalSlice.actions;

export default globalSlice.reducer;
