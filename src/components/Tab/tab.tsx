import React,{useState} from 'react'
import classnames from 'classnames'
import TabItem,{TabItemProps} from './tabItem'
 
export type ModeType = 'primary' | 'transparent'
export type selectFn = (i:number,e?:React.MouseEvent)=>void

export interface TabProps {
    defaultIndex?:string | number;
    mode?:ModeType;
    onSelect?:selectFn;
    className?:string;
}

export const Tab:React.FC<TabProps> = (props)=>{
    const {defaultIndex, mode, onSelect, children, className} = props
    const classes = classnames('tab',className)
    const [selectedIndex, setIndex] = useState(defaultIndex)
    
    const handleSelect:selectFn = (n,e)=>{
        setIndex(n)
        onSelect&&onSelect(n,e)
    }

    const renderElement = ()=>{
        return React.Children.map(children, (child, index)=>{
            const childEle = child as React.FunctionComponentElement<TabItemProps>
            return React.cloneElement(childEle, {
                index:index.toString(),
                mode,
                activeIndex:selectedIndex,
                onSelect:handleSelect,
            })
        })
         
    }

    return(
        <div className={classes} data-testid='test-tab'>
            {renderElement()}
        </div>
    )
}

Tab.defaultProps = {
    defaultIndex:'0',
    mode:'primary',
}

export default Tab