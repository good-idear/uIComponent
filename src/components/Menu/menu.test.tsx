import React from 'react'
import {render, fireEvent, RenderResult, wait} from '@testing-library/react'
import Menu,{MenuProps} from './menu'
import { MenuItem } from './menuItem'
import { SubMenu } from './subMenu'

const testProps:MenuProps = {
    defaultIndex:'0',
    onSelect:jest.fn(),
    className:'test',
    mode:'horzontal'
}

const generateMenu = (props:MenuProps) =>{
    return(
        <Menu {...props}>
            <MenuItem >
                active
            </MenuItem>
            <MenuItem disabled >
                disabled
            </MenuItem>
            <MenuItem >
                xyz
            </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>drop1</MenuItem>
            </SubMenu>
        </Menu>
    )
}

// 创建css样式来测试 相应的显示/隐藏
const createStyleFile = () => {
    const cssFile:string = `
        .viking-submenu{
            display:none;
        }
        .viking-submenu.menu-opened{
            display:block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper:RenderResult,wrapper2:RenderResult,activeElement:HTMLElement,menuElement:HTMLElement,disabledElement:HTMLElement
describe('test Menu and MenuItem component in default(horizontal) mode', ()=>{
    beforeEach(()=>{
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', ()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('viking-menu test')
        // :scope> 配合querySlectorAll可以直接获取到后代元素
        expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    it('click items should change active and call the right callback', ()=>{
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        // 返回一个对象里面包含 element节点和 index值,不知道怎么去判断
        expect(testProps.onSelect).toBeCalled()
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
       
    })

    it('should show dropdown items when hover on subMenu',async ()=>{
        // display：none的判断使用的是：toBeVisible
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('drop1')
        fireEvent.mouseEnter(dropdownElement);
        await wait(()=>{
            expect(wrapper.queryByText('drop1')).toBeVisible()
        });
        fireEvent.mouseLeave(dropdownElement);
        await wait(()=>{
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        });
    })

})