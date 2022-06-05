import React from 'react'

import styles from './BrandBar.module.scss'

const BrandBarSkeleton = () => {
    return (
        <li className={`${styles.list__item} ${styles.skeleton}`}></li>
    )
}

export default BrandBarSkeleton