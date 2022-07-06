import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import pricePrettify from '../../../utils/pricePrettify'
import { Context } from '../../../index'
import Button from '../../UI/Button/Button'

import styles from './Aside.module.scss'

const Aside = observer(() => {
    const i18n = useTranslation()
    const {basket} = useContext(Context)

    return (
        <div className={styles.aside}>
            <div className={`${styles.aside__row} ${styles.aside__row_title}`}>
                <h4 className={styles.aside__totalTitle}>{i18n.t('Total')}</h4>
                <div className={styles.aside__totalPrice}>{pricePrettify(basket.totalPrice)} ₽</div>
            </div>
            <div className={styles.aside__row}>
                <div className={styles.aside__rowTitle}>{i18n.t('Goods')}, {basket.totalQuantity} {i18n.t('PCS.')}</div>
                <div className={styles.aside_rowValue}>{basket.totalPriceWithoutDiscount} ₽</div>
            </div>
            <div className={styles.aside__row}>
                <div className={styles.aside__rowTitle}>{i18n.t('Discount')}</div>
                <div className={styles.aside_rowValue}>- {basket.totalPriceWithoutDiscount - basket.totalPrice} ₽</div>
            </div>
            <div className={styles.aside__row}>
                <div className={styles.aside__rowTitle}>{i18n.t('Delivery')}</div>
                <div className={styles.aside_rowValue}>{i18n.t('Free')}</div>
            </div>
            <div className={styles.aside__btnBox}>
                <Button className={styles.aside__btnOrder} secondary>{i18n.t('Order')}</Button>
            </div>
        </div>
    )
})

export default Aside