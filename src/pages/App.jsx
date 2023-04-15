import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import '../styles/App.css'
import data from '../imagesInfo.json'

function App () {
  const [colorValue, setColorValue] = useState('#eedbae')
  const debounceBackgroundDecimal = useDebounce(colorValue, 500)
  const [filteredData, setFilteredData] = useState(data)
  const [currentVideo, setCurrentVideo] = useState({ video_id: 'vCwKgEFSsyI', thumbnail_url: 'https://i.ytimg.com/vi/vCwKgEFSsyI/maxresdefault.jpg', predominant_color: '#9f9f9f' })

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
    setFilteredData(Array.from(new Set(filteredData)))
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
  }

  return (
    <div className="App" style={{ background: `linear-gradient(${currentVideo.predominant_color} 35%, white)` }}>
      <main className='main'>
        <h1 class="title">COLORS video player</h1>
        <iframe className="main-video"
                src={`https://www.youtube.com/embed/${currentVideo.video_id}`}
                title="YouTube video player"
                 frameborder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowfullscreen/>
      </main>
      <article class="container-items">
        <div class="color-slider">
          <input type="color" value={colorValue} step={1} class="slider" id="myRange"
            onChange={(e) => setColorValue(e.target.value)}
          />
        </div>
        <h2 className="subtitle">Latest videos</h2>
        {filteredData.map((item) =>
          <button id={item.video_id} className="card" onClick={() => handleChangeCurrentVideo(item)}>
            <img src={item.thumbnail_url} alt="thumbnail" className="thumbnail"/>
          </button>)}
      </article>
    </div>
  )
}

export default App
