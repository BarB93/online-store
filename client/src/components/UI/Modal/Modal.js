import React from 'react'

import styles from './Modal.module.scss'

const Modal = ({active, setActive, children, title}) => {
    const activeClass = active ? ` ${styles.active}` : ''

    const closeHandler = () => { setActive(false) }
    const contentClickHandler = (event) => {
        event.stopPropagation()
    }


    return (
        <div className={styles.modal + activeClass} onClick={closeHandler}>
                <div className={styles.modal__content} onClick={contentClickHandler}>
                        {title && <h3 className={styles.modal__title}>{title}</h3>}
                        {children}
                        <div className={styles.modal__btnClose} onClick={closeHandler}></div>
                </div>
        </div>
    )
}

export default Modal