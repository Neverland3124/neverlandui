import type { Meta, StoryObj } from "@storybook/react"
import Upload, { UploadFile } from "./upload"
import { action } from "@storybook/addon-actions"
import Icon from "../Icon/icon"
import Button from "../Button/button"

const meta: Meta<typeof Upload> = {
  title: "第十章：Upload",
  component: Upload,
  parameters: {
    // layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    // defaultIndex: "1", // 优先级低
  },
}

export default meta
type Story = StoryObj<typeof Upload>

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  {
    uid: "122",
    size: 1234,
    name: "xyz.md",
    status: "success",
    percent: 100,
  },
  {
    uid: "121",
    size: 1234,
    name: "eyiha.md",
    status: "error",
    percent: 0,
  },
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file too big")
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type })
  return Promise.resolve(newFile)
}

export const ASimpleUpload: Story = {
  args: {
    action: "https://run.mocky.io/v3/1b657be3-d4fa-4b51-b66e-92342278aadc",
    onProgress: action("progress"),
    onSuccess: action("success"),
    onError: action("error"),
    // beforeUpload: filePromise,
    defaultFileList: defaultFileList,
    name: "fileName",
    data: { key: "value" },
    headers: { "X-Powered-By": "neverlandui" },
    accept: ".jpg,.png",
    multiple: true,
    drag: true,
    children: (
      <>
        <Icon icon="upload" size="5x" theme="secondary" />
        <br />
        <p>点击或者拖动到此区域进行上传</p>
      </>
    ),
  },
  name: "普通的 Upload 组件",
}

export const BCheckUpload: Story = {
  args: {
    action: "https://run.mocky.io/v3/1b657be3-d4fa-4b51-b66e-92342278aadc",
    beforeUpload: checkFileSize,
    children: (
      <Button size="lg" btnType="primary">
        <Icon icon="upload" /> 不能传大于50Kb！
      </Button>
    ),
  },
  name: "上传前检查文件大小",
}

export const CDragUpload: Story = {
  args: {
    action: "https://run.mocky.io/v3/1b657be3-d4fa-4b51-b66e-92342278aadc",
    name: "fileName",
    multiple: true,
    drag: true,
    children: (
      <>
        <Icon icon="upload" size="5x" theme="secondary" />
        <br />
        <p>点击或者拖动到此区域进行上传</p>
      </>
    ),
  },
  name: "拖动上传",
}
