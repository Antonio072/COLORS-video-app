import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useVideoActions } from '../hooks/useVideoActions'
import { useAppSelector } from '../store/store'

import { getContrastingColor } from '../utils/functions'
import '../styles/App.css'

function App () {
  const { changeVideo, filterVideos } = useVideoActions()
  const { filteredData, currentVideo, originalVideos } = useAppSelector(state => state.videos)
  const [colorValue, setColorValue] = useState('#9f9f9f')
  const debounceBackgroundDecimal = useDebounce(colorValue, 500)
  const [fontContrastColor, setFontContrastColor] = useState(() => {
    const contrastingColor = getContrastingColor(currentVideo.predominant_color)
    return contrastingColor
  })

  useEffect(() => {
    console.log(`El color seleccionado es: ${debounceBackgroundDecimal}`)
    filterVideos({ hexValue: debounceBackgroundDecimal, offset: 50, originalVideos })
    const contrastingColor = getContrastingColor(debounceBackgroundDecimal)
    setFontContrastColor(contrastingColor)
  }, [debounceBackgroundDecimal])

  const handleChangeCurrentVideo = (item) => {
    changeVideo({ currentVideo: item, filteredData, originalVideos })
    const contrastingColor = getContrastingColor(item.predominant_color)
    setFontContrastColor(contrastingColor)
    console.log(contrastingColor)
  }

  return (
    <div className="App" style={{ background: `linear-gradient(${currentVideo.predominant_color} 35%, white)` }}>
      <main className='main'>
        <h1 class="title" style={{ color: fontContrastColor }}>COLORS video player</h1>
        <iframe className="main-video"
                src={`https://www.youtube.com/embed/${currentVideo.video_id}?autoplay=1`}
                title="YouTube video player"
                 frameborder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowfullscreen/>
        <h2 className='subtitle' style={{ color: fontContrastColor }}>Playing: {currentVideo.title}</h2>
      </main>
      <article class="container-items">
        <div class="color-slider">
          <input type="color" value={colorValue} step={1} class="slider" id="myRange"
            onChange={(e) => setColorValue(e.target.value)}
          />
        </div>
        <h2 className="subtitle" style={{ color: fontContrastColor }}>
          {filteredData.length === 0
            ? 'No videos found'
            : 'Latest videos'
          }
        </h2>
        {filteredData.length > 0 && filteredData.map((item) =>
        <article>
          <button id={item.video_id} className="card" onClick={() => handleChangeCurrentVideo(item)}>
            <img src={item.thumbnail_url} alt="thumbnail" className="thumbnail"/>
            <div className="card__pill">
              <p className="card__duration">4:12</p>
            </div>
          </button>
          <div className="card__info">
            <p className="card__title" style={{ color: fontContrastColor }}>{item.title}</p>
          </div>
        </article>)}
      </article>
    </div>
  )
}

export default App
