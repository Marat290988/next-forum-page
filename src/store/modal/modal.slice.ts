import { ReactNode } from 'react';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {isShowModal: boolean, component: ReactNode | null};

const initialState: State = {isShowModal: false, component: null};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState as State,
  reducers: {
    switchOn: (state, action: PayloadAction<ReactNode>) => {
      state.isShowModal = true;
      state.component = action.payload;
    },
    switchOff: (state) => {
      state.isShowModal = false;
      state.component = null;
    }
  }
})