import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { fetchOneDevice } from '../../../http/deviceAPI'
import { Context } from '../../../index'
import { createToast } from '../../UI/Toast/Toast'
import { addDeviceToBasket, fetchQuantityBasketItems } from '../../../http/basketAPI'
import { DEVICE_ROUTE } from '../../../utils/consts'
import pricePrettify from '../../../utils/pricePrettify'
import Button from '../../UI/Button/Button'

import star from '../../../assets/star.png'
import styles from './DeviceItem.module.scss'

const DeviceItem = observer(({device}) => {
    const {basket, toast} = useContext(Context)
    const i18n = useTranslation()
    const navigate = useNavigate()
    const price = pricePrettify(device.price)

    const navigateToDevice = () => {navigate(DEVICE_ROUTE + '/' + device.id)}
    const imageURL = `${process.env.REACT_APP_API_URL}/${device.img}`

    const handlerBuy = () => {
        addDeviceToBasket(device)
            .then(data => fetchOneDevice(data.deviceId))
            .then(data => toast.addToast(createToast(i18n.t('Added to cart', {name: data.name}))))
            .then(() => fetchQuantityBasketItems())
            .then(data => basket.setTotalQuantity(data))
            .catch(e => console.error('Error in DeviceItem component:', e.message))
    }

    return (
        <article className={styles.card}>
                <h3 className={styles.card__title} onClick={navigateToDevice}>{device.name}</h3>
                <div className={styles.card__price}>{price}<small> ₽</small></div>
                <div className={styles.card__buttons}>
                    <Button className={styles.btnBuy} secondary onClick={handlerBuy}>{i18n.t('Buy')}</Button>
                    <Button className={styles.btnMore} onClick={navigateToDevice}>{i18n.t('More')}</Button>
                </div> 
                <img className={styles.card__image} onClick={navigateToDevice} src={imageURL} alt={device.name} />
                <div className={styles.card__rating}>
                    <img src={star} alt={i18n.t('Rating')} />
                    {device.rating && <span>{device.rating.toFixed(1)}</span>}
                </div>
        </article>
    )
})

export default DeviceItem