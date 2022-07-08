import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { DiSCOUNT } from '../../../utils/consts'
import pricePrettify from '../../../utils/pricePrettify'
import { getPriceWithoutDiscount } from '../../../utils/getPriceWithoutDiscount'
import { Context } from '../../../index'
import ButtonQuantity from '../../UI/ButtonQuantity/ButtonQuantity'

import styles from './BasketItem.module.scss'

const BasketItem = observer(({device}) => {
    const {basket} = useContext(Context)
    const i18n = useTranslation()
    const imageURL = `${process.env.REACT_APP_API_URL}/${device.img}`
    const color = device.info.find(item => item.title === 'Color')
    const {name, quantity, price, id} = device 
    const totalPrice = price * quantity

    const increaseHeadler = async () => {
        const newQuantity = quantity + 1
        basket.setDeviceQuantity(id, newQuantity)
    }
    const decreaseHeadler = async () => {
        const newQuantity = quantity - 1
        if(newQuantity > 0) {
            basket.setDeviceQuantity(id, newQuantity)
        }
    }
    const orderItemChangeHandler = (e) => {
        if(e.target.checked) {
            basket.addToOrder(id)
        } else {
            basket.removeFromOrder(id)
        }
    }
    const removeItemHandler = () => {
        basket.removeBasketItem(id)
    }
   
    return (
        <div className={styles.device}>
            {
                basket.isVisibleCheckbox 
                &&
                <label className='customCheckbox__label'>
                        <input className='customCheckbox__input' type='checkbox' onChange={orderItemChangeHandler} checked={basket.orderDeviceIds.includes(id)}/>
                        <div className='customCheckbox__checkbox'></div>
                </label>
            }
            <div className={styles.device__imageBox}>
                <img className={styles.device__img} src={imageURL} alt={name} />
            </div>
            <div className={styles.device__infoBox}>
                <div className={styles.device__name}>{name}</div>
                {color && <div className={styles.device__color}>{i18n.t(color.title)}: {i18n.t(color.description)}</div>}
            </div>
            <div className={styles.device__quantityBox}>
                <div className={styles.device__quantityWrapper}>
                    <ButtonQuantity disabled={quantity <= 1} minus onClick={decreaseHeadler}/>
                    <span className={styles.device__quantity}>{quantity}</span>
                    <ButtonQuantity plus onClick={increaseHeadler}/>
                </div>
                <button className={styles.device__removeBtn} onClick={removeItemHandler}>{i18n.t('Remove')}</button>
            </div>
            <div className={styles.device__priceBox}>
                <div className={styles.device__price}>{pricePrettify(totalPrice)} ₽</div>
                <div className={styles.device__price_discount}>{pricePrettify(getPriceWithoutDiscount(totalPrice, DiSCOUNT))} ₽</div>
            </div>
        </div>
    )
})

export default BasketItem