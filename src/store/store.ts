import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer
  }
});

export type TypeRootState = ReturnType<typeof store.getState>;
