import React, { useState, createContext, CSSProperties, ReactNode } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./menuItem"

// ts 的 字符串自变量 string literal types 取代 enum
type MenuMode = "horizontal" | "vertical"
type selectCallback = (selectedIndex: string) => void
export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  defaultIndex?: string
  className?: string
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode
  style?: CSSProperties
  /**点击菜单项触发的回掉函数 */
  onSelect?: selectCallback
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[] // index 的数组
  children?: ReactNode
}

interface IMenuContext {
  // 当前选的类型
  index: string
  onSelect?: selectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

// 创建一个context来传递数据给子组件
export const MenuContext = createContext<IMenuContext>({ index: "0" })

export const Menu: React.FC<MenuProps> = ({
  className,
  mode = "horizontal",
  style,
  children,
  defaultIndex = "0",
  onSelect,
  defaultOpenSubMenus,
}) => {
  const classes = classNames("neverlandui-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  })
  // 当前 active 的 index 是哪个
  const [currentActive, setActive] = useState(defaultIndex)
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      // 回调函数
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.ReactElement<MenuItemProps>
      const type = childElement.type

      // 先检查 type 是否是 React 组件，再访问 displayName
      const displayName =
        typeof type === "string" ? null : (type as any).displayName

      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          // index 变成 string 传递
          index: `${index}`,
        })
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component, is " +
            displayName
        )
        return null // 避免 React.Children.map 出现 undefined
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      {/* 需要把父组件的属性传给子组件 */}
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
        {/* {children} */}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu
