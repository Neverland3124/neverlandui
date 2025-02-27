import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    css: true,
    globals: true, // 允许全局使用 describe/it/expect 等
    environment: "jsdom", // 使用 jsdom 作为测试环境，适用于 React 组件测试
    setupFiles: "./test.setup.ts", // 指定测试前的初始化文件
    include: ["**/*.v.test.tsx", "**/*.v.test.js"],
    coverage: {
      provider: "v8", // 启用覆盖率报告（可选）
      reportsDirectory: "coverage",
    },
    exclude: [...configDefaults.exclude, "node_modules/**"],
  },
})
