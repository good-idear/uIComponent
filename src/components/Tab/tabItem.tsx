import React from "react";
import classnames from "classnames";
import { ModeType,selectFn } from "./tab";

export interface TabItemProps {
  label: string;
  disabled?: boolean;
  children?: string;
  className?: string;
  index?: string | number;
  mode?: ModeType;
  activeIndex?:string | number;
  onSelect?:selectFn;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { label, disabled, children, className, mode,activeIndex,index,onSelect } = props;
  const classes = classnames(
    "tabitem",
    {
      // "is-primary": mode === "primary" ? true : false,
      "is-transparent": mode === "transparent" ? true : false,
      'is-active':(Number(index)==Number(activeIndex) && !disabled)?true:false,
      'is-disabled':disabled
    },
    className
  );
  const handleClick = (e:React.MouseEvent) => {
    const n = Number(index)
    if(onSelect&&!disabled){
      onSelect(n,e)
    }
   
  }

  return (
    <div className={classes}>
      <span onClick={(e)=>handleClick(e)}>{label}</span>
      <div className="tabcontent">{children}</div>
    </div>
  );
};

export default TabItem;
