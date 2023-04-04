import { useEffect, useState } from 'react'
import '../styles/App.css'

function App () {
  const [background, setBackground] = useState('eedbae')
  const [backgroundDecimal, setBackgroundDecimal] = useState('#eedbae')

  useEffect(() => {
    setBackground(`linear-gradient(#${background} 60%, white)`)
  }, [])

  const onChangeRangeValue = (value) => {
    setBackgroundDecimal(value)

    setBackground(`linear-gradient(${value} 60%, white)`)
  }

  return (
    <div className="App" style={{ background }}>
      <main className='main'>
        <h1 class="title">COLORS video player</h1>
        <img className="main-video" src="https://i.ytimg.com/vi_webp/vCwKgEFSsyI/maxresdefault.webp" alt="main video" style={{ objectFit: 'contain' }}/>
      </main>
      <p>Running with {background}</p>
      <article class="container-items">
          <div class="color-slider">
            <input type="color" value={backgroundDecimal} step={1} class="slider" id="myRange"
              onChange={(e) => onChangeRangeValue(e.target.value)}
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
