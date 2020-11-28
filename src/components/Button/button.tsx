import React,{FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import classNames from 'classnames'


export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'default'|'primary'|'danger'|'link'

interface BaseButtonProps{
    className?:string;
    size?:ButtonSize;
    disabled?:boolean;
    btnType?:ButtonType;
    children?:React.ReactNode;
    href?:string;
}

// 定义的泛型可以进行给组件传入react封装的 attributes
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = NativeButtonProps & AnchorButtonProps

export const Button:FC<ButtonProps> = (props)=>{
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classNames('btn',className, {
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled':(btnType === 'link')&&disabled
    })
    if(btnType === 'link' && href){
        return (
            <a 
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    }else{
        return(
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled:false,
    btnType:'default'
}

export default Button

