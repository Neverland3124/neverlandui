import type { Meta, StoryObj } from "@storybook/react"
import Form from "./form"
import Item from "./formItem"
import Input from "../Input/input"
import Button from "../Button/button"

const meta = {
  title: "第十一章: Form 组件",
  component: Form,
  subcomponents: { Item: Item as React.ComponentType<unknown> },
  decorators: [
    (Story) => (
      <div style={{ width: "550px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ABasicForm: Story = {
  render: () => (
    <Form initialValues={{ username: "viking", agreement: true }}>
      <Item label="用户名" name="username">
        <Input />
      </Item>
      <Item label="密码" name="password">
        <Input type="password" />
      </Item>
      <Item name="no-label">
        <Input placeholder="no-label" />
      </Item>
      <div
        className="agreement-section"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Item
          name="agreement"
          getValueFromEvent={(e) => e.target.checked}
          valuePropName="checked"
        >
          <input type="checkbox" />
        </Item>
        <span className="agree-text">
          注册即代表你同意<a href="#">用户协议</a>
        </span>
      </div>
      <div className="viking-form-submit-area">
        <Button type="button" btnType="primary">
          登陆
        </Button>
      </div>
    </Form>
  ),
  name: "基础表单",
}
