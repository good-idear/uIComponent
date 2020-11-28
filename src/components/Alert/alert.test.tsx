import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Alert, { BaseAlertProps } from "./alert";

const defaultProps: BaseAlertProps = {
  alType: "com",
  AlertColor: "default",
  showIcon: true,
  children: "没有填写说明",
};

const differentProps:BaseAlertProps = {
    alType:'esp',
    headText:'哈哈哈哈',
    className:'klass'
}

describe("test alert component", () => {
  it("should render null when close is clicked", () => {
    const closeFn = jest.fn();
    // 获取对应的 dom 元素
    const { container } = render(<Alert closeFn={closeFn}></Alert>);
    const ele = container.querySelector(".cl_size") as Element;

    fireEvent.click(ele);
    expect(ele).not.toBeInTheDocument();
  });

  it("should render 一般组件 when defaultProps is provied", () => {
    const wrapper = render(<Alert {...defaultProps}>123</Alert>);
    const ele = wrapper.getByText('123').parentElement as Element
    expect(ele.className).toEqual('alert al-default')
    const iconDom = ele.querySelector('.cl_size')
    expect(iconDom).toBeInTheDocument()
  });

  it('should render with headText component when differentProps is provied', ()=>{
    const wrapper = render(<Alert {...differentProps}></Alert>);
    const ele = wrapper.getByText('哈哈哈哈')
    expect(ele.tagName).toEqual('H5')
    const par = ele.parentElement?.parentElement as Element
    expect(par?.className).toEqual('alert al-default klass')
  })
});
