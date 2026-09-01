import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/*
 * base 只在 CI 里由 PAGES_BASE 指定（GitHub Pages 不在根路径）。
 * 本地 npm run dev / npm run build 都跑在 /，不受影响。
 */
export default defineConfig({
  base: process.env.PAGES_BASE ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { port: 5173, host: true },
})
