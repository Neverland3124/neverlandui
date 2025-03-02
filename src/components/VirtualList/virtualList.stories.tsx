import type { Meta, StoryObj } from "@storybook/react"
import React, { useState, useEffect, useCallback } from "react"
import VirtualList from "./virtualList"

const meta = {
  title: "自己的组件",
  component: VirtualList,
  //   decorators: [
  //     (Story) => (
  //       <div style={{ width: "550px" }}>
  //         <Story />
  //       </div>
  //     ),
  //   ],
  tags: ["autodocs"],
} satisfies Meta<typeof VirtualList>

export default meta
type Story = StoryObj<typeof meta>

const imglist = [
  "http://dummyimage.com/200x100",
  "http://dummyimage.com/200x200",
  "http://dummyimage.com/200x100",
  "http://dummyimage.com/200x500",
  "http://dummyimage.com/200x800",
]
let arr: Array<string> = []
for (let i = 0; i < 100; i++) {
  arr = arr.concat(imglist)
}
export const ABasicList: Story = {
  render: () => {
    return (
      <VirtualList
        style={{
          border: "1px solid black",
        }}
        column={2}
        //220是200宽，左右padding 10
        itemWidth={220} //瀑布流需要每个宽度相等，高度可以不相等 单位px 如果rem自行换算
      >
        {arr.map((v, i) => {
          const height = parseFloat(v.slice(v.length - 3, v.length))
          return (
            <div
              key={i}
              style={{
                padding: "10px",
                boxSizing: "content-box",
              }}
              //这个是图片高度+上下padding 20  必传项！！！！
              data-height={height + 20} //高度必须固定，因为图片异步加载，会导致div塌缩，从而高度计算错误
            >
              <img src={v} alt=""></img>
            </div>
          )
        })}
      </VirtualList>
    )
  },
  name: "基础列表",
}
