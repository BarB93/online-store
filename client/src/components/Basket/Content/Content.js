import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../../index'
import BasketItem from '../BasketItem/BasketItem'

import styles from './Content.module.scss'

const Content = observer(() => {
    const {basket} = useContext(Context)
    const i18n = useTranslation()

    return (
        <div className={styles.content}>
            <div className={styles.content__header}>
                <h3 className={styles.content__title}>{i18n.t('Basket')}</h3>
                <label className='customCheckbox__label' htmlFor='all_goods'>
                    <input className='customCheckbox__input' id='all_goods' type='checkbox' />
                    <div className='customCheckbox__checkbox'></div>
                    <span>{i18n.t('Select all')}</span>
                </label>
            </div>
            {basket.devices && basket.devices.map(item => <BasketItem key={item.name} device={item} />)}
        </div>
    )
})

export default Content