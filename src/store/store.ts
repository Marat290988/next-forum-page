import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";
import { loadingSlice } from './loading/loading.slice';
import { modalSlice } from "./modal/modal.slice";
import { cashSlice } from "./cash/cash.slice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    loadingReducer: loadingSlice.reducer,
    modalReducer: modalSlice.reducer,
    cashReducer: cashSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type TypeRootState = ReturnType<typeof store.getState>;
