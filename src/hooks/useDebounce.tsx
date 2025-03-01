import { useState, useEffect } from "react"

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  // 如果在 delay 时间内 value 变化了，就会重新设置 setTimeout
  useEffect(() => {
    // 在一些 严格模式（strict mode） 或 TypeScript 配置较严格的环境（比如 tsconfig.json 里 lib 没有 DOM），如果没有 window. 可能会报错
    // handler 是一个 id，可以用来取消 setTimeout
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // delay 可以不加
  return debouncedValue
}

export default useDebounce
