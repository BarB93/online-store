import React from 'react'

import styles from './Basket.module.scss'

const BasketSkeleton = () => {
  
    return (
        <div className={`${styles.basket} ${styles.skeleton}`}>
            <section className={styles.basket__content}></section>
            <aside className={styles.basket__aside}></aside>
        </div>
    )
}

export default BasketSkeleton