// CSF 3 方式的 story
// https://storybook.js.org/docs/api/csf#upgrading-from-csf-2-to-csf-3
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Button from "./button"

const meta = {
  title: "第四章：Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   size: { control: "text" },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
  // 装饰
  // decorators: [
  //   (Story) => (
  //     <div style={{ marginTop: "3em" }}>
  //       <Story />
  //     </div>
  //   ),
  // ],
} satisfies Meta<typeof Button>
// 相比 as 断言，satisfies 不会强制转换类型，而是对类型约束进行校验。

export default meta
type Story = StoryObj<typeof meta>

export const ADefault: Story = {
  args: {
    children: "Default Button",
    size: "sm",
  },
  name: "默认按钮",
}

export const BButtonWithSize: Story = {
  render: () => (
    <>
      <Button size="lg"> large button </Button>
      <Button size="sm"> small button </Button>
    </>
  ),
  name: "不同尺寸的按钮",
}

export const CButtonWithType: Story = {
  render: () => (
    <>
      <Button btnType="primary"> primary button </Button>
      <Button btnType="danger"> danger button </Button>
      <Button btnType="link" href="https://google.com">
        {" "}
        link button{" "}
      </Button>
    </>
  ),
  name: "不同类型的按钮",
}
