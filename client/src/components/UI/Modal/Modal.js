import React, { useEffect } from 'react'

import styles from './Modal.module.scss'

const Modal = ({active, setActive, children, title}) => {
    const activeClass = active ? ` ${styles.active}` : ''
    let overlayChecker = false

    useEffect(() => {
        if(active) {
            document.querySelector('body').classList.add('modal-show')
        }else {
            document.querySelector('body').classList.remove('modal-show')
        }
        
    },[active])

    const closeHandler = () => { setActive(false) }
    const mouseDownHandler = () => { 
        overlayChecker = true 
    }
    const mouseUpHandler = () => {
        if(overlayChecker) {
            setActive(false)
            overlayChecker = false
        }
    }
    
    return (
        <div className={styles.modal + activeClass} onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}>
                <div className={styles.modal__content} onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
                        {title && <h3 className={styles.modal__title}>{title}</h3>}
                        {children}
                        <div className={styles.modal__btnClose} onClick={closeHandler}></div>
                </div>
        </div>
    )
}

export default Modal