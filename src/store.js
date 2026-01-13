import { configureStore } from '@reduxjs/toolkit'
import pasteSlice from './redux/pasteSlice.js'
export const store = configureStore({
  reducer: {
    // Add your reducers here
    paste:pasteSlice,
  },
})