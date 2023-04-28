import VIDEOS_INFO from '../../imagesInfo.json'
import { createSlice } from '@reduxjs/toolkit'
import { filterDataFromHex } from '../../utils/functions'

const DEFAULT_STATE = {
  currentVideo: VIDEOS_INFO[0],
  filteredData: VIDEOS_INFO,
  originalVideos: VIDEOS_INFO,
  playlist: []
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
      const { currentVideo } = action.payload
      state.currentVideo = currentVideo
      state.originalVideos = action.payload.originalVideos
    },
    filterData: (state, action) => {
      const { hexValue: hex, offset, originalVideos } = action.payload
      const filteredData = filterDataFromHex(hex, offset, originalVideos)

      state.filteredData = filteredData
      state.originalVideos = originalVideos
    },
    addVideoToPlaylist: (state, action) => {
      // Insert the video to the end of the playlist that is an array
      const { video } = action.payload
      state.playlist.push(video)
    }
  }
})

export default slice.reducer
export const { changeCurrentVideo, filterData, addVideoToPlaylist } = slice.actions
