import { configureStore } from '@reduxjs/toolkit'
import UserReduser from './UserSlice'

export default configureStore({
  reducer: {
    user: UserReduser
  }
})