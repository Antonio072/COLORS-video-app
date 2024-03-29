import { useEffect, useState, useRef } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { Toaster } from 'sonner'

import { useVideoActions } from '../hooks/useVideoActions'
import useWindowSize from '../hooks/useWindowSize'
import { useAppSelector } from '../store/store'

import { getContrastingColor } from '../utils/functions'
import '../styles/App.css'
import AddToQueue from '../svgs/AddToQueue'
import DeleteFromQueue from '../svgs/DeleteFromQueue'
import { WINDOW_SIZES } from '../utils/constants'

function App () {
  const { changeVideo, filterVideos, addToPlaylist, deleteFromPlaylist } = useVideoActions()
  const { filteredData, currentVideo, originalVideos, playlist } = useAppSelector(state => state.videos)
  const [colorValue, setColorValue] = useState(currentVideo.predominant_color)
  const debounceBackgroundDecimal = useDebounce(colorValue, 500)
  const [fontContrastColor, setFontContrastColor] = useState(() => {
    const contrastingColor = getContrastingColor(currentVideo.predominant_color)
    return contrastingColor
  })
  const [firstHalf, setFirstHalf] = useState([])
  const [secondHalf, setSecondHalf] = useState([])
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0)
  const WINDOW_SIZE = useWindowSize()

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

  const handleDeleteVideoFromPlaylist = (video) => {
    const card = document.getElementById(`playlist_id_${video.video_id}`)
    card.classList.add('deleted')
    setTimeout(() => {
      deleteFromPlaylist({ video })
      card.classList.remove('deleted')
    }, 250)
  }

  // TODO Add playlist slider
  // -> Crear una playlist -> El primer elemento que tiene sera el video actual
  // -> Los videos ademas de tener un boton para reproducir tendran uno para agregarlo a la lista
  // -> GOOD TO HAVE: Agregar Sonner para poner un toast
  // -> Boton para eliminar de la playlist
  // -> Acomodar el html para que el elemento actual sea el que siempre este en medio
  useEffect(() => {
    const playlistLength = Object.keys(playlist).length
    if (playlistLength === 0) {
      setFirstHalf([])
      setSecondHalf([])
    } else {
      setFirstHalf(Object.values(playlist).slice(0, Math.ceil(playlistLength / 2)))
      setSecondHalf(Object.values(playlist).slice(Math.ceil(playlistLength / 2), playlistLength))
    }
  }, [playlist])

  const onMessageReceived = (event) => {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
    if (event.origin === 'https://www.youtube.com') {
      if ((data.event === 'onStateChange' && data.info === 0) ||
        (data.event === 'infoDelivery' && data.info.playerState === 0)) {
        if (Object.keys(playlist).length === 0) {
          return
        }

        const nextVideo = Object.values(playlist)[currentPlaylistIndex + 1]
        if (nextVideo != null) {
          handleChangeCurrentVideo(nextVideo)
          setCurrentPlaylistIndex(currentPlaylistIndex + 1)
        } else {
          setCurrentPlaylistIndex(0)
          handleChangeCurrentVideo(Object.values(playlist)[0])
        }
      }
    }
  }

  const createListenerForYTIframe = () => {
    const iframe = document.getElementById('youtube-player')
    const player = iframe.contentWindow
    player.postMessage(JSON.stringify({
      event: 'listening',
      id: currentVideo.video_id
    }), '*')
    window.removeEventListener('message', onMessageReceived)
    window.addEventListener('message', onMessageReceived)
  }

  useEffect(() => {
    createListenerForYTIframe()
  }, [])
  useEffect(() => {
    createListenerForYTIframe()
  }, [currentVideo, playlist])

  const calcPlaylistHeight = (index, side) => {
    /* It detects if the window size is mobile or desktop
    If it's mobile, it returns an empty object so the height is not calculated thus
    the style is not overriden and the height is set according to the css media query
    */

    const IS_MOBILE = window.width <= 768 ? WINDOW_SIZES.mobile : WINDOW_SIZES.desktop
    if (IS_MOBILE) {
      return {}
    } else {
      if (side === 'left') {
        const invertedIndex = firstHalf.length - index
        return { height: `calc(90% - ${invertedIndex * 30}px)` }
      } else if (side === 'right') {
        return { height: `calc(90% - ${index * 30}px)` }
      }
    }
  }

  return (
    <div className="App" style={{ background: `linear-gradient(${currentVideo.predominant_color} 35%, white)` }}>
      <main className='main'>
        <h1 class="title" style={{ color: fontContrastColor }}>COLORS video player</h1>
        <section className="gallery">
          {playlist && firstHalf.slice(0).reverse().map((item, index) => {
            return <li style={calcPlaylistHeight(index, 'left')} className="playlist__card" id={`playlist_id_${item.video_id}`} >
              <img src={item.thumbnail_url} alt="gallery" onClick={() => handleChangeCurrentVideo(item)} className="gallery__img" />
              <div className="card__pill delete__icon" onClick={() => handleDeleteVideoFromPlaylist(item)}>
                <DeleteFromQueue className='delete__icon' color={'#fff'} height={20} width={20} />
              </div>
            </li>
          }
          )}
          <iframe id="youtube-player"
                  className="main-video"
                  src={`https://www.youtube.com/embed/${currentVideo.video_id}?autoplay=1&enablejsapi=1`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                  />
          {playlist && secondHalf.map((item, index) =>
            <li style={calcPlaylistHeight(index, 'right')} className="playlist__card" id={`playlist_id_${item.video_id}`} >
              <img src={item.thumbnail_url} alt="gallery" onClick={() => handleChangeCurrentVideo(item)} className="gallery__img" />
              <div className="card__pill delete__icon" onClick={() => handleDeleteVideoFromPlaylist(item)}>
                <DeleteFromQueue className='delete__icon' color={'#fff'} height={20} width={20} />
              </div>
            </li>
          )}
        </section>
        <h2 className='subtitle' style={{ color: fontContrastColor }}>Playing: {currentVideo.title}</h2>
      </main>
      <article class="container-items">
        <div class="color-slider">
          <label style={{ color: fontContrastColor }}>Select a color to find similar videos</label>
          <input type="color" value={colorValue} step={1} class="slider" id="myRange"
            onChange={(e) => setColorValue(e.target.value)}
          />
        </div>
        <h2 className="subtitle" style={{ color: fontContrastColor }}>
          {filteredData.length === 0
            ? 'No videos found'
            : `Similiar videos (${filteredData.length > 0 ? filteredData.length : 0})`
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
                <p className="card__duration">{item.duration ? item.duration : '03:12'}</p>
              </div>
            </footer>
          </div>
          <div className="card__info">
            <p className="card__title" style={{ color: fontContrastColor }}>{item.title}</p>
          </div>
        </article>)}
      </article>
      <Toaster richColors />
    </div>
  )
}

export default App
