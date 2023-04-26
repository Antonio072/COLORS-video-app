import DEFAULT_STATE from '../../imagesInfo.json'
import { createSlice } from '@reduxjs/toolkit'

const initialState = () => {
  return DEFAULT_STATE
}

export const slice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
  }
})

export default slice.reducer
