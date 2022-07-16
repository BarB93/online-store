import React, { useContext } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Context } from '../../../index'
import { DEVICE_ROUTE } from '../../../utils/consts'
import pricePrettify from '../../../utils/pricePrettify'
import Button from '../../UI/Button/Button'

import star from '../../../assets/star.png'
import styles from './DeviceItem.module.scss'

const DeviceItem = observer(({device}) => {
    const {basket} = useContext(Context)
    const i18n = useTranslation()
    const price = pricePrettify(device.price)

    const imageURL = `${process.env.REACT_APP_API_URL}/${device.img}`

    const handlerBuy = () => {
        basket.addDeviceToBasket(device)
    }

    return (
        <div className={styles.wrapper}>
            <article className={styles.card}>
                    <h3 className={styles.card__title}><NavLink to={`${DEVICE_ROUTE}/${device.id}`}>{device.name}</NavLink></h3>
                    <div className={styles.card__price}>{price}<small> ₽</small></div>
                    <div className={styles.card__buttons}>
                        <Button className={styles.card__btnBuy} secondary onClick={handlerBuy}>{i18n.t('Buy')}</Button>
                        <NavLink className={styles.card__moreLink} to={`${DEVICE_ROUTE}/${device.id}`}><Button className={styles.card__btnMore}>{i18n.t('More')}</Button></NavLink>   
                    </div> 
                    <NavLink to={`${DEVICE_ROUTE}/${device.id}`}><img className={styles.card__image} src={imageURL} alt={device.name} /></NavLink>
                    <div className={styles.card__rating}>
                        <img src={star} alt={i18n.t('Rating')} />
                        {device.rating && <span>{device.rating.toFixed(1)}</span>}
                    </div>
            </article>
        </div>
    )
})

export default DeviceItem