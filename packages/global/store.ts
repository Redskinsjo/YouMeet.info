import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "@/global/features/global";
import formSlice from "@/global/features/form";
import userSlice from "@/global/features/user";
import searchSlice from "@/global/features/search";
import modalSlice from "@/global/features/modal";
import selectionSlice from "./features/selection";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    form: formSlice,
    user: userSlice,
    search: searchSlice,
    modal: modalSlice,
    selection: selectionSlice,
  },
});

type GetStateType = typeof store.getState;

export type RootState = ReturnType<GetStateType>;

export type AppDispatch = typeof store.dispatch;
