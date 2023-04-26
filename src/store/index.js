import { configureStore } from '@reduxjs/toolkit'

import videoReducer from './slices/videoSlice'
import { persistanceLocalStorage } from './middlewares/persistanceLocalStorage'

export const store = configureStore({
  reducer: {
    videos: videoReducer
  },
  middleware: [persistanceLocalStorage]
})
