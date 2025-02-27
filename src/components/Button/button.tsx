import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react"
import classNames from "classnames"

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}
export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}
// intersection types 交叉类型 将两个类型合并为一个类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// 带连接的属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// 属性是可选的，所以用 Partial
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
// export type ButtonSize = "lg" | "sm"
// export type ButtonType = "primary" | "default" | "danger" | "link"

// button 的属性
interface BaseButtonProps {
  className?: string
  /**设置 Button 的禁用 */
  disabled?: boolean
  /**设置 Button 的尺寸 */
  size?: ButtonSize
  /**设置 Button 的类型 */
  btnType?: ButtonType
  href?: string
  children: React.ReactNode // 现在FC 默认并不会包含 children属性
}

export const Button: FC<ButtonProps> = ({
  btnType = "default", // 不再推荐使用 Button.defaultProps
  className,
  disabled = false,
  size,
  children,
  href,
  ...restProps // 所有其他的属性 例如 onClick
}) => {
  // btn, btn-lg, btn-primary
  // 用户给的 className 也加进去
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  })
  // 处理 href link 类型
  if (btnType === "link" && href) {
    // 往里面先放一个 a 标签
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    // 不是 link 就是 button
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

export default Button
