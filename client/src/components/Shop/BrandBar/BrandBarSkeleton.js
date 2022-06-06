import React from 'react'

import styles from './BrandBar.module.scss'

const BrandBarSkeleton = () => {
    return (
        <id className={`${styles.list} ${styles.skeleton}`}></id>
    )
}

export default BrandBarSkeleton