import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode, SetStateAction } from "react";

interface userState {
  email: string | null,
}

const initialState = {
  email: null,
} as userState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state, action) {
      state.email = action.payload.email
    },
    signout(state) {
      state.email = null
    }
  }
})

export const { signin, signout } = userSlice.actions
export default userSlice.reducer 