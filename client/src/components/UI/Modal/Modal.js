import React from 'react'

import styles from './Modal.module.scss'

const Modal = ({active, setActive, children}) => {
    const activeClass = active ? ` ${styles.active}` : ''

    const closeHandler = () => { setActive(false) }
    const contentClickHandler = (event) => {
        event.stopPropagation()
    }


    return (
        <div className={styles.modal + activeClass} onClick={closeHandler}>
           <div className={styles.modal__content} onClick={contentClickHandler}>
                {children}
           </div>
        </div>
    )
}

export default Modal