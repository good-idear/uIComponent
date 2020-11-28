import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button,{ButtonProps} from './button'
const defaultProps = {
    onClick:jest.fn()
}

const testProps:ButtonProps = {
    btnType:'primary',
    size:'lg',
    className:'klass'
}

const disabledProps:ButtonProps = {
    disabled:true,
    onClick:jest.fn()
}

describe('test Button component', ()=>{
    // 测试默认情况按钮
    it('should render the correct default button', ()=>{
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    // 测试根据 props 不同渲染按钮
    it('should render the correct component based on different props', ()=>{
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn btn-primary btn-lg klass')
    })
    // 测试 是否渲染 link
    it('should render a link when btnType equals link and href is provided', ()=>{
        const wrapper  = render(<Button btnType='link' href='http://www.baidu,com'>Nice</Button>)
        const ele = wrapper.getByText('Nice')
        expect(ele).toBeInTheDocument()
        expect(ele.tagName).toEqual('A')
        expect(ele).toHaveClass('btn btn-link')
    })
    // 测试 disbaled 是否正常
    it('should render disabled button when disabled is setted to true', ()=>{
        const wrap = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrap.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})