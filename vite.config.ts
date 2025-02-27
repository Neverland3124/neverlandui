import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"), // 让 @styles 指向 src/styles
    },
  },
  plugins: [react()],
  // test: {
  //   coverage: {
  //     provider: "v8", // 之前是 "c8"
  //   },
  // },
})
