import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
}

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