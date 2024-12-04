import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@FlashCardsUi': path.resolve(__dirname, './src/modules/FlashCardsUi'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
