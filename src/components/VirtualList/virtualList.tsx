import React, {
  CSSProperties,
  PropsWithChildren,
  ReactElement,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react"

interface WaterfallProps {
  //外层容器样式 ，需要自己定外层容器宽高，默认宽高800px
  style?: CSSProperties
  //外层容器类名
  classnames?: string
  //列数 必传
  column: number
  //每个子元素宽度，需要定宽 必传
  itemWidth: number
  //容器虚拟渲染高度，需要大于容器高度，用于在用户没滚到最底层时加载
  forceHeight?: number
  //监听滚动函数，参数是强制刷新，使得可以继续对滚动进行判断
  scrollCallback?: (v: React.Dispatch<React.SetStateAction<number>>) => void
  //拿到外层容器的ref
  wrapperRefCallback?: (v: RefObject<HTMLDivElement>) => void
}

export const defaultWrapperStyle: CSSProperties = {
  overflow: "auto",
  width: "800px",
  height: "800px",
  position: "relative",
}

const Waterfall: React.FC<PropsWithChildren<WaterfallProps>> = ({
  style,
  classnames,
  column,
  itemWidth,
  forceHeight,
  scrollCallback,
  wrapperRefCallback,
  children,
}) => {
  const [current, setCurrent] = useState(0)
  const [renderChildren, setRenderChildren] = useState<ReactElement[]>([])
  const [force, forceUpdate] = useState(0)

  const width = useMemo(() => {
    if (forceHeight) {
      return forceHeight
    } else {
      const w = style?.width ?? "800px"
      if (typeof w === "string") {
        return parseFloat(w)
      } else {
        return w
      }
    }
  }, [forceHeight, style])

  const height = useMemo(() => {
    const w = style?.height ?? "800px"
    if (typeof w === "string") {
      return parseFloat(w)
    } else {
      return w
    }
  }, [style])

  const mergedStyle = useMemo(() => {
    return { ...defaultWrapperStyle, ...style }
  }, [style])

  //给的宽可能比item*column大，计算每列起始left。
  const leftArr = useMemo(() => {
    const remain = width - itemWidth * column
    const start = remain / 2
    //暂时先做居中
    let arr = []
    for (let i = 0; i < column; i++) {
      arr.push(start + itemWidth * i)
    }
    return arr
  }, [column, itemWidth, width])

  const dynamicHeight: Array<number> = useMemo(() => {
    return new Array(column).fill(0)
  }, [column])

  //渲染后获取对应元素高度
  useEffect(() => {
    const render = toPush(children, 0, leftArr[0], 0)
    let timer: number
    if (render) {
      setRenderChildren([render])
      const colN = 0
      const lastH = dynamicHeight[colN]
      const lastRH = render.props["data-height"]
      if (!lastRH) {
        console.error(
          "you should pass the data-height to specify every children height"
        )
        return
      }
      dynamicHeight[colN] = lastH + parseFloat(lastRH)
    }
    return () => {
      window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftArr, children])

  const childrenLen = useMemo(() => {
    if (Array.isArray(children)) {
      return children.length
    } else {
      console.error("children must be array")
      return 0
    }
  }, [children])

  useEffect(() => {
    let timer = window.setTimeout(() => {
      if (renderChildren.length > 0 && wrapperRef.current) {
        const scroll = wrapperRef.current.scrollTop
        const [minCol, dis] = getFarColumnAndDis(dynamicHeight, height, scroll)
        if (isCanPush(current, childrenLen, dis)) {
          const newCurrent = current + 1
          setCurrent(newCurrent)
          const left = leftArr[minCol]
          const top = dynamicHeight[minCol]
          const render = toPush(children, newCurrent, left, top)
          if (render) {
            setRenderChildren((prev) => [...prev, render])
            const colN = minCol
            const lastH = dynamicHeight[colN]
            const lastRH = render.props["data-height"]

            if (!lastRH) {
              console.error(
                "you should pass the data-height to specify every children height"
              )
              return
            }
            dynamicHeight[colN] = lastH + parseFloat(lastRH)
          }
        }
      }
    })
    return () => {
      window.clearTimeout(timer)
    }
  }, [
    childrenLen,
    column,
    current,
    dynamicHeight,
    height,
    leftArr,
    children,
    renderChildren,
    force,
  ])

  const wrapperRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>

  useEffect(() => {
    let handler: (e: Event) => void
    if (wrapperRef.current) {
      handler = () => {
        if (scrollCallback) {
          scrollCallback(forceUpdate)
        } else {
          forceUpdate((prev) => prev + 1)
        }
      }
      wrapperRef.current.addEventListener("scroll", handler)
    }
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("scroll", handler)
      }
    }
  }, [scrollCallback])

  useEffect(() => {
    if (wrapperRefCallback) {
      wrapperRefCallback(wrapperRef)
    }
  }, [wrapperRefCallback])

  return (
    <div ref={wrapperRef} style={mergedStyle} className={classnames}>
      {renderChildren}
    </div>
  )
}

export default Waterfall

export function toPush(
  children: ReactNode,
  index: number,
  left: number,
  top: number
) {
  if (children && Array.isArray(children)) {
    const cur = children[index]
    if (React.isValidElement(cur)) {
      const originStyle = cur.props?.style
      const mergeStyle = {
        ...originStyle,
        position: "absolute",
        left: left,
        top: top,
      }
      const cloneElement = React.cloneElement(cur, {
        ...cur.props,
        style: mergeStyle,
      })
      return cloneElement
    } else {
      console.error("this child is invalid type", cur)
      return null
    }
  } else {
    console.error("children should be array,but get", typeof children)
    return null
  }
}

export function isCanPush(current: number, total: number, pos: number) {
  return current + 1 < total && pos > 0
}
export function getFarColumnAndDis(
  dynamicHeight: Array<number>,
  height: number,
  scrollHeight: number
): [number, number] {
  const min = Math.min(...dynamicHeight)
  const minIndex = dynamicHeight.findIndex((v) => v === min)
  const totalHeight = height + scrollHeight
  const remain = totalHeight - min
  return [minIndex, remain]
}
