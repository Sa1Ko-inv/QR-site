import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // Решает проблемы с HMR и React Refresh
    fastRefresh: true,
    jsxRuntime: 'classic',
  })],
  envDir: './',
  server: {
    host: '0.0.0.0', // Позволяет доступ с любых устройств в сети
    port: 3000, // Порт, который вы хотите использовать
    open: true, // Автоматически открывает приложение в браузере
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
