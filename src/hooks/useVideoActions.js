import { changeCurrentVideo, filterData } from '../store/slices/videoSlice'
import { useAppDispatch } from '../store/store'

export const useVideoActions = () => {
  const dispatch = useAppDispatch()

  const changeVideo = ({ currentVideo, filteredData, originalVideos }) => {
    dispatch(changeCurrentVideo({ currentVideo, filteredData, originalVideos }))
  }

  const filterVideos = ({ hexValue, offset, originalVideos }) => {
    dispatch(filterData({ hexValue, offset, originalVideos }))
  }

  return { changeVideo, filterVideos }
}
