import React, { useContext, useState } from "react";
import { MenuContext } from "./menu";
import classnames from "classnames";
import { MenuItemProps } from "./menuItem";
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}
export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const { index, title, className, children } = props;
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode=== 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classnames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    'is-opened':menuOpen,
    'is-vertical':context.mode === 'vertical'
  });

  const handleClick = (e:React.MouseEvent)=>{
    e.preventDefault()
    console.log('222')
    setOpen(!menuOpen)
  }
  
  let timer:any
  const handleMouse = (e:React.MouseEvent, toggle:boolean) =>{
    clearTimeout(timer)
    e.preventDefault()
    setTimeout(()=>{
      setOpen(toggle)
    }, 300)
    // setOpen(toggle)
  }

  const clickEvents = context.mode==='vertical'?{
    onClick:handleClick
  }:{}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter:(e:React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave:(e:React.MouseEvent)=> { handleMouse(e, false)}

  }:{}
  const renderChildren = () => {
    const subMenuClasses = classnames('viking-submenu', {
        'menu-opened':menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component"
        );
      }
    });
    return(
        <Transition animation='zoom-in-top' in={menuOpen} timeout={300}>
          <ul className={subMenuClasses}>
            {childrenComponent}
        </ul>
        </Transition>
        
    )
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>{title}</div>
      <Icon icon="angle-down" className="arrow-icon"/>
      {renderChildren()}
    </li>

  );
};
SubMenu.displayName = "SubMenu";

export default SubMenu;
