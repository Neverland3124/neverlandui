import { useState } from "react"
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

function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)

  return (
    <>
      <div className="card">
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
