import { toast } from 'sonner'

export const toaster = (store) => (next) => (action) => {
  const { type } = action
  next(action)
  if (type === 'videos/addVideoToPlaylist') { // <- eliminado un usuario
    toast.success('Añadido a la lista de reproducción')
  }
  if (type === 'videos/deleteVideoFromPlaylist') { // <- eliminado un usuario
    toast.success('Eliminado de la lista de reproducción')
  }
}
