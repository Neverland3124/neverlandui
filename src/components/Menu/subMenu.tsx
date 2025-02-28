import React, { FC, useContext, useState, ReactNode } from "react"

import classNames from "classnames"
import { MenuContext } from "./menu"
import { MenuItemProps } from "./menuItem"
import Icon from "../Icon/icon"
import Transition from "../Transition/transition"

export interface SubMenuProps {
  index?: string
  /**下拉菜单选项的文字 */
  title: string
  /**下拉菜单选型的扩展类名 */
  className?: string
  children?: ReactNode
}
export const SubMenu: FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false

  const [menuOpen, setOpen] = useState(isOpend)
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      // 0.3 秒后执行
      setOpen(toggle)
    }, 300)
  }
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {}
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}

  // children只能是menuitem

  const renderChildren = () => {
    const subMenuClasses = classNames("neverlandui-submenu", {
      "menu-opened": menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.ReactElement<MenuItemProps>
      const type = childElement.type

      // 先检查 type 是否是 React 组件，再访问 displayName
      const displayName =
        typeof type === "string" ? null : (type as any).displayName

      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          // 不能使用number index不然就重复了
          index: `${index}-${i}`,
        })
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component, is " +
            displayName
        )
        return null // 避免 React.Children.map 出现 undefined
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {/* click在title上，以免点到submenu内容也关闭 */}
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu"
export default SubMenu
