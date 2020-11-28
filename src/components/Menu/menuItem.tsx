import React,{FC, useContext, MouseEvent,} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { type } from 'os'

export interface MenuItemProps{
    index?:string;
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties;
}

export const MenuItem:FC<MenuItemProps> = (props) =>{
    const {index, disabled, className, style, children }  = props

    // 获取父组件传值
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disabled':disabled,
        'is-active':context.index===index
    })

    const handleClick = (e:MouseEvent)=>{
        if(context.onSelect&&!disabled&&(typeof index==='string')){
            context.onSelect({index,e})
        }
    }

    return(
        <li className={classes} style={style} onClick={(e)=>handleClick(e)}>
            {children}
        </li>
    )
}
MenuItem.displayName = 'MenuItem'

export default MenuItem