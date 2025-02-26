import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "./", // Asegura rutas relativas en producción
  build: {
    outDir: "dist" // Vercel debe servir desde aquí
  }
})
