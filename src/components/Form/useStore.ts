import { useState, useReducer } from "react"

export interface FieldDetail {
  name: string
  value: string
  rules: any[]
  isValid: boolean
  errors: any[]
}

export interface FieldsState {
  [key: string]: FieldDetail
}

export interface FormState {
  isValid: boolean
}

export interface FieldsAction {
  type: "addField" | "updateValue"
  name: string
  value: any
}
// useReducer
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        // 添加一项
        [action.name]: { ...action.value },
      }
    case "updateValue":
      return {
        ...state,
        // 对于 name 这一项 
        // ...state[action.name] 别的都保持不变
        // value: action.value 只更新 value
        [action.name]: { ...state[action.name], value: action.value },
        // action.name 原本就在 store 里，我们是找到这个 key 然后更新 value
      }
    default:
      return state
  }
}
// 使用 react hooks 和 class 都可以实现 store
// 这里使用 react hooks 因为更简单 可以使用 useState 和 useReducer

function useStore() {
  // form state
  const [form, setForm] = useState<FormState>({ isValid: true })
  // 一开始没有任何内容
  // fields 里面有我们 input 中需要显示的内容，需要传到 item 里让他显示
  const [fields, dispatch] = useReducer(fieldsReducer, {})
  return { fields, dispatch, form }
}

export default useStore
