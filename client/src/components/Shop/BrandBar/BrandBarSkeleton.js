import React from 'react'

import styles from './BrandBar.module.scss'

const BrandBarSkeleton = () => {
    return (
        <div className={`${styles.list} ${styles.skeleton}`}></div>
    )
}

export default BrandBarSkeleton