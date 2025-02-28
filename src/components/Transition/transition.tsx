import React, { ReactNode, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { CSSTransitionProps } from "react-transition-group/CSSTransition"

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right"

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  children?: ReactNode
}

const Transition: React.FC<TransitionProps> = ({
  children,
  classNames,
  animation,
  unmountOnExit = true,
  appear = true,
  ...restProps
}) => {
  const nodeRef = useRef(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={classNames ? classNames : animation}
      unmountOnExit={unmountOnExit}
      appear={appear}
      {...restProps}
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  )
}

export default Transition
