import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { Context } from '../../../index'
import Button from '../../UI/Button/Button'

import styles from './DeviceListEmpty.module.scss'

const DeviceListEmpty = () => {
    const {brand, type} = useContext(Context)
    const i18n = useTranslation()

    const resetFilters = () => {
        brand.setSelectedBrand([])
        type.setSelectedType([])
    }

    return (
        <div className={styles.emptyList}>
            <h3 className={styles.emptyList__title}>{i18n.t('There are no devices for selected filters, chose others or reset')}</h3>
            <Button secondary className={styles.emptyList__btn} onClick={resetFilters}>{i18n.t('Reset filters')}</Button>
        </div>
    )
}

export default DeviceListEmpty