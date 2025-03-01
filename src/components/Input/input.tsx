import React, {
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
  forwardRef,
} from "react"
import classNames from "classnames"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Icon from "../Icon/icon"

type InputSize = "lg" | "sm"
// InputHTMLAttributes 有 size 是 number
// 使用 Omit 来排除 size
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用 Input */
  disabled?: boolean
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement // 例如 https://
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement // 例如 .com
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void // 改成 HTMLInputElement 让他有 value 属性
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'neverlandui'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  const cnames = classNames("neverlandui-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  })
  const fixControlledValue = (value: any) => {
    // 如果是undefined或者null 那就是非受控组件
    // 把他转换为空字符串，变成受控组件
    if (typeof value === "undefined" || value === null) {
      return ""
    }
    return value
  }
  // 如果 value 和 defaultValue 同时存在，删除 defaultValue
  // 以 value 为准
  if ("value" in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={cnames} style={style}>
      {prepend && (
        <div className="neverlandui-input-group-prepend">{prepend}</div>
      )}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        ref={ref}
        className="neverlandui-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="neverlandui-input-group-append">{append}</div>}
    </div>
  )
})

export default Input
