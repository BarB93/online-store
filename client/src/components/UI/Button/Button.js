import React from 'react'

import styles from './Button.module.scss'

const Button = ({onClick, children, className, ...props}) => {
    let classes = `${styles.btn} `
    classes += props.secondary ? `${styles.secondary} ` : ''
    classes += className ? className : ''

    return (
        <button className={classes} onClick={onClick} {...props}>{children}</button>
    )
}

export default Button