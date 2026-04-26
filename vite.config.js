import process from 'node:process'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  esbuild: process.env.VITEST
    ? {
        jsx: 'automatic',
      }
    : undefined,
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
