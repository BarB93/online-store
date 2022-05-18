import React from 'react'

import styles from './Button.module.scss'

const Button = ({secondary, clickHandler, children, className, ...props}) => {
    let classes = styles.btn + ' '
    classes += secondary ? styles.secondary + ' ' : ''
    classes += className ? className : ''

    return (
        <button className={classes} onClick={clickHandler} {...props}>{children}</button>
    )
}

export default Button