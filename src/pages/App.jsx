import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import '../styles/App.css'

function App () {
  const [colorValue, setColorValue] = useState('#eedbae')
  const debounceBackgroundDecimal = useDebounce(colorValue, 500)

  useEffect(() => {
    console.log(`El color seleccionado es: ${debounceBackgroundDecimal}`)
    // TODO: Make request to yt api
  }, [debounceBackgroundDecimal])

  return (
    <div className="App" style={{ background: `linear-gradient(${debounceBackgroundDecimal} 15%, white)` }}>
      <main className='main'>
        <h1 class="title">COLORS video player</h1>
        <img className="main-video" src="https://i.ytimg.com/vi_webp/vCwKgEFSsyI/maxresdefault.webp" alt="main video" style={{ objectFit: 'contain' }}/>
      </main>
      <p>Running with {debounceBackgroundDecimal}</p>
      <article class="container-items">
          <div class="color-slider">
            <input type="color" value={debounceBackgroundDecimal} step={1} className="slider" id="myRange"
              onChange={(e) => setColorValue(e.target.value)}
            />
          </div>
          <h2 class="subtitle">Latests videos</h2>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
      </article>
    </div>
  )
}

export default App
