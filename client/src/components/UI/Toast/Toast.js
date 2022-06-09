import React, { useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { v4 as uuidv4 } from 'uuid'

import { Context } from '../../../index'

import styles from './Toast.module.scss'

export function createToast(description, title) {
    return {
        id: uuidv4(),
        description, 
        title
    }
}

const Toast = observer(({
    position = 'bottomRight',
    type = 'success'
  }) => {
    const {toast} = useContext(Context)
    const positionClass = styles[position]
    const typeClass = styles[type]
    const toastCounter = useRef(0)

    const deleteToast = id => toast.setList(toast.list.filter(toast => toast.id !== id))

    useEffect(() => {
        if(toastCounter.current < toast.count && toast.list.length) {
          toastCounter.current++
          setTimeout(() => {
              deleteToast(toast.list[0].id)
          }, 3000)
        }
    },[toast.list])
  
    return (
      <div className={`${styles.notificationContainer} ${positionClass}`}>
        {toast.list.map((toast, i) => (
          <div
            key={toast.id}
            className={`${styles.notification}  ${positionClass} ${typeClass}`}
          >
            <button
              className={styles.notification__btnClose}
              onClick={() => {deleteToast(toast.id)}}
            ></button>
            <div className={styles.notification__img}></div>
            <div>
              {toast.title && <p className={`${styles.notification__title}`}>{toast.title}</p>}
              <p className={`${styles.notification__description}`}>{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  })
  
  export default Toast