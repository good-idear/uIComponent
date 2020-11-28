import React, {
  FC,
  CSSProperties,
  useState,
  createContext,
  MouseEvent,
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horzontal" | "vertical";

interface objType {
  index: string;
  e?: MouseEvent;
}
type handleCb = (obj: objType) => void;

export interface MenuProps {
  defaultIndex: string;
  className?: string;
  mode: MenuMode;
  style?: CSSProperties;
  onSelect?: handleCb;
  // 设置子菜单的默认打开，只在纵向模式下生效
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index?: string;
  onSelect?: handleCb;
  mode?:MenuMode;
  defaultOpenSubMenus?:string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (obj: objType) => {
    setActive(obj.index);
    if (onSelect) {
      onSelect(obj);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : defaultIndex,
    onSelect: handleClick,
    mode:mode,
    defaultOpenSubMenus,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      // displayName是自己在 menuItem中定义的属性
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horzontal",
  defaultOpenSubMenus: [],
};

export default Menu;
