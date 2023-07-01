import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";
import { loadingSlice } from './loading/loading.slice';

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    loadingReducer: loadingSlice.reducer
  }
});

export type TypeRootState = ReturnType<typeof store.getState>;
