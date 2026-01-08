import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const origin = process.env.VITE_DEV_ORIGIN || undefined; // set this to the tunnel URL when available

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: 'all',
    origin, // if undefined, Vite uses local host; set to tunnel URL for correct generated URLs
    // If using https tunnel, set hmr.protocol = 'wss' and hmr.host accordingly:
    // hmr: origin ? { protocol: origin.startsWith('https') ? 'wss' : 'ws', host: new URL(origin).host } : undefined
  },
})