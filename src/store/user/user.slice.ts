import IUser from './../../interface/user.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { decodeToken } from './../../utils/token';
import Cookies from 'js-cookie';

const initialState: {user: IUser | undefined | null} = {
  user: decodeToken()
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove('token');
    }
  },
})