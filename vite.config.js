import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react-simple-maps', 'prop-types', 'd3-scale', 'topojson-client'],
  },
  server: {
    port: 3000, // This forces the dev server to run on localhost:3000
    strictPort: true, // The backend's CORS allowlist only permits localhost:3000 — if that port is
    // taken, Vite's default behavior is to silently fall back to the next free port (3001, 3002, ...)
    // instead of erroring, which makes every API request fail CORS with no obvious cause (the UI just
    // shows its generic "something went wrong" error state). Failing loudly here is much easier to
    // diagnose than a phantom "something went wrong" that vanishes once you happen to free port 3000.
    open: true, // Optional: Automatically opens the app in your browser
  },
  build: {
    outDir: 'build', // Matches CRA's default build folder name
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.jsx'],
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      // Deliberately not `all: true` — this repo's tests focus on the data layer (api/queries),
      // shared motion/UI utilities, and a couple of interactive components, not the whole untested
      // JSX page tree. These thresholds are a "don't regress the tested surface" floor (set just
      // below the baseline when introduced), not a mandate to reach blanket coverage.
      thresholds: {
        statements: 40,
        branches: 40,
        functions: 35,
        lines: 40,
      },
    },
  },
})
