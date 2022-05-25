import React from 'react'

import styles from './Button.module.scss'

const Button = ({secondary, onClick, children, className, ...props}) => {
    let classes = styles.btn + ' '
    classes += secondary ? styles.secondary + ' ' : ''
    classes += className ? className : ''

    return (
        <button className={classes} onClick={onClick} {...props}>{children}</button>
    )
}

export default Button