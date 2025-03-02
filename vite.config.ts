import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import resolve from "@rollup/plugin-node-resolve"

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
  build: {
    rollupOptions: {
      external: ["util", "path"],
      plugins: [
        resolve({
          preferBuiltins: false, // 关键：避免 Vite 解析错误的 Node.js 内置模块
        }),
      ],
    },
  },
})
