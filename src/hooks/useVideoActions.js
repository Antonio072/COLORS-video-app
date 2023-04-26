import { changeCurrentVideo } from '../store/slices/videoSlice'
import { useAppDispatch } from '../store/store'

export const useVideoActions = () => {
  const dispatch = useAppDispatch()

  const changeVideo = ({ currentVideo, filteredData }) => {
    dispatch(changeCurrentVideo({ currentVideo, filteredData }))
  }

  return { changeVideo }
}
