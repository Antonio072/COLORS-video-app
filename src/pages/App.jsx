import { useEffect, useState } from 'react'
import '../styles/App.css'

function App () {
  const [background, setBackground] = useState('eeaeca')

  useEffect(() => {
    setBackground(` radial-gradient(circle, #${background} 90%, #f7f7f7 100%)`)
  }, [])
  return (
    <div className="App" style={{ background }}>
      <main className='main'>
        <h1 class="title">COLORS video player</h1>
        <img className="main-video" src="https://i.ytimg.com/vi_webp/vCwKgEFSsyI/maxresdefault.webp" alt="main video" style={{ objectFit: 'contain' }}/>
      </main>
      <article class="container-items">
          <h2 class="subtitle">Latests videos</h2>
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
