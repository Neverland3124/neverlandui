import { useRef, useState } from "react"
import Button, { ButtonSize, ButtonType } from "./components/Button/button"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuItem"
import SubMenu from "./components/Menu/subMenu"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import Icon from "./components/Icon/icon"
// 添加所有icons
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)
import Transition from "./components/Transition/transition"
import Input from "./components/Input/input"

function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      {/* <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          if (inputRef.current) {
            alert(inputRef.current.value)
          }
        }}
      >
        获取输入值
      </button>
      <input
        type="text"
        value={value} // 受控：value 由 state 控制
        onChange={(e) => setValue(e.target.value)} // 必须有 onChange 处理更新，否则输入框无法修改
      /> */}
      <div className="card">
        <Input
          size="lg"
          icon="coffee"
          prepend="https://"
          // append=".com"
          style={{ width: "300px" }}
          // 外层大括号 {}：表示你正在进入 JavaScript 表达式的上下文。
          // 内层大括号 {}：表示你正在创建一个 JavaScript 对象。
        ></Input>
        <Button
          onClick={() => {
            setShow(!show)
          }}
        >
          Toggle Transition
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-right">
          <div>
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <p>123</p>
          </div>
          {/* <Button btnType="primary" size="lg">
            Hello
          </Button> */}
        </Transition>
        <br />
        {/* <FontAwesomeIcon icon={faCoffee} size="10x" /> */}
        <Icon icon="arrow-down" theme="primary" size="sm" />
        <Icon icon="arrow-down" theme="secondary" size="lg" />
        <Icon icon="arrow-down" theme="success" size="2xl" />
        <Icon icon="arrow-down" theme="info" size="10x" />
        <Icon icon="arrow-down" theme="warning" size="10x" />
        <Icon icon="arrow-down" theme="danger" size="10x" />
        <Icon icon="arrow-down" theme="light" size="10x" />
        <Icon icon="arrow-down" theme="dark" size="10x" />
        <Menu defaultIndex="0">
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title="dropdown ">
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <Menu defaultIndex="0" mode="vertical" defaultOpenSubMenus={["2"]}>
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title="test">
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <br />
        <Button autoFocus> Hello</Button>
        <Button btnType="danger" size="lg">
          Hello
        </Button>
        <Button btnType="link" href="https://www.baidu.com" target="_blank">
          Hello
        </Button>
        <Button btnType="primary" size="lg">
          Hello
        </Button>
        <Button btnType="default">Hello</Button>
        <h1>Hello, NeverlandUI!</h1>
        <h2>Hello, NeverlandUI!</h2>
        <h3>Hello, NeverlandUI!</h3>
        <hr></hr>
        <code>const a = b</code>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
