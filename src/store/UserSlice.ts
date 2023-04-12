import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode, SetStateAction } from "react";

interface userState {
  email: string | null,
  uid: string | null,
}

const initialState = {
  email: null,
  uid: null,
} as userState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state, action) {
      state.email = action.payload.email
      state.uid = action.payload.uid
    },
    signout(state) {
      state.email = null
      state.uid = null
    }
  }
})

export const { signin, signout } = userSlice.actions
export default userSlice.reducer 