import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
} from "react"
import Input, { InputProps } from "../Input/input"
import Icon from "../Icon/icon"
import useDebounce from "../../hooks/useDebounce"
import classNames from "classnames"
import useClickOutside from "../../hooks/useClickOutside"

interface DataSourceObject {
  // 一定有 value
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject // 可以是 value 加上任意类型

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null) // 整个组件的 dom节点
  const debouncedValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef as React.RefObject<HTMLDivElement>, () => {
    setSuggestions([]) // 点击外部，关闭下拉框
  })

  useEffect(() => {
    // 如果 debouncedValue 为空，不发送请求，直接返回
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          console.log(data)
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case "ArrowUp":
        highlight(highlightIndex - 1)
        break
      case "ArrowDown":
        highlight(highlightIndex + 1)
        break
      case "Escape":
        setSuggestions([])
        break
      default:
        break
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    // 显示 value
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul className="neverlandui-suggestion-list">
        {suggestions.map((item, index) => {
          const cnames = classNames("suggestion-item", {
            "is-active": index === highlightIndex,
          })
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      className="neverlandui-auto-complete"
      ref={componentRef as React.RefObject<HTMLDivElement>}
    >
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
