import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {nav: Record<string, any>} = {
  nav: {}
}

export const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    setCashNav: (state, action: PayloadAction<{key: string, val: {id: number, title: string, url: string}[]}>) => {
      state.nav[action.payload.key] = action.payload.val;
    }
  }
})