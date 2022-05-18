import React from 'react'

const Button = ({secondary, clickHandler, children, className, ...props}) => {
    let classes = 'btn '
    classes += secondary ? 'secondary ' : ''
    classes += className ? className : ''

    return (
        <button className={classes} onClick={clickHandler} {...props}>{children}</button>
    )
}

export default Button