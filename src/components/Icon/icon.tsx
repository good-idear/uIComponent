import React from 'react'
import classname from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' |'info' |'warning'

export interface IconProps extends FontAwesomeIconProps{
    theme?:ThemeProps
}

const Icon:React.FC<IconProps> = (props) =>{
    const {className, theme, ...restProps} = props
    const classes = classname('viking-icon', className, {
        [`icon-${theme}`]:theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
}

export default Icon