import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './DeviceSort.module.scss'

const DeviceSort = () => {
    const i18n = useTranslation()

    return (
        <div className={styles.sort}>
            <div className={styles.sort__title}>{i18n.t('Sort by')}</div>
            <div className={styles.sort__item}>{i18n.t('Price')}</div>
        </div>
    )
}

export default DeviceSort