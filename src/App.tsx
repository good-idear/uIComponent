import React from "react";
import './styles/index.scss'
import { Button } from "./components/Button/button";
import { Alert } from "./components/Alert/alert";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tab from './components/Tab/tab'
import TabItem from './components/Tab/tabItem'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)



const closeFn = () => {
  console.log("哈哈哈哈哈");
};

function App() {
  return (
    <div className="App">
      <div>
        <Button btnType="primary" disabled={false}>
          small
        </Button>
        <Button>Nice</Button>
        <Button size="lg">最大</Button>
        <Button size="sm">最小</Button>
        <Button btnType="danger">危险</Button>
      </div>
      <div>
        <Alert></Alert>
        <Alert alType="com" AlertColor="danger" closeFn={closeFn}>
          this is alert!
        </Alert>
        <Alert
          alType="esp"
          headText="这是一个标题"
          AlertColor="success"
          closeFn={closeFn}
        >
          this is alert!
        </Alert>
      </div>
      <div>
        <Menu defaultIndex={'0'} onSelect={(obj)=>console.log(obj.index)} mode='horzontal' defaultOpenSubMenus={['3']}>
          <MenuItem>商城</MenuItem>
          <MenuItem> 钱包</MenuItem>
          <MenuItem>关于</MenuItem>
          <SubMenu title='公司简介'>
            <MenuItem>阿萨说</MenuItem>
            <MenuItem>阿萨说</MenuItem>
            <MenuItem>阿萨说</MenuItem>
          </SubMenu>
        </Menu>
      </div>
      
      <div>
        <Tab defaultIndex={0} mode='primary' >
          <TabItem label='第一项'> this is the first</TabItem>
          <TabItem label='第二项'> this is the second</TabItem>
          <TabItem label='第三项' disabled> this is the third</TabItem>
        </Tab>
      </div>
      <div>
        <Icon icon='window-close' theme='primary'/>
      </div>
    </div>
  );
}

export default App;
