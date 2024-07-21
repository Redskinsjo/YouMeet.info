import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SelectionState {
  interviewOfferId?: string | undefined;
  profileSharingId?: string | undefined;
}

const initialState: SelectionState = {
  interviewOfferId: undefined,
  profileSharingId: undefined,
};

export const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    setSelection: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      if (action.payload.type === "interview")
        state.interviewOfferId = action.payload.id;
      if (action.payload.type === "sharing")
        state.profileSharingId = action.payload.id;
    },
    resetSelection: (state, action: PayloadAction<SelectionState>) => {
      state.interviewOfferId = undefined;
      state.profileSharingId = undefined;
    },
  },
});

export const { setSelection, resetSelection } = selectionSlice.actions;

export default selectionSlice.reducer;
