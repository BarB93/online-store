import React from 'react'

import styles from './DeviceItem.module.scss'

const DeviceItemSkeleton = () => {
    return (
        <div className={`${styles.card}`}>
            <div className={`${styles.wrapper} ${styles.skeleton}`}></div>
        </div>
    )
}

export default DeviceItemSkeleton