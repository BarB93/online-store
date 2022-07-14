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

    const orderHandler = () => {
        if(basket.totalOrderQuantity === 0)  return basket.setIsOpenEmtyOrderModal(true)
    
        //TODO barb: make order functional
    }

    return (
        <div className={styles.aside}>
            <div className={`${styles.aside__row} ${styles.aside__row_title}`}>
                <h4 className={`${styles.aside__totalTitle} ${styles.aside__rowTitle}`}>{i18n.t('Total')}</h4>
                <div className={`${styles.aside__totalPrice} ${styles.aside__rowValue}`}>{pricePrettify(basket.totalOrderPrice)} ₽</div>
            </div>
            <div className={`${styles.aside__row} ${!basket.totalOrderQuantity ? styles.aside__row_zero : ''}`}>
                <div className={styles.aside__rowTitle}>{i18n.t('Goods')}, {basket.totalOrderQuantity} {i18n.t('PCS.')}</div>
                {Boolean(basket.totalOrderQuantity) && <div className={styles.aside__rowValue}>{pricePrettify(basket.totalOrderPriceWithoutDiscount)} ₽</div>}
            </div>
            {Boolean(basket.totalOrderPrice)  && 

                <div className={styles.aside__row}>
                    <div className={styles.aside__rowTitle}>{i18n.t('Discount')}</div>
                    <div className={styles.aside__rowValue}>- {pricePrettify(basket.totalOrderPriceWithoutDiscount - basket.totalOrderPrice)} ₽</div>
                </div>
            }
            <div className={styles.aside__row}>
                <div className={styles.aside__rowTitle}>{i18n.t('Delivery')}</div>
                <div className={styles.aside__rowValue}>{i18n.t('Free')}</div>
            </div>
            <div className={styles.aside__btnBox}>
                <Button className={styles.aside__btnOrder} secondary bold onClick={orderHandler}>{i18n.t('Order')}</Button>
            </div>
        </div>
    )
})

export default Aside