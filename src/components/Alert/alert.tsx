import React, { FC, useState, MouseEvent } from "react";
import classNames from "classnames";
import Icon from '../Icon/icon'


// 类型：不带标题  ｜ 带标题
type AlertType = "com" | "esp";

const ESP = 'esp'

type AlertColor = "success" | "default" | "danger" | "warnimg";

export interface BaseAlertProps {
  alType?: AlertType;
  className?: string;
  children?: string;
  headText?: string;
  AlertColor?: AlertColor;
  closeFn?: Function;
  showIcon?: boolean;
}

// type NativeAlertProps = BaseAlertProps & HTMLAttributes<HTMLElement>
// type AnchorAlertProps = BaseAlertProps & AnchorHTMLAttributes<HTMLElement>

//  type AlertProps = NativeAlertProps & AnchorAlertProps
export const Alert: FC<BaseAlertProps> = (props) => {
  const {
    alType,
    className,
    children,
    headText,
    AlertColor,
    closeFn,
    showIcon,
  } = props;
  const [closed, setClosed] = useState(false);

  const classes = classNames("alert", {
    [`al-${AlertColor}`]: AlertColor,

  },className);

  // 关闭按钮逻辑
  const handleClose = (e: MouseEvent) => {
    console.log("触发");
    setClosed(true);
    props.closeFn?.(e);
  };

  return !closed ? (
    <div className={classes}>
        <div className="al_left">
        {alType===ESP? (<h5>{headText}</h5>):null}
          {children}
        </div>
        {showIcon ? (
          <Icon icon='window-close' theme='primary' size='sm'
            className={classNames("icon-close", "cl_size")}
            onClick={(e) => handleClose(e)}
          />
        ) : null}
      </div>
  ):null
};

Alert.defaultProps = {
  AlertColor: "default",
  alType:'com',
  showIcon: true,
  children:'没有填写说明'
};

export default Alert;
