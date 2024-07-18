import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  search: string;
}

const initialState: SearchState = {
  search: "",
};

export const globalSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInput: (state: SearchState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetSearchInput: (state) => {
      state.search = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchInput, resetSearchInput } = globalSlice.actions;

export default globalSlice.reducer;
