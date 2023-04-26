import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useAppSelector } from '../store/store'

import '../styles/App.css'

function App () {
  const data = useAppSelector(state => state.videos)
  const [colorValue, setColorValue] = useState('#9f9f9f')
  const debounceBackgroundDecimal = useDebounce(colorValue, 500)
  const [filteredData, setFilteredData] = useState(data)
  const [currentVideo, setCurrentVideo] = useState({ video_id: 'vCwKgEFSsyI', thumbnail_url: 'https://i.ytimg.com/vi/vCwKgEFSsyI/maxresdefault.jpg', predominant_color: '#9f9f9f' })
  const [fontContrastColor, setFontContrastColor] = useState(() => {
    const contrastingColor = getContrastingColor(currentVideo.predominant_color)
    return contrastingColor
  })

  useEffect(() => {
    console.log(`El color seleccionado es: ${debounceBackgroundDecimal}`)
    const filterHexValue = debounceBackgroundDecimal
    const filterRgbValue = hexToRgb(filterHexValue)
    const offset = 50
    const filteredData = data.filter(item => {
      const itemRgbValue = hexToRgb(item.predominant_color)
      const rDiff = Math.abs(itemRgbValue.r - filterRgbValue.r)
      const gDiff = Math.abs(itemRgbValue.g - filterRgbValue.g)
      const bDiff = Math.abs(itemRgbValue.b - filterRgbValue.b)
      return rDiff <= offset && gDiff <= offset && bDiff <= offset
    })
    console.log(filteredData)
    setFilteredData(filteredData)

    const contrastingColor = getContrastingColor(debounceBackgroundDecimal)
    setFontContrastColor(contrastingColor)
  }, [debounceBackgroundDecimal])

  function hexToRgb (hexValue) {
    hexValue = hexValue.replace('#', '')
    const r = parseInt(hexValue.substring(0, 2), 16)
    const g = parseInt(hexValue.substring(2, 4), 16)
    const b = parseInt(hexValue.substring(4, 6), 16)
    return { r, g, b }
  }

  const handleChangeCurrentVideo = (item) => {
    setCurrentVideo(item)
    const contrastingColor = getContrastingColor(item.predominant_color)
    setFontContrastColor(contrastingColor)
    console.log(contrastingColor)
  }

  function getContrastingColor (hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1)
    }

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }

    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    // https://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 100
      ? '#2e2e2e'
      : '#e3e3e3'
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
        {filteredData.map((item) =>
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
