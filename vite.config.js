import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginRadar } from 'vite-plugin-radar'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/COLORS-video-app/',
  plugins: [react(),
    VitePluginRadar({
      enableDev: true, // enable radar in dev mode
      analytics: [
        {
          id: 'G-160XC9TQ5X',
          config: {
            cookie_domain: 'auto',
            cookie_expires: 63072000,
            cookie_prefix: 'none',
            cookie_update: true,
            cookie_flags: '',
            send_page_view: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: true
          },

          persistentValues: {
            currency: 'MXN'
          }
        }
      ]

    })]
})
