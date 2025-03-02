import typescript from "rollup-plugin-typescript2"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import sass from "rollup-plugin-sass"
import resolve from "@rollup/plugin-node-resolve"

const overrides = {
  compilerOptions: { declaration: true },
  exclude: [
    "src/**/*.test.tsx",
    "src/**/*.stories.tsx",
    "src/**/*.stories.mdx",
    "src/setupTests.ts",
    "src/components/VirtualList/*",
    "src/App.tsx",
    "src/main.tsx",
  ],
}

const config = {
  input: "src/index.tsx",
  plugins: [
    resolve({
      browser: true, // 确保在浏览器环境下运行
      preferBuiltins: false, // 让 Rollup 使用 `node_modules` 里的包，而不是 Node.js 内置模块
    }),
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfigOverride: overrides }),
    sass({ output: "dist/index.css" }),
  ],
}

export default config
