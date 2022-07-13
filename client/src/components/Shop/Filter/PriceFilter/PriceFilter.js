import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Context } from '../../../../index'

import styles from './PriceFilter.module.scss'

const PriceFilter = observer(() => {
    const {price} = useContext(Context)
    const i18n = useTranslation()
    const exceptSymbols = ["e", "E", "+", "-", "."]


    const minPriceChangeHandler = (e) => {
        const value = e.target.value.replace(/^0+/, '')
        price.setStateMinPrice(value)
    }
    const maxPriceChangeHandler = (e) => {
        const value = e.target.value.replace(/^0+/, '')
        price.setStateMaxPrice(value)
    }

    const setMinInputedPrice = () => {
        price.setInputedMinPrice()
    }
    const setMaxInputedPrice = () => {
        price.setInputedMaxPrice()
    }

    const minPricePressKeyHandler = (e) => {
        exceptSymbols.includes(e.key) && e.preventDefault()

        if(e.key === 'Enter') {
            setMinInputedPrice()
        }
    }
    const maxPricePressKeyHandler = (e) => {
        exceptSymbols.includes(e.key) && e.preventDefault()

        if(e.key === 'Enter') {
            setMaxInputedPrice()
        }
    }

    return (
        <div className={styles.filter}>
            <div className={styles.filter__from}>
                <div className={styles.filter__title}>{i18n.t('From')}</div>
                <input className={styles.filter__input} type='number'  onChange={minPriceChangeHandler} onKeyPress={minPricePressKeyHandler} value={price.stateInputMinPrice} onBlur={setMinInputedPrice} />
            </div>
            <div className={styles.filter__to}>
                <div className={styles.filter__title}>{i18n.t('To')}</div>
                <input className={styles.filter__input} type='number' onChange={maxPriceChangeHandler} onKeyPress={maxPricePressKeyHandler} value={price.stateInputMaxPrice} onBlur={setMaxInputedPrice} />
            </div>
        </div>
    )
})

export default PriceFilter