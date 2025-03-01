import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta = {
  title: "第九章：Input",
  id: "Input",
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const ADefault: Story = {
  args: {
    placeholder: "漂亮的 Input",
  },
  name: "默认的 Input",
}

export const BDisabled: Story = {
  args: {
    placeholder: "disabled input",
    disabled: true,
  },
  name: "被禁用的 Input",
}

export const CIcon: Story = {
  args: {
    placeholder: "input with icon",
    icon: "search",
  },
  name: "带图标的 Input",
}

export const DSizeInput: Story = {
  render: () => (
    <>
      <Input defaultValue="large size" size="lg" />
      <Input placeholder="small size" size="sm" />
    </>
  ),
  name: "大小不同的 Input",
}

export const EPandInput: Story = {
  render: () => (
    <>
      <Input defaultValue="prepend text" prepend="https://" />
      <Input defaultValue="google" append=".com" />
    </>
  ),
  name: "带前后缀的 Input",
}
