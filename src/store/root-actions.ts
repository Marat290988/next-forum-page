import { cashSlice } from './cash/cash.slice';
import { userSlice } from "./user/user.slice";
import { loadingSlice } from './loading/loading.slice';
import { modalSlice } from "./modal/modal.slice";

export const rootActions = {
  ...userSlice.actions, ...loadingSlice.actions, ...modalSlice.actions, ...cashSlice.actions
}