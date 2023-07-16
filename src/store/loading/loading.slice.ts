import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {isLoading: false},
  reducers: {
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setLoadingWithParam: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});