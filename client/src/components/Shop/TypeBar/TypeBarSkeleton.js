import React from 'react'

import styles from './TypeBar.module.scss'

const TypeBarSkeleton = () => {
    
    return (
        <ul className={`${styles.list} ${styles.skeleton}`}></ul>
    )
}   

export default TypeBarSkeleton