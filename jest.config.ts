import type { Config } from "jest"

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test.setup.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testMatch: ["**/*.j.test.tsx", "**/*.j.test.js"], // 只测试 .j.test.tsx 文件

  // 使用 babel
  // transform: {
  //   "^.+\\.(js|jsx|ts|tsx)$": [
  //     "babel-jest",
  //     { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] },
  //   ],
  // },

  // 使用 esbuild
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "esbuild-jest",
  },
}

export default config
