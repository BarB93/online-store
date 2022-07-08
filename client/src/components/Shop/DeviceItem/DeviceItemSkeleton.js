import React from 'react'

import styles from './DeviceItem.module.scss'

const DeviceItemSkeleton = () => {
    return (
        <div className={`${styles.card} ${styles.skeleton}`}></div>
    )
}

export default DeviceItemSkeleton