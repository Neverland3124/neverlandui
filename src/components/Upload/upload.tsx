import React, { FC, useRef, ChangeEvent, useState } from "react"
import axios from "axios"
import UploadList from "./uploadList"
import Dragger from "./dragger"

export type UploadFileStatus = "ready" | "uploading" | "success" | "error"

// 原生的 File 类型不够用
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent: number
  raw?: File // 源文件信息
  response?: any
  error?: any
}
export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[]
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
  onChange?: (file: UploadFile) => void
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void
  /**设置上传的请求头部 */
  headers?: { [key: string]: any }
  /**上传的文件字段名 */
  name?: string
  /**上传时附带的额外参数 */
  data?: { [key: string]: any }
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean
  /**可选参数, 接受上传的文件类型 */
  accept?: string
  /**是否支持多选文件 */
  multiple?: boolean
  /**是否支持拖拽上传 */
  drag?: boolean
  children?: React.ReactNode
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'vikingship'
 * ~~~
 */
export const Upload: FC<UploadProps> = ({
  action,
  defaultFileList,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  onRemove,
  name = "file",
  headers,
  data,
  withCredentials,
  accept,
  multiple,
  drag,
  children,
}) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile> // 参数可选
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const uploadFiles = (files: FileList) => {
    // FileList 类数组对象，不能直接使用数组方法
    // Array like object
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      // 没有 beforeUpload 直接上传
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          // true
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      size: file.size,
      name: file.name,
      percent: 0,
      raw: file,
    }
    setFileList((prevList) => {
      // 当前的 file 放在最前面
      // 后面是之前的 file
      return [_file, ...prevList]
    })

    const formData = new FormData()
    formData.append(name || "file", file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = e.total ? Math.round((e.loaded * 100) / e.total) : 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" })
            // console.log 是同步的，获得不到最新的 fileList
            // console.log(fileList)
            // setFileList((prevList) => {
            //   // 这里是异步的，所以拿得到最新的 fileList
            //   console.log(prevList)
            //   return prevList
            // })
            // console.log(fileList)
            // console.log("after" + fileList)
            // 改变return type让我们的函数能返回正确的值
            _file.status = "uploading"
            _file.percent = percentage
            if (onProgress) {
              onProgress(percentage, _file)
            }
          }
        },
      })
      .then((resp) => {
        console.log(resp)
        updateFileList(_file, { status: "success", response: resp.data })
        _file.status = "success"
        _file.response = resp.data
        if (onSuccess) {
          onSuccess(resp.data, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
      .catch((err) => {
        console.log(err)
        updateFileList(_file, { status: "error", error: err })
        _file.status = "error"
        _file.error = err
        if (onError) {
          onError(err, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
  }
  // console.log(fileList)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ""
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  return (
    <div className="neverlandui-upload-component">
      <div
        className="neverlandui-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files)
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="neverlandui-file-input"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
          ref={fileInput}
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
