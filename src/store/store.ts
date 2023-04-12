import { configureStore } from '@reduxjs/toolkit'
import UserReduser from './UserSlice'

export const store = configureStore({
  reducer: {
    user: UserReduser
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch