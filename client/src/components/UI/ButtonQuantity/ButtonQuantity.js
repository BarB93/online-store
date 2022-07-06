import React from 'react'

import styles from './ButtonQuantity.module.scss'

const ButtonQuantity = ({disabled,className,onClick, minus, plus}) => {
    return (
        <button disabled={disabled} className={`${className} ${styles.button} ${minus ? styles.button__minus : plus ? styles.button__plus : ''}`} onClick={onClick}></button>
    )
}

export default ButtonQuantity