import VIDEOS_INFO from '../../imagesInfo.json'
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = {
  currentVideo: VIDEOS_INFO[0],
  filteredData: VIDEOS_INFO,
  originalVideos: VIDEOS_INFO
}

const initialState = () => {
  const persistedState = localStorage.getItem('__redux__state__')
  return persistedState ? JSON.parse(persistedState).videos : DEFAULT_STATE
}

export const slice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    changeCurrentVideo: (state, action) => {
      state.currentVideo = action.payload.currentVideo
      state.filteredData = action.payload.filteredData
    }
  }
})

export default slice.reducer
export const { changeCurrentVideo } = slice.actions
