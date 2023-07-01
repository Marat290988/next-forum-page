import { userSlice } from "./user/user.slice";
import { loadingSlice } from './loading/loading.slice';

export const rootActions = {
  ...userSlice.actions, ...loadingSlice.actions
}