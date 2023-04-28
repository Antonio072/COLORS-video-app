import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useVideoActions } from '../hooks/useVideoActions'
import { useAppSelector } from '../store/store'

import { getContrastingColor } from '../utils/functions'
import '../styles/App.css'
import AddToQueue from '../svgs/AddToQueue'

function App () {
  const { changeVideo, filterVideos, addToPlaylist } = useVideoActions()
  const { filteredData, currentVideo, originalVideos, playlist } = useAppSelector(state => state.videos)
  const [colorValue, setColorValue] = useState(currentVideo.predominant_color)
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

  const handleAddVideoToPlaylist = (video) => {
    addToPlaylist({ video })
  }

  // TODO Add playlist slider
  // -> Crear una playlist -> El primer elemento que tiene sera el video actual
  // -> Los videos ademas de tener un boton para reproducir tendran uno para agregarlo a la lista
  // -> GOOD TO HAVE: Agregar Sonner para poner un toast
  // -> Boton para eliminar de la playlist
  // -> Acomodar el html para que el elemento actual sea el que siempre este en medio
  return (
    <div className="App" style={{ background: `linear-gradient(${currentVideo.predominant_color} 35%, white)` }}>
      <main className='main'>
        <h1 class="title" style={{ color: fontContrastColor }}>COLORS video player</h1>
        <section className="gallery">
          <iframe className="main-video"
                  src={`https://www.youtube.com/embed/${currentVideo.video_id}?autoplay=1`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen/>
          {playlist && Object.values(playlist).map((item) =>
            <img src={item.thumbnail_url} alt="gallery" onClick={() => handleChangeCurrentVideo(item)} className="gallery__img" />
          )}
        </section>
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
          <div id={item.video_id} className="card" >
            <img src={item.thumbnail_url} alt="thumbnail" className="thumbnail" onClick={() => handleChangeCurrentVideo(item)}/>
            <footer className="card__footer">
              <div className="card__add__to__playlist" onClick={() => handleAddVideoToPlaylist(item)}>
                <AddToQueue color={'#fff'} height={20} width={20}/>
              </div>
              <div className="card__pill">
                <p className="card__duration">4:12</p>
              </div>
            </footer>
          </div>
          <div className="card__info">
            <p className="card__title" style={{ color: fontContrastColor }}>{item.title}</p>
          </div>
        </article>)}
      </article>
    </div>
  )
}

export default App
