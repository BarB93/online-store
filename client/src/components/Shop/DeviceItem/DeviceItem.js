import React from 'react'
import {useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Button from '../../UI/Button/Button'
import pricePrettify from '../../../utils/pricePrettify'

import {DEVICE_ROUTE} from '../../../utils/consts'
import star from '../../../assets/star.png'
import styles from './DeviceItem.module.scss'

const DeviceItem = observer(({device}) => {
    const navigate = useNavigate()
    const price = pricePrettify(device.price)

    const navigateToDevice = () => {navigate(DEVICE_ROUTE + '/' + device.id)}

    return (
        <article className={styles.card}>
            <div className={styles.wrapper}>
                <h3 className={styles.card__title} onClick={navigateToDevice}>{device.name}</h3>
                <div className={styles.card__price}>{price}<small> ₽</small></div>
                <div className={styles.card__buttons}>
                    <Button className={styles.btnBuy} secondary>Купить</Button>
                    <Button className={styles.btnMore} onClick={navigateToDevice}>Подробнее</Button>
                </div>
                <div className={styles.card__image} onClick={navigateToDevice}>
                    <img src={device.img} alt={device.name} />
                </div>
                <div className={styles.card__rating}>
                    <img src={star} alt='рейтинг' />
                    <span>{device.rating.toFixed(1)}</span>
                </div>
            </div>
        </article>
    )
})

export default DeviceItem