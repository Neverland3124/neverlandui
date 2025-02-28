import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button"

const defaultProps = {
  onClick: jest.fn(), // Creates a mock function. Optionally takes a mock implementation.
  // 被监控的函数
}

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass",
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

it("test case try", () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText("Nice")
  expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
})

// 分类
describe("test Button component", () => {
  // it 和 test 是一样的
  it("should render the correct default button", () => {
    // defaultProps 是 mock function
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText("Nice") as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("BUTTON")
    expect(element).toHaveClass("btn btn-default")
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element) // 触发事件
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    // Primary Large klass
    const element = wrapper.getByText("Nice")
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass("btn-primary btn-lg klass")
  })
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(
      <Button btnType="link" href="http://dummyurl">
        Link
      </Button>
    )
    const element = wrapper.getByText("Link")
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual("A")
    expect(element).toHaveClass("btn btn-link")
  })
  it("should render disabled button when disabled set to true", () => {
    // disable onClick
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText("Nice") as HTMLButtonElement // 类型断言
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy() // HTML 没有 disabled 属性 要 断言 成 HTMLButtonElement
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
