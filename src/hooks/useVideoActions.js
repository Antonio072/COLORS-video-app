import { changeCurrentVideo, filterData, addVideoToPlaylist } from '../store/slices/videoSlice'
import { useAppDispatch } from '../store/store'

export const useVideoActions = () => {
  const dispatch = useAppDispatch()

  const changeVideo = ({ currentVideo, filteredData, originalVideos }) => {
    dispatch(changeCurrentVideo({ currentVideo, filteredData, originalVideos }))
  }

  const filterVideos = ({ hexValue, offset, originalVideos }) => {
    dispatch(filterData({ hexValue, offset, originalVideos }))
  }

  const addToPlaylist = (video) => {
    dispatch(addVideoToPlaylist(video))
  }

  return { changeVideo, filterVideos, addToPlaylist }
}
