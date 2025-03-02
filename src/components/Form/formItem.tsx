import React, { FC, ReactNode, useContext, useEffect } from "react"
import classNames from "classnames"
import { FormContext } from "./form"

// 把几个属性都变成必填的
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

export interface FormItemProps {
  /**字段名 */
  name: string // input 的 key
  /**label 标签的文本 */
  label?: string
  children?: ReactNode
  // Item 里面需要适配不同的组件
  /**子节点的值的属性，如 checkbox 的是 'checked'，input是value */
  valuePropName?: string
  /**设置收集字段值变更的时机 例如 onChange */
  trigger?: string
  /**设置如何将 event 的值转换成字段值 例如 (e) => e.target.value */
  getValueFromEvent?: (event: any) => any
}

// SomeRequired: 从T中挑选出K中的属性，并且这些属性是必须的
// SomeRequired<FormItemProps, "getValueFromEvent" | "trigger" | "valuePropName">> 好像没必要
export const FormItem: FC<FormItemProps> = ({
  name,
  label,
  children,
  valuePropName = "value",
  trigger = "onChange",
  getValueFromEvent = (e) => e.target.value,
}) => {
  const rowClass = classNames("neverlandui-row", {
    "neverlandui-row-no-label": !label,
  })
  const { dispatch, fields, initialValues } = useContext(FormContext)
  // 拿到注册，挂载一次
  useEffect(() => {
    // initialValues[name] name 是 key
    const value = (initialValues && initialValues[name]) || ""
    // 初始化一次 store
    dispatch({ type: "addField", name, value: { label, name, value } })
  }, [])
  // key - value array
  const fieldState = fields[name]
  // 需要初始化为 "", 否则会有 A component is changing an uncontrolled input to be controlled.
  const value = (fieldState && fieldState.value) || ""
  // 所以我们需要的是把这个onValueUpdate的函数让进children来达成受控组件的数据更新
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent && getValueFromEvent(e) //e.target.value
    console.log("new value", value)
    // update the value
    // name 更新 哪一项，value 更新成什么值
    dispatch({ type: "updateValue", name, value })
  }
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  // Record: Construct a type with a set of properties K of type T
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate

  // 2 获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)
  // 没有子组件
  if (childList.length === 0) {
    console.error(
      "No child element found in Form.Item, please provide one form component"
    )
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn(
      "Only support one child element in Form.Item, others will be omitted"
    )
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error("Child component is not a valid React Element")
  }
  const child = childList[0] as React.ReactElement
  // 3 cloneElement，混合这个child 以及 手动的属性列表
  console.log("test", child.props, controlProps)
  const returnChildNode = React.cloneElement(
    // 想clone的节点
    child,
    typeof child.props === "object" && child.props !== null
      ? { ...child.props, ...controlProps }
      : { ...controlProps }
    // 添加的属性
    // { ...(child.props || {}), ...(controlProps || {}) }
  )

  return (
    <div className={rowClass}>
      {/* label */}
      {label && (
        <div className="neverlandui-form-item-label">
          {/* form 对应的 label */}
          <label title={label}>{label}</label>
        </div>
      )}
      {/* form item */}
      <div className="neverlandui-form-item">{returnChildNode}</div>
    </div>
  )
}

export default FormItem
