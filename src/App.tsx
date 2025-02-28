import { useState } from "react"
import Button, { ButtonSize, ButtonType } from "./components/Button/button"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuItem"
import SubMenu from "./components/Menu/subMenu"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <Menu defaultIndex="0" onSelect={(index) => alert(index)}>
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <Menu defaultIndex="0" mode="vertical" defaultOpenSubMenus={["2"]}>
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <br />
        <Button autoFocus> Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.baidu.com"
          target="_blank"
        >
          Hello
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button btnType={ButtonType.Default}>Hello</Button>
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
