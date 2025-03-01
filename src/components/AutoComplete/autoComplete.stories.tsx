import type { Meta, StoryObj } from "@storybook/react"
import { AutoComplete, DataSourceType } from "./autoComplete"
const meta = {
  title: "第九章：AutoComplete",
  component: AutoComplete,
  parameters: {
    // layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AutoComplete>

export default meta
type Story = StoryObj<typeof meta>

interface LakerPlayerProps {
  value: string
  number: number
}

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

export const ASimpleComplete: Story = {
  args: {
    fetchSuggestions: (query: string) => {
      const lakers = [
        "bradley",
        "pope",
        "caruso",
        "cook",
        "cousins",
        "james",
        "AD",
        "green",
        "howard",
        "kuzma",
        "McGee",
        "rando",
      ]
      return lakers
        .filter((name) => name.includes(query))
        .map((name) => ({ value: name }))
      // 不能返回 string 需要 value
    },
    placeholder: "输入湖人队球员英文名试试",
    renderOption: (item: DataSourceType) => {
      return <>{item.value}</>
    },
  },
  name: "1 基本的搜索",
}

export const BCustomComplete: Story = {
  args: {
    fetchSuggestions: (query: string) => {
      const lakersWithNumber = [
        { value: "bradley", number: 11 },
        { value: "pope", number: 1 },
        { value: "caruso", number: 4 },
        { value: "cook", number: 2 },
        { value: "cousins", number: 15 },
        { value: "james", number: 23 },
        { value: "AD", number: 3 },
        { value: "green", number: 14 },
        { value: "howard", number: 39 },
        { value: "kuzma", number: 0 },
      ]
      return lakersWithNumber.filter((player) => player.value.includes(query))
    },
    placeholder: "输入湖人队球员英文,自定义下拉模版",
    renderOption: (item: DataSourceType) => {
      const itemWithNumber = item as DataSourceType<LakerPlayerProps>
      return (
        <>
          <b>名字: {itemWithNumber.value}</b>
          <span> 球衣号码: {itemWithNumber.number}</span>
        </>
      )
    },
  },
  name: "2 自定义搜索结果模版",
}

export const CAjaxComplete: Story = {
  args: {
    fetchSuggestions: (query: string) => {
      return fetch(`https://api.github.com/search/users?q=${query}`)
        .then((res) => res.json())
        .then(({ items }) => {
          return items
            .slice(0, 10)
            .map((item: any) => ({ value: item.login, ...item }))
        })
    },
    placeholder: "输入 Github 用户名试试",
    renderOption: (item: DataSourceType) => {
      const itemWithGithub = item as DataSourceType<GithubUserProps>
      return (
        <>
          <b>Name: {itemWithGithub.value}</b>
          <span>url: {itemWithGithub.url}</span>
        </>
      )
    },
  },
  name: "3 支持异步搜索",
}
