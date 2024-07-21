import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./features/global";
import formSlice from "./features/form";
import userSlice from "./features/user";
import searchSlice from "./features/search";
import modalSlice from "./features/modal";
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
