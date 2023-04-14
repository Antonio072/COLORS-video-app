import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import '../styles/App.css'
import data from '../imagesInfo.json'

function App () {
  const [colorValue, setColorValue] = useState('#eedbae')
  const debounceBackgroundDecimal = useDebounce(colorValue, 500)
  const [filteredData, setFilteredData] = useState(data)

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

  return (
    <div className="App" style={{ background: `linear-gradient(${debounceBackgroundDecimal} 15%, white)` }}>
      <main className='main'>
        <h1 class="title">COLORS video player</h1>
        <img className="main-video" src="https://i.ytimg.com/vi_webp/vCwKgEFSsyI/maxresdefault.webp" alt="main video" style={{ objectFit: 'contain' }}/>
      </main>
      <p>Running with {debounceBackgroundDecimal}</p>
      <article class="container-items">
        <div class="color-slider">
          <input type="color" value={colorValue} step={1} class="slider" id="myRange"
            onChange={(e) => setColorValue(e.target.value)}
          />
        </div>
        <h2 className="subtitle">Latest videos</h2>
        {filteredData.map((item) =>
          <div className="card" style={{ border: `5px solid #${item.predominant_color}` }}>
            <img src={item.thumbnail_url} alt="thumbnail" className="thumbnail" />
          </div>)}
      </article>
    </div>
  )
}

export default App
