import React, {
  FC,
  ReactNode,
  createContext,
  // forwardRef,
  // useImperativeHandle,
} from "react"

// 我们把数据存到form的store里，这样所有的formItem就可以共用这个store了
import useStore from "./useStore"
export interface FormProps {
  /**表单名称，会作为表单字段 id 前缀使用 */
  name?: string
  /**表单默认值，只有初始化以及重置时生效 */
  // Record 构造一个对象类型，其属性键和值的类型由你指定
  initialValues?: Record<string, any>
  children?: ReactNode
}

// 拿到 useStore 的返回类型
// Pick: From T, pick a set of properties whose keys are in the union K
// & 交叉类型 两个类型的属性都有
export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields"
> &
  Pick<FormProps, "initialValues">
// fields 的目的是把 input 数字存储到 store 中

// 初始值基本没用 后面再设置 可以强制类型断言
// 再把store传到formitem里让他们自己进行更新
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = ({
  name = "neverlandui",
  children,
  initialValues,
}) => {
  const { form, fields, dispatch } = useStore()
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
  }
  return (
    <>
      <form name={name} className="neverlandui-form">
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}

export default Form
