import React from 'react'

import styles from './Button.module.scss'

const Button = ({onClick, children, className, secondary, ...props}) => {
    let classes = `${styles.btn} `
    classes += secondary ? `${styles.secondary} ` : ''
    classes += className ? className : ''
    
    return (
        <button className={classes} onClick={onClick} {...props}>{children}</button>
    )
}

export default Button