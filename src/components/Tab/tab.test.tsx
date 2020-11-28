import React, { FC } from "react";
import { render, fireEvent, RenderResult, cleanup, wait } from "@testing-library/react";
import Tab, { TabProps } from "./tab";
import TabItem from "./tabItem";
import { act } from "react-dom/test-utils";

const tabProps: TabProps = {
  defaultIndex: 0,
  mode: "primary",
};

const gengerateTab = (props: TabProps) => {
  return (
    <Tab {...props}>
        <TabItem label="fir">active</TabItem>
        <TabItem label="sec">xyz</TabItem>
        <TabItem label="thir" disabled>disabled</TabItem>
    </Tab>
  )
};

const createStyleFile = () => {
    const cssStyle  = `
    .tabcontent{
        display:none;
    }
    .is-active .tabcontent{
        display:block;
    }
`
    const sty = document.createElement('style')
    sty.type = 'text/css'
    sty.innerHTML = cssStyle
    return sty
}


let wrapper:RenderResult, tabElement:HTMLElement,activeElement:HTMLElement, disabledElement:HTMLElement, xyzElement:HTMLElement;
describe("test Tab Component should render with really mode", () => {
    beforeEach(()=>{
        wrapper = render(gengerateTab(tabProps))
        wrapper.container.append(createStyleFile())
        tabElement = wrapper.getByTestId('test-tab')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
  it("should render correctly based on defult props", () => {
      expect(tabElement).toBeInTheDocument()
      expect(tabElement).toHaveClass('tab')
      expect(tabElement.querySelectorAll(':scope>div').length).toEqual(3)
      const parEle = activeElement.parentElement
      expect(parEle).toHaveClass('tabitem is-active')
      const parEleDis = disabledElement.parentElement
      expect(parEleDis).toHaveClass('tabitem is-disabled')
      xyzElement = wrapper.getByText('xyz')
      expect(xyzElement).not.toBeVisible()
  });

  it("should change display with click differnet Component", () => {
    xyzElement = wrapper.getByText('xyz')
    const parElement = xyzElement.parentElement
    const spanEle = parElement?.querySelector(':scope>span') as HTMLElement
    fireEvent.click(spanEle)
    expect(activeElement.parentElement).toHaveClass('tabitem')
    expect(activeElement).not.toBeVisible()
    expect(xyzElement.parentElement).toHaveClass('tabitem is-active')
    expect(xyzElement).toBeVisible()
    fireEvent.click(disabledElement.parentElement?.querySelector(':scope>span') as HTMLElement)
    expect(disabledElement.parentElement).toHaveClass('tabitem is-disabled')
  })
});
