import { useEffect, useState } from 'react'
import '../styles/App.css'

function App () {
  const [background, setBackground] = useState('eeaeca')

  useEffect(() => {
    setBackground(` radial-gradient(circle, #${background} 90%, #f7f7f7 100%)`)
  }, [])
  return (
    <div className="App" style={{ background }}>
      <main>
        <h1>COLORS video player</h1>
          <img className="main-video" src="https://i.ytimg.com/vi_webp/vCwKgEFSsyI/maxresdefault.webp" alt="main video" style={{ objectFit: 'contain' }}/>
      </main>
      <article>
        <div>
          <h2>Latests videos</h2>
            <ul class="container-items">
              <li class="card"></li>
              <li class="card"></li>
              <li class="card"></li>
              <li class="card"></li>
              <li class="card"></li>
              <li class="card"></li>
              <li class="card"></li>
              <li class="card"></li>
            </ul>
        </div>
      </article>
    </div>
  )
}

export default App
