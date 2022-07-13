import React from 'react'

import styles from './FilterBar.module.scss'

const FilterBarSkeleton = () => {

    return (
        <div className={`${styles.filter} ${styles.skeleton}`}></div>
    )
}

export default FilterBarSkeleton