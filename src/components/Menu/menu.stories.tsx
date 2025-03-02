import type { Meta, StoryObj } from "@storybook/react"
import Menu from "./menu"
import SubMenu from "./subMenu"
import MenuItem from "./menuItem"
import React from "react"

const meta = {
  title: "第六章：Menu",
  component: Menu,
  subcomponents: {
    SubMenu: SubMenu as React.ComponentType<unknown>,
    MenuItem: MenuItem as React.ComponentType<unknown>,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    defaultIndex: "1", // 优先级低
  },
  // 演示一下 可以自动生成
  // argTypes: {
  //   defaultIndex: {
  //     control: {
  //       type: "text",
  //     },
  //     description: "默认选中的菜单项",
  //   },
  // },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const ADefaultMenu: Story = {
  render: (args) => (
    <Menu defaultIndex="0" {...args}>
      <MenuItem>cool link</MenuItem>
      <MenuItem>cool link 2</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <SubMenu title="下拉选项">
        <MenuItem>下拉选项一</MenuItem>
        <MenuItem>下拉选项二</MenuItem>
      </SubMenu>
    </Menu>
  ),
  name: "默认Menu",
}

export const BClickMenu: Story = {
  render: (args) => (
    <Menu
      {...args}
      defaultIndex="0"
      mode="vertical"
      // defaultOpenSubMenus={[]}
    >
      <MenuItem>cool link</MenuItem>
      <MenuItem>cool link 2</MenuItem>
      <SubMenu title="默认展开下拉选项">
        <MenuItem>下拉选项一</MenuItem>
        <MenuItem>下拉选项二</MenuItem>
      </SubMenu>
    </Menu>
  ),
  name: "纵向的 Menu",
}

export const COpenedMenu: Story = {
  render: (args) => (
    <Menu
      {...args}
      defaultIndex="0"
      mode="vertical"
      defaultOpenSubMenus={["2"]}
    >
      <MenuItem>cool link</MenuItem>
      <MenuItem>cool link 2</MenuItem>
      <SubMenu title="默认展开下拉选项">
        <MenuItem>下拉选项一</MenuItem>
        <MenuItem>下拉选项二</MenuItem>
      </SubMenu>
    </Menu>
  ),
  name: "默认展开的纵向 Menu",
}
